<template>
  <ModalComp
    :show="userStore.showModal"
    @onBackdrop="userStore.showModal = false"
  >
    <template #header>
      <h2>Edit user</h2>
    </template>
    <template #body>
      <div class="inputs-container" v-for="user in users" :key="user.id">
        <div class="input-group">
          <label for="name">Name</label>
          <input class="text-input" type="text" id="name" v-model="user.name" />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input
            class="text-input"
            type="email"
            id="email"
            v-model="user.email"
          />
        </div>
        <div class="input-group">
          <label for="role">Role</label>
          <select class="text-input" id="role" v-model="user.role">
            <option
              v-for="role in Object.keys(ROLES)"
              :key="role"
              :value="role"
            >
              {{ role }}
            </option>
          </select>
        </div>
      </div>
    </template>
    <template #footer>
      <ButtonSecondary class="close-btn" @click="userStore.showModal = false">
        Close</ButtonSecondary
      >
    </template>
  </ModalComp>
</template>

<script setup>
import { computed } from "vue";
import ModalComp from "./ModalComp.vue";
import { useUserStore } from "../stores/users";
import { ROLES } from "../constants/roles";
import ButtonSecondary from "../components/ButtonSecondary.vue";

const userStore = useUserStore();
const users = computed(() =>
  userStore.users.filter((user) => userStore.selectedUsers.includes(user.id))
);
</script>

<style scoped lang="scss">
.inputs-container {
  width: 100%;
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}
.close-btn {
  width: 60px;
}
</style>
