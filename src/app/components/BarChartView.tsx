import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { date: '2025-07-14 to 2025-07-20', count: 1 },
    { date: '2025-07-26 to 2025-08-01', count: 3 },
    { date: '2025-08-08 to 2025-08-14', count: 2 },
    { date: '2025-08-19 to 2025-08-25', count: 1 },
    { date: '2025-08-27 to 2025-09-02', count: 12 },
    { date: '2025-09-03 to 2025-09-09', count: 5 }
];

const BarChartView = () => {
    return (
        <div className="w-full h-96 bg-[#1E2939] p-4 rounded-xl">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                    <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartView;
