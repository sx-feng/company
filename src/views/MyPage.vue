<template>
  <div class="my-page">
    <header class="profile">
      <div class="avatar" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z"
            stroke="#2f7df6"
            stroke-width="1.4"
          />
          <path
            d="M4 20.75C4.61345 17.5664 7.25636 15.25 12 15.25C16.7436 15.25 19.3865 17.5664 20 20.75"
            stroke="#2f7df6"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="user-meta">
        <div class="name-row">
          <span class="name">个人企业</span>
          <span class="status">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                stroke="#2f7df6"
                stroke-width="1.2"
              />
              <path d="M6 10.1L8.8 13L14.2 7" stroke="#2f7df6" stroke-width="1.4" stroke-linecap="round" />
            </svg>
          </span>
        </div>
        <div class="account">平台账号：222222</div>
      </div>
      <div class="header-actions">
        <button class="icon-btn" type="button" aria-label="设置" @click="$emit('open-settings')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              stroke="#2f7df6"
              stroke-width="1.4"
            />
            <path
              d="M19.4 13.2C19.5 12.8 19.5 12.2 19.4 11.8L21.1 10.4C21.3 10.2 21.3 9.9 21.2 9.6L19.2 6C19 5.7 18.7 5.6 18.4 5.7L16.4 6.5C16 6.2 15.6 6 15.2 5.8L15 3.7C15 3.4 14.7 3.1 14.4 3.1H9.6C9.3 3.1 9 3.4 9 3.7L8.8 5.8C8.4 6 8 6.2 7.6 6.5L5.6 5.7C5.3 5.6 5 5.7 4.8 6L2.8 9.6C2.7 9.9 2.7 10.2 2.9 10.4L4.6 11.8C4.5 12.2 4.5 12.8 4.6 13.2L2.9 14.6C2.7 14.8 2.7 15.1 2.8 15.4L4.8 19C5 19.3 5.3 19.4 5.6 19.3L7.6 18.5C8 18.8 8.4 19 8.8 19.2L9 21.3C9 21.6 9.3 21.9 9.6 21.9H14.4C14.7 21.9 15 21.6 15 21.3L15.2 19.2C15.6 19 16 18.8 16.4 18.5L18.4 19.3C18.7 19.4 19 19.3 19.2 19L21.2 15.4C21.3 15.1 21.3 14.8 21.1 14.6L19.4 13.2Z"
              stroke="#2f7df6"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>

    <main class="content">
      <div class="tabs">
        <div class="tab">
          <div class="tab-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="3" width="10" height="16" rx="1" stroke="#2f7df6" stroke-width="1.4" />
              <path d="M9 6H13" stroke="#2f7df6" stroke-width="1.4" stroke-linecap="round" />
              <path d="M9 10H13" stroke="#2f7df6" stroke-width="1.4" stroke-linecap="round" />
              <path d="M9 14H12" stroke="#2f7df6" stroke-width="1.4" stroke-linecap="round" />
            </svg>
          </div>
          <span class="tab-label">完成订单</span>
        </div>
        <div class="tab">
          <div class="tab-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="12" rx="2" stroke="#2f7df6" stroke-width="1.4" />
              <path d="M8 16V19L12 17.5L16 19V16" stroke="#2f7df6" stroke-width="1.4" stroke-linecap="round" />
              <circle cx="9" cy="10" r="1" fill="#2f7df6" />
              <circle cx="12" cy="10" r="1" fill="#2f7df6" />
              <circle cx="15" cy="10" r="1" fill="#2f7df6" />
            </svg>
          </div>
          <span class="tab-label">评价</span>
        </div>
      </div>

      <section class="balance-card">
        <div class="card-header">
          <span class="card-title">平台金额</span>
          <button class="bill-btn" type="button">账单</button>
        </div>
        <div class="amount">xxxxx</div>
        <button class="withdraw-btn" type="button">提现</button>
      </section>
    </main>

    <nav class="bottom-nav" aria-label="主导航">
      <button class="nav-item" type="button">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 11L12 4L20 11V20H14V14H10V20H4V11Z"
            stroke="#3c6fc0"
            stroke-width="1.4"
            stroke-linejoin="round"
          />
        </svg>
        <span>首页</span>
      </button>
      <button class="nav-item" type="button">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="5" width="12" height="4" rx="1" stroke="#3c6fc0" stroke-width="1.4" />
          <rect x="6" y="11" width="12" height="4" rx="1" stroke="#3c6fc0" stroke-width="1.4" />
          <rect x="6" y="17" width="12" height="2" rx="1" stroke="#3c6fc0" stroke-width="1.4" />
        </svg>
        <span>分类</span>
      </button>
      <button class="nav-item" type="button">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 6H19V16.5C19 17.3284 18.3284 18 17.5 18H6.5C5.67157 18 5 17.3284 5 16.5V6Z"
            stroke="#3c6fc0"
            stroke-width="1.4"
          />
          <path d="M5 8H19" stroke="#3c6fc0" stroke-width="1.4" stroke-linecap="round" />
          <circle cx="9" cy="12.5" r="1.1" fill="#3c6fc0" />
          <circle cx="15" cy="12.5" r="1.1" fill="#3c6fc0" />
        </svg>
        <span>消息</span>
      </button>
      <button class="nav-item active" type="button">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="3.5" stroke="#2f7df6" stroke-width="1.4" />
          <path
            d="M5 20C5.6 16.8 8.3 15 12 15C15.7 15 18.4 16.8 19 20"
            stroke="#2f7df6"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </svg>
        <span>我的</span>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
};
</script>

