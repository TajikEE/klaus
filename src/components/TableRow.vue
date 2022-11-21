<template>
  <tr>
    <td
      :class="[
        'checkbox-column',
        userStore.selectedUsers.includes(user.id) && [
          'selected-border',
          'selected-bg',
        ],
      ]"
    >
      <input
        type="checkbox"
        :checked="userStore.selectedUsers.includes(user.id)"
      />
    </td>
    <td
      :class="[
        'column',
        userStore.selectedUsers.includes(user.id) && 'selected-bg',
      ]"
    >
      <Avatar class="avatar" :url="user.avatar" />
      <div>
        <p>{{ user.name }}</p>
        <p class="sub-text">{{ user.email }}</p>
      </div>
    </td>
    <td
      :class="[
        'column',
        'spacing',
        userStore.selectedUsers.includes(user.id) && 'selected-bg',
      ]"
    >
      <TagComp :tagDetails="getRoleDetails" />

      <div class="btn-group">
        <ButtonSecondary class="btn btn-space" @click.stop="edit">
          <img
            class="icon icon-space"
            src="../assets/icons/edit.svg"
          />Edit</ButtonSecondary
        >
        <ButtonSecondary class="btn" @click.stop="deleteUser">
          <img class="icon" src="../assets/icons/trash.svg"
        /></ButtonSecondary>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "../stores/users";
import Avatar from "./Avatar.vue";
import TagComp from "./TagComp.vue";
import { ROLES } from "../constants/roles";
import ButtonSecondary from "./ButtonSecondary.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();

const edit = () => {
  if (!userStore.selectedUsers.includes(props.user.id)) {
    userStore.toggleSelect(props.user);
  }
  userStore.showModal = true;
};

const deleteUser = () => {
  userStore.deleteUser(props.user.id);
};

const getRoleDetails = computed(() => {
  if (props.user.role === ROLES.ADMIN) {
    return {
      text: "Admin",
      color: "#EFE2FE",
    };
  } else if (props.user.role === ROLES.ACCOUNT_MANAGER) {
    return {
      text: "Account manager",
      color: "#FEDDE6",
    };
  } else if (props.user.role === ROLES.AGENT) {
    return {
      text: "Agent",
      color: "#C8E7F9",
    };
  } else if (props.user.role === ROLES.EXTERNAL_REVIEWER) {
    return {
      text: "External reviewer",
      color: "#FEEBC8",
    };
  }
});
</script>

<style scoped>
.checkbox-column {
  display: flex;
  align-items: center;
  margin-left: 14px;
  margin-bottom: 4px;
  padding-left: 16px;
  border: 4px solid transparent;
  height: 64px;
}

.column {
  display: flex;
  align-items: center;
}

.spacing {
  margin-right: 16px;
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.selected-border {
  border-left: 4px solid var(--color-border-2);
}

.selected-bg {
  background: var(--color-background-3);
}

.btn-group {
  display: flex;
  align-items: center;
}
.btn {
  opacity: 0;
}

.btn-space {
  margin-right: 4px;
}

.icon-space {
  margin-right: 8px;
}

.icon {
  width: 16px;
  height: 16px;
}

tr:hover .btn {
  opacity: 1;
}

tr:hover {
  cursor: pointer;
}
</style>
