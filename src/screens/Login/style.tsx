import colors from 'constant/colors';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
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

  restoreText: {
    color: colors.buttonRed,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  welcomeView: {
    flexDirection: 'column',
    marginTop: 100,
    alignSelf: 'center',
    alignItems: 'center',
  },

  googleImg: {
    width: 38,
    height: 38,
  },

  facebook: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#E9EAEC',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  google: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#E9EAEC',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 60, // Adjust spacing as needed
    width: '100%',
  },

  restoreContainer: {alignItems: 'flex-end', marginTop: 20},
  restoreInner: {flexDirection: 'row', alignItems: 'center'},
  bittonContainer: {marginTop: getScaleNumber(150)},
});
