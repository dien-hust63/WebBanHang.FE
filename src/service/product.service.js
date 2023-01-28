import BaseService from "./base-service/base.service";
import axios from 'axios'
class ProductService extends BaseService{
  constructor() {
    super();
    this.controller = "Product"
  }

  /**
   * thêm mới
   * @param {*} param 
   * @returns 
   */
  insertProduct(param) {    
    return axios
      .post(`${this.apiURL}/${this.controller}/insertProduct`, param,{headers: {
        'Content-Type': 'multipart/form-data'
      }});
  }
}



export default new ProductService();