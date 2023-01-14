import BaseService from "./base-service/base.service";

class RoleService extends BaseService{
  constructor() {
    super();
    this.controller = "Role"
  }
}

export default new RoleService();