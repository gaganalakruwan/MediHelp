import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    borderColor: '#CCF4F3',
    borderRadius: 15,
    marginBottom: 14,
    backgroundColor: '#CCF4F3',
    justifyContent: 'space-between', // Ensures the left and right sections are spaced
  },
  selectedCard: {
    borderColor: '#68B8C1',
    borderWidth: 2,
  },
  noTimeCard: {
    justifyContent: 'flex-start',
  },
  leftContent: {
    flex: 2, // Adjust to take more space for date
    justifyContent: 'center',
  },
  titles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distributes buttons evenly
    alignItems: 'center',
  },
  buttonAdd: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0b8fac',
    borderRadius: 25,
    marginHorizontal: 5,
  },

  buttonEdit: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#28c387',
    borderRadius: 25,
    marginHorizontal: 5,
  },
  buttonDelete: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f13737',
    borderRadius: 25,
    marginHorizontal: 5,
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
