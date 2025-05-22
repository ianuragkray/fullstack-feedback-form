// app/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FeedbackForm from '@/components/FeedbackForm';


type Feedback = {
  id: number;
  fullname: string;
  email: string;
  gender: string;
  description: string;
};

export default function EditFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
  if (params?.id) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedbacks`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const matched = data.find((item: any) => String(item.id) === String(params.id));
        setFeedback(matched || null);
      })
      .catch(err => {
        console.error('Error fetching feedback:', err);
      });
  }
}, [params]);



  const handleUpdate = async (updatedFeedback: Omit<Feedback, 'id'>) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedbacks/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFeedback),
    });

    router.push('/feedback-list');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Feedback</h1>
      {feedback ? (
        <FeedbackForm
          initialValues={feedback}
          onSubmit={handleUpdate}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
