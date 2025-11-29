<template>
  <div class="page my-page">
    <header class="topbar">
      <div class="title">我的</div>
      <button class="settings-btn" type="button" @click="$emit('open-settings')" aria-label="主题设置">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5ZM19.43 12.98C19.47 12.66 19.5 12.33 19.5 12C19.5 11.67 19.47 11.34 19.43 11.02L21.54 9.37C21.74 9.22 21.8 8.94 21.69 8.71L19.69 4.79C19.57 4.55 19.31 4.45 19.07 4.52L16.56 5.32C16.03 4.91 15.46 4.56 14.84 4.3L14.5 1.67C14.47 1.42 14.26 1.25 14 1.25H10C9.74 1.25 9.53 1.42 9.5 1.67L9.16 4.3C8.54 4.56 7.97 4.91 7.44 5.32L4.93 4.52C4.69 4.45 4.43 4.55 4.31 4.79L2.31 8.71C2.19 8.94 2.26 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.68 4.5 12C4.5 12.32 4.53 12.66 4.57 12.98L2.46 14.63C2.26 14.78 2.2 15.06 2.31 15.29L4.31 19.21C4.43 19.45 4.69 19.55 4.93 19.48L7.44 18.68C7.97 19.09 8.54 19.44 9.16 19.7L9.5 22.33C9.53 22.58 9.74 22.75 10 22.75H14C14.26 22.75 14.47 22.58 14.5 22.33L14.84 19.7C15.46 19.44 16.03 19.09 16.56 18.68L19.07 19.48C19.31 19.55 19.57 19.45 19.69 19.21L21.69 15.29C21.8 15.06 21.74 14.78 21.54 14.63L19.43 12.98Z"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </header>

    <div class="content">
      <div class="placeholder">个人信息 / 订单 / 收藏 等模块占位</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  methods: {},
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
  padding: 16px 14px 12px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-600);
}

.settings-btn {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  background: var(--surface);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  font-size: 18px;
}

.content {
  padding: 10px 12px 80px;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
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
  font-size: 12.25px;
  color: var(--gray-500);
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
