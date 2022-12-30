import RoleService from '../role.service';
const serviceList = {
    roleService: RoleService
}
export const FactoryService = {
    get: name => serviceList[name]
}