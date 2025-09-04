"use client";
import DateInput from "./components/DateInput";
import GroupSelect from "./components/GroupSelect";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

dayjs.extend(customParseFormat);

export default function Home() {
  const [finalData, setFinalData] = useState<string[]>([]);
  const [groupCount, setGroupCount] = useState("7");

  const handleSubmit = () => {
    // 1. Normalize dates
    const parsedDates: string[] = finalData
      .map((date) => {
        const parsed = dayjs(date, ["DD-MM-YYYY", "DD/MM/YYYY"], true);
        return parsed.isValid() ? parsed.format("YYYY-MM-DD") : null;
      })
      .filter((d): d is string => d !== null); // type guard ensures string[]

    // 2. Count frequency
    const dateCounts: Record<string, number> = {};
    parsedDates.forEach((d) => {
      dateCounts[d] = (dateCounts[d] || 0) + 1;
    });

    // 3. Sort unique dates
    const uniqueDates: string[] = Object.keys(dateCounts).sort(
      (a, b) => dayjs(a).unix() - dayjs(b).unix()
    );

    // 4. Grouping
    const chartData: { date: string; count: number }[] = [];

    if (groupCount === "month") {
      // Group by month
      const monthsMap: Record<string, number> = {};
      uniqueDates.forEach((d) => {
        const monthKey = dayjs(d).format("YYYY-MM");
        monthsMap[monthKey] = (monthsMap[monthKey] || 0) + dateCounts[d];
      });

      Object.entries(monthsMap).forEach(([month, count]) => {
        const start = dayjs(`${month}-01`).format("YYYY-MM-DD");
        const end = dayjs(`${month}-01`).endOf("month").format("YYYY-MM-DD");
        chartData.push({ date: `${start} to ${end}`, count });
      });
    } else {
      // Group by N days
      const groupDays: number = parseInt(groupCount, 10);
      let i = 0;

      while (i < uniqueDates.length) {
        const startDate = dayjs(uniqueDates[i]);
        const endDate = startDate.add(groupDays - 1, "day");
        let count = 0;

        // sum counts in this range
        while (i < uniqueDates.length && dayjs(uniqueDates[i]).isSameOrBefore(endDate)) {
          count += dateCounts[uniqueDates[i]] ?? 0; // safe access
          i++;
        }

        // if single day, just show the date
        chartData.push({
          date:
            groupDays === 1
              ? startDate.format("YYYY-MM-DD")
              : `${startDate.format("YYYY-MM-DD")} to ${endDate.format("YYYY-MM-DD")}`,
          count,
        });
      }
    }

    console.log("Grouped Chart Data:", chartData);
    return chartData; // optional: return for chart use
  };


  return (
    <div className="bg-gray-800 min-h-screen py-10 px-4">
      <DateInput setFinalData={setFinalData} />
      <GroupSelect value={groupCount} onChange={setGroupCount} />
      <button
        onClick={handleSubmit}
        className="w-[10rem] mx-auto block cursor-pointer py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg shadow-md"
      >
        Submit
      </button>
    </div>
  );
}
