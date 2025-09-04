"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const DateInput = () => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const rawDates = input.split("\n").map(d => d.trim()).filter(Boolean);

    const parsedDates = rawDates.map(date => {
      // Parse both DD-MM-YYYY and DD/MM/YYYY
      const parsed = dayjs(date, ["DD-MM-YYYY", "DD/MM/YYYY"], true);
      return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "Invalid Date";
    });

    console.log("Parsed Dates:", parsedDates);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-xl p-6 bg-gray-800 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Enter Dates
        </h2>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Paste dates here...\nExample:\n14-07-2025\n26/07/2025\n01-09-2025`}
          className="w-full h-56 p-4 mb-4 text-gray-100 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none placeholder-gray-400 text-sm font-mono"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg shadow-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DateInput;
