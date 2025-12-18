import { useState } from "react";

interface Member {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  members: Member[];
  lastMessage: {
    content: string;
    at: Date;
  };
}

// Fake data
const fakeChannel: Channel = {
  id: "1",
  name: "general",
  avatar: "https://i.pravatar.cc/150?img=10",
  lastMessage: {
    content: "Welcome to the general channel!",
    at: new Date(),
  },
  members: [
    { id: "1", name: "Alice", avatar: "https://i.pravatar.cc/150?img=1", isActive: true },
    { id: "2", name: "Bob", avatar: "https://i.pravatar.cc/150?img=2", isActive: true },
    { id: "3", name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3", isActive: false },
    { id: "4", name: "David", avatar: "https://i.pravatar.cc/150?img=4", isActive: true },
  ],
};

function ChannelSidebar() {
  const [channel] = useState<Channel>(fakeChannel);

  const totalMembers = channel.members.length;
  const activeMembers = channel.members.filter((m) => m.isActive).length;

  return (
    <aside className="bg-base-200 border-l border-base-300 h-[calc(100vh-52px)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300 flex items-center gap-3">
        <img
          src={channel.avatar}
          alt={channel.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">#{channel.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {activeMembers} / {totalMembers} active
          </p>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">
          Members (23)
        </h3>
        <ul className="flex flex-col gap-2">
          {channel.members
            .sort((a, b) => Number(b.isActive) - Number(a.isActive))
            .map((member) => (
              <li key={member.id} className="flex items-center gap-3 p-2 rounded hover:bg-base-300">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className={`w-8 h-8 rounded-full object-cover ${
                    member.isActive ? "ring-2 ring-green-500" : "opacity-50"
                  }`}
                />
                <span className={`${member.isActive ? "font-medium" : "text-gray-400"}`}>
                  {member.name}
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 border-t border-base-300 flex flex-col gap-2">
        <button className="btn btn-outline btn-sm btn-block">Add Member</button>
        <button className="btn btn-error btn-sm btn-block">Leave Channel</button>
      </div>
    </aside>
  );
}

export default ChannelSidebar;
