import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import ImagePicker from 'react-native-image-picker';

import GradientText from '../../components/GradientText';
import InputDefault from '../../components/InputDefault';
import {LinearButton} from '../../components/Buttons';
import ModalDelete from './ModalDelete';

import {globalStyles, fonts, colors} from '../../constants';

import {DEFAULT_URL} from '../../config/server';

import styles from './styles';
import LoadingView from '../../components/Loading';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: [],
      full_name: '',
      family_name: '',
      title: '',
      directTel: '',
      website: '',
      brokerageName: '',
      officeTel: '',
      isEditMode: false,
      isEditModePassword: false,
      modalDeleteVisible: false,
      password: '',
      confirm_password: '',
      avatarSource: null,
    };
  }

  componentDidUpdate() {
    const {error, loading, clearErrorProfile} = this.props;

    if (error !== null && loading === false) {
      this.dropDownAlertRef.alertWithType('error', 'Error', error);
      clearErrorProfile();
    }
  }

  onChangeState = (name, text) => {
    this.setState({
      [name]: text,
    });
  };

  handlePressEdit = () => {
    this.setState({
      isEditMode: true,
    });
  };

  handlePressSave = async () => {
    const {onUpdateProfile, users} = this.props;

    this.setState({
      isEditMode: false,
    });

    onUpdateProfile(this.props.profile, users.userid);
  };

  handlePressEditPassword = () => {
    this.setState({
      isEditModePassword: true,
    });
  };

  handlePressSavePassword = () => {
    this.setState({
      isEditModePassword: false,
    });
  };

  handlePressDelete = () => {
    this.setState({
      modalDeleteVisible: true,
    });
  };
  handlePressChangeImage = async () => {
    const {onChangeProfile} = this.props;

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        onChangeProfile('photo', response);
        const source = {uri: response.uri};
        this.setState({
          avatar: source,
        });
      }
    });
  };
  /**
  handlePressChangeImage = async () => {
    const {onUpdateAvatar} = this.props;

    const token = await AsyncStorage.getItem('token', null);

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        //path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        onUpdateAvatar(response, token);
      }
    });
  };
   */

  render() {
    const {
      isEditMode,
      isEditModePassword,
      password,
      confirm_password,
      modalDeleteVisible,
    } = this.state;

    const {loading, onChangeProfile, users} = this.props;

    if (loading) {
      return <LoadingView loadingText="Saving…" />;
    } else
      return (
        <SafeAreaView style={globalStyles.containerFull}>
          <View style={{alignItems: 'flex-start', marginLeft: 15}}>
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
          <StatusBar
            translucent={false}
            barStyle="dark-content"
            backgroundColor="white"
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
            <View style={{flex: 1, paddingHorizontal: 15}}>
              <View style={[globalStyles.block, {alignItems: 'center'}]}>
                <View>
                  <View style={styles.imageContainer}>
                    <Image
                      source={
                        this.state.avatar.length !== 0
                          ? {uri: this.state.avatar.uri}
                          : {uri: `${users.photourl}`}
                      }
                      style={{flex: 1, width: null, height: null}}
                      resizeMode="cover"
                    />
                  </View>
                  <Icon
                    disabled={!isEditMode}
                    name="pencil"
                    type="material-community"
                    color="white"
                    size={20}
                    disabledStyle={{backgroundColor: 'silver'}}
                    containerStyle={
                      isEditMode
                        ? styles.containerPen
                        : styles.containerPenDisable
                    }
                    underlayColor="transparent"
                    onPress={this.handlePressChangeImage}
                  />
                </View>
              </View>
              <View style={styles.profileBlock}>
                <View style={globalStyles.block}>
                  <GradientText style={globalStyles.headerTitle}>
                    Profile
                  </GradientText>
                </View>
                <View style={globalStyles.block}>
                  <InputDefault
                    editable={isEditMode}
                    name="full_name"
                    value={
                      isEditMode === true
                        ? this.state.full_name
                        : users.fullname
                    }
                    label="Full name"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    editable={isEditMode}
                    name="direct_tel"
                    value={users.direct_tel}
                    label="Direct Tel"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    editable={isEditMode}
                    name="title"
                    value={users.title}
                    label="Title"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    editable={isEditMode}
                    name="website"
                    value={users.website}
                    label="Website"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    editable={isEditMode}
                    name="job_title"
                    value={users.job_title}
                    label="Job Title"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    editable={isEditMode}
                    name="office_tel"
                    value={users.office_tel}
                    label="Office Tel"
                    onChangeText={onChangeProfile}
                  />
                </View>
                <View style={globalStyles.block}>
                  {isEditMode ? (
                    <LinearButton title="SAVE" onPress={this.handlePressSave} />
                  ) : (
                    <Button
                      title="Edit account"
                      titleStyle={styles.btnTitleDelete}
                      buttonStyle={[
                        styles.btnStyleDelete,
                        {backgroundColor: colors.FACEBOOK},
                      ]}
                      onPress={this.handlePressEdit}
                    />
                  )}
                </View>
              </View>
              <View style={styles.changePasswordBlock}>
                <View style={globalStyles.block}>
                  <GradientText style={globalStyles.headerTitle}>
                    Change password
                  </GradientText>
                </View>
                <View style={globalStyles.block}>
                  <InputDefault
                    editable={isEditModePassword}
                    name="password"
                    value={password}
                    label="New password"
                    onChangeText={this.onChangeState}
                  />
                  <InputDefault
                    editable={isEditModePassword}
                    name="confirm_password"
                    value={confirm_password}
                    label="Confirm password"
                    onChangeText={this.onChangeState}
                  />
                </View>
                <View style={globalStyles.block}>
                  {isEditModePassword ? (
                    <LinearButton
                      title="SAVE"
                      onPress={this.handlePressSavePassword}
                    />
                  ) : (
                    <View>
                      <Button
                        title="Change password"
                        titleStyle={styles.btnTitleDelete}
                        buttonStyle={[
                          styles.btnStyleDelete,
                          {backgroundColor: colors.FACEBOOK},
                        ]}
                        onPress={this.handlePressEditPassword}
                      />
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.deleteProfile}>
                <View style={globalStyles.block}>
                  <Button
                    title="Delete account"
                    titleStyle={styles.btnTitleDelete}
                    buttonStyle={styles.btnStyleDelete}
                    containerStyle={styles.btnContainerDelete}
                    onPress={this.handlePressDelete}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <ModalDelete
            visible={modalDeleteVisible}
            onPressYes={() => this.setState({modalDeleteVisible: false})}
            onPressNo={() => this.setState({modalDeleteVisible: false})}
          />
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </SafeAreaView>
      );
  }
}

export default ProfileScreen;
