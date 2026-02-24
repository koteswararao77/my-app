import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetResponse } from "../types/types";
import { Fileds } from "../../../reducers/authReducer";

type TInitialState = {
    filterData: GetResponse[];
    input: Fileds;
    search: string;
};

const initialState: TInitialState = {
    filterData: [],
    input: {
        name: "",
        mobile: "",
        amount: "",
        selectRadio: "",
        button: ""
    },
    search: ""
};

export const rtkSlice = createSlice({
    name: "rtkSlice",
    initialState: initialState,
    reducers: {
        resetRtkSlice: (state) => {
            return {
                ...initialState,
            };
        },
        setFilterData: (state, action: PayloadAction<GetResponse[]>) => {
            state.filterData = action.payload
        },
        setInput: (state, action: PayloadAction<Fileds>) => {
            state.input = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        }
    },
});
export const {
    setFilterData,
    setInput,
    setSearch
} = rtkSlice.actions;

export default rtkSlice.reducer;