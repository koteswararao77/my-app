import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAllUsersData } from "../reducer/userDetailsReducer";
import { TRootState } from "../../../store";
import { BASE_URL } from "../../../constants/constant";

const useAllDetails = () => {

    const { refresh, allUsersData, search, openUserDetailsById, openAddUser } = useSelector((state: TRootState) => ({
        refresh: state.user.refresh,
        allUsersData: state.user.allUsersData,
        search: state.user.search,
        openUserDetailsById: state.user.openUserDetailsById,
        openAddUser: state.user.openAddUser
    }))

    const dispatch = useDispatch();

    useEffect(() => {
        getAllUsers();
    }, [refresh])

    const getAllUsers = () => {
        fetch(`${BASE_URL}/users`)
            .then(res => res.json())
            .then(data => {
                dispatch(setAllUsersData(data.user));
            });
    };

    return {
        allUsersData,
        search,
        openUserDetailsById,
        openAddUser
    }
}
export default useAllDetails; 