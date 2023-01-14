import RoleService from '../role.service';
import BranchService from '../branch.service';
import EmployeeService from '../employee.service';
const serviceList = {
    branchService: BranchService,
    roleService: RoleService,
    employeeService: EmployeeService
}
export const FactoryService = {
    get: name => serviceList[name]
}