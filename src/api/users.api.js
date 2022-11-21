let usersData;

const PAGE_SIZE = 9;

const getPageLimit = (page) => ({
  skip: page * PAGE_SIZE,
  limit: page * PAGE_SIZE + PAGE_SIZE,
});

export function fetchTableUsers(page) {
  const { skip, limit } = getPageLimit(page);

  return {
    users: usersData.users.slice(skip, limit),
    hasNextPage: usersData.length > getPageLimit(page),
  };
}

export function fetchSearchUsers() {
  return usersData.users;
}
function toMap(list, keyProp) {
  const keyValuePairs = list.map((item) => [item[keyProp], item]);
  return new Map(keyValuePairs);
}

export async function initiateSeedData() {
  usersData = await (
    await fetch(
      "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json"
    )
  ).json();
}
