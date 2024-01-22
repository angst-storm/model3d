import {useForm} from "react-hook-form";
import './m3d-search-bar.css';
import {
    IM3dSearchBarValueAccessorProps,
    M3dSearchBarValueAccessor
} from "./comoponents/m3d-search-bar-value-accessor/m3d-search-bar-value-accessor";

export interface IM3dSearchBarProps {
    placeholder?: string
    className?: string,
    searchIcon?: string,
    onSearch?: (searchValue: string) => void
}

export function M3dSearchBar(props: IM3dSearchBarProps) {
    const {
        formState,
        handleSubmit,
        getValues,
        setValue,
        control
    } = useForm<{ search: string }>()

    const searchControlOptions: IM3dSearchBarValueAccessorProps = {
        name: 'email',
        control: control,
        label: props.placeholder || 'Найти...',
        leadingIcon: props.searchIcon,
        onSearch: props.onSearch,
        onClear: () => { setValue('search', '') }
    }

    return <div className={`search-bar ${props.className ?? ''}`}>
        <M3dSearchBarValueAccessor {...searchControlOptions}></M3dSearchBarValueAccessor>
    </div>
}
