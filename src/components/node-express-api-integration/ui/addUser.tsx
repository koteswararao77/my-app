import Button from "../../../common-components/button/Button"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Input from "../../../common-components/input-field/input";
import useAllDetailsById from "./useAllDetailsById";
import { useDispatch } from "react-redux";
import { setIsOpenEditForm, setOpenAddUser, setUserByIdData } from "../reducer/userDetailsReducer";
import delete_icon from '../../../assets/images/delete_icon.svg';

const AddUser = () => {

    const dispatch = useDispatch();

    const {
        userByIdData,
        onChangeTableValues,
        addRow,
        copyRow,
        deleteRow,
        handleDeleteUser,
        isOpenEditForm,
        handleCreateUser
    } = useAllDetailsById();

    return (
        <>
            <div className="overflow-y-auto"
                style={{ height: "calc(100vh - 5rem" }}
            >
                <div className="m-4 w-[90%]">
                    <div className="flex gap-4">
                        <Input
                            label="Name"
                            value={userByIdData?.name}
                            onChange={(e) => {
                                dispatch(setUserByIdData({
                                    ...userByIdData,
                                    name: e.target.value
                                }))
                            }}
                        />

                        <Input
                            label="Mobile"
                            value={userByIdData?.mobile}
                            onChange={(e) => {
                                dispatch(setUserByIdData({
                                    ...userByIdData,
                                    mobile: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Input
                            label="E-Mail"
                            value={userByIdData?.email}
                            onChange={(e) => {
                                dispatch(setUserByIdData({
                                    ...userByIdData,
                                    email: e.target.value
                                }))
                            }}
                        />

                        <Input
                            label="Address"
                            value={userByIdData?.address}
                            onChange={(e) => {
                                dispatch(setUserByIdData({
                                    ...userByIdData,
                                    address: e.target.value
                                }))
                            }}
                        />
                    </div>

                    {/* EDIT TABLE */}
                    <div className="bg-white rounded-xl shadow-sm w-[100%] mt-4 overflow-hidden">
                        <div className="bg-slate-700 text-white px-4 py-2 font-medium">
                            Payment Entries
                        </div>

                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="p-3 text-left border">S.No</th>
                                    <th className="p-3 text-left border">companyName</th>
                                    <th className="p-3 text-left border">Role</th>
                                    <th className="p-3 text-left border">Salary</th>
                                    {userByIdData?.roleDetails?.length > 1 && (
                                        <th className="p-3 text-left border"></th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {userByIdData?.roleDetails?.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition">
                                        <td className="p-3 border">{i + 1}</td>

                                        <td className="p-3 border">
                                            <Input
                                                value={row.companyName}
                                                onChange={(e) =>
                                                    onChangeTableValues(i, "companyName", e.target.value)
                                                }
                                            />
                                        </td>

                                        <td className="p-3 border">
                                            <Input
                                                value={row.role}
                                                onChange={(e) =>
                                                    onChangeTableValues(i, "role", e.target.value)
                                                }
                                            />
                                        </td>

                                        <td className="p-3 border">
                                            <Input
                                                value={row.salary}
                                                onChange={(e) =>
                                                    onChangeTableValues(i, "salary", e.target.value)
                                                }
                                            />
                                        </td>
                                        {userByIdData.roleDetails.length > 1 && (
                                            <td className="p-3">
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
                                            </td>
                                        )}

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
                </div>
            </div>

            <div className="flex justify-between p-4 border-t bg-white sticky bottom-0">
                <Button
                    variant="gray"
                    onClick={() => {
                        if (isOpenEditForm) {
                            dispatch(setIsOpenEditForm(false));
                        } else {
                            dispatch(setOpenAddUser(false));
                        }
                    }}
                >
                    CANCEL
                </Button>

                <Button
                    variant="contained"
                    onClick={() => {
                        handleCreateUser();
                    }}
                >
                    SUBMIT
                </Button>
            </div>
        </>
    )
}
export default AddUser;