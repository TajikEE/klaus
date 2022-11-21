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

export function fetchSearchUsers(query) {
  return usersData.users
    .filter((user) => {
      return query
        .toLowerCase()
        .split(" ")
        .every((v) => user.name.toLowerCase().includes(v));
    })
    .splice(0, PAGE_SIZE);
}

export async function initiateSeedData() {
  usersData = await (
    await fetch(
      "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json"
    )
  ).json();
}
