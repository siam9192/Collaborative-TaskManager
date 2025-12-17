
function HomePage() {
  const user = {
    name: "Siam Hasan",
    email: "siam@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    joinedAt: "Jan 2024",
    status: "Online",
  };

  const metadata = [
    {
      label: "Created Tasks",
      value: 10,
    },
    {
      label: "Assigned Tasks",
      value: 20,
    },
    {
      label: "Overdue Tasks",
      value: 10,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Profile Section */}
      <div className="bg-base-200 p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-6">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary"
          />

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm opacity-70">{user.email}</p>

            <div className="flex gap-4 mt-3 text-sm flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                Joined: {user.joinedAt}
              </span>
              <span className="px-3 py-1 rounded-full bg-success/10 text-success font-medium">
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* Metadata Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-6 gap-4">
          {metadata.map((item) => (
            <div
              key={item.label}
              className="p-4 bg-base-300 rounded-xl text-center"
            >
              <h4 className="text-3xl font-bold">{item.value}</h4>
              <p className="text-sm opacity-70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
