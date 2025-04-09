import React from "react";

export default function LoveToEarthLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-blue-100 p-4 md:p-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800">
          Love To Earth 🌍
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Gửi lời yêu thương và năng lượng chữa lành đến Trái Đất mỗi ngày qua thiền định, lời chúc, và sự tỉnh thức.
        </p>

        <div className="grid md:grid-cols-3 gap-4 pt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">📝 Gửi lời yêu thương</h2>
            <p className="text-gray-600 text-sm mb-4">
              Viết một lời chúc gửi đến Trái Đất – bạn có thể làm điều đó bất cứ khi nào bạn nhớ về Trái Đất.
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition">
              Viết lời yêu thương
            </button>
          </div>

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

        <p className="text-sm text-gray-500 pt-6">
          “Tôi xin lỗi – Hãy tha thứ cho tôi – Cảm ơn bạn – Tôi yêu bạn.” – Ho'oponopono cho Trái Đất 🌱
        </p>
      </div>
    </div>
  );
}
