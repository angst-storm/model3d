export interface IPaginationResponseModel<T> {
    count: number,
    next: number | null,
    previous: number | null,
    results: T[]
}
