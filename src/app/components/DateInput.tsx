"use client";
import React, { useState } from "react";
import { DateItem } from "../page";

interface DateInputProps {
    setInitialData: (val: { date: string }[]) => void;
}

const DateInput: React.FC<DateInputProps> = ({ setInitialData }) => {
    const [input, setInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        const data = e.target.value
            .split("\n")
            .map((d) => d.trim())
            .filter(Boolean)
            .map((d) => ({ date: d }));
        setInitialData(data);
    };

    return (
        <div className="flex items-center justify-center px-4 mb-6">
            <div className="w-full max-w-xl p-6 bg-gray-900 shadow-xl rounded-2xl">
                <h2 className="text-2xl font-semibold mb-6 text-white text-center">
                    Enter Dates
                </h2>
                <textarea
                    value={input}
                    onChange={handleChange}
                    placeholder={`Paste dates here...\nExample:\n14-07-2025\n26/07/2025\n01-09-2025`}
                    className="w-full h-56 p-4 mb-4 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none placeholder-gray-400 text-sm font-mono"
                />
            </div>
        </div>
    );
};

export default DateInput;
