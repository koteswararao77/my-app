import React, { useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/images/ono-click-connect.png";
import Button from "../../common-components/button/Button";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b"];

const lineData = [
  { month: "Jan", revenue: 4000, profit: 1500 },
  { month: "Feb", revenue: 4500, profit: 1800 },
  { month: "Mar", revenue: 5000, profit: 2200 },
  { month: "Apr", revenue: 5500, profit: 2600 },
  { month: "May", revenue: 6000, profit: 3000 },
  { month: "Jun", revenue: 6500, profit: 3400 },
];

const pieData = [
  { name: "Online", value: 4000 },
  { name: "Retail", value: 3000 },
  { name: "Wholesale", value: 2000 },
];

const barData = [
  { name: "Q1", sales: 8000 },
  { name: "Q2", sales: 12000 },
  { name: "Q3", sales: 10000 },
  { name: "Q4", sales: 15000 },
];

const InsightsDashboard = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    // Logo
    pdf.addImage(logo, "PNG", 10, 10, 30, 15);

    // Title
    pdf.setFontSize(16);
    pdf.text("Company Insights Report", 50, 20);

    // Date
    pdf.setFontSize(10);
    pdf.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      50,
      26
    );

    // Charts image
    pdf.addImage(imgData, "PNG", 10, 40, 190, 230);

    pdf.save("Insights_Report.pdf");
  };

  return (
    <div className="">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Insights Dashboard</h2>

        <Button
          variant="danger"
          onClick={downloadPDF}
        >
          Download Full Report
        </Button>
      </div>

      {/* ALL CHARTS INSIDE ONE CONTAINER */}
      <div ref={reportRef} className="bg-white p-6 rounded-lg space-y-10">

        {/* Line Chart */}
        <div>
          <h3 className="mb-2 font-semibold">Revenue vs Profit</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
              <Line type="monotone" dataKey="profit" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div>
          <h3 className="mb-2 font-semibold">Sales Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="mb-2 font-semibold">Quarterly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default InsightsDashboard;
