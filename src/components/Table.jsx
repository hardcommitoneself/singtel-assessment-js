import React, { useEffect } from "react"
import {
    useSortBy,
    useTable,
    useRowSelect,
} from "react-table"
import {
    TfiArrowsVertical,
    TfiArrowDown,
    TfiArrowUp
} from "react-icons/tfi"
import Checkbox from "./Checkbox"
import Radio from "./Radio"

export const useCheckbox = (hooks) => {
    hooks.visibleColumns.push(columns => [
        {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns
    ])
}

export const useRadio = (hooks) => {
    hooks.visibleColumns.push(columns => [
        {
            id: 'radio',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
                <Radio hidden onClick={() => {}} {...getToggleAllRowsSelectedProps()} />
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row, toggleAllRowsSelected, toggleRowSelected }) => (
                <Radio onClick={() => {
                    toggleAllRowsSelected(false);
                    toggleRowSelected(row.id, !row.getToggleRowSelectedProps().checked)
                }} {...row.getToggleRowSelectedProps()} />
            ),
        },
        ...columns
    ])
}

export function Table({ columns, data, showCheckbox = false, showRadio = false }) {
    const customHooks = []

    if(showCheckbox) {
        customHooks.push(useCheckbox)
    }

    if(showRadio) {
        customHooks.push(useRadio)
    }

    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        setHiddenColumns,
        rows,
        headerGroups,
    } = useTable(
        {
            columns,
            data,
            autoResetSelectedRows: false,
            initialState: { hiddenColumns: [] }
        },
        useSortBy,
        useRowSelect,
        ...customHooks
    )

    useEffect(() => {
        setHiddenColumns(columns.filter(column => column.show !== undefined && !column.show).map(column => column.accessor))
    }, [columns, setHiddenColumns])

    return (
        <table className="w-full overflow-hidden !leading-7 rounded-lg shadow-md md:rounded-2xl sm:text-base md:text-lg lg:text-xl" {...getTableProps()}>
            <thead className="bg-[#F7F7F7] font-bold">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}> 
                        {headerGroup.headers.map((header) => {
                            return (
                                <td
                                    className="px-4 py-2 md:p-6"
                                    {...header.getHeaderProps()}
                                    onClick={() => header.canSort && header.toggleSortBy(!header.isSortedDesc)}
                                >
                                    <div className="flex items-center gap-2.5">
                                        {header.render('Header')}
                                        {/* sort icon */}
                                        {header.canSort && (
                                            <div className="flex font-normal items-center justify-center rounded-full w-7 h-7 md:w-14 md:h-14 cursor-pointer hover:bg-[#DEDAFA]/50">
                                                {!header.isSorted ? <TfiArrowsVertical size={12} /> : header.isSortedDesc ? <TfiArrowUp size={12} /> : <TfiArrowDown size={12} />}
                                            </div>
                                        )}
                                    </div>
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </thead>

            <tbody className="relative before:absolute before:w-4 after:w-4 md:before:w-6 before:h-full after:absolute after:right-0 after:top-0 md:after:w-6 after:h-full after:bg-white before:bg-white px-6 divide-y divide-[#E1E1E1]" {...getTableBodyProps()}>
                {rows.map((r, rIndex) => {
                    prepareRow(r)
                    
                    return (
                        <tr className={r.isSelected ? 'bg-[#EFEDFD] z-10 relative' : ''} {...r.getRowProps()}>
                            {r.cells.map((c, cIndex) => (
                                <td
                                    className="px-4 py-2 md:p-6"
                                    {...c.getCellProps()}
                                >
                                    <div className="flex">
                                        {c.render('Cell')}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}