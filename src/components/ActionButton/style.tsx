import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.buttonRed,
    borderRadius: 2,
    height: getScaleNumber(44),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleText: {
    color: colors.white,
    lineHeight: 20,
    marginHorizontal: 5,
  },
});
