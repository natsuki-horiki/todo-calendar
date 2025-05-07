import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import React from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendarをインポート
import timeGridWeek from "@fullcalendar/timegrid"; // DayGridプラグインをインポート

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <FullCalendar plugins={[timeGridWeek]} initialView="timeGridWeek" />
    </div>
  );
}
