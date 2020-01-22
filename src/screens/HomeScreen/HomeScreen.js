import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  AsyncStorage,
  FlatList,
  Image,
  Switch,
  Animated
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.delayValue = 50;

    this.state = {
      allToursArrraysBlat: [
        { media_url: "Pankaj", tour_location: "Yerevan, Armenia", post_time: "2019:12:28 06:18", mediaID: "", tourID: "1" },
        { media_url: "Pankaj", tour_location: "Yerevan, Armenia", post_time: "2019:12:28 06:18", mediaID: "", tourID: "1" },
        { media_url: "Pankaj", tour_location: "Yerevan, Armenia", post_time: "2019:12:28 06:18", mediaID: "", tourID: "1" },
        { media_url: "Pankaj", tour_location: "Yerevan, Armenia", post_time: "2019:12:28 06:18", mediaID: "", tourID: "1" },
      ],
      animatedValue: new Animated.Value(0),
      isVisibleBackgroundOfFlatSwipe: false
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
          <Image
            style={{ width: "100%" }}
            source={require('../../../download.jpeg')}
          />
        </View>
      </Animated.View>
    )
  }

  _renderHiddenItem = () => {

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
          alignItems: 'flex-end'
        }}>
        <View style={{
          width: "100%",
          height: '50%',
          backgroundColor: "black",
          alignItems: 'flex-end',
          justifyContent: 'center',
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
        }}>
          <Switch></Switch>
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
