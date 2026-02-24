import { configureStore } from "@reduxjs/toolkit";
import authSlice from './reducers/authReducer';
import rtkSlice from "./components/feature-using-rtkQuery/slice/rtkSlice";
import { rtkGetPostApi } from "./components/feature-using-rtkQuery/api/api";
import userSlice from "./components/node-express-api-integration/reducer/userDetailsReducer";

const store = configureStore({
    reducer: {
        auth: authSlice,
        rtkSlice: rtkSlice,
        user: userSlice,
        [rtkGetPostApi.reducerPath]: rtkGetPostApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            rtkGetPostApi.middleware,
            // marketApi.middleware,
            // userApi.middleware
        ),
});
export type TRootState = ReturnType<typeof store.getState>;
export default store;

// Middleware can:
// 1. intercept actions
// 2. run async logic
// 3. trigger side effects

// exampleApi.reducerPath  → WHERE to store data
// exampleApi.reducer      → HOW to update data
// exampleApi.middleware   → WHEN to refetch/cache