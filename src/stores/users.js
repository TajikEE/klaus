import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { fetchSearchUsers, fetchTableUsers } from "../api/users.api";

export const useUserStore = defineStore("users", () => {
  const isLoading = ref(false);
  const isSearching = ref(false);
  const isError = ref(false);
  const users = ref([]);
  const selectedUsers = ref([]);
  const isToggleClicked = ref(false);

  const showModal = ref(false);

  const currentPage = ref(0);

  function getUsers(page) {
    try {
      isLoading.value = true;

      const response = fetchTableUsers(page);
      users.value = users.value.concat(response.users);

      isLoading.value = false;
    } catch (ex) {
      console.error(ex);
      isLoading.value = false;
      isError.value = true;
    }
  }

  function toggleSelect(user) {
    if (selectedUsers.value.includes(user.id)) {
      selectedUsers.value.splice(
        selectedUsers.value.findIndex((v) => v === user.id),
        1
      );
    } else {
      selectedUsers.value.push(user.id);
    }
  }

  function toggleSelectAllUsers() {
    if (selectedUsers.value.length) {
      selectedUsers.value = [];
      isToggleClicked.value = false;
    } else if (selectedUsers.value.length === users.value.length) {
      selectedUsers.value = [];
      isToggleClicked.value = false;
    } else {
      selectedUsers.value = users.value.map((user) => user.id);
      isToggleClicked.value = true;
    }
  }

  function sortUsers(key) {
    users.value = users.value.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  }

  const deleteUser = (id) => {
    users.value = users.value.filter((user) => user.id !== id);
  };

  const deleteUsers = () => {
    users.value = users.value.filter((user) => {
      return !selectedUsers.value.includes(user.id);
    });
  };

  const getSearchResult = (search) => {
    isLoading.value = true;
    if (search.length >= 3) {
      const response = fetchSearchUsers();
      users.value = response.filter((user) => {
        return search
          .toLowerCase()
          .split(" ")
          .every((v) => user.name.toLowerCase().includes(v));
      });
      isLoading.value = false;
    } else {
      users.value = [];
      getUsers(0);
      // isLoading.value = false;
    }
  };

  return {
    users,
    getUsers,
    selectedUsers,
    toggleSelect,
    toggleSelectAllUsers,
    isToggleClicked,
    showModal,
    currentPage,
    sortUsers,
    deleteUser,
    deleteUsers,
    getSearchResult,
  };
});
