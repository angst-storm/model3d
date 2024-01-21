import styles from './filter-block.module.css'
import {useFilterListQuery} from "@storage";
import {FilterPicker, IFilterPickerProps} from "../filter-picker/filter-picker";
import {M3dButton} from "@model3d/controls";
import {useForm} from "react-hook-form";
import {IFiltersValueModel} from "../../models/filters-value.model";

export interface IFilterBlockProps {
    className?: string,
    onFiltersApply?: (filtersValue: IFiltersValueModel) => void
}

export function FilterBlock(props: IFilterBlockProps) {
    const filtersRequest = useFilterListQuery()
    const { control, register, getValues } = useForm();

    const formatsProps: Omit<IFilterPickerProps, 'filterArray'> = {
        filterTitle: 'Формат',
        controlName: 'format',
        control: control
    }

    const renderProps: Omit<IFilterPickerProps, 'filterArray'> = {
        filterTitle: 'Render',
        controlName: 'render',
        control: control
    }

    const styleProps: Omit<IFilterPickerProps, 'filterArray'> = {
        filterTitle: 'Стиль',
        controlName: 'style',
        control: control
    }

    const formProps: Omit<IFilterPickerProps, 'filterArray'> = {
        filterTitle: 'Форма',
        controlName: 'form',
        control: control
    }

    const materialProps: Omit<IFilterPickerProps, 'filterArray'> = {
        filterTitle: 'Материал',
        controlName: 'material',
        control: control
    }

    function updateByFilters() {
        props.onFiltersApply?.(getValues() as IFiltersValueModel)
        console.log(getValues())
    }

    return <div className={`${styles['filter-layout']} ${props.className ?? ''}`}>
        {
            filtersRequest.currentData && <div className={`${styles['filter-list']}`}>
                <FilterPicker filterArray={filtersRequest.currentData.formats} {...formatsProps}></FilterPicker>
                <FilterPicker filterArray={filtersRequest.currentData.renders} {...renderProps}></FilterPicker>
                <FilterPicker filterArray={filtersRequest.currentData.styles} {...styleProps}></FilterPicker>
                <FilterPicker filterArray={filtersRequest.currentData.forms} {...formProps}></FilterPicker>
                <FilterPicker filterArray={filtersRequest.currentData.materials} {...materialProps}></FilterPicker>
                <M3dButton className={`${styles['submit-button']}`} onClick={updateByFilters} type={'outlined'}>Применить</M3dButton>
            </div>
        }
    </div>
}
