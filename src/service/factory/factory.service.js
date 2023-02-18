import RoleService from '../role.service';
import ProductCategoryService from '../productcategory.service';
import ProductService from '../product.service';
import BranchService from '../branch.service';
import EmployeeService from '../employee.service';
import LocationService from '../location.service';
import ModuleService from '../module.service';
import AzureService from '../azure.service';
const serviceList = {
    branchService: BranchService,
    roleService: RoleService,
    employeeService: EmployeeService,
    productcategoryService: ProductCategoryService,
    productService: ProductService,
    locationService:LocationService,
    moduleService:ModuleService,
    azureService:AzureService,
}
export const FactoryService = {
    get: name => serviceList[name]
}