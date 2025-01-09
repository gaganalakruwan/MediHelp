import {
  loginUrl,
  insertPlanUrl,
  getItCategoryUrl,
  getItGroupUrl,
  getItTypeUrl,
  getFeedbackUrl,
  getItLocationUrl,
  refreshTokenUrl
} from 'constant/api';
import httpService from './httpService';

export default class ApiService {
  static userAuth = (data: any) => {
    if (data) {
      return httpService.post(loginUrl, data);
    }
    return Promise.reject(new Error('Error'));
  };
  static insertMonthPlan = (data:any) => {
    return httpService.post(insertPlanUrl,data);
  };
  static getItCategory = () => {
    return httpService.post(getItCategoryUrl);
  };
  static getItGroup = () => {
    return httpService.post(getItGroupUrl);
  };
  static getItType = () => {
    return httpService.post(getItTypeUrl);
  };
  static getFeedback = () => {
    return httpService.post(getFeedbackUrl);
  };
  static getItLocation = () => {
    return httpService.post(getItLocationUrl);
  };
  static refreshToken = (data:any) => {
    console.log(">>>>>>>>>>>>",data)
    return httpService.post(refreshTokenUrl,data);
  };
}
