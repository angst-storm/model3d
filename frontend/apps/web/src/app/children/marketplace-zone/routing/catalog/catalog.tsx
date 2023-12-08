import {IM3dSearchBarProps, M3dButton, M3dSearchBar} from "@model3d/controls";
import {FilterBlock} from "./components/filter-block/filter-block";
import './catalog.css'
import {ProductTableWithPagination} from "./components/product-table-with-pagination/product-table-with-pagination";

export function Catalog() {
    const searchBarSettings: IM3dSearchBarProps = {
        placeholder: 'Поиск по моделям и материалам',
        leadingIcon: 'search'
    }

    return <div className={'grid-container'}>
        <div className={'catalog grid-element'}>
            <M3dSearchBar className={'main-search-bar'} {...searchBarSettings}></M3dSearchBar>
            <M3dButton className={'model-load-button'} type={'outlined'}>
                Загрузить модель
            </M3dButton>
            <FilterBlock className={'filter-block'}></FilterBlock>
            <ProductTableWithPagination className={'product-table-block'}></ProductTableWithPagination>
        </div>
    </div>
}
