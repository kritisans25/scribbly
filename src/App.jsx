import React, { useState, useEffect } from 'react';
import TopButtons from './TopButtons';
import StickyNote from './StickyNote';
import ReminderBox from './ReminderBox';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [showLockedOnly, setShowLockedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('scribbly-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('scribbly-notes', JSON.stringify(notes));
  }, [notes]);

  // Ask for notification permission
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Check reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      notes.forEach((note) => {
        if (note.reminderTime && new Date(note.reminderTime) <= new Date()) {
          if (Notification.permission === 'granted') {
            new Notification('Reminder from Scribbly', {
              body: note.text || 'You have a note!'
            });
          }
          setNotes((prev) =>
            prev.map((n) => n.id === note.id ? { ...n, reminderTime: null } : n)
          );
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [notes]);

  // Add a new note
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      text: '',
      locked: false,
      pinned: false,
      color: '#EBD6FB',
      emoji: '',
      reminderTime: null
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  // Toggle between showing locked and unlocked notes
  const handleToggleLocked = () => {
    setShowLockedOnly((prev) => !prev);
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter visible notes
  const visibleNotes = notes
    .filter((note) => {
      const matchesSearch = note.text.toLowerCase().includes(searchQuery);
      return showLockedOnly ? note.locked && matchesSearch : !note.locked && matchesSearch;
    })
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Title Section */}
      <div className="w-full flex justify-center pt-6">
        <div className="relative flex flex-col items-center">
          <img src="/kitty.png" alt="Kitten Logo" className="w-14 h-14 absolute -top-8" />
          <div className="w-[500px] h-[80px] bg-scribblyYellow border-4 border-scribblyBrown rounded-[30px] flex items-center justify-center shadow-lg">
            <h1 className="text-5xl font-scribbly text-scribblyBrown tracking-wider">SCRIBBLY</h1>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <TopButtons
        onAddNote={handleAddNote}
        onToggleLocked={handleToggleLocked}
        onSearch={handleSearch}
      />

      {/* Reminders */}
      <ReminderBox notes={notes} />

      {/* Notes Display */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 px-4">
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


