import { useDispatch } from "react-redux";
import SearchBox from "../../../common-components/searchbox";
import { resetUserData, setOpenAddUser, setOpenUserDetailsById, setSearch, setSelectedUserId } from "../reducer/userDetailsReducer";
import PanelSlider from "../../../common-components/panel-slider";
import closeIcon from '../../../assets/images/close.svg';
import UserDetailsById from "./UserDetailsById";
import Button from "../../../common-components/button/Button";
import AddUser from "./addUser";
import useAllDetails from "./useAllDetails";

const AllUserDetails = () => {

    const { allUsersData, search, openUserDetailsById, openAddUser } = useAllDetails();

    const dispatch = useDispatch();

    return (

        <div className="overflow-y-auto"
        style={{ height: 'calc(100vh - 10rem)'}}
        >
            {/* <div
                className="flex items-center gap-2 w-fit cursor-pointer rounded-full bg-blue-100 text-blue-700 px-4 py-2 hover:bg-blue-200 transition"
                onClick={() => navigate('/')}
            >
                <ArrowBackIcon />
                <span className="text-sm font-medium">
                    Go to main screen
                </span>
            </div> */}

            <div className="w-70%">
                <div className="flex justify-between items-center w-[70%]">
                    <div className="w-[40%]">
                        <SearchBox
                            placeholder="Search..."
                            value={search}
                            onChange={(e: any) => {
                                dispatch(setSearch(e.target.value));
                            }}
                        />
                    </div>

                    <div>
                        <Button
                            variant="contained"
                            onClick={() => {
                                dispatch(setOpenAddUser(true));
                                dispatch(resetUserData());
                            }}
                        >
                            + Add User
                        </Button>
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl shadow-sm w-[70%] overflow-y-auto mt-4"
                    style={{ height: "calc(100vh - 30rem)" }}
                >
                    <table className="w-full text-sm">
                        <thead className="bg-emerald-600 text-white sticky top-0">
                            <tr>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Employee Name</th>
                                <th className="p-3 text-left cursor-pointer">Mobile Number</th>
                                <th className="p-3 text-left cursor-pointer">E-Mail</th>
                                <th className="p-3 text-left cursor-pointer">Address</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allUsersData?.length > 0 ? (
                                allUsersData
                                    .filter(
                                        (item) =>
                                        (!search ||
                                            item.name?.toLowerCase().includes(search.toLowerCase()))
                                    )
                                    ?.map((item, i) => (
                                        <tr className="hover:bg-slate-50 transition cursor-pointer"
                                            onClick={() => {
                                                dispatch(setOpenUserDetailsById(true));
                                                dispatch(setSelectedUserId(item._id))
                                            }}
                                        >
                                            <td className="p-3 border">{i + 1}</td>
                                            <td className="p-3 border">{item.name}</td>
                                            <td className="p-3 border">{item.mobile}</td>
                                            <td className="p-3 border">{item.email}</td>
                                            <td className="p-3 border">{item.address}</td>
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
            </div>

            <>
                {openUserDetailsById && (
                    <PanelSlider
                        direction="right_to_left"
                        open={openUserDetailsById}
                        onClose={() => {
                            dispatch(setOpenUserDetailsById(false));
                        }}
                        style={{ width: "40vw" }}
                    >
                        <div className="py-6 px-4 border-b flex items-center justify-between">
                            <div>
                                <h2>USER DETAILS</h2>
                            </div>
                            <div>
                                <img
                                    src={closeIcon}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        dispatch(setOpenUserDetailsById(false));
                                    }}
                                    alt=""
                                />
                            </div>
                        </div>
                        <UserDetailsById />
                    </PanelSlider>
                )}
            </>

            <>
                {openAddUser && (
                    <PanelSlider
                        direction="right_to_left"
                        open={openAddUser}
                        onClose={() => {
                            dispatch(setOpenAddUser(false));
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
                                        dispatch(setOpenAddUser(false));
                                    }}
                                    alt=""
                                />
                            </div>
                        </div>
                        <AddUser />
                    </PanelSlider>
                )}
            </>
        </div>
    )
}
export default AllUserDetails;