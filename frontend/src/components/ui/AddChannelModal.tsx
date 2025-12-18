import React, { useRef, useState } from "react";

const privacyOptions = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Private",
    value: "private",
  },
];

function AddChannelModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const openModal = () => modalRef.current?.showModal();
  const closeModal = () => {
    modalRef.current?.close();
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const channelName = nameRef.current?.value.trim();
    if (!channelName) return;

    console.log("New channel:", { name: channelName, avatarFile });

    closeModal();
  };

  return (
    <>
      {/* Open modal button */}
      <button className="btn btn-primary w-full" onClick={openModal}>
        + Add Channel
      </button>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Create a New Channel</h3>

          {/* Avatar Input */}
          <div className="mt-5">
            <label className="flex flex-col items-center gap-3 cursor-pointer">
              <div className="size-24 bg-base-300 rounded-full flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover " />
                ) : (
                  <span className="text-2xl">📷</span>
                )}
              </div>
              <span className="text-sm text-gray-600 text-center">Upload Avatar (optional)</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="py-4 flex flex-col gap-3">
            {/* Channel Name */}
            <input
              type="text"
              placeholder="Channel name"
              ref={nameRef}
              className="input input-bordered w-full"
              required
            />

            {/* Privacy */}
            <select defaultValue={privacyOptions[0].value} className="select w-full">
              <option disabled={true} value={"default"}>
                Pick a privacy
              </option>
              {Object.values(privacyOptions).map((_) => (
                <option value={_.value}>{_.label}</option>
              ))}
            </select>

            {/* Modal actions */}
            <div className="modal-action justify-between">
              <button type="button" className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default AddChannelModal;
