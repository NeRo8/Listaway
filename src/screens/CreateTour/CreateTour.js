import React, {Component} from 'react';
import {
  View,
  Platform,
  StatusBar,
  Text,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {Icon, Input, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Video from 'react-native-video';

import GradientText from '../../components/GradientText';

import {globalStyles, colors} from '../../constants';
import styles from './styles';
import PhotoModal from './PhotoModal';

class CreateTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoList: [],
      songList: [],
      showRightMenu: false,
      playNow: null,
      pausePlay: false,
      location: null,
    };
  }

  handlePressAdd = () =>
    this.setState({
      showRightMenu: !this.state.showRightMenu,
    });

  handlePressPickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // Open Image Library:
    ImagePicker.launchImageLibrary(options, response => {
      const {photoList} = this.state;

      const newPhotoList = photoList.concat({image: response});
      this.setState({
        photoList: newPhotoList,
      });
    });
  };

  handlePressCamera = () => {
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Launch Camera:
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const {photoList} = this.state;

        const newPhotoList = photoList.concat({image: response});
        this.setState({
          photoList: newPhotoList,
        });
      }
    });
  };

  handlePressAddSong = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      this.setState(prevState => ({
        songList: [...prevState.songList, res],
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  handlePressSong = (uriIncome, index) => {
    if (this.state.playNow !== null && index === this.state.playNow.id) {
      this.setState({
        playNow: null,
      });
    } else {
      this.setState({
        playNow: {uri: uriIncome.uri, id: index},
      });
    }
  };

  handlePressPreview = async () => {
    /**
    const {photoList, songList, location} = this.state;
    const {userid, onCreateTour} = this.props;

    onCreateTour(userid, location, photoList, songList);
     */
  };

  handlePressOrder = async () => {
    const {photoList, songList, location} = this.state;
    const {userid, onCreateTour} = this.props;

    onCreateTour(userid, location, photoList, songList);
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={globalStyles.containerFull}
        nestedScrollEnabled
        keyboardShouldPersistTaps="always">
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.header}>
          <Icon
            name="menu"
            type="material-community"
            color="white"
            size={32}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
        </View>
        <View style={styles.containerBody}>
          <View>
            <GradientText style={globalStyles.headerTitle}>
              Create Tour
            </GradientText>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.LIGHT_BLUE,
                padding: 2,
              }}>
              <GooglePlacesAutocomplete
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAn0yEoTrNbj6uOmPSTvmZIVdwe2k6WFRk',
                  language: 'en', // language of the results
                  types: '(cities)', // default: 'geocode'
                }}
                listViewDisplayed={this.state.listViewDisplayed}
                renderDescription={row => row.description}
                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use:
                onPress={(data, details = null) => {
                  this.setState({
                    location: data.description,
                    listViewDisplayed: false,
                  });
                }}
                placeholder="Enter Location"
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    alignItems: 'center',
                  },
                  textInput: {
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                  },
                }}
                currentLocation={false}
              />
            </View>
          </View>
          <View
            style={{flex: 1, justifyContent: 'space-between', marginTop: 20}}>
            <View style={styles.photoBlock}>
              <Text style={styles.label}>Photos:</Text>
              <View>
                <FlatList
                  nestedScrollEnabled
                  alwaysBounceHorizontal
                  data={this.state.photoList}
                  numColumns={2}
                  renderItem={({item}) => (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{uri: item.image.uri}}
                        style={{
                          width: (Dimensions.get('window').width - 60) / 2,
                          height: 100,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={styles.musicBlock}>
              <Text style={styles.label}>Songs:</Text>

              {this.state.playNow !== null ? (
                <Video
                  source={{uri: this.state.playNow.uri}} // Can be a URL or a local file.
                  ref={ref => {
                    this.player = ref;
                  }} // Store reference
                  audioOnly={true}
                  playInBackground={false}
                  onBuffer={this.onBuffer} // Callback when remote video is buffering
                  onError={this.videoError} // Callback when video cannot be loaded
                />
              ) : null}
              <View>
                <FlatList
                  data={this.state.songList}
                  numColumns={3}
                  renderItem={({item, index}) => (
                    <Icon
                      name={
                        this.state.playNow !== null &&
                        this.state.playNow.id === index &&
                        !this.state.pausePlay
                          ? 'stop-circle'
                          : 'music'
                      }
                      type="font-awesome"
                      color={colors.LIGHT_BLUE}
                      size={40}
                      containerStyle={styles.iconContainer}
                      onPress={() => {
                        this.handlePressSong(item, index);
                      }}
                    />
                  )}
                />
              </View>
            </View>
            <View style={styles.animationBlock}>
              <Text style={styles.label}>Animation:</Text>
              <ScrollView
                horizontal
                style={{height: 100}}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.animation} />
                <View style={styles.animation} />
                <View style={styles.animation} />
                <View style={styles.animation} />
              </ScrollView>
            </View>
          </View>
          <View>
            <Button
              title="Preview Tour"
              titleStyle={styles.btnTitleWhite}
              buttonStyle={styles.btnStyleWhite}
              containerStyle={styles.btnContainerStyle}
              onPress={this.handlePressPreview}
            />
            <Button
              title="Create Tour"
              titleStyle={styles.btnTitleWhite}
              buttonStyle={styles.btnStyleWhite}
              containerStyle={styles.btnContainerStyle}
              onPress={this.handlePressOrder}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 40,
            right: 10,
          }}>
          <Icon
            reverse
            name="ios-add"
            type="ionicon"
            color={colors.LIGHT_GREEN}
            size={24}
            onPress={this.handlePressAdd}
          />
          {this.state.showRightMenu ? (
            <View>
              <Icon
                reverse
                name="ios-images"
                type="ionicon"
                color={colors.LIGHT_GREEN}
                size={24}
                onPress={this.handlePressPickImage}
              />
              <Icon
                reverse
                name="ios-camera"
                type="ionicon"
                color={colors.LIGHT_GREEN}
                size={24}
                onPress={this.handlePressCamera}
              />
              <Icon
                reverse
                name="ios-musical-notes"
                type="ionicon"
                color={colors.LIGHT_GREEN}
                size={24}
                onPress={this.handlePressAddSong} //this.handlePressSong}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

export default CreateTour;
