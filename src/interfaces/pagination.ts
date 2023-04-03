export interface Pagination {
    nbrResults: number;
    pageNbr: number;
}

export interface ResultWithNbr<T> {
    total: number;
    data: T[];
}
