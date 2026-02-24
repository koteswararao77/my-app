import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userDetails } from "../types/userTypes";

type TInitialState = {
    allUsersData: userDetails[];
    userByIdData: userDetails
    refresh: boolean,
    search: string,
    openUserDetailsById: boolean,
    openAddUser: boolean,
    selectedUserId: string,
    isOpenEditForm: boolean,
    isOpenDeleteForm: boolean,
}

const initialState: TInitialState = {
    allUsersData: [],
    userByIdData: {
        name: "",
        mobile: "",
        email: "",
        address: "",
        roleDetails: [{
            companyName: '',
            role: '',
            salary: ''
        }],
        _id: ''
    },
    refresh: false,
    search: "",
    openUserDetailsById: false,
    openAddUser: false,
    selectedUserId: '',
    isOpenEditForm: false,
    isOpenDeleteForm: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        resetUserSlice: (state) => {
            return {
                ...initialState,
            }
        },
        setAllUsersData: (state, action: PayloadAction<userDetails[]>) => {
            state.allUsersData = action.payload
        },
        setUserByIdData: (state, action: PayloadAction<userDetails>) => {
            state.userByIdData = action.payload
        },

        setRefresh: (state, action: PayloadAction<boolean>) => {
            state.refresh = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setOpenUserDetailsById: (state, action: PayloadAction<boolean>) => {
            state.openUserDetailsById = action.payload
        },
        setOpenAddUser: (state, action: PayloadAction<boolean>) => {
            state.openAddUser = action.payload
        },
        setSelectedUserId: (state, action: PayloadAction<string>) => {
            state.selectedUserId = action.payload
        },
        setIsOpenEditForm: (state, action: PayloadAction<boolean>) => {
            state.isOpenEditForm = action.payload
        },
        setIsOpenDeleteForm: (state, action: PayloadAction<boolean>) => {
            state.isOpenDeleteForm = action.payload
        },
        resetUserData: (state) => {
            state.userByIdData = initialState.userByIdData
        },
    }
});

export const {
    setAllUsersData,
    setUserByIdData,
    setRefresh,
    setSearch,
    setOpenUserDetailsById,
    setOpenAddUser,
    setSelectedUserId,
    setIsOpenEditForm,
    resetUserData,
    setIsOpenDeleteForm
} = userSlice.actions

export default userSlice.reducer

