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
    marginTop: 20,
  },
  flatListContainer: {
    marginTop: 20,
  },
  noOutcomesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 50,
  },
  error: {
    color: 'red',
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
