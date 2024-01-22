import {useEffect, useState} from "react";
import styles from './pagination-block.module.css'
import React from "react";

export interface IPaginationBlockProps {
    className?: string,
    onPageChange?: (pageNumber: number) => void,
    pageCount: number
}

export function PaginationBlock(props: IPaginationBlockProps) {
    const countVariants = [30, 60, 100]
    const maxViewed = 7;

    const [paginationList, setPaginationList] = useState([] as number[]);
    const [currentPage, setCurrentPage] = useState(1);
    const [countOnPage, setCountOnPage] = useState(30);

    useEffect(() => {
        setPaginationList(getList())
    }, []);

    function inBoundsOf(number: number) {
        return number >= 1 && number <= props.pageCount
    }

    function getNextToRight(array: number[]): number {
        return array[array.length - 1] + 1;
    }

    function getNextToLeft(array: number[]) {
        return array[0] + -1;
    }

    function tryAddToRightElseToLeft(array: number[], index: number): number[] {
        if (inBoundsOf(currentPage + index)) {
            array.push(getNextToRight(array))
        } else {
            const nextToLeft = getNextToLeft(array);
            if (inBoundsOf(nextToLeft)) {
                array = [nextToLeft].concat(array)
            }
        }

        return array
    }

    function tryAddToLeftElseToRight(array: number[], index: number): number[] {
        if (inBoundsOf(currentPage - index)) {
            array = [getNextToLeft(array)].concat(array)
        } else {
            const nextToRight = getNextToRight(array);
            if (inBoundsOf(nextToRight)) {
                array.push(nextToRight)
            }
        }

        return array
    }

    function getList() {
        let paginationList = [currentPage]

        paginationList = tryAddToRightElseToLeft(paginationList, 1)
        paginationList = tryAddToRightElseToLeft(paginationList, 2)

        paginationList = tryAddToLeftElseToRight(paginationList, 1)
        paginationList = tryAddToLeftElseToRight(paginationList, 2)

        if (currentPage > 3) {
            paginationList = [1, NaN].concat(paginationList)
        }

        if (props.pageCount - currentPage > 2) {
            paginationList = paginationList.concat([NaN, props.pageCount])
        }

        return paginationList
    }

    function setPage(page: number) {
        if (!isNaN(page) && inBoundsOf(page)) {
            setCurrentPage(page)
            setPaginationList(getList())
            props.onPageChange?.(currentPage)
        }
    }

    return <div className={`${props.className} ${styles['pagination-block']}`}>
        <div className={`${styles['ddd']} M3-body-m`}>
            <div className={styles['product-count-block']}>
                Модели {1}-{30} из {2348324}
            </div>
            <div className={styles['on-page-count-block']}>
                На странице
                {
                    countVariants.map((variant) => {
                        return <div className={styles['on-page-count-number']} data-active={countOnPage === variant}>
                            {variant}
                        </div>

                    })
                }
            </div>
        </div>
        <div className={styles['pages-block']}>
            <img src={require('@assets/icons/svg/arrow-left.svg').default} className={styles['pagination-arrow']} onClick={() => setPage(currentPage - 1)}/>
            {
                paginationList.map((value) => {
                    return <div className={`${styles['pagination-number']} M3-body-l`} onClick={() => setPage(value)} data-active={value === currentPage}>
                        {
                            isNaN(value) ? '...' : value
                        }
                    </div>
                })
            }
            <img src={require('@assets/icons/svg/arrow-right.svg').default} className={styles['pagination-arrow']} onClick={() => setPage(currentPage + 1)}/>
        </div>
    </div>
}
