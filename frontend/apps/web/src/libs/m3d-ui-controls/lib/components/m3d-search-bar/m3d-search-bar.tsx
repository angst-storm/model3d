import {useForm} from "react-hook-form";
import './m3d-search-bar.css';
import {
    IM3dSearchBarValueAccessorProps,
    M3dSearchBarValueAccessor
} from "./comoponents/m3d-search-bar-value-accessor/m3d-search-bar-value-accessor";

export interface IM3dSearchBarProps {
    placeholder?: string
    className?: string,
    leadingIcon?: string,
    trailingIcon?: string,
}

export function M3dSearchBar(props: IM3dSearchBarProps) {
    const {
        formState,
        handleSubmit,
        getValues,
        control
    } = useForm<{ search: string }>()

    const searchControlOptions: IM3dSearchBarValueAccessorProps = {
        name: 'email',
        control: control,
        label: props.placeholder || 'Найти...',
        leadingIcon: props.leadingIcon,
        trailingIcon: props.trailingIcon,
    }

    return <div className={`search-bar ${props.className ?? ''}`}>
        <M3dSearchBarValueAccessor {...searchControlOptions}></M3dSearchBarValueAccessor>
    </div>
}
