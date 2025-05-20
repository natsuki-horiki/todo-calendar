import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

//react関連のプラグイン
import React, { useState } from "react";

//fullcalendar関連のプラグイン
import FullCalendar from "@fullcalendar/react"; // FullCalendarをインポート
import timeGridWeek from "@fullcalendar/timegrid"; // timeGridプラグインをインポート
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from "@fullcalendar/interaction"; //クリック動作
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
  const [showForm, setShowForm] = useState(false); // フォームの表示状態
  const [newEventStart, setNewEventStart] = useState(''); // クリックされた日時
  const [newEventEnd, setNewEventEnd] = useState(''); // クリックされた日時
  const [title, setTitle] = useState(''); // イベントのタイトル入力
  

  const handleDateClick = (info: DateClickArg) => {
    alert(`クリックされた日付: ${info.dateStr}`);
    setNewEventStart(info.dateStr); //dateStrをeventStartに与えている
    setNewEventEnd(info.dateStr);  //dateStrをeventStopに与えている
    setShowForm(true);
  };

  
  //表示イベント例
  const [events,setEvents]=useState<EventInput>([
    {
        id: '1',
        title: 'Qiita書く',
        start: '2025-05-21',
        end: '2025-05-23',
        backgroundColor: 'green',
        editable: true
    },
    {
        id: '2',
        title: 'Qiita投稿',
        start: '2025-05-18T10:00:00',
        end: '2025-05-18T15:00:00',
        backgroundColor: 'green',
        editable: true
    },
    {
        id: '3',
        title: '買い物',
        start: '2025-05-20T03:00:00',
        end: '2025-05-20T10:00:00',
        backgroundColor: 'blue',
        editable: true
    },
  ]);

  return (
    // 横並びにするためにflexを使用し、画面全体の高さに設定
    <div className="flex h-screen">
      {/* todoリスト部分(左) */}
      <div className="w-1/4 p-4 border-r relative">
        <h2 className="text-xl font-bold mb-4 text-center">ToDoリスト</h2>
        <button className="text-white bottom-10 right-5 py-2 px-4 rounded-full bg-gray-500 cursor-pointer absolute"
          //＋ボタンでtodo新規追加フォームを開く
          onClick={()=>{
            setShowForm(true);
          }}
        >+</button>

        {/* ToDo新規追加用フォーム */}
        {showForm &&(
          <form className="border my-2 py-2 rounded">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold">addition</p>
            <input  //タスクの名称
              type="text"
              className="w-4/5 border px-2 py-1 my-1.5 rounded bg-gray-100"
              placeholder="Title"
            />

            <input  //タスクの開始時間
              type="text"
              value={newEventStart} // ← dateClickで設定された日時を表示
              onChange={(s) => setNewEventStart(s.target.value)}
              className="w-4/5 border px-2 py-1 my-1.5 rounded bg-gray-100"
              placeholder="Start"
            />

            <input  //タスクの終了時間
              type="text"
              value={newEventEnd} // ← dateClickで設定された日時を表示
              onChange={(e) => setNewEventEnd(e.target.value)}
              className="w-4/5 border px-2 py-1 my-1.5 rounded bg-gray-100"
              placeholder="End"
            />

            <input  //タスクの色
              type="text"
              className="w-4/5 border px-2 py-1 my-1.5 rounded bg-gray-100"
              placeholder="Color"
            />

            <input
              className="w-1/5 border px-2 py-1 my-1.5 rounded cursor-pointer bg-gray-100"
              type="submit"
              value="add"
            />
          </div>
        </form>
        )}
        

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
          events={events} //イベントの読み込み
          dateClick={(info) => handleDateClick(info)} //日付クリックイベント
        />
      </div>
    </div>
  );
}
