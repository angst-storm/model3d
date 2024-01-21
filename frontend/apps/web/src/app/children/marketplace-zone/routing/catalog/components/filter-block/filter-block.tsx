import styles from './filter-block.module.css'
import {useFilterListQuery} from "@storage";
import {FilterPicker} from "../filter-picker/filter-picker";

export interface IFilterBlockProps {
    className?: string
}

export function FilterBlock(props: IFilterBlockProps) {
    const filtersRequest = useFilterListQuery()

    return <div className={`${styles['filter-layout']} ${props.className ?? ''}`}>
        {
            filtersRequest.currentData && <div className={`${styles['filter-list']}`}>
                <FilterPicker filterArray={filtersRequest.currentData.formats} filterTitle={'Формат'}></FilterPicker>
                <FilterPicker filterArray={filtersRequest.currentData.renders} filterTitle={'Render'}></FilterPicker>
                <FilterPicker filterArray={filtersRequest.currentData.styles} filterTitle={'Стиль'}></FilterPicker>
                <FilterPicker filterArray={filtersRequest.currentData.forms} filterTitle={'Форма'}></FilterPicker>
                <FilterPicker filterArray={filtersRequest.currentData.materials} filterTitle={'Материал'}></FilterPicker>
            </div>
        }
    </div>
}
