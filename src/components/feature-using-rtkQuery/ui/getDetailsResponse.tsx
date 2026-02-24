import { useDispatch } from "react-redux";
import Input from "../../../common-components/input-field/input";
import useRtkHook from "../hooks/useRtkHook";
import { setSearch } from "../slice/rtkSlice";
import SearchBox from "../../../common-components/searchbox";

const DetailsGet = () => {

    const {
        tableData,
        isLoading,
        error,
        handleSubmit,
        isPosting,
        input,
        search
    } = useRtkHook();

    const dispatch = useDispatch();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    // USEEFFECT FOR FETCHING DATA IN EDIT FORMS

    //       useEffect(() => {
    //     if (data && data.length > 0) {
    //       const item = data[0];

    //       dispatch(
    //         setInputs({
    //           name: item.name,
    //           mobile: "",         
    //           amount: item.amount,
    //           selectRadio: "",
    //           button: "",
    //         })
    //       );
    //     }
    //   }, [data, dispatch]);

    return (
        <>
            <SearchBox
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    dispatch(setSearch(e.target.value));
                }}
            />

            <div
                className="bg-white rounded-xl shadow-sm w-[100%] overflow-y-auto mt-4"
                style={{ height: "calc(100vh - 30rem)" }}
            >
                <table className="w-full text-sm">
                    <thead className="bg-emerald-600 text-white sticky top-0">
                       <tr className="">
                            <th className="w-16 border px-2 py-3">ID</th>
                            <th className="w-40 border px-2 py-3">Name</th>
                            <th className="w-40 border px-2 py-3">Username</th>
                            <th className="w-48 border px-2 py-3">Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(tableData?.length ?? 0) > 0
                            ? tableData?.filter((i) =>
                                i.name.toLowerCase().includes(search.toLowerCase())
                            )
                                .map((user) => (
                                    <tr key={user.id}>
                                        <td className="border px-2 py-1">{user.id}</td>
                                        <td className="border px-2 py-1">{user.name}</td>
                                        <td className="border px-2 py-1">{user.username}</td>
                                        <td className="border px-2 py-1">{user.email}</td>
                                    </tr>
                                ))
                            : (
                                <tr>
                                    <td colSpan={4} className="text-center px-2 py-1">
                                        No records found
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default DetailsGet;