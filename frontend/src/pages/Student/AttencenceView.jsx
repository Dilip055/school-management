import React, { useState, useEffect, useMemo } from "react";
import { SquarePen } from "lucide-react";
import { useAuth } from "../../Context/Authcontext";
import useAttendenceApi from "../../hooks/useAttendenceApi";

const AttendanceView = () => {
  const { userInfo } = useAuth();
  const { attendance } = useAttendenceApi();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filtered, setFiltered] = useState([]);

  const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleString(
    "default",
    { month: "long" }
  );

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const filteredAtt = attendance?.filter(
    (att) => att?.studentId === userInfo?.id
  ) || [];


  useEffect(() => {
    if (!userInfo?.id || !attendance) return;

    const result = filteredAtt.filter(
      (att) =>
        new Date(att.date).getMonth() + 1 === selectedMonth &&
        new Date(att.date).getFullYear() === selectedYear
    );

    setFiltered(result);
  }, [attendance, selectedMonth, selectedYear]);

  const { percentage } = useMemo(() => {
    const result = filtered.reduce(
      (acc, curr) => {
        if (curr.status === "present") acc.present++;
        if (["present", "absent"].includes(curr.status)) acc.total++;
        return acc;
      },
      { total: 0, present: 0 }
    );

    const percentage =
      result.total > 0
        ? Math.round((result.present / result.total) * 100)
        : 0;

    return { ...result, percentage };
  }, [filtered]);

  return (
    <div className="p-2">
      <h2 className="text-xl md:text-3xl flex items-center gap-2 mb-5 px-2 pt-3">
        <SquarePen className="w-6" /> Attendance Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 bg-white md:p-5 p-2 rounded-lg shadow-lg">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border border-gray-200 bg-gray-100 px-4 py-2 outline-0 focus:ring-1 rounded focus:ring-indigo-500"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-200 bg-gray-100 px-4 py-2 rounded focus:ring-1 focus:ring-blue-500 outline-0"
        >
          {[...Array(3)].map((_, i) => {
            const yr = new Date().getFullYear() - 2 + i;
            return (
              <option key={yr} value={yr}>
                {yr}
              </option>
            );
          })}
        </select>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="md:text-xl text-center md:text-left font-semibold mb-4">
          Showing Attendance for{" "}
          <span className="text-blue-600">
            {monthName} {selectedYear}
          </span>
        </h3>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse text-sm text-center">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="px-4 py-2 text-left sticky left-0 bg-blue-100 z-10">
                  Student Name
                </th>
                {days.map((day) => (
                  <th key={day} className="px-2 py-2 border-r border-blue-100">
                    {day}
                  </th>
                ))}
                <th className="px-2 py-2 border-r border-blue-100">%</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold sticky left-0 bg-white">
                  {userInfo?.username}
                </td>
                {days.map((day) => {
                  const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const record = filtered.find((r) => r.date.startsWith(dateStr));
                  const status = record?.status || "-";

                  const statusStyle =
                    status === "present"
                      ? "bg-green-100 text-green-700"
                      : status === "absent"
                      ? "bg-red-100 text-red-700"
                      : "text-gray-400";

                  return (
                    <td
                      key={day}
                      className={`px-2 py-5 text-sm font-medium capitalize ${statusStyle}`}
                    >
                      {status === "present"
                        ? "P"
                        : status === "absent"
                        ? "A"
                        : "-"}
                    </td>
                  );
                })}
                <td className="px-2 py-1 font-bold">{percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;
