import { useState } from "react";

import Button from "./components/Button";
import FriendsList from "./components/FriendsList";
import AddFriendForm from "./components/AddFriendForm";
import SplitBillForm from "./components/SplitBillForm";

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
