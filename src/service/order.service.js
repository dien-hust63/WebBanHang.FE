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

  getOrderDetail(id){
    return axios
      .get(`${this.apiURL}/${this.controller}/getOrderDetail/${id}`);
  }

  updateOrderDetail(param){
    return axios
      .post(`${this.apiURL}/${this.controller}/updateOrderDetail`,param);
  }

  getOrderCodeAuto(){
    return axios
      .get(`${this.apiURL}/${this.controller}/getOrderCodeAuto`);
  }
}
export default new OrderService();