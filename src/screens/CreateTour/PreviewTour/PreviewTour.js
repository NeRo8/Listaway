import React, {Component} from 'react';
import TimedSlideshow from 'react-native-timed-slideshow';

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
import Video from 'react-native-video';
import {Icon} from 'react-native-elements';

import styles from './styles';
import colors from '../../../constants/colors';

class PreviewTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playNow: this.props.navigation.state.params.song,

      duration: 5500,
      soundsList: [
        {
          id: 0,
          label: 'bensound-sunny',
          value: require('../../../assets/songs/song1.mp3'),
        },
        {
          id: 1,
          label: 'bensound-memories',
          value: require('../../../assets/songs/song2.mp3'),
        },
        {
          id: 2,
          label: 'bensound-allthat',
          value: require('../../../assets/songs/song3.mp3'),
        },
        {
          id: 3,
          label: 'bensound-creativeminds',
          value: require('../../../assets/songs/song4.mp3'),
        },
        {
          id: 4,
          label: 'bensound-dreams',
          value: require('../../../assets/songs/song5.mp3'),
        },
      ],
    };
  }
  componentDidMount = () => {
    console.log(this.state.playNow);
  };
  render() {
    const items = [
      {
        uri:
          'http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg',
        title: 'Michael Malik',
        text: '',
      },
      {
        uri:
          'http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg',
        title: 'Victor Fallon',
        text: '',
        duration: 3000,
      },
      {
        uri: 'https://greatist.com/sites/default/files/Running_Mountain.jpg',
        title: 'Mary Gomes',
        text: '',
        fullWidth: true,
      },
    ];

    return (
      <View style={{flex: 1}}>
        <TimedSlideshow
          showProgressBar={false}
          items={this.props.navigation.state.params.photoList}
          index={0}
          onClose={() => {
            this.setState({playNow: null});
            this.props.navigation.navigate('CreateTour');
          }}
        />
        <View style={styles.animationBlock}>
          {this.state.playNow !== null ? (
            <Icon
              name="pause"
              type="material-community"
              size={32}
              onPress={() => {
                this.setState({playNow: null});
              }}
            />
          ) : (
            <Icon
              name="play-circle"
              type="material-community"
              size={32}
              onPress={() => {
                this.setState({
                  playNow: this.props.navigation.state.params.song,

                  // playNow: this.props.navigation.state.params.songList[0],
                });
              }}
            />
          )}
          {this.state.playNow !== null ? (
            <Video
              //source={require(`../${this.state.playNow.value}`)} // Can be a URL or a local file.
              source={
                this.state.soundsList.find(i => i.id === this.state.playNow.id)
                  .value
              } // Can be a URL or a local file.
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
      </View>
    );
  }
}

export default PreviewTour;
