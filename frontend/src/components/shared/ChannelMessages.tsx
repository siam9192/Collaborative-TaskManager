import { useState, useEffect, useRef } from "react";
import MessageWriteBox from "../ui/MessageWriteBox";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  at: Date;
}

// Fake messages
const fakeMessages: Message[] = [
  {
    id: "1",
    sender: { id: "1", name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
    content: "Hey everyone! 👋",
    at: new Date(),
  },
  {
    id: "2",
    sender: { id: "2", name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
    content: "Hi Alice! How's it going?",
    at: new Date(),
  },
  {
    id: "3",
    sender: { id: "1", name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
    content: "All good! Just testing this chat app.",
    at: new Date(),
  },
];

function ChannelMessages() {
  const [messages, setMessages] = useState<Message[]>([...fakeMessages,...fakeMessages,...fakeMessages]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="lg:flex-1 overflow-y-auto px-4 pt-8 pb-14 bg-base-100  h-full">
      {messages.map((msg) => (
       <div>
        <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
      />
    </div>
  </div>
  <div className="chat-header">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
      />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">Seen at 12:46</div>
</div>
       </div>
      ))}

      <div ref={messagesEndRef}></div>
    
    </div>
  );
}

export default ChannelMessages;
