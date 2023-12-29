import {M3DCheckbox} from "@model3d/controls";
import {FieldValues, useFieldArray} from "react-hook-form";
import {
    IFilterBaseResponseModel
} from "../../../../../../../storage/server/product/models/response/filter-base.response-model";
import {useEffect} from "react";
import styles from './filter-picker.module.css'
import {Control} from "react-hook-form/dist/types";

export interface IFilterPickerProps {
    filterArray: IFilterBaseResponseModel[],
    filterTitle: string,
    control: Control<FieldValues, any>,
    controlName: string
}

export function FilterPicker(props: IFilterPickerProps) {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control: props.control,
        name: props.controlName,
    });

    useEffect(() => {
        remove()

        props.filterArray.forEach((value) => {
            append({ value: false, id: value.id })
        });

    }, [props]);


    return <div className={styles['filter-block']}>
        <div className={`${styles['filter-title']} M3-label-l`}>{props.filterTitle}</div>
        <ul className={styles['filter-list']}>
            {
                fields.map((field, index) => {
                    return <li className={styles['filter-option']}>
                        {
                            <>
                                {/*<input type={'checkbox'} key={field.id} {...props.control} {...props.register(`${props.controlName}.${index}.value` as const)}></input>*/}
                                <M3DCheckbox key={field.id} label={props.filterArray[index].name} format={'small'} control={props.control} name={`${props.controlName}.${index}.value`}></M3DCheckbox>
                                {/*{props.filterArray[index].name}*/}
                            </>
                        }
                    </li>
                })
            }
        </ul>
    </div>
}
