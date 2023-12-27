import {IM3DCheckboxProps, M3DCheckbox} from "@model3d/controls";
import {useFieldArray, useForm} from "react-hook-form";
import {
    IFilterBaseResponseModel
} from "../../../../../../../storage/server/product/models/response/filter-base.response-model";
import {useEffect, useState} from "react";
import styles from './filter-picker.module.css'

export interface IFilterPickerProps {
    filterArray: IFilterBaseResponseModel[],
    filterTitle: string
}

export function FilterPicker(props: IFilterPickerProps) {
    const { control, register } = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "test", // unique name for your Field Array
    });

    const [filterProperties, setFilterProperties] = useState<Map<number, IM3DCheckboxProps>>(new Map())

    useEffect(() => {
        props.filterArray.forEach((value) => {
            append(value.id.toString())
        })

        setFilterProperties(new Map(
            props.filterArray.map((filter) => {
                return [
                    filter.id,
                    {
                        control: control,
                        name: filter.id.toString(),
                        label: filter.name,
                        format: 'small'
                    } as IM3DCheckboxProps
                ]
            })
        ))
    }, []);

    return <div className={styles['filter-block']}>
        <div className={`${styles['filter-title']} M3-label-l`}>{props.filterTitle}</div>
        <ul className={styles['filter-list']}>
            {
                props.filterArray && props.filterArray.map((format) => {
                    const props: IM3DCheckboxProps = filterProperties.get(format.id)!

                    return <li className={styles['filter-option']}>
                        {
                            props && <M3DCheckbox key={format.id} {...props}></M3DCheckbox>
                        }
                    </li>
                })
            }
        </ul>
    </div>
}
