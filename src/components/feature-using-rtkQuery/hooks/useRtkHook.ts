import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PostPayload } from "../types/types";
import { TRootState } from "../../../store";
import { useGetData, usePostData } from "../api/api";

const useRtkHook = () => {

    const { input, search } = useSelector((state: TRootState) => ({
        input: state.rtkSlice.input,
        search: state.rtkSlice.search
    }));

    // ✅ GET API
    const { data, error, isLoading, refetch } = useGetData();

    // setting the GET api data in useState

    //     const [formData, setFormData] = useState<GetResponse | null>(null);

    // // When API data arrives, set it once
    // useEffect(() => {
    //   if (data && data.length > 0) {
    //     setFormData(data[0]); // or pick by id for edit
    //   }
    // }, [data]);

    // ✅ POST API
    const [postData, { isLoading: isPosting }] = usePostData();

    const handleSubmit = async () => {

        if (!input.name.trim()) {
            toast.error("Name is required");
            return;
        }
        const payload: PostPayload = {
            name: input.name,
            mobile: input.mobile,
            amount: input.amount,
        };

        try {
            await postData(payload).unwrap();
            refetch();
            alert("Data submitted successfully ✅");
        } catch (err) {
            console.error(err);
        }
    };

    return {
        // GET
        tableData: data,
        isLoading,
        error,

        // POST
        handleSubmit,
        isPosting,

        // UI state
        input,
        search
    }
}
export default useRtkHook;