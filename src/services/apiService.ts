import {getPhotos, getUsers,getAllComments,getAllPosts} from 'constant/api';
import httpService from './httpService';

export default class ApiService {
  static getAllmages = () => {
    return httpService.get(getPhotos);
  };
  static getAllUsers = () => {
    return httpService.get(getUsers);
  };
  static getAllPosts = () => {
    return httpService.get(getAllPosts);
  };
  static getAllComments = () => {
    return httpService.get(getAllComments);
  };
}
