import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export type AssignUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
};

interface Props {
  onAssign: (id:string) => void;
  onClose:()=>void
}

const mockUsers: AssignUser[] = [
  {
    id: "1",
    name: "Siam Hasan",
    username: "siamTy",
    email: "siam@example.com",
    profilePicture: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: "2",
    name: "John Doe",
    username: "john_d",
    email: "john@example.com",
    profilePicture: "https://i.pravatar.cc/100?img=32",
  },
];

function AssignToDialog({ onAssign,onClose }: Props) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<AssignUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    // 🔁 Replace with API call later
    const filtered = mockUsers.filter(
      (user) =>
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
    );

    setUsers(filtered);
  }, [query]);

  const close = ()=>{
    (document.getElementById("assign-user-dialog") as HTMLDialogElement)?.close();
     onClose()
  }
  const handleAssign = () => {
    if (!selectedUserId) return;

    onAssign(selectedUserId);
    setQuery("");
    setUsers([]);
    setSelectedUserId(null);
   
    close()
    
  };

  useEffect(()=>{
      (document.getElementById("assign-user-dialog") as HTMLDialogElement)?.showModal()
  },[])

  return (
    <>


      {/* Dialog */}
      <dialog id="assign-user-dialog" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Assign Task To</h3>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 opacity-50" size={18} />
            <input
              type="text"
              placeholder="Search by email or username"
              className="input input-bordered w-full pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* User Results */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {users.length === 0 && query && (
              <p className="text-sm opacity-60">No users found</p>
            )}

            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border
                ${
                  selectedUserId === user.id
                    ? "border-primary bg-primary/10"
                    : "border-base-200 hover:bg-base-200"
                }`}
              >
                <img
                  src={user.profilePicture}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm opacity-70">
                    @{user.username} • {user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              disabled={!selectedUserId}
              onClick={handleAssign}
            >
              Assign
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AssignToDialog;
