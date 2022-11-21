<template>
  <div class="root">
    <div v-if="userStore.isError">There was a problem, please try again!</div>
    <div v-if="userStore.isLoading === true">Loading</div>
    <div v-else ref="tableRef" class="table-container">
      <TableActionBar />
      <table>
        <thead>
          <tr>
            <th class="checkbox-header">
              <input
                type="checkbox"
                :checked="
                  userStore.selectedUsers.length && userStore.isToggleClicked
                "
                @click="toggleSelectAllUsers"
              />
            </th>
            <th v-for="header in headers" :key="header">
              <button
                @mouseover="isHovering = true"
                @mouseout="isHovering = false"
                class="sub-text header-button"
                @click="sort(header)"
              >
                {{ header }}

                <img
                  v-if="isHovering"
                  class="arrow-down"
                  src="../assets/icons/arrow-down.svg"
                />
                <img
                  v-else-if="sortedBy === header"
                  class="arrow-down"
                  src="../assets/icons/arrow-down.svg"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            v-for="user in users"
            :key="user.id"
            :user="user"
            @click="userStore.toggleSelect(user)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/users";
import TableRow from "./TableRow.vue";
import { storeToRefs } from "pinia";
import TableActionBar from "./TableActionBar.vue";
import { initiateSeedData } from "../api/users.api";
import { useScroll, whenever } from "@vueuse/core";

const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const isHovering = ref(false);
const sortedBy = ref("");

onMounted(async () => {
  await initiateSeedData();

  userStore.getUsers(0);
});

const headers = ref(["User", "Permission"]);

const sort = (key) => {
  if (key === "User") {
    sortedBy.value = "User";
    users.value = users.value.sort((a, b) => a.name.localeCompare(b.name));
  } else if (key === "Permission") {
    sortedBy.value = "Permission";
    users.value = users.value.sort((a, b) => a.role.localeCompare(b.role));
  }
};

const toggleSelectAllUsers = () => {
  userStore.toggleSelectAllUsers();
};

const tableRef = ref(null);

const { arrivedState } = useScroll(tableRef);

whenever(
  () => arrivedState.bottom,
  () => {
    userStore.currentPage++;

    userStore.getUsers(userStore.currentPage);
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="scss">
.root {
  margin: 18px 0;
}
.table-container {
  background: var(--color-background-2);
  width: 716px;
  height: 726px;
  overflow-y: scroll;
}

table {
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  margin-bottom: 26px;
  grid-template-columns:
    minmax(44px, 0.27fr)
    minmax(150px, 1.5fr)
    minmax(150px, 1.26fr);
}

thead,
tbody,
tr {
  display: contents;
}

th {
  position: sticky;
  top: 0;
  text-align: left;
}

td {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header-button {
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.arrow-down {
  margin-left: 4px;
  width: 12px;
  height: 12px;
}

.checkbox-header {
  padding: 0 16px 0 34px;
}
</style>
