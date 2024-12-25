import colors from 'constant/colors';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: 25,
    backgroundColor: colors.white,
    marginTop: 25,
  },

  error: {
    color: 'red',
    marginTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
