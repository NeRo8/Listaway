import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  Animated,
  TouchableOpacity,
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
    this.delayValue = this.delayValue + 500;
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.delayValue, 1],
    });
    return (
      <Animated.View style={[{transform: [{translateX}]}]}>
        <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
          <TouchableOpacity
            style={{backgroundColor: 'white'}}
            activeOpacity={0.8}
            onPress={() => console.log('puff')}>
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
                  fontFamily: 'Permanent Marker Regular',
                }}>
                {item.post_time}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  onPress1 = item => {
    const {onUpdateStatus} = this.props;
    const isActive =
      item.is_active === 'YES'
        ? (item.is_active = 'NO')
        : (item.is_active = 'YES');
    onUpdateStatus(item.tourID, isActive, item.post_time);
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
            paddingBottom: 10,
            height: '100%',
            alignItems: 'flex-end',
          }}>
          <View style={styles.trashCan}>
            <Icon
              name="md-trash"
              type="ionicon"
              color="white"
              size={32}
              onPress={() => this.handlePressDelete(item.tourID)}
              underlayColor="transparent"
            />
          </View>
          <View style={styles.switcher}>
            <SwitchToggle
              containerStyle={styles.switchContainer}
              circleStyle={styles.switchSircle}
              switchOn={item.is_active === 'YES' ? true : false}
              onPress={() => this.onPress1(item)}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  componentDidMount = async () => {
    const {userid, getToursList} = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.props.navigation.addListener('didFocus', payload =>
      getToursList(userid),
    );

    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      tension: -10,
      useNativeDriver: true,
    }).start();
  };

  componentDidUpdate = () => {};

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handlePressDelete = async deletingTourId => {
    const {onDeleteTour} = this.props;
    Alert.alert(
      'Delete tour',
      'Are you sure about that?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'YES', onPress: () => onDeleteTour(deletingTourId)},
      ],
      {cancelable: false},
    );
  };
  // {text: 'OK', onPress: },
  handleBackButton() {
    return true;
  }

  render() {
    const {tourlist} = this.props;
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.header}>
          <Icon
            name="menu"
            type="material-community"
            color="black"
            size={32}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
        </View>
        <View>
          <SwipeListView
            keyExtractor={item => item.tourID}
            data={tourlist}
            disableRightSwipe={true}
            renderItem={this._renderItem}
            renderHiddenItem={this._renderHiddenItem}
            rightOpenValue={-70}
            closeOnRowPress={true}
            closeOnRowOpen={true}
            closeOnRowBeginSwipe={true}
          />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
