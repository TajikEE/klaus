<template>
  <div class="root">
    <span v-if="userStore.users.length === 0" class="action-text"
      >There are no users</span
    >
    <span v-else class="action-text"
      >{{ userStore.selectedUsers.length }} users selected</span
    >

    <div class="btn-group" v-if="userStore.selectedUsers.length">
      <ButtonSecondary @click="editUsers" class="spacing">
        <img class="icon" src="../assets/icons/edit.svg" /> Edit
      </ButtonSecondary>
      <ButtonSecondary @click="deleteUsers">
        <img class="icon" src="../assets/icons/trash.svg" /> Delete
      </ButtonSecondary>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/users";
import ButtonSecondary from "./ButtonSecondary.vue";

const userStore = useUserStore();

const editUsers = () => {
  userStore.showModal = true;
};

const deleteUsers = () => {
  userStore.deleteUsers();
};
</script>

<style scoped>
.root {
  display: flex;
  align-items: center;
  padding: 12px 32px;
}

.icon {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}

.spacing {
  margin-left: 24px;
  margin-right: 8px;
}

.btn-group {
  display: flex;
  align-items: center;
}

.action-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  color: var(--color-text-2);
}
</style>
