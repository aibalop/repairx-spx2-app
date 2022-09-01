export interface IPaginationData<T> {
    data: Array<T>;
    count: number;
    limit: number;
    page: number;
    nextPage: number;
    prevPage: number;
    pagingCounter: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}
