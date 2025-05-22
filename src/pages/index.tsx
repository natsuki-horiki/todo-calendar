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
  const [newTitle, setNewTitle] = useState(''); // イベントのタイトル入力
  const [newEventSDate, setNewEventStartDate] = useState(''); // 開始日付
  const [newEventEDate, setNewEventEndDate] = useState(''); // 終了日付
  const [newEventSTime, setNewEventStartTime] = useState(''); // 開始時間
  const [newEventETime, setNewEventEndTime] = useState(''); // 終了時間
  const [newColor, setNewColor] = useState(''); //イベントの色
  
//日付がクリックされた際の処理
  const handleDateClick = (info: DateClickArg) => {
    const fullDateStr = info.dateStr; // 例: "2025-05-19T04:00:00+09:00"
    alert(`クリックされた日付: ${fullDateStr}`);
    // 「T」で分割して日付と時間+タイムゾーンを取得
    const [datePart, timeWithZone] = fullDateStr.split("T");
    // 時間部分から時:分だけ取り出す（秒やタイムゾーンは無視）
    const timePart = timeWithZone.slice(0,5);

    setNewEventStartDate(datePart);
    setNewEventStartTime(timePart);

    setNewEventEndDate(datePart);
    setNewEventEndTime(timePart);

    setShowForm(true);
  };

  
  //表示イベント例
  const [events,setEvents]=useState<EventInput[]>([
    //追加したイベントをここに入れて表示
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
        <form
          onSubmit={(e) => {
              e.preventDefault(); // ページリロード防止

              const start = `${newEventSDate}T${newEventSTime}`;
              const end = `${newEventEDate}T${newEventETime}`;

              const newEvent = {
                id: (events.length + 1).toString(),
                title: newTitle,
                start,
                end,
                backgroundColor: newColor || 'gray',
                editable: true,
              };

              setEvents([...events, newEvent]);

              // 入力フォームをリセット
              setNewTitle('');
              setNewEventStartDate('');
              setNewEventStartTime('');
              setNewEventEndDate('');
              setNewEventEndTime('');
              setNewColor('');
              setShowForm(false); // フォームを閉じる
            }}
            className="border my-2 py-2 rounded"
          >
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold">addition</p>

            <input  //タスクのタイトル
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-4/5 border px-2 py-1 my-1.5 rounded bg-gray-100"
              placeholder="Title"
            />

            <div className=" flex w-4/5">
              <input  //タスクの開始日時
                type="text"
                value={newEventSDate} // ← dateClickで設定された日時を表示
                onChange={(s) => setNewEventStartDate(s.target.value)}
                className="w-4/5 border px-2 py-1 mr-2 my-1.5 rounded bg-gray-100"
                placeholder="Start"
              />

              <input  //タスクの開始時間
                type="text"
                value={newEventSTime} // ← dateClickで設定された日時を表示
                onChange={(s) => setNewEventStartTime(s.target.value)}
                className="w-4/5 border px-2 py-1 my-1.5 rounded bg-gray-100"
                placeholder="Start"
              />
            </div>

            <div className=" flex w-4/5">
              <input  //タスクの終了日時
                type="text"
                value={newEventEDate} // ← dateClickで設定された日時を表示
                onChange={(s) => setNewEventEndDate(s.target.value)}
                className="w-4/5 border px-2 py-1 mr-2 my-1.5 rounded bg-gray-100"
                placeholder="Start"
              />
              <input  //タスクの終了時間
                type="text"
                value={newEventETime} // ← dateClickで設定された日時を表示
                onChange={(s) => setNewEventEndTime(s.target.value)}
                className="w-4/5 border px-2 py-1 my-1.5 rounded bg-gray-100"
                placeholder="Start"
              />
            </div>

            <input  //タスクの色
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
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
