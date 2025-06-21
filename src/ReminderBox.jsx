import React from 'react';

export default function ReminderBox({ notes }) {
  const reminders = notes.filter(note => note.reminder);

  return (
    <div className="bg-purple-100 w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto mt-8 p-4 sm:p-6 rounded-xl shadow-md border border-purple-300">
      <h2 className="text-xl sm:text-2xl font-bold text-scribblyBrown flex items-center gap-2 mb-3">
        🐱 SET REMINDERS
      </h2>

      {reminders.length === 0 ? (
        <p className="text-gray-600 text-base sm:text-lg italic pl-1">
          Woho! It seems you have no work to do lately 😸
        </p>
      ) : (
        <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
          {reminders.map((note) => (
            <li key={note.id} className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-semibold whitespace-nowrap">
                🕒 {new Date(note.reminder).toLocaleString()}
              </span>
              <span className="truncate sm:ml-2">{note.text?.substring(0, 80) || 'No text'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

