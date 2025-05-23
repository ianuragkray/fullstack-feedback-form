'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function FeedbackForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    gender: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Inside your component:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.fullname || !form.email || !form.gender || !form.description) {
    toast.error('All fields are required!');
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedbacks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error('Failed to submit feedback');

    toast.success('Feedback submitted successfully!');
    setTimeout(() => {
      router.push('/feedback-list');
    }, 2000);
  } catch (error) {
    toast.error('Something went wrong. Please try again.');
    console.error(error);
  }
};

  const handleReset = () => {
    setForm({ fullname: '', email: '', gender: '', description: '' });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-xl font-bold mb-4">Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <input name="fullname" value={form.fullname} onChange={handleChange} placeholder="Full Name" className="w-full mb-2 p-2 border" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full mb-2 p-2 border" />
        <select name="gender" value={form.gender} onChange={handleChange} className="w-full mb-2 p-2 border">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full mb-2 p-2 border" />
        <div className="flex gap-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          <button type="button" onClick={handleReset} className="px-4 py-2 border rounded">Reset</button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
