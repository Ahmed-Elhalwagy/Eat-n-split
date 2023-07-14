import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendsData, setFriendsData] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handelShowAddFriendForm() {
    setShowAddFriend((prev) => !prev);
    // setSelectedFriend(null);
  }

  function handelAddFrined(friend) {
    setFriendsData((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handelSelectFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // setShowAddFriend(false);
  }

  function handelSplitBill(value) {
    console.log(value);
    setFriendsData((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsData={friendsData}
          onSelect={handelSelectFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <AddFriendForm onAddFrined={handelAddFrined} />}
        <Button onClick={handelShowAddFriendForm}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSplit={handelSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendsList({ friendsData, onSelect, selectedFriend }) {
  return (
    <ul>
      {friendsData.map((friend) => {
        return (
          <Friend
            friend={friend}
            key={friend.id}
            onSelect={onSelect}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </ul>
  );
}

function Friend({ friend, onSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}

        <Button onClick={() => onSelect(friend)}>
          {isSelected ? "Close" : "Select"}
        </Button>
      </li>
    </>
  );
}

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

function SplitBillForm({ selectedFriend, onSplit }) {
  const [bill, setBill] = useState(null);
  const [paidByUser, setPaidByUser] = useState(null);
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : "";

  function handelSubmit(e) {
    e.preventDefault();

    if (!bill || !setPaidByUser) return;

    onSplit(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <>
      <form className="form-split-bill" onSubmit={handelSubmit}>
        <h2>Split Bill with {selectedFriend.name}</h2>

        <label>Bill Value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => {
            setBill(Number(e.target.value));
          }}
        />

        <label>Your expense</label>
        <input
          type="text"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill ? bill : Number(e.target.value)
            )
          }
        />

        <label>{selectedFriend.name}'s expense:</label>
        <input type="text" disabled value={paidByFriend} />
        <label>Who is paying the bill</label>

        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Split bill</Button>
      </form>
    </>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
