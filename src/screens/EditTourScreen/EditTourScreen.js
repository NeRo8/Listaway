import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {Icon, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ImageMultiplePicker from 'react-native-image-crop-picker';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

import GradientText from '../../components/GradientText';
import RadioGroup from '../../components/RadioGroup';
import LoadingView from '../../components/Loading';

import {globalStyles, colors} from '../../constants';
import styles from './styles';

class EditTourScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      valueIndex: 0,
      showRightMenu: false,
      playNow: null,
      pausePlay: false,
      isScroll: true,
      isShowDialog: false,
      listViewDisplayed: false,
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
  }

  onRemove = id => {
    const {onDeletePicture} = this.props;
    onDeletePicture(id);
  };

  handlePressAdd = () => {
    {
      this.state.edit === false
        ? null
        : this.setState({
            showRightMenu: !this.state.showRightMenu,
          });
    }
  };

  handlePressPickImage = () => {
    const {onAddPicture} = this.props;
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
          mediaID: Math.random().toString(),
          uri: i.path,
          type: i.mime,
          fileName: i.size.toString(),
        };
      });
      //Екшен на до додавання фоток в масив(редюсер)
      onAddPicture(newPhotoList);
      console.log('images', newPhotoList);
      this.setState({
        photoList: this.state.photoList.concat(newPhotoList),
      });
    });
  };

  handlePressAddSong = () => {
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
    const {onChangeField} = this.props;
    const {soundsList} = this.state;
    const sound = soundsList.find(i => i.active === true);
    this.setState({
      isShowDialog: false,
      playNow: null,
      selectedSong: sound.label,
    });
    onChangeField('music_name', sound.label);

    //this.state.songList.length = 0;
    //this.state.songList.push(this.state.playNow);
  };

  movePicture = pictureList => {
    const {onMovePicture} = this.props;
    onMovePicture(pictureList);
  };

  changeLocation = value => {
    const {onChangeField} = this.props;
    const name = 'tour_location';
    onChangeField(name, value);
  };

  // order = async () => {
  //   const {onEditTour} = this.props;
  //   // if (photoList.length === 0 || location === null) {
  //   //   return alert('Please, select a location, and at least 1 picture');
  //   // } else onCreateTour(userid, location, photoList, selectedSong);
  //   onEditTour();
  // };

  handlePressEdit = () => {
    const {onEditTour} = this.props;
    const {tourData, pictureList} = this.props;
    this.setState({edit: !this.state.edit, showRightMenu: false});
    {
      this.state.edit === true ? onEditTour(tourData, pictureList) : null;
    }
  };

  renderItem = ({item, drag}) => {
    return (
      <View>
        <View
          style={{
            zIndex: 4,
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
          <TouchableNativeFeedback onPress={() => this.onRemove(item.mediaID)}>
            <View>
              <Icon
                color="red"
                size={45}
                name="close-circle-outline"
                type="material-community"
                underlayColor="transparent"
              />
            </View>
          </TouchableNativeFeedback>
        </View>

        <TouchableOpacity
          style={styles.block}
          onLongPress={drag}
          delayLongPress={500}>
          <Image
            source={
              item.media_url !== undefined
                ? {uri: item.media_url}
                : {uri: item.uri}
            }
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {loading, pictureList, tourData} = this.props;
    const {tempImageList, edit} = this.state;

    if (loading) {
      return (
        <View style={{height: '100%', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.LIGHT_BLUE} />
        </View>
      );
    }

    return (
      <View style={{minHeight: '100%', flexGrow: 1}}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="menu"
              type="material-community"
              color={colors.LIGHT_GREEN}
              underlayColor="transparent"
              size={32}
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>

          <View style={{flex: 6, paddingLeft: 40}}>
            <GradientText style={globalStyles.headerTitle}>Tour</GradientText>
          </View>
        </View>
        <View style={styles.containerBody}>
          <View style={{}}>
            <ScrollView
              scrollEnabled={this.state.isScroll}
              contentContainerStyle={globalStyles.containerFull}
              keyboardShouldPersistTaps="always">
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
                  this.changeLocation(data.description);
                  this.setState({
                    //location: data.description,
                    listViewDisplayed: false,
                  });
                }}
                editable={edit === false ? false : true}
                placeholder={'Enter location'}
                getDefaultValue={() => `${tourData.tour_location}`}
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    alignItems: 'center',
                    marginTop: 0,
                    height: 45,
                  },
                  textInput: {
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingHorizontal: 5,
                    color: '#5d5d5d',
                    fontSize: 18,
                  },
                  container: {
                    borderWidth: 1,
                    borderColor: colors.LIGHT_GREEN,
                  },
                }}
                currentLocation={false}
              />
            </ScrollView>
          </View>
          <View style={styles.photoBlock}>
            <Text style={styles.label}>Photos:</Text>
            <View style={{flex: 1}}>
              <DraggableFlatList
                data={pictureList}
                renderItem={this.renderItem}
                keyExtractor={item => `draggable-item-${item.mediaID}`}
                onDragEnd={({data}) => this.movePicture(data)}
              />
            </View>
          </View>
          <View style={styles.bottomBtnsView}>
            <Button
              title={edit === false ? 'Edit Tour' : 'Save Changes'}
              titleStyle={styles.btnTitleWhite}
              buttonStyle={
                edit === false ? styles.btnStyleWhite : styles.btnEditActive
              }
              containerStyle={styles.btnContainerStyle}
              onPress={this.handlePressEdit}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 30,
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
      </View>
    );
  }
}

export default EditTourScreen;
