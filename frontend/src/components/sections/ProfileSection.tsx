
 const user = {
    name: "Siam Hasan",
    email: "siam@example.com",
    username:"siamTy",
    gender:"Male",
    profilePicture: "https://i.pravatar.cc/150?img=12",
    createdAt: "Jan 2024",
    status: "Active",
  };


function ProfileSection() {
  return (
    <div className="bg-base-100 p-3 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
  <div className="flex md:flex-row flex-col items-center gap-6">
    {/* Avatar */}
    <img
      src={user.profilePicture}
      alt="avatar"
      className="w-24 h-24 rounded-full object-cover border-2 border-primary"
    />

    {/* User Info */}
    <div className="flex-1">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-sm opacity-70">@{user.username}</p>
      <p className="text-sm opacity-70">{user.email}</p>

      <div className="flex md:flex-row md:gap-0 gap-4 flex-col lg:justify-between items-center">
        {/* Badges */}
      <div className="flex gap-3 mt-4 flex-wrap">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
          Joined: {user.createdAt}
        </span>
        <span className="px-3 py-1 rounded-full bg-success/10 text-success font-medium">
          {user.status}
        </span>
        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">
          {user.gender}
        </span>
      </div>
      <div>
        <button className="btn btn-primary">Edit Profile</button>
      </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProfileSection