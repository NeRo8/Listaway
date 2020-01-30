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

const ItemImage = ({item, drag, onRemove, editable}) => (
  <View>
    {editable ? (
      <Icon
        color="red"
        size={30}
        name="ios-trash"
        type="ionicon"
        underlayColor="transparent"
        containerStyle={styles.deleteIcon}
        onPress={() => onRemove(item.mediaID)}
      />
    ) : null}

    <TouchableOpacity
      style={styles.block}
      onLongPress={drag}
      delayLongPress={300}>
      <Image
        source={
          item.media_url !== undefined ? {uri: item.media_url} : {uri: item.uri}
        }
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </TouchableOpacity>
  </View>
);

class EditTourScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editActive: false,
      showRightMenu: false,
      isScroll: true,
      isShowDialog: false,
      listViewDisplayed: false,
      //Check creator is active user

      showRightMenu: false,
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

  componentDidMount() {
    const {tourData, userid} = this.props;

    if (tourData.userid === userid) {
      this.setState({editActive: true});
    }
  }

  onRemove = id => {
    const {onDeletePicture} = this.props;
    onDeletePicture(id);
  };

  handlePressPickImage = () => {
    const {onAddPicture} = this.props;

    ImageMultiplePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      maxFiles: 20,
      mediaType: 'photo',
    }).then(images => {
      const newPhotoList = images.map(i => {
        return {
          uri: i.path,
          type: i.mime,
          name: i.filename,
        };
      });
      //Екшен на до додавання фоток в масив(редюсер)
      onAddPicture(newPhotoList);
    });
  };

  handlePressAddSong = () => {
    this.setState({isShowDialog: true});
  };

  movePicture = pictureList => {
    const {onMovePicture} = this.props;
    onMovePicture(pictureList);
  };

  changeLocation = value => {
    const {onChangeField} = this.props;
    onChangeField('tour_location', value);
  };

  onPressEdit = () => {
    this.setState({
      showRightMenu: !this.state.showRightMenu,
    });
  };

  handlePressRadioButton = id => {
    const {soundsList} = this.state;
    const newSoundsList = soundsList.map(sound =>
      sound.id === id ? {...sound, active: true} : {...sound, active: false},
    );
    this.setState({soundsList: newSoundsList});
  };

  handlePressSaveMusic = () => {
    const {onChangeField} = this.props;
    const {soundsList} = this.state;
    const sound = soundsList.find(i => i.active === true);
    this.setState({
      isShowDialog: false,
    });
    onChangeField('music_name', sound.label);
  };

  handlePressSave = () => {
    const {onEditTour, tourData, pictureList} = this.props;

    onEditTour(tourData, pictureList);
  };

  render() {
    const {loading, pictureList, tourData} = this.props;
    const {edit} = this.state;

    if (loading) {
      return (
        <View style={{height: '100%', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.LIGHT_BLUE} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
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
          <View>
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
                editable={edit}
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

            <DraggableFlatList
              data={pictureList}
              renderItem={({item, drag}) => (
                <ItemImage
                  item={item}
                  drag={drag}
                  onRemove={this.onRemove}
                  editable={this.state.editActive}
                />
              )}
              keyExtractor={(item, index) => `draggable-item-${index}`}
              onDragEnd={({data}) => this.movePicture(data)}
            />
          </View>
        </View>
        {this.state.editActive ? (
          <View style={styles.rightTopMenu}>
            <Icon
              reverse
              name="create"
              type="ion-icon"
              color={colors.LIGHT_GREEN}
              size={20}
              onPress={this.onPressEdit}
            />
            {this.state.showRightMenu ? (
              <View>
                <Icon
                  reverse
                  name="ios-images"
                  type="ionicon"
                  color={colors.LIGHT_GREEN}
                  size={20}
                  onPress={this.handlePressPickImage}
                />
                <Icon
                  reverse
                  name="ios-musical-notes"
                  type="ionicon"
                  color={colors.LIGHT_GREEN}
                  size={20}
                  onPress={this.handlePressAddSong} //this.handlePressSong}
                />
                <Icon
                  reverse
                  name="ios-save"
                  type="ionicon"
                  color={colors.LIGHT_GREEN}
                  size={20}
                  onPress={this.handlePressSave} //this.handlePressSong}
                />
              </View>
            ) : null}
          </View>
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
