'use client';
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import EarthMap from './EarthMap';

const isMessageNegative = async (message: string): Promise<boolean> => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "system",
          content: `Bạn là người kiểm duyệt bảo vệ không gian năng lượng tinh khiết của Trái Đất. Từ chối các thông điệp có giọng điệu tiêu cực. Trả lời "Có" nếu tiêu cực, còn lại "Không".`,
        },
        {
          role: "user",
          content: `Thông điệp này có tiêu cực không? Trả lời Có hoặc Không: \"${message}\"`,
        },
      ],
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content?.toLowerCase().trim();
  return reply?.includes('có') || reply?.includes('yes');
};

const groqReply = async (userMessage: string): Promise<string> => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "system",
          content: "Bạn là linh hồn Trái Đất, luôn cảm ơn con người bằng lời trìu mến.",
        },
        {
          role: "user",
          content: `Viết lời cảm ơn ngắn gọn cho thông điệp: \"${userMessage}\"`,
        },
      ],
      temperature: 0.4,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Cảm ơn bạn vì lời yêu thương tuyệt vời 💚";
};

const getLocation = async () => {
  try {
    const res = await fetch('https://ipapi.com/ip_api.php?access_key=16c53552abf007a01e1153ec517cbb33&format=1');
    const data = await res.json();
    return {
      country: data.country_name,
      lat: data.latitude,
      lon: data.longitude,
    };
  } catch (err) {
    console.error('Không lấy được vị trí:', err);
    return null;
  }
};

export default function LoveToEarthLanding() {
  const [showForm, setShowForm] = useState(false);
  const [loveMessage, setLoveMessage] = useState('');
  const [submittedMessages, setSubmittedMessages] = useState<string[]>([]);
  const [thankYouMessage, setThankYouMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await isMessageNegative(loveMessage)) {
      alert('Thông điệp chưa đủ tích cực. Hãy lan tỏa năng lượng yêu thương 💫');
      return;
    }

    try {
      const location = await getLocation();
      await addDoc(collection(db, 'loveMessages'), {
        message: loveMessage,
        createdAt: serverTimestamp(),
        location: location || null,
      });

      const aiReply = await groqReply(loveMessage);
      setThankYouMessage(aiReply);

      setSubmittedMessages([...submittedMessages, loveMessage]);
      setLoveMessage('');
      setShowForm(false);
      setTimeout(() => setThankYouMessage(null), 10000);
    } catch (error) {
      console.error('Lỗi gửi:', error);
      alert('Lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <div className="mt-10">
        <EarthMap />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-blue-100 p-4 md:p-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800">Love To Earth 🌍</h1>
          <p className="text-lg md:text-xl text-gray-700">
            Gửi lời yêu thương và năng lượng chữa lành đến Trái Đất mỗi ngày.
          </p>

          <div className="grid md:grid-cols-3 gap-4 pt-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-2">📝 Gửi lời yêu thương</h2>
              <p className="text-sm text-gray-600 mb-4">
                Viết một câu chúc gửi đến Trái Đất – bất cứ lúc nào bạn nhớ đến.
              </p>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
              >
                {showForm ? 'Đóng form' : 'Viết lời yêu thương'}
              </button>

              {showForm && (
                <form onSubmit={handleSubmit} className="mt-4 space-y-2 text-left">
                  <textarea
                    value={loveMessage}
                    onChange={(e) => setLoveMessage(e.target.value)}
                    placeholder="Trái Đất ơi, mình yêu bạn..."
                    className="w-full p-2 rounded-xl border border-gray-300 text-black"
                    rows={3}
                  />
                  <button
                    type="submit"
                    className="bg-green-700 text-white py-2 px-4 rounded-xl hover:bg-green-800 transition"
                  >
                    Gửi lời chúc
                  </button>
                </form>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-2">🧘‍♀️ Thiền định chữa lành</h2>
              <p className="text-sm text-gray-600 mb-4">
                Dành vài phút thiền định, gửi ánh sáng từ trái tim bạn đến Trái Đất.
              </p>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition">
                Bắt đầu thiền
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-2">📣 Chia sẻ cảm nhận</h2>
              <p className="text-sm text-gray-600 mb-4">
                Viết nhật ký hoặc cảm nhận sau khi thực hành gửi năng lượng.
              </p>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition">
                Chia sẻ ngay
              </button>
            </div>
          </div>

          {submittedMessages.length > 0 && (
            <div className="mt-10 text-left max-w-xl mx-auto bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-green-700 text-xl font-bold mb-4">🌱 Những lời yêu thương đã gửi:</h3>
              <ul className="space-y-2 text-gray-800 text-sm">
                {submittedMessages.map((msg, idx) => (
                  <li key={idx} className="bg-green-50 p-3 rounded-xl border border-green-200">
                    {msg}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {thankYouMessage && (
            <div className="mt-6 max-w-xl mx-auto p-4 bg-green-100 border-l-4 border-green-500 text-green-900 rounded-xl shadow-md transition-all duration-500">
              <h4 className="font-semibold mb-2">🌍 Lời cảm ơn từ Trái Đất:</h4>
              <p className="text-sm italic">{thankYouMessage}</p>
              <button
                className="mt-2 text-xs text-green-700 underline"
                onClick={() => setThankYouMessage(null)}
              >
                Đóng lời cảm ơn
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
