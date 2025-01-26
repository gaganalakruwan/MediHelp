import {
  loginUrl,
  insertPlanUrl,
  getItCategoryUrl,
  getItGroupUrl,
  getItTypeUrl,
  getFeedbackUrl,
  getItLocationUrl,
  refreshTokenUrl,
  getAllMonthlyPlanUrl,
  deletePlanUrl,
  editPlanUrl,
  addFeedbackUrl,
} from 'constant/api';
import httpService from './httpService';

export default class ApiService {
  static userAuth = (data: any) => {
    if (data) {
      return httpService.post(loginUrl, data);
    }
    return Promise.reject(new Error('Error'));
  };
  static insertMonthPlan = (data: any) => {
    console.log(data);
    return httpService.post(insertPlanUrl, data);
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
  static refreshToken = (data: any) => {
    console.log('>>>>>>>>>>>>', data);
    return httpService.post(refreshTokenUrl, data);
  };
  static getNextMonthPlan = () => {
    return httpService.post(getAllMonthlyPlanUrl);
  };
  static editPlan = (data: any) => {
    console.log('>>>>>>>>>>>>', data);
    return httpService.post(editPlanUrl, data);
  };
  static deletePlan = (data: any) => {
    console.log('>>>>>>>>>>>>', data);
    return httpService.post(deletePlanUrl, data);
  };
  static sendFeedback = (data: any) => {
    console.log('>>>>>>>>>>>>', data);
    return httpService.post(addFeedbackUrl, data);
  };
}
