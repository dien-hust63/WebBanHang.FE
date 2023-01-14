export default class BasePagingParam {
    constructor (PageIndex, PageSize, ListFilter,FilterFormula ,ListOderBy, TableName) {
        this.PageIndex = PageIndex;
        this.PageSize = PageSize;
        this.ListFilter = ListFilter;
        this.ListOderBy = ListOderBy;
        this.FilterFormula = FilterFormula;
        this.TableName = TableName;
    }
}
