import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
  Animated
} from 'react-native';
import SwitchToggle from "react-native-switch-toggle";

import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  Grayscale
} from 'react-native-color-matrix-image-filters';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.delayValue = 50;

    this.state = {
      allToursArrraysBlat: [
        { media_url: "Pankaj", tour_location: "Yerevan, Armenia", post_time: "2019:12:28 06:18", mediaID: "", tourID: "1", isActive: 0 },
        { media_url: "Pankaj", tour_location: "Yerevan, Armenia", post_time: "2019:12:28 06:18", mediaID: "", tourID: "1", isActive: 0 },
        { media_url: "Pankaj", tour_location: "Yerevan, Armenia", post_time: "2019:12:28 06:18", mediaID: "", tourID: "1", isActive: 0 },
        { media_url: "Pankaj", tour_location: "Yerevan, Armenia", post_time: "2019:12:28 06:18", mediaID: "", tourID: "1", isActive: 0 },
      ],
      animatedValue: new Animated.Value(0),
      isVisibleBackgroundOfFlatSwipe: false,
      grayscaleValue: 0
    };

  }

  _renderItem = ({ item }) => {
    this.delayValue = this.delayValue + 500;
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.delayValue, 1]
    });
    return (
      <Animated.View
        style={[{ transform: [{ translateX }] }]}
      >
        <View>
          <Grayscale amount={item.isActive}>
            <Image
              style={{ width: "100%" }}
              source={require('../../../download.jpeg')}
            />
          </Grayscale>
          <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(150,150,150,0.3)', width: '100%' }}>
            <Text style={{ color: 'white', fontSize: 30 }}>Yerevan, Armenia</Text>
            <Text style={{ color: 'white', fontSize: 18 }}>2019:12:28 06:18</Text>
          </View>
        </View>
      </Animated.View>
    )
  }

  onPress1 = (item) => {
    item.isActive = !item.isActive
    this.forceUpdate()
  };

  _renderHiddenItem = ({ item }) => {

    this.delayValue = this.delayValue + 500;
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.delayValue, 1]
    });
    return (
      <Animated.View
        style={[{ transform: [{ translateX }] }]}
      >
        <View
          style={{
            height: '100%',
            alignItems: 'flex-end',
          }}>
          <View style={{
            width: "100%",
            height: '50%',
            backgroundColor: "#ff5252",
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 25
          }}>
            <Icon
              name="md-trash"
              type="ionicon"
              color="white"
              size={32}
              onPress={() => onPress()}
              underlayColor="transparent"
            />
          </View>
          <View style={{
            width: "100%",
            height: '50%',
            backgroundColor: "grey",
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 15

          }}>
            <SwitchToggle
              containerStyle={{
                marginTop: 16,
                width: 40,
                height: 20,
                borderRadius: 25,
                backgroundColor: "#ccc",
                padding: 2
              }}
              circleStyle={{
                width: 15,
                height: 15,
                borderRadius: 19,
                backgroundColor: "white" // rgb(102,134,205)
              }}
              switchOn={item.isActive} onPress={() => this.onPress1(item)} />
          </View>
        </View>
      </Animated.View>
    );
  }


  componentDidMount = () => {
    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      tension: -10,
      useNativeDriver: true,
    }).start();
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} />
        <View style={{ alignItems: 'flex-start', marginLeft: 15 }}>
          <Icon
            name="menu"
            type="material-community"
            color="silver"
            size={32}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
        </View>
        <SwipeListView
          useFlatList
          data={this.state.allToursArrraysBlat}
          disableRightSwipe={true}
          renderItem={this._renderItem}
          renderHiddenItem={
            this._renderHiddenItem}
          rightOpenValue={-70}
        />
        <Text>Home</Text>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
