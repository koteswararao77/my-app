import { useDispatch } from "react-redux";
import Button from "../../../common-components/button/Button"
import TitleValueWidget from "../../../common-components/title-value-widget";
import useAllDetailsById from "./useAllDetailsById";
import { setIsOpenDeleteForm, setIsOpenEditForm, setOpenUserDetailsById } from "../reducer/userDetailsReducer";
import PanelSlider from "../../../common-components/panel-slider";
import AddUser from "./addUser";
import closeIcon from '../../../assets/images/close.svg';
import ModalHeader from "../../../common-components/modal/modal-header";
import Modal from "../../../common-components/modal";

const UserDetailsById = () => {

    const { userByIdData, handleDeleteUser, isOpenEditForm, isOpenDeleteForm } = useAllDetailsById();

    const dispatch = useDispatch();

    return (
        <>
            <div className="overflow-y-auto"
                style={{ height: "calc(100vh - 5rem" }}
            >
                <div className="m-4 w-[90%]">
                    <div className="flex gap-4">
                        <TitleValueWidget
                            title={"Name"}
                            value={userByIdData?.name}
                            classes="flex-1"
                        />

                        <TitleValueWidget
                            title={"Mobile"}
                            value={userByIdData?.mobile}
                            classes="flex-1"
                        />

                    </div>

                    <div className="flex gap-4 mt-4">
                        <TitleValueWidget
                            title={"E-Mail"}
                            value={userByIdData?.email}
                            classes="flex-1"
                        />

                        <TitleValueWidget
                            title={"Address"}
                            value={userByIdData?.address}
                            classes="flex-1"
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
                                </tr>
                            </thead>

                            <tbody>
                                {userByIdData?.roleDetails?.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition">
                                        <td className="p-3 border">{i + 1}</td>
                                        <td className="p-3 border">{row.companyName}</td>
                                        <td className="p-3 border">{row.role}</td>
                                        <td className="p-3 border">{row.salary}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="flex justify-between p-4 border-t bg-white sticky bottom-0">
                <Button
                    variant="gray"
                    onClick={() => {
                        dispatch(setOpenUserDetailsById(false));
                    }}
                >
                    CANCEL
                </Button>

                <div className="flex gap-2">
                    <Button
                        variant="danger"
                        onClick={() => {
                            dispatch(setIsOpenDeleteForm(true));
                        }}
                    >
                        DELETE
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => {
                            dispatch(setIsOpenEditForm(true));
                        }}
                    >
                        EDIT
                    </Button>
                </div>
            </div>

            {isOpenDeleteForm && (
                <Modal
                    open={isOpenDeleteForm}
                    width="40vw"
                    onClose={() => {
                        dispatch(setIsOpenDeleteForm(false));
                    }}
                >
                    <>
                        <ModalHeader
                            title={"Delete User"}
                            content={<></>}
                        />
                        <div className="py-3">
                            <div className="px-4 my-10 text-red-500 flex items-center">
                                <div>⚠️ This action cannot be undone. Are you sure you want to delete this user?</div>
                            </div>

                            <div className="flex justify-between p-4 border-t bg-white sticky bottom-0">
                                <Button
                                    variant="gray"
                                    onClick={() => {
                                        dispatch(setIsOpenDeleteForm(false));
                                    }}
                                >
                                    CANCEL
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleDeleteUser();
                                    }}
                                >
                                    SUBMIT
                                </Button>
                            </div>
                        </div>
                    </>
                </Modal>
            )}
            <>
                {isOpenEditForm && (
                    <PanelSlider
                        direction="right_to_left"
                        open={isOpenEditForm}
                        onClose={() => {
                            dispatch(setIsOpenEditForm(false));
                        }}
                        style={{ width: "40vw" }}
                    >
                        <div className="py-6 px-4 border-b flex items-center justify-between">
                            <div>
                                <h2>ADD USER</h2>
                            </div>
                            <div>
                                <img
                                    src={closeIcon}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        dispatch(setIsOpenEditForm(false));
                                    }}
                                    alt=""
                                />
                            </div>
                        </div>
                        <AddUser />
                    </PanelSlider>
                )}
            </>
        </>
    )
}
export default UserDetailsById;