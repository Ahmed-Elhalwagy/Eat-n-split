import { useState } from "react";
import Button from "./Button";

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

export default SplitBillForm;
