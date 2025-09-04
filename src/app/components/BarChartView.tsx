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
} from "recharts";

export interface DataItem {
    date: string;
    count: number;
}

interface BarDataProps {
    data: DataItem[];
    totalOrder: number,
    goBack: () => void;
}

const BarChartView: React.FC<BarDataProps> = ({ data, totalOrder, goBack }) => {
    return (
        <div className="w-full h-96 bg-[#1E2939] p-4 rounded-xl">
            <div>
                <span className="text-gray-100">Total Order Count: <span className="text-3xl font-semibold text-cyan-400"> {totalOrder}</span></span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "none", color: "#e2e8f0" }} />
                    <Legend wrapperStyle={{ color: "#cbd5e1" }} />
                    <Bar dataKey="count" fill="#3b82f6"  label={{ position: 'top', fill: '#e2e8f0', fontSize: 12, fontWeight: 600 }} />
                </BarChart>
            </ResponsiveContainer>

            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 cursor-pointer"
                onClick={goBack}>
                {`<`} Back
            </button>
        </div>
    );
};

export default BarChartView;
