import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Fileds = {
    name: string,
    mobile: number | string,
    amount: number | string,
    selectRadio: string,
    button: string,
}

export type TableRows = {
    amount: number,
    comment: string
}
type TInitialState = {
    data: string
    inputs: Fileds
    filteredData: any[]
    openPanel: boolean
    statusFilter: string[];
    statusSelect: string[];
    statusOpen: boolean;
    rows: TableRows[];
};

const initialState: TInitialState = {
    data: "",
    inputs: {
        name: "",
        mobile: 0,
        selectRadio: "",
        button: "",
        amount: 0
    },
    filteredData: [],
    openPanel: false,
    statusFilter: [],
    statusSelect: [],
    statusOpen: false,
    rows: [{
        amount: 0,
        comment: ''
    }],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        resetAuthSlice: (state) => {
            return {
                ...initialState,
            }
        },
        setData: (state, action: PayloadAction<string>) => {
            state.data = action.payload
        },
        setInputs: (state, action: PayloadAction<Fileds>) => {
            state.inputs = action.payload
        },
        setFilteredData: (state, action: PayloadAction<any[]>) => {
            state.filteredData = action.payload
        },
        setOpenPanel: (state, action: PayloadAction<boolean>) => {
            state.openPanel = action.payload
        },

        setStatusFilter: (state, action: PayloadAction<string[]>) => {
            state.statusFilter = action.payload
        },
        setStatusSelect: (state, action: PayloadAction<string[]>) => {
            state.statusSelect = action.payload
        },
        statusOpen: (state, action: PayloadAction<boolean>) => {
            state.statusOpen = action.payload
        },
        setRows: (state, action: PayloadAction<TableRows[]>) => {
            state.rows = action.payload
        },
    }
});

export const {
    setData,
    setInputs,
    setFilteredData,
    setOpenPanel,
    setStatusFilter,
    setStatusSelect,
    statusOpen,
    setRows,
} = authSlice.actions

export default authSlice.reducer

