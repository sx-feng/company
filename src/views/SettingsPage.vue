<template>
  <div class="page settings-page">
    <header class="topbar">
      <button class="back-btn" type="button" @click="$emit('back')" aria-label="返回">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="title">设置</div>
      <div class="placeholder-space"></div>
    </header>

    <div class="content">
      <div class="settings-row" @click="openModal = true">
        <span class="label">主题风格</span>
        <span class="value">
          {{ currentThemeLabel }}
          <svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </div>

    <div v-if="openModal" class="modal-backdrop" @click="openModal = false">
      <div class="modal" @click.stop>
        <div class="modal-title">选择主题</div>
        <div class="theme-options">
          <button
            v-for="item in themeOptions"
            :key="item.id"
            type="button"
            class="theme-chip"
            :class="{ active: activeTheme === item.id }"
            @click="selectTheme(item.id)"
          >
            {{ item.label }}
          </button>
        </div>
        <button class="close-btn" type="button" @click="openModal = false">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  props: {
    activeTheme: {
      type: String,
      default: 'blue',
    },
    themeOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      openModal: false,
    };
  },
  computed: {
    currentThemeLabel() {
      return this.themeOptions.find((item) => item.id === this.activeTheme)?.label || '';
    },
  },
  methods: {
    selectTheme(themeId) {
      this.$emit('change-theme', themeId);
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--app-bg);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px 8px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-600);
}

.back-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--gray-200);
  background: var(--surface);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.placeholder-space {
  width: 34px;
}

.content {
  padding: 12px 12px 80px;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px;
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
}

.label {
  font-size: 13px;
  color: var(--gray-600);
}

.value {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.25px;
  color: var(--gray-500);
}

.arrow {
  color: var(--gray-400);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
}

.modal {
  width: 100%;
  max-width: 430px;
  background: var(--surface);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.modal-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-600);
  margin-bottom: 10px;
}

.theme-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.theme-chip {
  padding: 9px 14px;
  border-radius: 9999px;
  border: 1px solid var(--gray-300);
  background: var(--surface);
  color: var(--gray-600);
  font-size: 12.25px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.theme-chip.active {
  background: var(--primary);
  color: var(--primary-contrast);
  border-color: var(--primary);
}

.close-btn {
  margin-top: 14px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: var(--primary-contrast);
  font-size: 13px;
  cursor: pointer;
}
</style>
