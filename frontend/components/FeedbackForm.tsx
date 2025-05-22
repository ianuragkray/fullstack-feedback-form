// components/FeedbackForm.tsx
'use client';

import { useState, useEffect } from 'react';

type Props = {
  initialValues?: {
    fullname: string;
    email: string;
    gender: string;
    description: string;
  };
  onSubmit: (data: {
    fullname: string;
    email: string;
    gender: string;
    description: string;
  }) => void;
};

export default function FeedbackForm({ initialValues, onSubmit }: Props) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialValues) {
      setFullname(initialValues.fullname);
      setEmail(initialValues.email);
      setGender(initialValues.gender);
      setDescription(initialValues.description);
    }
  }, [initialValues]);

  const handleReset = () => {
    setFullname('');
    setEmail('');
    setGender('');
    setDescription('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ fullname, email, gender, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Full Name" className="w-full border p-2 rounded" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
      <select value={gender} onChange={e => setGender(e.target.value)} className="w-full border p-2 rounded">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" />

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={handleReset} className="border border-gray-400 px-4 py-2 rounded">Reset</button>
      </div>
    </form>
  );
}
