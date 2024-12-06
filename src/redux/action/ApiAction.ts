import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  userLogin: ['payload'],
  
});
export const CommonTypes = Types;
export const CommonActions = Creators;
