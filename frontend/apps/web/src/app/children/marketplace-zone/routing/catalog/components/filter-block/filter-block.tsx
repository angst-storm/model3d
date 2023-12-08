import styles from './filter-block.module.css'

export interface IFilterBlockProps {
    className?: string
}

export function FilterBlock(props: IFilterBlockProps) {
    return <div className={`${styles['filter-layout']} ${props.className ?? ''}`}>
        ssfsfas
    </div>
}
