import React, { useState, useMemo , useEffect  } from "react";
import Papa from "papaparse"
import Card from "../../../components/ui/Card";
import {useNavigate} from "react-router-dom";
import Icon from "../../../components/ui/Icon";
import Tooltip from "../../../components/ui/Tooltip";
import Button from "../../../components/ui/Button";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import GlobalFilter from "../../table/react-tables/GlobalFilter";
import DeviceService from "../../../services/device.services";
import CompanyAllocate from "./companyAllocate.jsx"
import whoAuth from "@/services/auth/auth.who.js";
import authTokenExpired from "@/services/auth/auth.token.expired.js";
import AuthService from "../../../services/auth.services";




const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;
        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input
                    type="checkbox"
                    ref={resolvedRef}
                    {...rest}
                    className="table-checkbox"
                />
            </>
        );
    }
);
const DevicesList = ({ title = "Devices" }) => {
    const [showMyModal,setShowMyModal]=useState(false)
    const navigate=useNavigate();

    useEffect(() => {
        const checkUserAndToken = () => {

            if (whoAuth.isCurrentUserManager()) {
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
    const handleOnClose =()=>{
                                    setShowMyModal(false)
                                    getDevices()
    }
    const [selectedImei, setSelectedImei] = useState(null);

    const handleOpenReferenceForm = (imei) => {
        setSelectedImei(imei);
        setShowMyModal(true )
    };



    const COLUMNS = [
        {
            Header: "Id",
            accessor: "id",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "IMEI",
            accessor: "imei",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "status",
            accessor: "statusDevice",
            Cell: (row) => {
                return (
                    <span className="block w-full">
          <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                  row?.cell?.value === "ONLINE"
                      ? "text-success-500 bg-success-500"
                      : ""
              } 
            ${
                  row?.cell?.value === "OFFLINE"
                      ? "text-warning-500 bg-warning-500"
                      : ""
              }
            ${
                  row?.cell?.value === "INACTIF"
                      ? "text-danger-500 bg-danger-500"
                      : ""
              }
            
             `}
          >
            {row?.cell?.value}
          </span>
        </span>
                );
            },
        },

        {
            Header: "Firmware",
            accessor: "firmware",
            Cell: (row) => {
                return <span><span> {row?.cell?.value !== null ? row?.cell?.value : "--"}</span></span>;
            },
        },
        {
            Header: "Configuration",
            accessor: "configuration",
            Cell: (row) => {
                return <span> {row?.cell?.value !== null ? row?.cell?.value : "--"}</span>;
            },
        },
        {
            Header: "Company",
            accessor: "company",
            Cell: (row) => {
                return (
                    <span className={row?.cell?.value !== null ? "text-black" : "text-red-500"}>
                     {row?.cell?.value !== null ? row?.cell?.value : "gps is not allocated"}
          </span>
                );
            },
        },

        {
            Header: "Last Seen",
            accessor: "time",
            Cell: (row) => {
                return <span> {row?.cell?.value !== null ? row?.cell?.value : "00-00-0000-00-00"}</span>;
            },
        },

        {
            Header: "action",
            accessor: "action",
            Cell: (row) => {
                const companyValue = row?.cell?.row?.original?.company;
                const imeiValue = row?.cell?.row?.original?.imei;
                const statusDeviceValue = row?.cell?.row?.original?.statusDevice;



                return (
                    <div className="flex space-x-3 rtl:space-x-reverse">
                        {companyValue!==null && statusDeviceValue!=="INACTIF" && (
                            <Tooltip content="Decommission" placement="top" arrow animation="shift-away">
                                <button className="action-btn text-red-600" type="button" onClick={()=> {
                                    decommission(
                                        imeiValue
                                    )
                                }}>
                                    <Icon icon="heroicons:no-symbol" />
                                </button>
                            </Tooltip>

                        )}
                        {companyValue===null && statusDeviceValue!=="INACTIF" && (

                            <Tooltip content="allocate" placement="top" arrow animation="shift-away">
                                <button className="action-btn text-green-600" type="button"
                                        onClick={()=>handleOpenReferenceForm(imeiValue)}>
                                    <Icon icon="heroicons:link" />
                                </button>
                            </Tooltip>
                        )}
                        <Tooltip
                            content="Delete"
                            placement="top"
                            arrow
                            animation="shift-away"
                            theme="danger"
                        >
                            <button className="action-btn" type="button" onClick={() => deleteDevice(row)}>
                                <Icon icon="heroicons:trash" />
                            </button>
                        </Tooltip>
                    </div>
                );
            },
        },

    ];

    const [Device, setDevice] = useState([]);
    async function getDevices() {
        try {
            let result = await DeviceService.allDevice();
            setDevice(result.data);
        } catch (error) {
        }
    }
    async function decommission(imei) {
        try {
            await DeviceService.decommission(imei);
            getDevices()
        } catch (error) {
        }
    }
    useEffect(()=>{
        getDevices();
    },[])
    async function deleteDevice(row) {
        try {
            const imei = row.cell.row.original.imei;
            await DeviceService.deleteDevice(imei)
            getDevices();
        } catch (error) {
        }
    }

    const columns = useMemo(() => COLUMNS, []);
    const data = Device ;


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
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
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
        selectedFlatRows,

    } = tableInstance;
    const selectedRows = selectedFlatRows.map((row) => row.original);
    const handleExport = () => {
        // Convertir les données en une chaîne CSV en utilisant papaparse
        const csvString = Papa.unparse(selectedRows, {
            quotes: true, // Encadrer les valeurs entre guillemets
            delimiter: ',', // Utiliser la virgule comme séparateur
            header: true, // Inclure une ligne d'en-tête avec les noms de colonnes
        });
        // Créer un fichier blob à partir de la chaîne CSV
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        // Créer un objet URL pour le fichier blob
        const url = URL.createObjectURL(blob);
        // Créer un lien pour le téléchargement
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'devices.csv');
        document.body.appendChild(link);
        // Déclencher le téléchargement
        link.click();
        // Nettoyer l'objet URL
        URL.revokeObjectURL(url);
    };


    const { globalFilter, pageIndex, pageSize } = state;
    return (
        <>
            <Card>

                <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">{title}</h4>
                    <div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center">
                                <Button
                                    icon="heroicons-outline:newspaper"
                                    text="Export"
                                    className="btn-dark rounded-[999px] px-4 py-2 text-sm ml-16"
                                    onClick={handleExport }
                                />
                            </div>

                            <div><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>

                        </div>

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
                            {[10,100,500,1000,5000].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
                            <span>
                {pageIndex + 1} of {pageOptions.length}
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
                                Prev
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
                                Next
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
                {/*end*/}
            </Card>
            <CompanyAllocate onClose={handleOnClose} visible={showMyModal} imei={selectedImei}  />
        </>
    );
};

export default DevicesList;
