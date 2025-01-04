import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    borderColor: '#CCF4F3',
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: '#CCF4F3',
  },
  selectedCard: {
    borderColor: '#68B8C1',
    borderWidth: 2,
  },
  noTimeCard: {
    justifyContent: 'flex-start',
  },
  leftContent: {
    flex: 2, // Takes more width if no time is present
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },

  location: {
    fontSize: 14,
    color: '#666',
    marginTop: -15,
  },

  client: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  rightContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
});
