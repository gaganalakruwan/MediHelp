import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    color: colors.iconBlack,
    marginLeft:10
    
  },
  errorText: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    color: colors.buttonRed,
    marginLeft:10
    
  },
  input: {
    width: '100%',
    color: colors.black,
    backgroundColor: colors.lightRed,
    //  paddingHorizontal: 20,
    paddingLeft: 20,
    paddingVertical: 12,
    fontSize: 14,
    lineHeight: 18,
    height: 48,
    paddingTop: 8,
    fontStyle: 'normal',
    borderBottomWidth:2,
    borderBottomColor:colors.seperator
  },

  secureInput: {
    paddingLeft: 45,
  },

  iconWrapper: {
    position: 'absolute',
    top: 0,
    right: 10,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
  leftIconWrapper: {
    position: 'absolute',
    top: 0,
    left: 10,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
  inputWrapper: {position: 'relative', marginTop: 5},
});
