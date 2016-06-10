/* eslint-disable no-undef */
class FriendsApi {
  static fetchFriends() {
    return Stamplay.Object('friend')
      .findByCurrentUser();
  }

  static saveFriend(friend) {
    return Stamplay.Object('friend')
      .save(friend);
  }

  static updateFriend(friend) {
    return Stamplay.Object('friend')
      .patch(friend.id, friend);
  }

  static deleteFriend(friendId) {
    return Stamplay.Object('friend')
      .remove(friendId);
  }
}

export default FriendsApi;
