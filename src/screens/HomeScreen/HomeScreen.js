import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
  Animated,
} from 'react-native';

import SwitchToggle from 'react-native-switch-toggle';
import {Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Grayscale} from 'react-native-color-matrix-image-filters';

import styles from './styles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.delayValue = 50;

    this.state = {
      animatedValue: new Animated.Value(0),
      isVisibleBackgroundOfFlatSwipe: false,
      grayscaleValue: 0,
    };
  }

  _renderItem = ({item}) => {
    const {tourlist} = this.props;
    this.delayValue = this.delayValue + 500;
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.delayValue, 1],
    });
    return (
      <Animated.View style={[{transform: [{translateX}]}]}>
        <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <Grayscale amount={item.is_active === 'YES' ? false : true}>
            <Image
              style={{width: '100%', height: 250}}
              source={require('../../../download.jpeg')}
            />
          </Grayscale>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              width: '100%',
              height: 250,
              marginTop: -250,
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 25,
                fontFamily: 'Permanent Marker Regular',
              }}>
              {item.tour_location}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'NotoSans-Bold',
              }}>
              {item.post_time}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  onPress1 = item => {
    item.is_active = !item.is_active;
    this.forceUpdate();
  };

  _renderHiddenItem = ({item}) => {
    this.delayValue = this.delayValue + 500;
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.delayValue, 1],
    });
    return (
      <Animated.View style={[{transform: [{translateX}]}]}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            height: '100%',
            alignItems: 'flex-end',
          }}>
          <View style={styles.trashCan}>
            <Icon
              name="md-trash"
              type="ionicon"
              color="white"
              size={32}
              onPress={() => onPress()}
              underlayColor="transparent"
            />
          </View>
          <View style={styles.switcher}>
            <SwitchToggle
              containerStyle={styles.switchContainer}
              circleStyle={styles.switchSircle}
              switchOn={item.isActive}
              onPress={() => this.onPress1(item)}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  componentDidMount = () => {
    const {userid, getToursList} = this.props;
    getToursList(userid);
    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      tension: -10,
      useNativeDriver: true,
    }).start();
  };

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
    const {tourlist} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={false} barStyle={'dark-content'} />
        <View style={{alignItems: 'flex-start', marginLeft: 12}}>
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
        <View>
          <SwipeListView
            useFlatList
            data={tourlist}
            disableRightSwipe={true}
            renderItem={this._renderItem}
            renderHiddenItem={this._renderHiddenItem}
            rightOpenValue={-70}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
