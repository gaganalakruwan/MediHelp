import {loginUrl} from 'constant/api';
import httpService from './httpService';

export default class ApiService {
  static userAuth = () => {
    return httpService.get(loginUrl);
  };
 
}
