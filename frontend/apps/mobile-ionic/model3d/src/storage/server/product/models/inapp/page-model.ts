export interface IPageModel<T> {
    allCount: number,
    next: number | null,
    previous: number | null,
    results: T[]
}
