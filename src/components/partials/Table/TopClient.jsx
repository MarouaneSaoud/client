import React, {useState, useMemo, useEffect} from "react";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import CompanyServices from "@/services/company.services.js";
import getEmail from "@/services/auth/auth.email.js";

const COLUMNS = [
    {
        Header: "Numéro de série",
        accessor: "id",
        Cell: (row) => {

            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: "Nom",
        accessor: "name",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },

    {
        Header: "Email",
        accessor: "email",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },

];

const Top5Clients= () => {
    const email = getEmail();
    const [Top5Clients, setTop5Clients] = useState([]);
    async function getTop5Client() {
        try {
            let result = await CompanyServices.top5Client(email) ;
            setTop5Clients(result.data);
        } catch (error) {
        }
    }
    useEffect(()=>{
        getTop5Client()
    },[])
    const columns = useMemo(() => COLUMNS, []);
    const data = Top5Clients;

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 6,
            },
        },

        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        prepareRow,
    } = tableInstance;

    const { pageIndex, pageSize } = state;

    return (
        <>
            <div>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps}
                            >
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(
                                                    column.getSortByToggleProps()
                                                )}
                                                scope="col"
                                                className=" table-th "
                                            >
                                                {column.render("Header")}
                                                <span>
                            {column.isSorted
                                ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                : ""}
                          </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                    {...getTableBodyProps}
                                >
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td {...cell.getCellProps()} className="table-td">
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Top5Clients;
