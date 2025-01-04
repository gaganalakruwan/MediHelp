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

  image: {
    width: 160,
    height: 200,
    borderRadius: 20,
    marginRight: 20,
  },

  selectedName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 20,
    flexWrap: 'wrap', // Ensures long text wraps to the next line
  },

  imageContainer: {
    flexDirection: 'row',
    marginBottom: 25, // Adds space between name and below content
  },
});