<style scoped>
.my-page {
  min-height: 100vh;
  background: #f5f8ff;
  display: flex;
  flex-direction: column;
  color: #1f375d;
}

.profile {
  display: flex;
  align-items: center;
  padding: 18px 14px 12px;
  background: #fff;
  border-bottom: 1px solid #e2ebff;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #e8f1ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c7dbff;
  margin-right: 12px;
}

.user-meta {
  flex: 1;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #1b3b73;
}

.account {
  margin-top: 4px;
  font-size: 12px;
  color: #4a6a95;
}

.status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #c7dbff;
  background: #f7faff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.icon-btn:active {
  transform: scale(0.97);
  background: #e4efff;
}

.content {
  background: #fff;
  padding: 10px 14px 16px;
}

.tabs {
  display: flex;
  gap: 24px;
  padding: 10px 0 14px;
  border-bottom: 1px solid #d9e6ff;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #3a5c93;
  font-size: 13px;
}

.tab-icon {
  width: 32px;
  height: 32px;
  border: 1px solid #c7dbff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f6ff;
}

.tab-label {
  white-space: nowrap;
}

.balance-card {
  margin: 14px 0 10px;
  border: 2px solid #5c7fc2;
  border-radius: 10px;
  padding: 16px 12px 18px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f375d;
}

.bill-btn {
  background: none;
  border: none;
  color: #2f7df6;
  font-size: 13px;
  cursor: pointer;
}

.amount {
  text-align: center;
  font-size: 14px;
  color: #1f375d;
  margin: 6px 0 12px;
}

.withdraw-btn {
  display: block;
  margin: 0 auto;
  padding: 6px 18px;
  border-radius: 10px;
  border: 1px solid #2f7df6;
  background: #f0f6ff;
  color: #1f375d;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.withdraw-btn:active {
  background: #2f7df6;
  color: #fff;
}

.bottom-nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: #fff;
  border-top: 1px solid #d9e6ff;
  padding: 6px 0 4px;
  margin-top: auto;
}

.nav-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border: none;
  background: transparent;
  color: #45669a;
  font-size: 12px;
  padding: 6px 0;
  cursor: pointer;
}

.nav-item.active {
  color: #2f7df6;
}
</style>
