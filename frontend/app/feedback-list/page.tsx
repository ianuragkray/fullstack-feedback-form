'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Feedback = {
  id: number;
  fullname: string;
  email: string;
  gender: string;
  description: string;
};

export default function FeedbackList() {
  const [data, setData] = useState<Feedback[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedbacks`)
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedbacks/${id}`, {
      method: 'DELETE',
    });
    setData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Feedback List</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="p-2 border">{item.fullname}</td>
              <td className="p-2 border">{item.email}</td>
              <td className="p-2 border">{item.gender}</td>
              <td className="p-2 border">{item.description}</td>
              <td className="p-2 border flex gap-2">
                <button onClick={() => router.push(`/edit/${item.id}`)} className="text-blue-600 underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
