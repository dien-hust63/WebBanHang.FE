import BaseService from "./base-service/base.service";
import axios from 'axios'
class OrderService extends BaseService{
  constructor() {
    super();
    this.controller = "Order"
  }
  insertOrderDetail(param){
    return axios
      .post(`${this.apiURL}/${this.controller}/insertOrderDetail`, param);
  }
}
export default new OrderService();