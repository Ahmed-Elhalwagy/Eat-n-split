import Friend from "./Friend";

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

export default FriendsList;
