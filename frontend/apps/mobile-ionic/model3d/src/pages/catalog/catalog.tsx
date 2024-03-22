import {IM3dSearchBarProps, M3dButton, M3dSearchBar} from "@model3d/controls";
import {FilterBlock} from "./components/filter-block/filter-block";
import './catalog.css';
import {useEffect} from "react";
import {useLazyProductsQuery} from "@storage";
import {ProductTable} from "./components/product-table/product-table";
import {PaginationBlock} from "./components/pagination-block/pagination-block";
import {IFiltersValueModel} from "./models/filters-value.model";
import {IProductListParamsModel} from "../../storage/server/product/models/params/product-list.params-model";
import React from "react";

export function Catalog() {
    const searchBarSettings: IM3dSearchBarProps = {
        placeholder: 'Поиск по моделям',
        searchIcon: 'search',
        onSearch: (searchValue: string) => {
            searchProducts(searchValue)
        }
    }

    const lastRequestState = {
        activeSearchValue: '',
        activeFilters: {
            format: [] as string[],
            render: [] as string[],
            style: [] as string[],
            colors: [] as string[],
            material: [] as string[],
            form: [] as string[],
            tags: [] as string[],
        },
        itemsBefore: 0,
        itemsOnPage: 30
    };

    function prepareFilters(filters: IFiltersValueModel): any {
        function prepareFilterArray(array: {value: boolean, id: string}[]) {
            return array.filter((filter) => filter.value).map((filter) => filter.id.toString())
        }

        return {
            render: prepareFilterArray(filters.render),
            style: prepareFilterArray(filters.style),
            // colors: prepareFilterArray(filters.color),
            material: prepareFilterArray(filters.material),
            form: prepareFilterArray(filters.form),
            format: prepareFilterArray(filters.format),
            // tags: prepareFilterArray(filters.tags),
        }
    }

    function filterProducts(filters: IFiltersValueModel) {
        lastRequestState.activeFilters = prepareFilters(filters);
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

    function getParamsModel(): IProductListParamsModel {
        const requestParams = {
            offset: lastRequestState.itemsBefore,
            limit: lastRequestState.itemsOnPage,
        } as IProductListParamsModel

        if (lastRequestState.activeSearchValue) {
            requestParams.search = lastRequestState.activeSearchValue
        }

        if (lastRequestState.activeFilters.format.length) {
            requestParams.formats = lastRequestState.activeFilters.format
        }

        if (lastRequestState.activeFilters.form.length) {
            requestParams.form = lastRequestState.activeFilters.form
        }

        if (lastRequestState.activeFilters.style.length) {
            requestParams.style = lastRequestState.activeFilters.style
        }

        if (lastRequestState.activeFilters.material.length) {
            requestParams.materials = lastRequestState.activeFilters.material
        }

        if (lastRequestState.activeFilters.render.length) {
            requestParams.render = lastRequestState.activeFilters.render
        }

        return requestParams;
    }

    function reFetchProducts() {
        productsTrigger(getParamsModel())
    }

    useEffect(() => {
        reFetchProducts()
    }, []);

    return <div className={'catalog'}>
            <M3dSearchBar className={'main-search-bar'} {...searchBarSettings}></M3dSearchBar>
            {/*<M3dButton className={'model-load-button'} type={'outlined'}>*/}
            {/*    Загрузить модель*/}
            {/*</M3dButton>*/}
            {/*<FilterBlock className={'filter-block'} onFiltersApply={filterProducts}></FilterBlock>*/}
            <div className={'product-table-block'}>
                <ProductTable products={productsResult.currentData?.results ?? []}></ProductTable>
                <PaginationBlock className={'pagination-row'} pageCount={2} onPageChange={getNewPage}></PaginationBlock>
            </div>
        </div>
}
