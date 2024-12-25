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

  noOutcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOutcomesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 50,
  },

  flatListContainer: {
    marginTop: 20,
  },
});
