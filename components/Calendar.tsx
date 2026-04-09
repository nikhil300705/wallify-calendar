"use client";

import { useEffect, useState } from "react";
import { getDaysInMonth, isSameDay } from "@/utils/dateUtils";
import NotesPanel from "./NotesPanel";
import { motion } from "framer-motion";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const stopDrag = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDrag);
    return () => window.removeEventListener("mouseup", stopDrag);
  }, []);

  const handleMouseDown = (day: Date) => {
    setStartDate(day);
    setEndDate(null);
    setIsDragging(true);
  };

  const handleMouseEnter = (day: Date) => {
    if (isDragging) setEndDate(day);
  };

  const changeMonth = (dir: number) => {
    setIsDragging(false);
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + dir);
    setCurrentDate(newDate);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden max-w-5xl w-full">

      {/* HERO */}
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/2 h-48">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h1 className="absolute bottom-4 left-4 text-white text-2xl font-semibold">
            Plan Your Month
          </h1>
        </div>

        {/* CALENDAR */}
        <div className="p-5 md:w-1/2">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-5">
            <button
              onClick={() => changeMonth(-1)}
              className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              ←
            </button>

            <h2 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={() => changeMonth(1)}
              className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              →
            </button>
          </div>

          {/* WEEKDAYS */}
          <div className="grid grid-cols-7 mb-3 text-xs font-medium text-gray-500 uppercase">
            {weekDays.map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>

          {/* GRID */}
          <div className="bg-gray-100 p-4 rounded-2xl">
            <motion.div
              key={currentDate.toString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-7 gap-1"
            >
              {days.map((day, i) => {
                const isStart = startDate && isSameDay(day, startDate);
                const isEnd = endDate && isSameDay(day, endDate);
                const isToday = isSameDay(day, today);
                const inRange =
                  startDate && endDate && day >= startDate && day <= endDate;

                return (
                  <div
                    key={i}
                    onMouseDown={() => handleMouseDown(day)}
                    onMouseEnter={() => handleMouseEnter(day)}
                    className={`
                      relative h-10 flex items-center justify-center text-sm font-semibold
                      text-gray-800   /* 🔥 FIX: FORCE DARK TEXT */
                      cursor-pointer transition-all duration-200

                      ${inRange ? "bg-blue-100" : ""}
                      ${isStart ? "bg-blue-600 text-white rounded-l-full shadow-md" : ""}
                      ${isEnd ? "bg-blue-600 text-white rounded-r-full shadow-md" : ""}
                      ${isStart && isEnd ? "rounded-full" : ""}
                      ${isToday ? "ring-2 ring-blue-600 rounded-full" : ""}

                      hover:bg-blue-200
                    `}
                  >
                    {day.getDate()}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <NotesPanel startDate={startDate} endDate={endDate} />
    </div>
  );
}