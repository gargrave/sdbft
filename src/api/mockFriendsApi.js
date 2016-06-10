import {MOCK_API_DELAY} from '../constants/env';

let id = 0;
const friends = [
  {
    id: id++,
    firstName: "Barry",
    lastName: "Linco",
    email: "barry@linco.com",
    twitter: "@blinc",
    total_articles: 0
  },
  {
    id: id++,
    firstName: "Trish",
    lastName: "Baby",
    email: "baby@baby.com",
    twitter: "@babybaby",
    total_articles: 0
  },
  {
    id: id++,
    firstName: "Leila",
    lastName: "Chambers",
    email: "woxa@yahoo.com",
    twitter: "@RoLqDLY_283",
    total_articles: 4
  },
  {
    id: id++,
    firstName: "Holly",
    lastName: "Delgado",
    email: "danaly@yahoo.com",
    twitter: "@JyHNJRl_332",
    total_articles: 0
  },
  {
    id: id++,
    firstName: "Harper",
    lastName: "Wheeler",
    email: "nilip@gmail.com",
    twitter: "@RvmcjRg_736",
    total_articles: 0
  },
  {
    id: id++,
    firstName: "Otto",
    lastName: "Zimmerman",
    email: "lygolivaki@gmail.com",
    twitter: "@rvnfPEK_026",
    total_articles: 1
  },
  {
    id: id++,
    firstName: "Jimmy",
    lastName: "Jones",
    email: "jimmy.jones@gmail.com",
    twitter: "@SlimJimJones",
    total_articles: 1
  }
];

class FriendsApi {
  static fetchFriends() {
    console.log('LOG: using mock friends API -> fetch all.'); // eslint-disable-line no-console
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({friends: Object.assign([], friends)});
      }, MOCK_API_DELAY);
    });
  }

  static createFriend(payload) {
    console.log('LOG: using mock friends API -> create.'); // eslint-disable-line no-console
    let friend = payload.friend;
    return new Promise((resolve) => {
      setTimeout(() => {
        friend.id = id++;
        friends.push(friend);
        resolve({friend: Object.assign([], friend)});
      }, MOCK_API_DELAY);
    });
  }
}

export default FriendsApi;
