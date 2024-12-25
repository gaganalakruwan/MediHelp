import {StyleSheet} from 'react-native';
import {getScaleNumber} from '../../utils/refDimention';
import colors from 'constant/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  titleText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 24,
  },
  searchContainer: {
    backgroundColor: colors.black,
    borderRadius: 100,
    width: getScaleNumber(22),
    height: getScaleNumber(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    backgroundColor: colors.black,
    borderRadius: 100,
    width: getScaleNumber(22),
    height: getScaleNumber(22),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  settingsContainer: {
    backgroundColor: colors.black,
    borderRadius: 100,
    width: getScaleNumber(22),
    height: getScaleNumber(22),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});
