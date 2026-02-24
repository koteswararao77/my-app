import DetailsGet from "./getDetailsResponse";
import DetailsPost from "./getDetailsRequest";

const RTKQuery = () => {

    return (
        <div className="overflow-y-auto"
            style={{ height: 'calc(100vh - 10rem)' }}
        >
            {/* BACK */}
            {/* <div
                    className="flex items-center gap-2 w-fit cursor-pointer rounded-full bg-blue-100 text-blue-700 px-4 py-2 hover:bg-blue-200 transition"
                    onClick={() => navigate('/')}
                >
                    <ArrowBackIcon />
                    <span className="text-sm font-medium">
                        Go to main screen
                    </span>
                </div> */}

            <div className="flex gap-4 w-[100%]">
                <div className="w-[70%]">
                    <DetailsGet />
                </div>

                <div className="w-[30%]">
                    <DetailsPost />
                </div>
            </div>
        </div>
    )
}
export default RTKQuery;