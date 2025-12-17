import { MessageCircle } from "lucide-react";

function IntroPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-300 text-white px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <MessageCircle size={60} className="text-blue-400" />
        </div>

        <h1 className="text-4xl font-bold mb-3">Welcome to ChatWave</h1>
        <p className="text-gray-300 mb-6">
          A real-time messaging app where you can chat with friends instantly.
        </p>

        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
          Start Chatting
        </button>
      </div>
    </div>
  );
}

export default IntroPage;
