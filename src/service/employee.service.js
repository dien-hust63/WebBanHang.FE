import BaseService from "./base-service/base.service";

class EmployeeService extends BaseService{
  constructor() {
    super();
    this.controller = "Employee"
  }
}

export default new EmployeeService();