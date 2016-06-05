import {MOCK_API_DELAY} from '../constants/env';

const friends = [
  {
    id: 15734,
    first_name: "Barry",
    last_name: "Linco",
    email: "barry@linco.com",
    twitter: "@blinc",
    total_articles: 0
  },
  {
    id: 15735,
    first_name: "Trish",
    last_name: "Baby",
    email: "baby@baby.com",
    twitter: "@babybaby",
    total_articles: 0
  },
  {
    id: 15728,
    first_name: "Leila",
    last_name: "Chambers",
    email: "woxa@yahoo.com",
    twitter: "@RoLqDLY_283",
    total_articles: 4
  },
  {
    id: 15724,
    first_name: "Holly",
    last_name: "Delgado",
    email: "danaly@yahoo.com",
    twitter: "@JyHNJRl_332",
    total_articles: 0
  },
  {
    id: 15725,
    first_name: "Harper",
    last_name: "Wheeler",
    email: "nilip@gmail.com",
    twitter: "@RvmcjRg_736",
    total_articles: 0
  },
  {
    id: 15722,
    first_name: "Otto",
    last_name: "Zimmerman",
    email: "lygolivaki@gmail.com",
    twitter: "@rvnfPEK_026",
    total_articles: 1
  },
  {
    id: 15730,
    first_name: "Jimmy",
    last_name: "Jones",
    email: "jimmy.jones@gmail.com",
    twitter: "@SlimJimJones",
    total_articles: 1
  }
];

class FriendsApi {
  static fetchFriends() {
    console.log('LOG: using mock friends API.'); // eslint-disable-line no-console
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({friends: Object.assign([], friends)});
      }, MOCK_API_DELAY);
    });
  }
}

export default FriendsApi;
