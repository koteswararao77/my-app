import { useMemo, useState } from "react";
import { FixedSizeList } from "react-window";
import GaugeChart from "react-gauge-chart";
import useDebounce from "./useBounceforSearch";
import Input from "../../common-components/input-field/input";
import SearchBox from "../../common-components/searchbox";

type RowData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  company: string;
};

const data: RowData[] = Array.from({ length: 800000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+91 90000${String(i + 1).padStart(4, "0")}`,

  // String(i + 1)        // "1", "12", "123"
  // .padStart(4, "0")   // "0001", "0012", "0123"

  city: `City ${((i % 100) + 1)}`,
  company: `Company ${((i % 50) + 1)}`,
}));

const Row = ({ index, style, data }: any) => {
  const row = data[index];
  return (
    <div style={{ ...style, display: "flex" }} className="bg-white">
      <div className="w-1/12 border px-2 py-1">{row.id}</div>
      <div className="w-2/12 flex border px-2 py-1">
        <div>{row.name}</div>
        <div className="w-20">
          <GaugeChart
            id={`gauge-${row.id}`}
            nrOfLevels={10}
            percent={row.score / 100}
            arcWidth={0.25}
            colors={["#ef4444", "#facc15", "#22c55e"]}
            needleColor="#1f2937"
            needleBaseColor="#1f2937"
            textColor="#111827"
            animate={true}
          />
        </div>
      </div>
      <div className="w-3/12 border px-2 py-1">{row.email}</div>
      <div className="w-2/12 border px-2 py-1">{row.phone}</div>
      <div className="w-2/12 border px-2 py-1">{row.city}</div>
      <div className="w-2/12 border px-2 py-1">{row.company}</div>
    </div>
  );
};

const ListRendering = () => {

  const [search, setSearch] = useState("");

  // const filteredData = useMemo(() => {
  //   if (!search) return data;

  //   return data.filter((row: any) => {
  //     const value = `${row.id} ${row.name} ${row.email} ${row.city} ${row.company}`.toLowerCase();
  //     return value.includes(search.toLowerCase());
  //   });
  // }, [search]);

  const debouncedSearch = useDebounce(search, 100);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const searchLower = debouncedSearch.toLowerCase();

    return data.filter((row: any) => {
      const value = `${row.id} ${row.name} ${row.email} ${row.city} ${row.company}`.toLowerCase();
      return value.includes(searchLower);
    });
  }, [debouncedSearch, data]);

  return (

    <div className="overflow-y-auto"
      style={{ height: 'calc(100vh - 10rem)' }}
    >

      <div>
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
        <div className="w-[90%]">
          <SearchBox
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div
          className="bg-white rounded-xl shadow-sm w-[90%] overflow-y-auto mt-4"
        >
          <table className="w-full text-sm">
            <thead className="bg-emerald-600 text-white sticky top-0">
              <tr>
                <div className="flex bg-emerald-600 items-center">
                  <div className="w-1/12 px-2 py-4">ID</div>
                  <div className="w-2/12 px-2 py-4">Name</div>
                  <div className="w-3/12 px-2 py-4">Email</div>
                  <div className="w-2/12 px-2 py-4">Phone</div>
                  <div className="w-2/12 px-2 py-4">City</div>
                  <div className="w-2/12 px-2 py-4">Company</div>
                </div>
              </tr>
            </thead>

            <tbody>
              <div style={{ height: 500 }}>
                <FixedSizeList
                  height={500}
                  width={"100%"}
                  itemCount={filteredData.length}
                  itemSize={60}
                  itemData={filteredData}
                >
                  {Row}
                </FixedSizeList>
              </div>
            </tbody>
          </table>
        </div>

        {/* <div className="flex h-[200px] justify-center items-center">
        <div className="w-[20%] h-full border bg-red-500 p-2">
          Column content
        </div>
      </div> */}

      </div>
    </div >
  );
};

export default ListRendering;
