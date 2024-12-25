import colors from 'constant/colors';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 16,
  },
  error: {
    color: 'red',
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
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
});
