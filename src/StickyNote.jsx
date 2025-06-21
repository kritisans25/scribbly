import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import EmojiPicker from 'emoji-picker-react';
import { PiPushPinFill } from 'react-icons/pi';
import { FaPalette, FaTrashAlt, FaCalendarAlt, FaLock, FaUnlock } from 'react-icons/fa';
import { BsEmojiSmile } from 'react-icons/bs';

export default function StickyNote({ note, notes, setNotes }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [color, setColor] = useState(note.color || '#EBD6FB');
  const [showColorPalette, setShowColorPalette] = useState(false);
  const reminderRef = useRef();

  const customColors = ['#EBD6FB', '#FEEBF6', '#FFF2E0', '#ADEED9', '#7F8CAA'];

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map(n => n.id === note.id ? updatedNote : n);
    setNotes(updatedNotes);
  };

  const handleLockToggle = () => {
    updateNote({ ...note, locked: !note.locked });
  };

  const handleTextChange = (e) => {
    updateNote({ ...note, text: e.target.value });
  };

  const handleDelete = () => {
    setNotes(notes.filter(n => n.id !== note.id));
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
    updateNote({ ...note, color: selectedColor });
    setShowColorPalette(false);
  };

  const handleEmojiClick = (emojiData) => {
    updateNote({ ...note, text: note.text + emojiData.emoji });
    setShowEmojiPicker(false);
  };

  const handlePin = () => {
    const updated = [note, ...notes.filter(n => n.id !== note.id)];
    setNotes(updated);
  };


  const handleReminderSet = (e) => {
  e.preventDefault();
  const reminderValue = reminderRef.current?.value; // ✅ Safe access
  if (!reminderValue) return; // Prevent error if empty

  updateNote({ ...note, reminder: reminderValue });
  setShowReminderModal(false);
};


  return (
    <Draggable>
      <div
        className="relative w-64 min-h-64 p-4 rounded-xl shadow-lg m-4"
        style={{ backgroundColor: color }}
      >
        <div className="absolute -top-2 left-4 w-16 h-4 bg-orange-200 rotate-[-5deg] z-10 rounded-sm shadow-sm"></div>

        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-3 text-gray-700">
            <button title="Pin to Top" onClick={handlePin}>
              <PiPushPinFill className="hover:text-red-500" />
            </button>

            <div className="relative">
              <button title="Color Picker" onClick={() => setShowColorPalette(!showColorPalette)}>
                <FaPalette className="hover:text-green-500 cursor-pointer" />
              </button>
              {showColorPalette && (
                <div className="absolute top-8 left-0 bg-white p-2 rounded shadow-md flex gap-1 z-50">
                  {customColors.map((col) => (
                    <div
                      key={col}
                      className="w-6 h-6 rounded-full cursor-pointer border border-gray-300 hover:scale-110 transition"
                      style={{ backgroundColor: col }}
                      onClick={() => handleColorSelect(col)}
                    />
                  ))}
                </div>
              )}
            </div>

            <button title="Set Reminder" onClick={() => setShowReminderModal(true)}>
              <FaCalendarAlt className="hover:text-blue-500" />
            </button>
            <button title="Lock/Unlock" onClick={handleLockToggle}>
              {note.locked ? <FaLock className="hover:text-red-500" /> : <FaUnlock />}
            </button>
          </div>

          <div className="flex gap-2">
            <button title="Emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <BsEmojiSmile className="hover:text-yellow-500" />
            </button>
            <button title="Delete" onClick={handleDelete}>
              <FaTrashAlt className="hover:text-red-500" />
            </button>
          </div>
        </div>

        {showEmojiPicker && (
          <div className="absolute z-50 top-16">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        {showReminderModal && (
          <div className="absolute z-50 top-16 left-0 right-0 bg-white p-4 rounded shadow-lg">
            <p className="text-sm font-semibold mb-2">Set Reminder Time:</p>
    <input
  ref={reminderRef}
  type="datetime-local"
  className="mb-2 w-full"
  required
/>

            <button
              onClick={handleReminderSet}
              className="w-full bg-scribblyYellow py-1 rounded-full font-semibold"
            >
              Save Reminder
            </button>
          </div>
        )}

        <textarea
          disabled={note.locked}
          value={note.text}
          onChange={handleTextChange}
          className="w-full bg-transparent outline-none resize-none text-gray-800 hover:text-red-500 font-medium"
          rows={5}
          placeholder="Type here..."
        />
      </div>
    </Draggable>
  );
} 
