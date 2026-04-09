"use client";

import { useEffect, useState } from "react";

export default function NotesPanel({ startDate, endDate }: any) {
  const [note, setNote] = useState("");

  const key = JSON.stringify({
    start: startDate,
    end: endDate,
  });

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) setNote(saved);
    else setNote("");
  }, [key]);

  const saveNote = () => {
    localStorage.setItem(key, note);
  };

  return (
    <div className="border-t p-5 bg-neutral-100">
      <h3 className="font-semibold mb-3 text-neutral-700">Notes</h3>

      <textarea
        className="w-full border border-neutral-300 rounded-xl p-3"
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your plans..."
      />

      <button
        onClick={saveNote}
        className="mt-3 px-5 py-2 bg-black text-white rounded-xl"
      >
        Save Notes
      </button>
    </div>
  );
}