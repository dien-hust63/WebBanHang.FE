export default class BasePagingParam {
    constructor (PageIndex, PageSize, listFilter, listOderBy, LayoutCode) {
        this.PageIndex = PageIndex;
        this.PageSize = PageSize;
        this.listFilter = listFilter;
        this.listOderBy = listOderBy;
        this.LayoutCode = LayoutCode;
    }
}
