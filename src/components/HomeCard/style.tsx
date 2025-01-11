import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    borderColor: '#CCF4F3',
    borderRadius: 15,
    marginBottom: 14,
    backgroundColor: '#CCF4F3',
    justifyContent: 'space-between',
  },
  disabledCard: {
    backgroundColor: '#CCF4F3', // Optionally dim the background for disabled
  },

  leftContent: {
    flex: 2,
    justifyContent: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    textAlign: 'center',
  },
});
