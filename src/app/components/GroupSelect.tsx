"use client";
import React from "react";

interface GroupSelectProps {
    value: string;
    onChange: (val: string) => void;
}

const options = [
    { label: "Single", value: "1" },
    { label: "3 Days", value: "3" },
    { label: "5 Days", value: "5" },
    { label: "7 Days", value: "7" },
    { label: "10 Days", value: "10" },
    { label: "20 Days", value: "20" },
    { label: "1 Month", value: "month" },
];

const GroupSelect: React.FC<GroupSelectProps> = ({ value, onChange }) => {
    return (
        <div className="flex flex-col mb-4 max-w-4xl mx-auto justify-center items-center my-5">
            <span className="mb-2 text-gray-200 font-semibold">Group By</span>
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onChange(opt.value)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${value === opt.value
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                            }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GroupSelect;
