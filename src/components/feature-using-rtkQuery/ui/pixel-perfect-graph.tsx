import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine,
    Customized,
    ReferenceArea,
} from "recharts";

// ------------------ TYPES ------------------
type ChartData = {
    date: string;
    predicted?: number;
    actual?: number;
    forecast?: number;
};

const data: ChartData[] = [
    { date: "Apr 08", predicted: 32, actual: 48 },
    { date: "Apr 09", predicted: 32, actual: 52 },
    { date: "Apr 10", predicted: 37, actual: 55 },
    { date: "Apr 11", predicted: 41, actual: 63 },
    { date: "Apr 12", predicted: 42, actual: 63 },
    { date: "Apr 13", predicted: 46, actual: 65 },
    { date: "Apr 14", predicted: 41, actual: 59 },

    // ✅ FIX HERE
    { date: "Today", predicted: 67, actual: 97, forecast: 97 },

    { date: "Apr 16", forecast: 48 },
    { date: "Apr 17", forecast: 55 },
    { date: "Apr 18", forecast: 56 },
    { date: "Apr 19", forecast: 54 },
    { date: "Apr 20", forecast: 55 },
];


// ------------------ TOOLTIP (SAFE TYPE) ------------------
type CustomTooltipProps = {
    active?: boolean;
    payload?: {
        dataKey?: string;
        value?: number;
    }[];
    label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const actual = payload.find(p => p.dataKey === "actual")?.value;
    const predicted = payload.find(p => p.dataKey === "predicted")?.value;
    const forecast = payload.find(p => p.dataKey === "forecast")?.value;

    return (
        <div className="bg-white shadow-xl rounded-xl p-4 text-sm border w-[180px]">
            <div className="font-semibold mb-2">{label}</div>

            <div className="flex justify-between text-blue-600">
                <span>Predicted:</span>
                <span>{predicted ? `₹${predicted}` : "-"}</span>
            </div>

            <div className="flex justify-between text-green-600">
                <span>Actual:</span>
                <span>{actual ? `₹${actual}` : "-"}</span>
            </div>

            <div className="flex justify-between text-pink-500">
                <span>Forecast:</span>
                <span>{forecast ? `₹${forecast}` : "-"}</span>
            </div>
        </div>
    );
};

// const DifferenceArrows = ({ data, xAxisMap, yAxisMap }: any) => {
//     const xAxis: any = Object.values(xAxisMap)[0];
//     const yAxis: any = Object.values(yAxisMap)[0];

//     if (!xAxis || !yAxis) return null;

//     return (
//         <g>
//             {data.map((entry: any, index: number) => {
//                 // ❌ skip future + today
//                 if (entry.forecast || entry.date === "Today") return null;

//                 if (entry.actual == null || entry.predicted == null) return null;

//                 const x = xAxis.scale(entry.date);
//                 const yActual = yAxis.scale(entry.actual);
//                 const yPred = yAxis.scale(entry.predicted);

//                 const diff = entry.actual - entry.predicted;

//                 return (
//                     <g key={index}>
//                         {/* vertical line */}
//                         <line
//                             x1={x}
//                             x2={x}
//                             y1={yPred}
//                             y2={yActual}
//                             stroke="#ef4444"
//                             strokeWidth={2}
//                         />

//                         {/* top arrow */}
//                         <polygon
//                             points={`${x - 4},${yPred} ${x + 4},${yPred} ${x},${yPred - 6}`}
//                             fill="#ef4444"
//                         />

//                         {/* bottom arrow */}
//                         <polygon
//                             points={`${x - 4},${yActual} ${x + 4},${yActual} ${x},${yActual + 6}`}
//                             fill="#ef4444"
//                         />

//                         {/* label */}
//                         <text
//                             x={x + 6}
//                             y={(yActual + yPred) / 2}
//                             fill="#ef4444"
//                             fontSize={10}
//                         >
//                             {diff > 0 ? `+₹${diff}` : `₹${diff}`}
//                         </text>
//                     </g>
//                 );
//             })}
//         </g>
//     );
// };

// ------------------ COMPONENT ------------------

const DifferenceArrows = (props: any) => {
  const { data, xAxisMap, yAxisMap } = props;

  // ✅ FIX: guard early
  if (!xAxisMap || !yAxisMap) return null;

  const xAxis = Object.values(xAxisMap)[0] as any;
  const yAxis = Object.values(yAxisMap)[0] as any;

  // ✅ extra safety
  if (!xAxis?.scale || !yAxis?.scale) return null;

  return (
    <g>
      {data.map((entry: any, index: number) => {
        if (entry.forecast || entry.date === "Today") return null;
        if (entry.actual == null || entry.predicted == null) return null;

        const x = xAxis.scale(entry.date);
        const yActual = yAxis.scale(entry.actual);
        const yPred = yAxis.scale(entry.predicted);

        const diff = entry.actual - entry.predicted;

        return (
          <g key={index}>
            <line
              x1={x}
              x2={x}
              y1={yPred}
              y2={yActual}
              stroke="#ef4444"
              strokeWidth={2}
            />

            {/* arrows */}
            <polygon
              points={`${x - 4},${yPred} ${x + 4},${yPred} ${x},${yPred - 6}`}
              fill="#ef4444"
            />
            <polygon
              points={`${x - 4},${yActual} ${x + 4},${yActual} ${x},${yActual + 6}`}
              fill="#ef4444"
            />

            <text
              x={x + 6}
              y={(yActual + yPred) / 2}
              fill="#ef4444"
              fontSize={10}
            >
              {diff > 0 ? `+₹${diff}` : `₹${diff}`}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const PixelPerfectChart = () => {
    return (
        <div className="w-full h-[420px] bg-white rounded-2xl p-6 shadow">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    {/* Background split */}
                    <ReferenceArea x1="Apr 08" x2="Today" fill="#e7eff7" />
                    <ReferenceArea x1="Today" x2="Apr 22" fill="#f7e7b6" />

                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                    <XAxis dataKey="date" />
                    <YAxis />

                    {/* Today line */}
                    {/* <ReferenceLine x="Today" stroke="black" strokeDasharray="4 4" /> */}

                    <ReferenceLine
                        x="Today"
                        stroke="#111827"
                        strokeWidth={3}
                        strokeDasharray="6 6"
                        ifOverflow="extendDomain"
                    />

                    {/* ACTUAL */}
                    <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#1f7a3f"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                    />

                    {/* PREDICTED */}
                    <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#2b6cb0"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                    />

                    {/* FORECAST */}
                    <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="#ff2d7a"
                        strokeWidth={3}
                        strokeDasharray="0 8"
                        strokeLinecap="round"
                        dot={{ r: 3, fill: "#ff2d7a" }}
                    />

                    {/* <Customized component={<DifferenceArrows data={data} />} /> */}

                    <Customized
                        component={(props: any) => (
                            <DifferenceArrows {...props} data={data} />
                        )}
                    />

                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PixelPerfectChart;