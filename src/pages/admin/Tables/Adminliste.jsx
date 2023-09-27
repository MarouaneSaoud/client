import React, { useState, useMemo, useEffect } from "react";
import Card from "../../../components/ui/Card";
import Icon from "../../../components/ui/Icon";
import Tooltip from "../../../components/ui/Tooltip";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import GlobalFilter from "../../table/react-tables/GlobalFilter";
import { useNavigate } from "react-router-dom";
import whoAuth from "../../../services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import AuthService from "../../../services/auth.services";
import AuthRole from "@/services/auth/auth.role.js";

const Adminliste = ({ title = "Administrateurs" }) => {

    const COLUMNS = [
        {
            Header: "Id",
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
            accessor: "username",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Statut",
            accessor: "actived",
            Cell: (row) => {
                const statusText = row?.cell?.value ? "actif" : "inactif";
                return (
                    <span className="block w-full">
                        <span
                            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                                row?.cell?.value === true
                                    ? "text-success-500 bg-success-500"
                                    : "text-warning-500 bg-warning-500"
                            }`}
                        >
                            {statusText}
                        </span>
                    </span>
                );
            },
        },
        {
            Header: "Rôle",
            accessor: "roles",
            Cell: (row) => {
                const roles = row?.cell?.value;
                if (roles && roles.length > 0) {
                    return (
                        <ul>
                            {roles.map((role) => (
                                <li key={role.id}>{role.roleName}</li>
                            ))}
                        </ul>
                    );
                } else {
                    return <span>Pas de rôles</span>;
                }
            },
        },
        {
            Header: "Action",
            accessor: "action",
            Cell: (row) => {
                const status = row.cell.row.original.actived;
                const id = row.cell.row.original.id;
                return (
                    <div className="flex space-x-3 rtl:space-x-reverse">
                        {status === true && (
                            <Tooltip content="Désactiver" placement="top" arrow animation="shift-away">
                                <button className="action-btn text-red-600" type="button" onClick={() => {
                                    handleDisabled(
                                        id
                                    )
                                }}>
                                    <Icon icon="heroicons:x-mark" />
                                </button>
                            </Tooltip>
                        )}
                        {status === false && (
                            <Tooltip content="Activer" placement="top" arrow animation="shift-away">
                                <button className="action-btn text-green-600" type="button"
                                        onClick={() => handleUnable(id)}>
                                    <Icon icon="heroicons:check-circle" />
                                </button>
                            </Tooltip>
                        )}
                        <Tooltip
                            content="Supprimer"
                            placement="top"
                            arrow
                            animation="shift-away"
                            theme="danger"
                        >
                            <button className="action-btn" type="button" onClick={() => deleteUser(row)}>
                                <Icon icon="heroicons:trash" />
                            </button>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const role = AuthRole()

    useEffect(() => {
        const checkUserAndToken = () => {
            if (whoAuth.isCurrentUserManager() || whoAuth.isCurrentUserClient() || role === 'ADMIN') {
                navigate('/403');
            }

            const storedToken = localStorage.getItem('accessToken');

            if (storedToken) {
                const isExpired = authTokenExpired;

                if (isExpired) {
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        checkUserAndToken();
        const intervalId = setInterval(checkUserAndToken, 2 * 60 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const [user, setUser] = useState([]);
    async function getUsers() {
        try {
            let result = await AuthService.allUsersAdmin()
            setUser(result.data);
        } catch (error) {
        }
    }

    async function handleDisabled(id) {
        try {
            let result = await AuthService.disableUser(id);
            if (result.data) {
                getUsers()
            }
        } catch (error) {
        }
    }

    async function handleUnable(id) {
        try {
            let result = await AuthService.unableUser(id);
            if (result.data) {
                getUsers()
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const columns = useMemo(() => COLUMNS, []);
    const data = user;

    async function deleteUser(row) {
        try {
            const id = row.cell.row.original.id;
            await AuthService.deleteUser(id)
            getUsers();
        } catch (error) {
        }
    }

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                ...columns,
            ]);
        }
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

    const { globalFilter, pageIndex, pageSize } = state;
    const navigate = useNavigate();
    useEffect(() => {
        if (whoAuth.isCurrentUserManager()) {
            navigate("/403");
        }
    })

    return (
        <>
            <Card>
                <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">{title}</h4>
                    <div>
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    </div>
                </div>
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
                <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            className="form-control py-2 w-max"
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                        >
                            {[10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Afficher {pageSize}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
                            <span>
                {pageIndex + 1} de {pageOptions.length}
              </span>
            </span>
                    </div>
                    <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${
                                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons:chevron-double-left-solid" />
                            </button>
                        </li>
                        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${
                                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                Préc
                            </button>
                        </li>
                        {pageOptions.map((page, pageIdx) => (
                            <li key={pageIdx}>
                                <button
                                    href="#"
                                    aria-current="page"
                                    className={` ${
                                        pageIdx === pageIndex
                                            ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                            : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                    onClick={() => gotoPage(pageIdx)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${
                                    !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                Suiv
                            </button>
                        </li>
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                                className={` ${
                                    !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                <Icon icon="heroicons:chevron-double-right-solid" />
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Fin */}
            </Card>
        </>
    );
};

export default Adminliste;
