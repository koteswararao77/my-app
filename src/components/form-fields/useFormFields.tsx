import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputs, setOpenPanel, setRows, setStatusFilter, setStatusSelect } from "../../reducers/authReducer";
import { TRootState } from "../../store";

const useFormFields = () => {

    const data = [
        { id: 1, name: "Home Loan", status: 'ACTIVE' },
        { id: 2, name: "Tour Package Goa", status: 'INACTIVE' },
        { id: 3, name: "Office Rent", status: 'ACTIVE' },
        { id: 4, name: "Education Loan", status: 'ACTIVE' },
        { id: 5, name: "Home Renovation", status: 'INACTIVE' },
        { id: 6, name: "Tour Package Kerala", status: 'ACTIVE' },
        { id: 7, name: "Office Furniture", status: 'INACTIVE' },
        { id: 8, name: "College Fees", status: 'ACTIVE' },
        { id: 9, name: "Home Insurance", status: 'ACTIVE' },
        { id: 10, name: "Tour Package Manali", status: 'INACTIVE' },
        { id: 11, name: "Office Electricity Bill", status: 'ACTIVE' },
        { id: 12, name: "Online Course", status: 'ACTIVE' },
        { id: 13, name: "Home Maintenance", status: 'INACTIVE' },
        { id: 14, name: "Tour Package Dubai", status: 'ACTIVE' },
        { id: 15, name: "Office Internet Setup", status: 'INACTIVE' },
        { id: 16, name: "School Admission", status: 'ACTIVE' },
        { id: 17, name: "Home Interior Design", status: 'INACTIVE' },
        { id: 18, name: "Tour Package Singapore", status: 'ACTIVE' },
        { id: 19, name: "Office Security System", status: 'INACTIVE' },
        { id: 20, name: "Coaching Classes", status: 'ACTIVE' },
    ];

    //    const [inputs, setInputs] = useState<{
    //     name: string,
    //     mobile: number,
    //     selectRadio: string,
    //     button: string,
    // }>({
    //     name: '',
    //     mobile: 0,
    //     selectRadio: '',
    //     button: ''
    // });

    // const [filteredData, setFilteredData] = useState<any[]>([]);

    const dispatch = useDispatch();

    const { inputs, filteredData, openPanel, statusFilter, statusSelect, statusOpen, rows } = useSelector((state: TRootState) => ({
        inputs: state.auth.inputs,
        filteredData: state.auth.filteredData,
        openPanel: state.auth.openPanel,
        statusFilter: state.auth.statusFilter,
        statusSelect: state.auth.statusSelect,
        statusOpen: state.auth.statusOpen,
        rows: state.auth.rows
    }));

    const [search, setSearch] = useState('');

    const handleButtonClick = (value: string) => {
        dispatch(setInputs({
            ...inputs,
            button: value
        }))
    };

    // useEffect(() => {
    //     filterData();
    // }, [search, statusSelect]);

    // const filterData = () => {
    //     const trimmedText = search.trim().toLowerCase();

    //     let filtered = filteredData

    //     // if (search.length > 0) {
    //     filtered = data.filter((i) =>
    //         i.name?.toLowerCase().includes(trimmedText)
    //     );
    //     // }

    //     // if (statusSelect.length > 0) {
    //     filtered = filtered.filter((option) =>
    //         statusSelect.includes(option?.status)
    //     );
    //     // }
    //     dispatch(setFilteredData(filtered));
    // };

    const handleStatusCheckbox = (status: string) => {
        dispatch(setStatusSelect(
            statusSelect.includes(status) ?
                statusSelect.filter((i) => i !== status)
                : [...statusSelect, status]
        ))
    };

    const ApplyStatusFilter = () => {
        dispatch(setStatusFilter(statusSelect));
        dispatch(setOpenPanel(false));
    };

    const ClearStatusFilter = () => {
        dispatch(setStatusFilter([]));
        dispatch(setStatusSelect([]));
        dispatch(setOpenPanel(false));
    };

    const onChangeTableValues = (index: number, key: string, value: any) => {
        const updatedRows = rows.map((row, i) =>
            i === index ? { ...row, [key]: value } : row
        )
        dispatch(setRows(updatedRows));
    }

    const addRow = () => {
        dispatch(setRows([
            ...rows,
            {
                amount: 0,
                comment: '',
            }
        ]))
    };

    // const copyRow = (index: number) => {
    //     const rowToCopy = rows[index];

    //     dispatch(
    //         setRows([
    //             ...rows,
    //             {
    //                 ...rowToCopy, 
    //             },
    //         ])
    //     );
    // };

    const copyRow = (index: number) => {
        const newRows = [...rows];

        newRows.splice(index + 1, 0, {
            ...rows[index],
        });
        dispatch(setRows(newRows));
    };

    const deleteRow = (index: number) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        dispatch(setRows(updatedRows));
    };

    return {
        data,
        inputs,
        search,
        setSearch,
        handleButtonClick,
        filteredData,
        openPanel,
        handleStatusCheckbox,
        ApplyStatusFilter,
        ClearStatusFilter,
        statusSelect,
        statusFilter,
        onChangeTableValues,
        addRow,
        deleteRow,
        rows,
        copyRow
    }
}
export default useFormFields; 