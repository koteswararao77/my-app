import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../../../constants/constant";
import { TRootState } from "../../../store";
import { toast } from "react-toastify";
import { setIsOpenEditForm, setOpenAddUser, setOpenUserDetailsById, setRefresh, setUserByIdData } from "../reducer/userDetailsReducer";
import { useEffect } from "react";

const useAllDetailsById = () => {

    const dispatch = useDispatch();

    const { selectedUserId, userByIdData, isOpenEditForm, openUserDetailsById, isOpenDeleteForm } = useSelector((state: TRootState) => ({
        selectedUserId: state.user.selectedUserId,
        userByIdData: state.user.userByIdData,
        isOpenEditForm: state.user.isOpenEditForm,
        openUserDetailsById: state.user.openUserDetailsById, 
        isOpenDeleteForm: state.user.isOpenDeleteForm
    }));

    useEffect(() => {
        if (openUserDetailsById) {
            getUsersById();
        }
    }, [openUserDetailsById]);

    const getUsersById = () => {
        fetch(`${BASE_URL}/users/${selectedUserId}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setUserByIdData(data.user));
            });
    };

    const onChangeTableValues = (index: number, key: string, value: string) => {
        const updatedRoleDetails = userByIdData.roleDetails.map((row, i) =>
            i === index ? { ...row, [key]: value } : row
        );

        dispatch(
            setUserByIdData({
                ...userByIdData,
                roleDetails: updatedRoleDetails
            })
        );
    };

    const addRow = () => {
        dispatch(
            setUserByIdData({
                ...userByIdData,
                roleDetails: [
                    ...userByIdData.roleDetails,
                    {
                        companyName: "",
                        role: "",
                        salary: ""
                    }
                ]
            })
        );
    };

    const copyRow = (index: number) => {
        const newRows = [...userByIdData.roleDetails];

        newRows.splice(index + 1, 0, {
            ...userByIdData?.roleDetails[index]!
        });

        dispatch(
            setUserByIdData({
                ...userByIdData,
                roleDetails: newRows
            })
        );
    };

    const deleteRow = (index: number) => {
        const updatedRows = userByIdData.roleDetails.filter((_, i) => i !== index);

        dispatch(
            setUserByIdData({
                ...userByIdData,
                roleDetails: updatedRows
            })
        );
    };

    const handleCreateUser = () => {
        if (!isOpenEditForm) {
            fetch(`${BASE_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: userByIdData?.name,
                    mobile: userByIdData?.mobile,
                    email: userByIdData?.email,
                    address: userByIdData?.address,
                    roleDetails: userByIdData?.roleDetails.map((r) => ({
                        companyName: r.companyName,
                        role: r.role,
                        salary: r.salary
                    }))
                })
            })
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }

                    dispatch(setRefresh(true));
                    dispatch(setOpenAddUser(false));
                    toast.success('User Created Successfully');
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            fetch(`${BASE_URL}/users/${selectedUserId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: userByIdData?.name,
                    mobile: userByIdData?.mobile,
                    email: userByIdData?.email,
                    address: userByIdData?.address,
                    roleDetails: userByIdData?.roleDetails.map((r) => ({
                        companyName: r.companyName,
                        role: r.role,
                        salary: r.salary
                    }))
                })
            })
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }

                    dispatch(setRefresh(true));
                    dispatch(setIsOpenEditForm(false));
                    toast.success('User Deleted Successfully');
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const handleDeleteUser = () => {
        fetch(`${BASE_URL}/users/${selectedUserId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userByIdData?.name,
                mobile: userByIdData?.mobile,
                email: userByIdData?.email,
                address: userByIdData?.address,
                roleDetails: userByIdData?.roleDetails.map((r) => ({
                    companyName: r.companyName,
                    role: r.role,
                    salary: r.salary
                }))
            })
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                dispatch(setRefresh(true));
                dispatch(setOpenUserDetailsById(false));
                toast.success('User Deleted Successfully');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return {
        userByIdData,
        onChangeTableValues,
        addRow,
        copyRow,
        deleteRow,
        handleCreateUser,
        handleDeleteUser,
        isOpenEditForm,
        isOpenDeleteForm
    }
}
export default useAllDetailsById; 