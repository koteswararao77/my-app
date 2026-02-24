import { useDispatch } from "react-redux";
import useFormFields from "./useFormFields";
import { Checkbox } from "@mui/material";
import moment from "moment";
import delete_icon from '../../assets/images/delete_icon.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { setInputs, setOpenPanel } from "../../reducers/authReducer";
import { getStatus } from "../../common-functions/common-functions";
import Input from "../../common-components/input-field/input";
import RadioButton from "../../common-components/radio-button/RadioButton";
import Button from "../../common-components/button/Button";
import Popover from "../../common-components/popover/popover";
import InsightsDashboard from "./insightsDemo";
import SearchBox from "../../common-components/searchbox";

const FormFields = () => {

    const statusList = [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'In Active', value: 'INACTIVE' }
    ];

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    const {
        inputs,
        search,
        setSearch,
        handleButtonClick,
        data,
        openPanel,
        handleStatusCheckbox,
        ApplyStatusFilter,
        ClearStatusFilter,
        statusSelect,
        statusFilter,
        onChangeTableValues,
        addRow,
        deleteRow,
        copyRow,
        rows
    } = useFormFields();

    const dispatch = useDispatch();

    return (

        <div
            className="overflow-y-auto hide-scrollbar"
            style={{
                height: "calc(100vh - 10rem)",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
            }}
        >
            <div className="rounded-2xl flex flex-col gap-6">

                {/* BACK */}
                {/* <div
                    className="flex items-center gap-2 w-fit cursor-pointer rounded-full bg-blue-100 text-blue-700 px-4 py-2 hover:bg-blue-200 transition"
                    onClick={() => navigate('/')}
                >
                    <ArrowBackIcon />
                    <span className="text-sm font-medium">
                        Go to main screen
                    </span>
                </div> */}

                {/* INPUTS */}
                <div className="bg-slate-50 rounded-xl p-4 w-[70%]">
                    <div className="flex gap-6">
                        <Input
                            type="text"
                            label="Name"
                            value={inputs.name}
                            onChange={(e) =>
                                dispatch(setInputs({ ...inputs, name: e.target.value }))
                            }
                            className="w-[30%]"
                        />

                        <Input
                            type="number"
                            label="Amount Paid"
                            value={inputs.amount}
                            onChange={(e) =>
                                dispatch(setInputs({ ...inputs, amount: e.target.value }))
                            }
                            onFocus={(e) => {
                                if (e.target.value === "0") {
                                    dispatch(setInputs({ ...inputs, amount: "" }));
                                }
                            }}
                            className="w-[30%]"
                        />
                    </div>
                    <div className="mt-10 flex gap-[8%] items-center">
                        <RadioButton
                            displayType="horizontal"
                            data={[
                                { label: "MALE", value: "Male" },
                                { label: "FEMALE", value: "Female" },
                            ]}
                            value={inputs.selectRadio}
                            pointer={{ label: "label", value: "value" }}
                            onChange={(value) =>
                                dispatch(
                                    setInputs({
                                        ...inputs,
                                        selectRadio: value.toString(),
                                    })
                                )
                            }
                            styles={{ display: "flex", gap: "1rem" }}
                            className="h-[39px]"
                        />

                        <div className="flex gap-4">
                            <button
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition
        ${inputs.button === "HOME"
                                        ? "bg-emerald-500 text-white shadow"
                                        : "bg-white border border-gray-300 hover:bg-gray-100"
                                    }`}
                                onClick={() => handleButtonClick("HOME")}
                            >
                                HOME
                            </button>

                            <button
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition
        ${inputs.button === "TOUR"
                                        ? "bg-emerald-500 text-white shadow"
                                        : "bg-white border border-gray-300 hover:bg-gray-100"
                                    }`}
                                onClick={() => handleButtonClick("TOUR")}
                            >
                                TOUR
                            </button>
                        </div>
                    </div>
                </div>

                {/* EDIT TABLE */}
                <div className="bg-white rounded-xl shadow-sm w-[70%] overflow-hidden">
                    <div className="bg-emerald-600 text-white px-4 py-2 font-medium">
                        Payment Entries
                    </div>

                    <table className="w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-3 text-left border">S.No</th>
                                <th className="p-3 text-left border">Date</th>
                                <th className="p-3 text-left border">Amount</th>
                                <th className="p-3 text-left border">Comment</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition">
                                    <td className="p-3 border">{i + 1}</td>
                                    <td className="p-3 border">
                                        {moment().format("DD-MMM-YYYY")}
                                    </td>
                                    <td className="p-3 border">
                                        <Input
                                            value={row.amount}
                                            onChange={(e) =>
                                                onChangeTableValues(i, "amount", e.target.value)
                                            }
                                            onFocus={(e) => {
                                                if (e.target.value === "0") {
                                                    onChangeTableValues(i, "amount", "");
                                                }
                                            }}
                                        />
                                    </td>
                                    <td className="p-3 border">
                                        <Input
                                            value={row.comment}
                                            onChange={(e) =>
                                                onChangeTableValues(i, "comment", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="p-3">
                                        {rows.length > 1 && (
                                            <div className="flex gap-2">
                                                <img
                                                    src={delete_icon}
                                                    onClick={() => deleteRow(i)}
                                                    className="w-5 cursor-pointer hover:scale-110 transition"
                                                />
                                                <ContentCopyIcon
                                                    onClick={() => copyRow(i)}
                                                    className="text-blue-600 cursor-pointer hover:scale-110 transition"
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end p-3">
                        <Button variant="outlined-primary" onClick={addRow}>
                            + Add
                        </Button>
                    </div>
                </div>

                {/* SEARCH */}
                <div className="w-[70%]">
                    <SearchBox
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* DATA TABLE */}
                <div
                    className="bg-white rounded-xl shadow-sm w-[70%] overflow-y-auto"
                    style={{ height: "calc(100vh - 30rem)" }}
                >
                    <table className="w-full text-sm">
                        <thead className="bg-emerald-600 text-white sticky top-0">
                            <tr>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Name</th>
                                <th
                                    className="p-3 text-left cursor-pointer"
                                    onClick={() => dispatch(setOpenPanel(true))}
                                >
                                    Status
                                </th>
                                <div>
                                    <Popover
                                        open={openPanel}
                                        onClose={() => { dispatch(setOpenPanel(false)); }}
                                    >
                                        <div>
                                            {statusList.map((status) => (
                                                <div className="p-1 cursor-pointer"
                                                    onClick={() => handleStatusCheckbox(status.value)}
                                                >
                                                    <Checkbox {...label} checked={statusSelect.includes(status.value)} />
                                                    {" "} {status.value}
                                                </div>
                                            ))}
                                            <div className="flex p-3 gap-2" >
                                                <Button
                                                    variant={'oceanGreen'}
                                                    onClick={() => {
                                                        ClearStatusFilter();
                                                    }}
                                                > Clear All
                                                </Button>


                                                <Button
                                                    variant={'oceanGreen'}
                                                    onClick={() => {
                                                        ApplyStatusFilter();

                                                    }} > Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </Popover>
                                </div>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data
                                    .filter(
                                        (item) =>
                                            (!search ||
                                                item.name?.toLowerCase().includes(search.toLowerCase())) &&
                                            (statusFilter.length === 0 ||
                                                statusFilter.includes(item.status))
                                    )
                                    .map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition">
                                            <td className="p-3 border">{item.id}</td>
                                            <td className="p-3 border">{item.name}</td>
                                            <td className="p-3 border">
                                                {getStatus(item.status)}
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="p-6 text-center text-gray-500">
                                        No Data Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <InsightsDashboard />
                </div>

            </div>
        </div>

    )
}
export default FormFields;