import { useState } from "react";
import Button from "./Button";

function AddFriendForm({ onAddFrined }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");

  function handelSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    console.log(newFriend);
    onAddFrined(newFriend);
  }

  return (
    <>
      <form className="form-add-friend" onSubmit={handelSubmit}>
        <label>👦🏻Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>🖼️ Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button>Add friend</Button>
      </form>
    </>
  );
}

export default AddFriendForm;
