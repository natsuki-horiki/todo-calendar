import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

//react関連のプラグイン
import React, { useState } from "react";

//fullcalendar関連のプラグイン
import FullCalendar from "@fullcalendar/react"; // FullCalendarをインポート
import timeGridWeek from "@fullcalendar/timegrid"; // timeGridプラグインをインポート
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "fullcalendar/index.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  //表示イベント例
  const [events,setEvents]=useState<EventInput>([
    {
        id: '1',
        title: 'Qiita書く',
        description: 'リンクアンドモチベーションのアドベントカレンダーを書く',
        start: '2025-05-21',
        end: '2025-05-23',
        backgroundColor: 'green',
        borderColor: 'red',
        editable: true
    },
    {
        id: '2',
        title: 'Qiita投稿',
        description: 'リンクアンドモチベーションのアドベントカレンダーを投稿する',
        start: '2025-05-18T10:00:00',
        end: '2025-05-18T15:00:00',
        backgroundColor: 'green',
        borderColor: 'red',
        editable: true
    },
    {
        id: '3',
        title: '買い物',
        description: 'リンクアンドモチベーションのアドベントカレンダーを投稿する',
        start: '2025-05-20T03:00:00',
        end: '2025-05-20T10:00:00',
        backgroundColor: 'green',
        borderColor: 'red',
        editable: true
    }
  ]);

  return (
    // 横並びにするためにflexを使用し、画面全体の高さに設定
    <div className="flex h-screen">
      {/* todoリスト部分(左) */}
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold mb-4 text-center">ToDoリスト</h2>
        {/* 中のリスト要素 */}
        <ul className="space-y-2">
          {events.map((event:EventInput)=>(
            <li key={event.id}>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>{event.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      
      {/* カレンダー部分（右） */}
      <div className="w-3/4 p-4">
        <FullCalendar
          plugins={[timeGridWeek, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
        />
      </div>
    </div>
  );
}
