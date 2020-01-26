import React, {Component} from 'react';
import {View, StatusBar, Text, ScrollView, Image} from 'react-native';

import {Icon, Button, Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ImageMultiplePicker from 'react-native-image-crop-picker';
import {DragDropGrid} from 'react-native-drag-drop-grid-library';

import GradientText from '../../components/GradientText';
import RadioGroup from '../../components/RadioGroup';
import LoadingView from '../../components/Loading';

import {globalStyles, colors} from '../../constants';
import styles from './styles';

import song from '../../assets/songs/song1.mp3';

class CreateTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoList: [],
      songList: [],
      selectedSong: 'bensound-sunny',
      valueIndex: 0,
      showRightMenu: false,
      playNow: null,
      pausePlay: false,
      location: null,
      isScroll: true,
      isShowDialog: false,
      soundsList: [
        {
          id: 0,
          label: 'bensound-sunny',
          value: require('../../assets/songs/song1.mp3'),
          active: true,
        },
        {
          id: 1,
          label: 'bensound-memories',
          value: require('../../assets/songs/song2.mp3'),
          active: false,
        },
        {
          id: 2,
          label: 'bensound-allthat',
          value: require('../../assets/songs/song3.mp3'),
          active: false,
        },
        {
          id: 3,
          label: 'bensound-creativeminds',
          value: require('../../assets/songs/song4.mp3'),
          active: false,
        },
        {
          id: 4,
          label: 'bensound-dreams',
          value: require('../../assets/songs/song5.mp3'),
          active: false,
        },
      ],
    };

    this.onRemove = this.onRemove.bind(this);
  }
  onRemove(letter) {
    this.sortGrid.deleteBlockList(letter);
  }
  getColor() {
    let r = this.randomRGB();
    let g = this.randomRGB();
    let b = this.randomRGB();
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  randomRGB = () => 160 + Math.random() * 85;

  handlePressAdd = () => {
    this.setState({
      showRightMenu: !this.state.showRightMenu,
    });
  };

  handlePressPickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // Open Image Library:

    ImageMultiplePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      maxFiles: 20,
      mediaType: 'photo',
    }).then(images => {
      const newPhotoList = images.map(i => {
        return {
          uri: i.path,
          width: i.width,
          height: i.height,
          type: i.mime,
          fileName: i.mime,
          fullWidth: true,
          duration: 15000,
          title: '',
        };
      });
      console.log(newPhotoList);

      this.setState({
        photoList: this.state.photoList.concat(newPhotoList),
      });
    });

    // ImagePicker.launchImageLibrary(options, response => {
    //   const {photoList} = this.state;
    //   console.log(response);

    //   const newPhotoList = photoList.concat({image: response});
    //   console.log(newPhotoList);
    //   this.setState({
    //     photoList: newPhotoList,
    //   });
    // });
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

  componentDidUpdate() {
    const {error, loading, user} = this.props;
  }

  handlePressAddSong = async () => {
    this.setState({isShowDialog: true});
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
    this.props.navigation.navigate('PreviewTour', {
      photoList: this.state.photoList,
      songList: this.state.songList,
    });
  };

  handlePressRadioButton = id => {
    const {soundsList} = this.state;
    const newSoundsList = soundsList.map(sound =>
      sound.id === id ? {...sound, active: true} : {...sound, active: false},
    );
    this.setState({soundsList: newSoundsList});
  };

  soundSelect = (value, index) => {
    const {valueIndex, radio_props, selectedSong} = this.state;
    this.setState({
      playNow: {uri: value, id: value},
    });
  };

  handlePressSaveMusic = () => {
    const {selectedSong, soundsList} = this.state;
    const sound = soundsList.find(i => i.active === true);
    this.setState({
      isShowDialog: false,
      playNow: null,
      selectedSong: sound.label,
    });
    this.state.songList.length = 0;
    this.state.songList.push(this.state.playNow);
  };

  handlePressOrder = async () => {
    const {photoList, selectedSong, location} = this.state;
    const {userid, onCreateTour} = this.props;
    if (photoList.length === 0 || location === null) {
      return alert('Please, select a location, and at least 1 picture');
    } else onCreateTour(userid, location, photoList, selectedSong);
  };

  render() {
    const {loading} = this.props;
    const {radio_props, selectedSong, valueIndex} = this.state;
    return (
      <ScrollView
        scrollEnabled={this.state.isScroll}
        contentContainerStyle={globalStyles.containerFull}
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
                  types: 'geocode', // default: 'geocode'
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
              <DragDropGrid
                ref={sortGrid => {
                  this.sortGrid = sortGrid;
                }}
                blockTransitionDuration={200}
                activeBlockCenteringDuration={200}
                itemsPerRow={3}
                dragActivationTreshold={200}
                onDragRelease={itemOrder => {
                  this.setState({
                    isScroll: true,
                  });
                }}
                onDragStart={key => {
                  this.setState({
                    isScroll: false,
                  });
                }}>
                {this.state.photoList.map((item, index) => (
                  <View key={index} style={styles.block}>
                    <Image
                      source={{uri: item.uri}}
                      // source={require(item.path)}
                      style={{
                        width: '99%',
                        height: '99%',
                      }}
                    />
                  </View>
                ))}
              </DragDropGrid>
            </View>

            {/* <View style={{flex}}>
              <Text style={styles.label}>Song:</Text>

              {this.state.playNow !== null ? (
                <Video
                  source={this.state.playNow.uri} // Can be a URL or a local file.
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
                  renderItem={({ item, index }) => (
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
            </View> */}
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
                name="ios-musical-notes"
                type="ionicon"
                color={colors.LIGHT_GREEN}
                size={24}
                onPress={this.handlePressAddSong} //this.handlePressSong}
              />
            </View>
          ) : (
            <View />
          )}
        </View>

        {loading ? (
          <LoadingView loadingText="Creating Tour..." hide={true} />
        ) : null}

        <RadioGroup
          visible={this.state.isShowDialog}
          soundsList={this.state.soundsList}
          onPressItem={this.handlePressRadioButton}
          onClose={this.handlePressSaveMusic}
        />
      </ScrollView>
    );
  }
}

export default CreateTour;
