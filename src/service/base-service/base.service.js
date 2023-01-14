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

  /**
   * Lấy toàn bộ dữ liệu
   * @param {*} param 
   * @returns 
   */
  getAllData() {
    return axios
      .get(`${API_URL}/${this.controller}`);
  }

  /**
   * thêm mới
   * @param {*} param 
   * @returns 
   */
  insertData(param) {
    return axios
      .post(`${API_URL}/${this.controller}`, param);
  }

  /**
   * cập nhật theo id
   * @param {*} param 
   * @returns 
   */
  updateData(param, id) {
    return axios
      .put(`${API_URL}/${this.controller}/${id}`, param);
  }

  /**
   * xóa nhiều theo listID
   * @param {} param 
   * @returns 
   */
  deleteMultiple(param){
    return axios
      .post(`${API_URL}/${this.controller}/delete/multiple`, param);
  }
}