export interface ResultadoPesquisa<T> {
    data?: T[];
    lastPage?: number;
    pageNumber?: number;
    pageSize?: number;
    totalRows?: number;
}
