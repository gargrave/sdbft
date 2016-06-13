/* eslint-disable no-console */
import {MOCK_API_DELAY} from '../../constants/env';


let id = 0;
const friends = [
  {
    id: id++,
    first_name: "Barry",
    last_name: "Linco",
    email: "barry@linco.com",
    twitter: "@blinc",
    total_articles: 0
  },
  {
    id: id++,
    first_name: "Trish",
    last_name: "Baby",
    email: "baby@baby.com",
    twitter: "@babybaby",
    total_articles: 0
  },
  {
    id: id++,
    first_name: "Leila",
    last_name: "Chambers",
    email: "woxa@yahoo.com",
    twitter: "@RoLqDLY_283",
    total_articles: 4
  },
  {
    id: id++,
    first_name: "Holly",
    last_name: "Delgado",
    email: "danaly@yahoo.com",
    twitter: "@JyHNJRl_332",
    total_articles: 0
  },
  {
    id: id++,
    first_name: "Harper",
    last_name: "Wheeler",
    email: "nilip@gmail.com",
    twitter: "@RvmcjRg_736",
    total_articles: 0
  },
  {
    id: id++,
    first_name: "Otto",
    last_name: "Zimmerman",
    email: "lygolivaki@gmail.com",
    twitter: "@rvnfPEK_026",
    total_articles: 1
  },
  {
    id: id++,
    first_name: "Jimmy",
    last_name: "Jones",
    email: "jimmy.jones@gmail.com",
    twitter: "@SlimJimJones",
    total_articles: 1
  }
];

class FriendsApi {
  static fetchFriends() {
    console.log('LOG: using mock friends API -> fetchFriends().');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({friends: Object.assign([], friends)});
      }, MOCK_API_DELAY);
    });
  }

  static createFriend(data) {
    console.log('LOG: using mock friends API -> createFriend().');
    let friend = data.friend;
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
