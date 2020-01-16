import React, { Component } from 'react';
import {
  View,
  Platform,
  StatusBar,
  Text,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Slider,
  SafeAreaView
} from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Video from 'react-native-video';
import LoadingView from '../../components/Loading';
import ImageMultiplePicker from 'react-native-image-crop-picker';

import GradientText from '../../components/GradientText';

import { globalStyles, colors } from '../../constants';
import styles from './styles';
import PhotoModal from './PhotoModal';
import { DragDropGrid } from "react-native-drag-drop-grid-library"

import {
  Grayscale,
  Tint,
  Brightness,
  Saturate,
  HueRotate,
  Sepia
} from 'react-native-color-matrix-image-filters';

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
      isScroll: true,

      brightness: 1,
      contrast: 1,
      temperature: 1,
      tint: 0,
      threshold: 1,
      night: 1,
      predator: 1,
      sepia: 0,
      grayscale: 0,
      hueRotate: 0,
      saturate: 1
    };

    this.onRemove = this.onRemove.bind(this);
  }

  change(value) {
    this.setState(() => {
      return {
        brightness: parseFloat(value),
      };
    });
  }

  changeTint(value) {
    this.setState(() => {
      return {
        tint: parseFloat(value),
      };
    });
  }

  changeSaturate(value) {
    this.setState(() => {
      return {
        saturate: parseFloat(value),
      };
    });
  }

  changeHuerotate(value) {
    this.setState(() => {
      return {
        hueRotate: parseFloat(value),
      };
    });
  }
  changeGrayscale(value) {
    this.setState(() => {
      return {
        grayscale: parseFloat(value),
      };
    });
  }

  changeSepia(value) {
    this.setState(() => {
      return {
        sepia: parseFloat(value),
      };
    });
  }


  onRemove(letter) {
    this.sortGrid.deleteBlockList(letter);
  }
  getColor() {
    let r = this.randomRGB()
    let g = this.randomRGB()
    let b = this.randomRGB()
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  };

  randomRGB = () => 160 + Math.random() * 85

  handlePressAdd = () => {
    this.setState({
      showRightMenu: !this.state.showRightMenu,
    });
  }

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
      mediaType: 'photo'
    }).then(images => {

      const newPhotoList = images.map(i => {
        return { uri: i.path, width: i.width, height: i.height, type: i.mime, fileName: i.mime };
      })
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
        const { photoList } = this.state;

        const newPhotoList = photoList.concat({ image: response });
        this.setState({
          photoList: newPhotoList,
        });
      }
    });
  };

  componentDidUpdate() {
    const { error, loading, user } = this.props;
    console.log(loading)
  }
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
        playNow: { uri: uriIncome.uri, id: index },
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
    const { photoList, songList, location } = this.state;
    const { userid, onCreateTour } = this.props;

    onCreateTour(userid, location, photoList, songList);
  };

  render() {
    const { loading } = this.props;
    const { brightness, tint, saturate, hueRotate, grayscale, sepia } = this.state;

    return (
      // <ScrollView
      //   scrollEnabled={this.state.isScroll}
      //   contentContainerStyle={globalStyles.containerFull}
      //   keyboardShouldPersistTaps="always">
      //   <StatusBar
      //     translucent={true}
      //     backgroundColor="transparent"
      //     barStyle="light-content"
      //   />
      //   <View style={styles.header}>
      //     <Icon
      //       name="menu"
      //       type="material-community"
      //       color="white"
      //       size={32}
      //       onPress={() => {
      //         this.props.navigation.openDrawer();
      //       }}
      //     />
      //   </View>
      //   <View style={styles.containerBody}>
      //     <View>
      //       <GradientText style={globalStyles.headerTitle}>
      //         Create Tour
      //       </GradientText>
      //       <View
      //         style={{
      //           borderWidth: 1,
      //           borderColor: colors.LIGHT_BLUE,
      //           padding: 2,
      //         }}>
      //         <GooglePlacesAutocomplete
      //           query={{
      //             // available options: https://developers.google.com/places/web-service/autocomplete
      //             key: 'AIzaSyAn0yEoTrNbj6uOmPSTvmZIVdwe2k6WFRk',
      //             language: 'en', // language of the results
      //             types: '(cities)', // default: 'geocode'
      //           }}
      //           listViewDisplayed={this.state.listViewDisplayed}
      //           renderDescription={row => row.description}
      //           nearbyPlacesAPI="GooglePlacesSearch" // Which API to use:
      //           onPress={(data, details = null) => {
      //             this.setState({
      //               location: data.description,
      //               listViewDisplayed: false,
      //             });
      //           }}
      //           placeholder="Enter Location"
      //           minLength={2}
      //           autoFocus={false}
      //           returnKeyType={'search'}
      //           fetchDetails={true}
      //           styles={{
      //             textInputContainer: {
      //               backgroundColor: 'rgba(0,0,0,0)',
      //               borderTopWidth: 0,
      //               borderBottomWidth: 0,
      //               alignItems: 'center',
      //             },
      //             textInput: {
      //               marginTop: 0,
      //               marginLeft: 0,
      //               marginRight: 0,
      //               height: 38,
      //               color: '#5d5d5d',
      //               fontSize: 16,
      //             },
      //           }}
      //           currentLocation={false}
      //         />
      //       </View>
      //     </View>
      //     <View
      //       style={{ flex: 1, justifyContent: 'space-between', marginTop: 20 }}>
      //       <View style={styles.photoBlock}>
      //         <Text style={styles.label}>Photos:</Text>
      //         <View>
      //           <View >
      //             <Brightness amount={5}>
      //               <Sepia>
      //                 <Image source={require('../../../download.jpeg')} />
      //               </Sepia>
      //             </Brightness>
      //           </View>
      //         </View>
      //       </View>
      //       <View style={styles.musicBlock}>
      //         <Text style={styles.label}>Songs:</Text>
      //         {this.state.playNow !== null ? (
      //           <Video
      //             source={{ uri: this.state.playNow.uri }} // Can be a URL or a local file.
      //             ref={ref => {
      //               this.player = ref;
      //             }} // Store reference
      //             audioOnly={true}
      //             playInBackground={false}
      //             onBuffer={this.onBuffer} // Callback when remote video is buffering
      //             onError={this.videoError} // Callback when video cannot be loaded
      //           />
      //         ) : null}
      //         <View>
      //           <FlatList
      //             data={this.state.songList}
      //             numColumns={3}
      //             renderItem={({ item, index }) => (
      //               <Icon
      //                 name={
      //                   this.state.playNow !== null &&
      //                     this.state.playNow.id === index &&
      //                     !this.state.pausePlay
      //                     ? 'stop-circle'
      //                     : 'music'
      //                 }
      //                 type="font-awesome"
      //                 color={colors.LIGHT_BLUE}
      //                 size={40}
      //                 containerStyle={styles.iconContainer}
      //                 onPress={() => {
      //                   this.handlePressSong(item, index);
      //                 }}
      //               />
      //             )}
      //           />
      //         </View>
      //       </View>
      //       <View style={styles.animationBlock}>
      //         <Text style={styles.label}>Animation:</Text>
      //         <ScrollView
      //           horizontal
      //           style={{ height: 100 }}
      //           showsHorizontalScrollIndicator={false}>
      //           <View style={styles.animation} />
      //           <View style={styles.animation} />
      //           <View style={styles.animation} />
      //           <View style={styles.animation} />
      //         </ScrollView>
      //       </View>
      //     </View>
      //     <View>
      //       <Button
      //         title="Preview Tour"
      //         titleStyle={styles.btnTitleWhite}
      //         buttonStyle={styles.btnStyleWhite}
      //         containerStyle={styles.btnContainerStyle}
      //         onPress={this.handlePressPreview}
      //       />
      //       <Button
      //         title="Create Tour"
      //         titleStyle={styles.btnTitleWhite}
      //         buttonStyle={styles.btnStyleWhite}
      //         containerStyle={styles.btnContainerStyle}
      //         onPress={this.handlePressOrder}
      //       />
      //     </View>
      //   </View>
      //   <View
      //     style={{
      //       position: 'absolute',
      //       top: 40,
      //       right: 10,
      //     }}>
      //     <Icon
      //       reverse
      //       name="ios-add"
      //       type="ionicon"
      //       color={colors.LIGHT_GREEN}
      //       size={24}
      //       onPress={this.handlePressAdd}
      //     />
      //     {this.state.showRightMenu ? (
      //       <View>
      //         <Icon
      //           reverse
      //           name="ios-images"
      //           type="ionicon"
      //           color={colors.LIGHT_GREEN}
      //           size={24}
      //           onPress={this.handlePressPickImage}
      //         />
      //         <Icon
      //           reverse
      //           name="ios-camera"
      //           type="ionicon"
      //           color={colors.LIGHT_GREEN}
      //           size={24}
      //           onPress={this.handlePressCamera}
      //         />
      //         <Icon
      //           reverse
      //           name="ios-musical-notes"
      //           type="ionicon"
      //           color={colors.LIGHT_GREEN}
      //           size={24}
      //           onPress={this.handlePressAddSong} //this.handlePressSong}
      //         />
      //       </View>
      //     ) : <View />}
      //   </View>
      //   {loading ? (<LoadingView loadingText="Creating Tour..." hide={true} />) : null}
      // </ScrollView>

      <SafeAreaView>
        <View style={{ alignItems: "center" }}>
          {/* <ColorMatrix  matrix={concatColorMatrices([Brightness(brightness)])} >
          <Image source={require('../../../download.jpeg')} />
      </ColorMatrix> */}
      
      <Sepia  amount={sepia}>
      <Grayscale amount={grayscale}>
          <HueRotate amount={hueRotate}>
            <Saturate amount={saturate}>
              <Tint amount={tint}>
                <Brightness amount={brightness}>
                  <Image source={require('../../../download.jpeg')} />
                </Brightness>
              </Tint>
            </Saturate>
          </HueRotate>
          </Grayscale>
          </Sepia>
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Brightness</Text>
          <Slider
            step={0.01}
            maximumValue={2}
            onValueChange={this.change.bind(this)}
            value={brightness}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Tint</Text>
          <Slider
            step={0.01}
            maximumValue={2}
            onValueChange={this.changeTint.bind(this)}
            value={tint}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Saturate</Text>
          <Slider
            step={0.01}
            maximumValue={2}
            onValueChange={this.changeSaturate.bind(this)}
            value={saturate}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>HueRotate</Text>
          <Slider
            step={0.01}
            maximumValue={2}
            onValueChange={this.changeHuerotate.bind(this)}
            value={hueRotate}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Grayscale</Text>
          <Slider
            step={0.01}
            maximumValue={2}
            onValueChange={this.changeGrayscale.bind(this)}
            value={grayscale}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Sepia</Text>
          <Slider
            step={0.01}
            maximumValue={2}
            onValueChange={this.changeSepia.bind(this)}
            value={sepia}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default CreateTour;
