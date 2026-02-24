import { useDispatch } from "react-redux";
import { setInput } from "../slice/rtkSlice";
import useRtkHook from "../hooks/useRtkHook";
import Input from "../../../common-components/input-field/input";
import Button from "../../../common-components/button/Button";

const DetailsPost = () => {

    const dispatch = useDispatch();

    const {
        tableData,
        isLoading,
        error,
        handleSubmit,
        isPosting,
        input,
    } = useRtkHook();

    return (
        <div>
            <div className="bg-slate-50 rounded-xl p-4 flex gap-6 w-[100%] flex flex-col">
                <Input
                    type="text"
                    label="Name"
                    value={input.name}
                    onChange={(e) =>
                        dispatch(setInput({ ...input, name: e.target.value }))
                    }
                    className="w-[30%]"
                />

                <Input
                    type="number"
                    label="Mobile"
                    value={input.mobile}
                    onChange={(e) =>
                        dispatch(setInput({ ...input, mobile: e.target.value }))
                    }
                    onFocus={(e) => {
                        if (e.target.value === "0") {
                            dispatch(setInput({ ...input, mobile: "" }));
                        }
                    }}
                    className="w-[30%]"
                />

                <Input
                    type="number"
                    label="Amount Paid"
                    value={input.amount}
                    onChange={(e) =>
                        dispatch(setInput({ ...input, amount: e.target.value }))
                    }
                    onFocus={(e) => {
                        if (e.target.value === "0") {
                            dispatch(setInput({ ...input, amount: "" }));
                        }
                    }}
                    className="w-[30%]"
                />

                <Button
                    variant="contained"
                    onClick={() => {
                        handleSubmit();
                    }}
                    className="mt-4"
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </Button>
            </div>

        </div>
    )
}
export default DetailsPost;