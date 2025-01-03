import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface ProfileFieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  onSave: (value: string) => void;
}

export default function ProfileField({ label, value, icon, onSave }: ProfileFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-lg rounded-xl">
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}: {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="bg-gray-700/50 text-white px-2 py-1 rounded-lg"
            autoFocus
            onBlur={handleSave}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
        ) : value}</span>
      </div>
      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>
          <Edit2 className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
}