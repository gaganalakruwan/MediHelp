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

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  filterIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#CCF4F3',
  },
  separatorLine: {
    height: 2,
    backgroundColor: '#D3D3D3',
    marginVertical: 15,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusSquare: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 5,
  },
  statusLabel: {
    color: '#000',
    fontWeight: '400',
    fontSize: 13,
  },
});
