import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  authLogin: ['payload'],
  
});
export const CommonTypes = Types;
export const CommonActions = Creators;
