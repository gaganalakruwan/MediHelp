import colors from 'constant/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  innerContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },

  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  servicesTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  seeAllButton: {
    fontSize: 18,
    color: '#3a3a3a',
    marginTop: 8,
  },

  search: {
    marginTop: 35,
  },
});
