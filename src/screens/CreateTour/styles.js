import {StyleSheet, Platform} from 'react-native';

import {colors} from '../../constants';
import {fonts} from '../../constants';

export default StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
    backgroundColor: colors.LIGHT_BLUE,
  },
  containerBody: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  inputStyle: {
    fontFamily: fonts.notoRegular,
    paddingHorizontal: 10,
  },
  btnContainerStyle: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  btnTitleWhite: {
    fontSize: 16,
    color: colors.LIGHT_BLUE,
    fontFamily: fonts.notoBold,
  },
  btnStyleWhite: {
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE,
  },
  label: {
    color: colors.LIGHT_BLUE,
    fontFamily: fonts.notoRegular,
    fontSize: 18,
  },
  animation: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE,
    marginHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE,
    margin: 5,
  },
  photoBlock: {},
  block: {
    // flex: 1,
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
