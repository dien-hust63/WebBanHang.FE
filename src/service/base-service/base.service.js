import axios from 'axios';
import config from "../../config/config.dev.json";
const API_URL = `${config.BASE_URL_API}`;
export default class BaseService {
  constructor() {
    this.controller = null
  }

  /**
   * Lấy thông tin paging
   * @param {*} param 
   * @returns 
   */
  getPagingData(param) {
    return axios
      .post(`${API_URL}/${this.controller}/paging`, param);
  }
}