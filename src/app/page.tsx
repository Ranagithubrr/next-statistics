"use client";
import DateInput from "./components/DateInput";
import GroupSelect from "./components/GroupSelect";
import BarChartView from "./components/BarChartView";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

export interface DateItem {
  date: string;
  count: number;
}

export default function Home() {
  const [initialData, setInitialData] = useState<{ date: string }[]>([]);
  const [finalData, setFinalData] = useState<DateItem[]>([]);
  const [groupCount, setGroupCount] = useState("7");
  const [activeView, setActiveView] = useState(false);

  const handleSubmit = () => {
    if (!initialData || initialData.length === 0) {
      window.alert("Please enter some value")
      return;
    }
    const parsedDates: string[] = initialData
      .map((item) => {
        const parsed = dayjs(item.date, ["DD-MM-YYYY", "DD/MM/YYYY"], true);
        return parsed.isValid() ? parsed.format("YYYY-MM-DD") : null;
      })
      .filter((d): d is string => d !== null);

    const dateCounts: Record<string, number> = {};
    parsedDates.forEach((d) => {
      dateCounts[d] = (dateCounts[d] || 0) + 1;
    });

    const uniqueDates: string[] = Object.keys(dateCounts).sort(
      (a, b) => dayjs(a).unix() - dayjs(b).unix()
    );

    const chartData: { date: string; count: number }[] = [];

    if (groupCount === "month") {
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
      const groupDays = parseInt(groupCount, 10);
      let i = 0;

      while (i < uniqueDates.length) {
        const startDate = dayjs(uniqueDates[i]);
        const endDate = startDate.add(groupDays - 1, "day");
        let count = 0;

        while (i < uniqueDates.length && dayjs(uniqueDates[i]).isSameOrBefore(endDate)) {
          count += dateCounts[uniqueDates[i]] ?? 0;
          i++;
        }

        chartData.push({
          date:
            groupDays === 1
              ? startDate.format("YYYY-MM-DD")
              : `${startDate.format("YYYY-MM-DD")} to ${endDate.format("YYYY-MM-DD")}`,
          count,
        });
      }
    }

    setFinalData(chartData);
    setActiveView(true);
  };

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      return;
    }
    handleSubmit();
  }, [groupCount]);

  return (
    <div className="bg-gray-800 min-h-screen py-10 px-4">
      {!activeView ? (
        <>
          <DateInput setInitialData={setInitialData} />
          <button
            onClick={handleSubmit}
            className="w-[10rem] mx-auto block cursor-pointer py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg shadow-md"
          >
            Submit
          </button>
        </>
      ) : (
        <>
          <GroupSelect value={groupCount} onChange={setGroupCount} />
          <BarChartView data={finalData} goBack={() => setActiveView(false)} totalOrder={initialData?.length} />
        </>
      )}
    </div>
  );
}
