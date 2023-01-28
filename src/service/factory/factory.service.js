import RoleService from '../role.service';
import ProductCategoryService from '../productcategory.service';
import ProductService from '../product.service';
import BranchService from '../branch.service';
import EmployeeService from '../employee.service';
const serviceList = {
    branchService: BranchService,
    roleService: RoleService,
    employeeService: EmployeeService,
    productcategoryService: ProductCategoryService,
    productService: ProductService,
}
export const FactoryService = {
    get: name => serviceList[name]
}