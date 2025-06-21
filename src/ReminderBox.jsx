import React from 'react';

export default function ReminderBox({ notes }) {
  const reminders = notes.filter(note => note.reminder);

  return (
    <div className="bg-purple-100 w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto mt-10 p-6 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold text-scribblyBrown flex items-center gap-2 mb-3">
        🐱 SET REMINDERS
      </h2>

      {reminders.length === 0 ? (
        <p className="text-gray-600 text-lg italic pl-1">
          Woho! It seems you have no work to do lately 😸
        </p>
      ) : (
        <ul className="list-disc pl-6 text-gray-700">
          {reminders.map((note) => (
            <li key={note.id}>
              <span className="font-semibold">🕒 {new Date(note.reminder).toLocaleString()}</span> —{' '}
              <span>{note.text?.substring(0, 30) || 'No text'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
