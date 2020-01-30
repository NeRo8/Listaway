import React, {Component} from 'react';
import {View, Image, Dimensions} from 'react-native';
import Video from 'react-native-video';
import Carousel from 'react-native-snap-carousel';
import {Icon} from 'react-native-elements';

import styles from './styles';

class PreviewToure extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem = ({item, index}) => {
    return (
      <Image
        source={{uri: item.uri}}
        style={{width: Dimensions.get('window').width, height: '100%'}}
      />
    );
  };

  render() {
    const photoList = this.props.navigation.getParam('photoList', []);
    const song = this.props.navigation.getParam('backgroundSong', null);

    return (
      <View style={{flex: 1}}>
        <Icon
          name="ios-close"
          type="ionicon"
          size={40}
          color="white"
          underlayColor="transparent"
          containerStyle={{
            position: 'absolute',
            top: 40,
            right: 20,
            zIndex: 2,
          }}
          onPress={() => this.props.navigation.goBack()}
        />
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={photoList}
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          loop
          autoplay
        />
        <Video
          source={song.value} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }}
          audioOnly // Store reference
        />
      </View>
    );
  }
}

export default PreviewToure;
