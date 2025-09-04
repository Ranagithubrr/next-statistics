import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export interface DataItem {
    date: string;
    count: number;
}

interface BarDataProps {
    data: DataItem[];
    totalOrder: number;
    goBack: () => void;
}

const COLORS = ["#3b82f6", "#06b6d4", "#facc15", "#f87171", "#34d399", "#a78bfa"];

const BarChartView: React.FC<BarDataProps> = ({ data, totalOrder, goBack }) => {
    return (
        <div className="w-full bg-[#1E2939] p-4 rounded-xl space-y-8">
            <div>
                <span className="text-gray-100">
                    Total Order Count:{" "}
                    <span className="text-3xl font-semibold text-cyan-400">{totalOrder}</span>
                </span>
            </div>

            {/* Bar Chart */}
            <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                        <XAxis dataKey="date" stroke="#cbd5e1" />
                        <YAxis stroke="#cbd5e1" />
                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "none", color: "#e2e8f0" }} />
                        <Legend wrapperStyle={{ color: "#cbd5e1" }} />
                        <Bar
                            dataKey="count"
                            fill="#3b82f6"
                            label={{ position: "top", fill: "#e2e8f0", fontSize: 12, fontWeight: 600 }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="w-full h-[30rem]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="date"
                            cx="50%"
                            cy="50%"
                            outerRadius={160}
                            label={(entry) => entry.value} // optional: custom labels
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "none",
                                color: "#e2e8f0", // light text
                            }}
                            labelStyle={{ color: "#e2e8f0" }}
                            itemStyle={{ color: "#e2e8f0" }}
                        />
                        <Legend
                            wrapperStyle={{ color: "#e2e8f0" }} // light text
                            formatter={(value) => <span className="text-gray-200">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
                <button
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 cursor-pointer"
                    onClick={goBack}
                >
                    {`<`} Back
                </button>
            </div>
        </div>
    );
};

export default BarChartView;
