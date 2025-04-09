'use client';
import React, { useState } from 'react';

export default function LoveToEarthLanding() {
  const [showForm, setShowForm] = useState(false);
  const [loveMessage, setLoveMessage] = useState('');
  const [submittedMessages, setSubmittedMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loveMessage.trim() !== '') {
      setSubmittedMessages([...submittedMessages, loveMessage]);
      setLoveMessage('');
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-blue-100 p-4 md:p-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800">Love To Earth 🌍</h1>
        <p className="text-lg md:text-xl text-gray-700">
          Gửi lời yêu thương và năng lượng chữa lành đến Trái Đất mỗi ngày qua thiền định, lời chúc, và sự tỉnh thức.
        </p>

        <div className="grid md:grid-cols-3 gap-4 pt-8">
          {/* Ô Gửi lời yêu thương */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">📝 Gửi lời yêu thương</h2>
            <p className="text-gray-600 text-sm mb-4">
              Viết một lời chúc gửi đến Trái Đất – bạn có thể làm điều đó bất cứ khi nào bạn nhớ về Trái Đất.
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

          {/* Các ô còn lại giữ nguyên */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">🧘‍♀️ Thiền định chữa lành</h2>
            <p className="text-gray-600 text-sm mb-4">
              Dành 1–7 phút để thiền định, gửi ánh sáng từ trái tim bạn lan tỏa đến Trái Đất.
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition">
              Bắt đầu thiền
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">📣 Chia sẻ cảm nhận</h2>
            <p className="text-gray-600 text-sm mb-4">
              Viết nhật ký, cảm nhận sau khi thực hành hoặc lời chúc của bạn đến cộng đồng.
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition">
              Chia sẻ ngay
            </button>
          </div>
        </div>

        {/* Danh sách lời chúc */}
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

        <p className="text-sm text-gray-500 pt-6">
          “Tôi xin lỗi – Hãy tha thứ cho tôi – Cảm ơn bạn – Tôi yêu bạn.” – Ho'oponopono cho Trái Đất 🌱
        </p>
      </div>
    </div>
  );
}
