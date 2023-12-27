import {IM3dSearchBarProps, M3dButton, M3dSearchBar} from "@model3d/controls";
import {FilterBlock} from "./components/filter-block/filter-block";
import './catalog.css';
import {useEffect} from "react";
import {useLazyProductsQuery} from "@storage";
import {IProductTableProps, ProductTable} from "./components/product-table/product-table";
import {PaginationBlock} from "./components/pagination-block/pagination-block";

export function Catalog() {
    const searchBarSettings: IM3dSearchBarProps = {
        placeholder: 'Поиск по моделям и материалам',
        searchIcon: 'search',
        onSearch: (searchValue: string) => {
            searchProducts(searchValue)
        }
    }

    const lastRequestState = {
        activeSearchValue: '',
        activeFilters: {
            formats: Array<undefined>,
            render: Array<undefined>,
            style: Array<undefined>,
            colors: Array<undefined>,
            materials: Array<undefined>,
            form: Array<undefined>,
            tags: Array<undefined>,
        },
        itemsBefore: 0,
        itemsOnPage: 30
    };

    function filterProducts(filters: any) {
        lastRequestState.activeFilters = filters;
        lastRequestState.itemsBefore = 0;

        reFetchProducts()
    }

    function searchProducts(searchValue: string) {
        // lastRequestState.activeFilters = {};
        lastRequestState.itemsBefore = 0;
        lastRequestState.activeSearchValue = searchValue;

        reFetchProducts()
    }

    function getNewPage(pageNumber: number) {
        lastRequestState.itemsBefore = lastRequestState.itemsOnPage * (pageNumber - 1)

        reFetchProducts()
    }

    function clear() {
        // lastRequestState.activeFilters = {};
        lastRequestState.itemsBefore = 0;
        lastRequestState.activeSearchValue = '';

        reFetchProducts()
    }

    const [
        productsTrigger,
        productsResult,
        productsPromise,
    ] = useLazyProductsQuery();

    function reFetchProducts() {
        productsTrigger({
            offset: lastRequestState.itemsBefore,
            limit: lastRequestState.itemsOnPage,
            search: lastRequestState.activeSearchValue ?? undefined,
        })
    }

    useEffect(() => {
        reFetchProducts()
    }, []);

    return <div className={'grid-container'}>
        <div className={'catalog grid-element'}>
            <M3dSearchBar className={'main-search-bar'} {...searchBarSettings}></M3dSearchBar>
            <M3dButton className={'model-load-button'} type={'outlined'}>
                Загрузить модель
            </M3dButton>
            <FilterBlock className={'filter-block'}></FilterBlock>
            <div className={'product-table-block'}>
                <ProductTable products={productsResult.currentData?.results ?? []}></ProductTable>
                <PaginationBlock className={'pagination-row'} pageCount={2} onPageChange={getNewPage}></PaginationBlock>
            </div>
        </div>
    </div>
}
