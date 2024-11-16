import colors from 'constant/colors';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: getScaleNumber(32),
    color: colors.headerBlack,
  },
  signInText: {
    fontSize: getScaleNumber(14),
    marginTop: 10,
    color: colors.gray,
  },
  inputUsername: {
    marginTop: 60,
  },
  inputPassword: {
    marginTop: 20,
  },

  welcomeView: {
    flexDirection: 'column',
    marginTop: 100,
    alignSelf: 'center',
    alignItems: 'center',
  },
  innerContainer:{paddingHorizontal: 20},
  buttonContainer:{marginTop: getScaleNumber(100)},
});
