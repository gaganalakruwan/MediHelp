import {loginUrl} from 'constant/api';
import httpService from './httpService';

export default class ApiService {

  static userAuth = (data: any) => {
    if (data) {
      console.log('.........>>>>>><<<', data);
      return httpService.post(loginUrl, data);
    }
    return Promise.reject(new Error('Error'));
  };

}
