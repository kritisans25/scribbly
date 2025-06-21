import React, { useState, useEffect } from 'react';
import TopButtons from './TopButtons';
import StickyNote from './StickyNote';
import ReminderBox from './ReminderBox';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [showLockedOnly, setShowLockedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('scribbly-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('scribbly-notes', JSON.stringify(notes));
  }, [notes]);

  // Ask notification permission
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Reminders
  useEffect(() => {
    const interval = setInterval(() => {
      notes.forEach((note) => {
        if (note.reminderTime && new Date(note.reminderTime) <= new Date()) {
          if (Notification.permission === 'granted') {
            new Notification('Reminder from Scribbly', {
              body: note.text || 'You have a note!',
            });
          }
          setNotes((prev) =>
            prev.map((n) =>
              n.id === note.id ? { ...n, reminderTime: null } : n
            )
          );
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [notes]);

  // Add Note
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      text: '',
      locked: false,
      pinned: false,
      color: '#EBD6FB',
      emoji: '',
      reminderTime: null,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  // Toggle Lock View
  const handleToggleLocked = () => {
    setShowLockedOnly((prev) => !prev);
  };

  // Search
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter Notes
  const visibleNotes = notes
    .filter((note) => {
      const matchesSearch = note.text.toLowerCase().includes(searchQuery);
      return showLockedOnly ? note.locked && matchesSearch : !note.locked && matchesSearch;
    })
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat px-2 sm:px-4"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Title */}
      <div className="flex justify-center pt-6">
        <div className="relative flex flex-col items-center">
          <img src="/kitty.png" alt="Kitten Logo" className="w-14 h-14 absolute -top-8" />
          <div className="w-full max-w-[90vw] sm:max-w-[400px] h-[70px] bg-scribblyYellow border-4 border-scribblyBrown rounded-[30px] flex items-center justify-center shadow-lg px-4">
            <h1 className="text-3xl sm:text-5xl font-scribbly text-scribblyBrown tracking-wider">SCRIBBLY</h1>
          </div>
        </div>
      </div>

      {/* Top Buttons */}
      <div className="mt-6 flex justify-center">
        <TopButtons
          onAddNote={handleAddNote}
          onToggleLocked={handleToggleLocked}
          onSearch={handleSearch}
        />
      </div>

      {/* Reminder Box */}
      <div className="mt-8 px-2">
        <ReminderBox notes={notes} />
      </div>

      {/* Sticky Notes */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 px-2 sm:px-4">
        {visibleNotes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            notes={notes}
            setNotes={setNotes}
          />
        ))}
      </div>
    </div>
  );
}
