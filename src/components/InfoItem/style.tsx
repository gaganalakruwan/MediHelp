import colors from 'constant/colors';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  valueContainer: {
    width: '60%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  titleText: {
    fontSize: 17,
    color: 'black',
    width: 160,
    fontWeight: 'bold',
  },

  valueText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: 5,
    marginRight: 30,
    flexShrink: 1,
  },
});
