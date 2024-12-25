import colors from 'constant/colors';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    marginTop: 25,
  },

  error: {
    color: 'red',
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },

  bttonStyle: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
