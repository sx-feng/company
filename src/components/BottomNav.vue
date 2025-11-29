<template>
  <nav class="bottom-nav">
    <button
      v-for="item in items"
      :key="item.id"
      class="nav-item"
      :class="{ active: item.id === modelValue }"
      type="button"
      @click="select(item.id)"
    >
      <span class="nav-icon" aria-hidden="true">
        <img
          :src="iconSet[item.icon]?.[item.id === modelValue ? 'active' : 'inactive']"
          :alt="item.label"
        />
      </span>
      <span class="nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script>
import home from '../assets/styles/home.png';
import homeActive from '../assets/styles/home-active.png';
import artists from '../assets/styles/artists.png';
import artistsActive from '../assets/styles/artists-active.png';
import message from '../assets/styles/message.png';
import messageActive from '../assets/styles/message-active.png';
import profile from '../assets/styles/profile.png';
import profileActive from '../assets/styles/profile-active.png';

export default {
  name: 'BottomNav',
  props: {
    modelValue: String,
    items: Array,
  },
  emits: ['update:modelValue'],
  computed: {
    iconSet() {
      return {
        home: { active: home, inactive: homeActive },
        artists: { active: artistsActive, inactive: artists },
        message: { active: message, inactive: messageActive },
        profile: { active: profile, inactive: profileActive },
      };
    },
  },
  methods: {
    select(id) {
      this.$emit('update:modelValue', id);
    },
  },
};
</script>

<style scoped>
.bottom-nav {
  display: flex;
  background: var(--surface);
  border-top: 1px solid #e5e7eb;
  padding: 6px 0;
  justify-content: space-around;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.nav-item {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  text-align: center;
  color: var(--gray-600);
  padding: 4px 0;
  font-size: 12px;
}

.nav-item.active {
  color: var(--primary);
}

.nav-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
}

.nav-icon img {
  width: 26px;
  height: 26px;
}

.nav-item.active .nav-icon,
.nav-item.active {
  color: var(--primary);
}

.nav-label {
  font-size: 11px;
}
</style>
