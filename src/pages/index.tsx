import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

//react関連のプラグイン
import React, { useState } from "react";

//fullcalendar関連のプラグイン
import FullCalendar from "@fullcalendar/react"; // FullCalendarをインポート
import timeGridWeek from "@fullcalendar/timegrid"; // timeGridプラグインをインポート
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [events,setEvents]=useState([
    
  ]);

  return (
    // 横並びにするためにflexを使用し、画面全体の高さに設定
    <div className="flex h-screen">
      {/* todoリスト部分(左) */}
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold mb-4 text-center">ToDoリスト</h2>
        {/* 中のリスト要素 */}
        <ul className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>ミーティング準備</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>資料提出</span>
          </label>
        </ul>
      </div>
      
      {/* カレンダー部分（右） */}
      <div className="w-3/4 p-4">
        <FullCalendar plugins={[timeGridWeek,interactionPlugin]} initialView="timeGridWeek" />
      </div>
    </div>
  );
}
