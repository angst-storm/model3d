import './product-table-with-pagination.css';
import {ProductTable} from "../product-table/product-table";

export interface IProductTableWithPaginationProps {
    className?: string
}

export function ProductTableWithPagination(props: IProductTableWithPaginationProps) {
    return <ProductTable className={`${props.className ?? ''}`}></ProductTable>
}
