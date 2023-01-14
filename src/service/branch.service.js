import BaseService from "./base-service/base.service";

class BranchService extends BaseService{
  constructor() {
    super();
    this.controller = "Branch"
  }
}

export default new BranchService();