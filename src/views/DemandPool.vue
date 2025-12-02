<template>
  <div class="page demand-page">
    <header class="top-bar">
      <div class="search-area">
        <div class="search-box">
          <span class="search-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#6B7280"
              />
            </svg>
          </span>
          <input v-model.trim="keyword" class="search-input" type="text" placeholder="搜索客户或需求..." />
        </div>
      </div>
      <div class="top-actions">
        <button class="icon-button" type="button" aria-label="通知">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button class="icon-button" type="button" aria-label="个人中心">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </header>

    <main class="page-body">
      <div class="fab">
        <button class="post-button" type="button" @click="handlePostClick">
          <span class="icon">+</span>
          <span>{{ isEditing ? '编辑需求' : '发布需求' }}</span>
        </button>
      </div>

      <section class="list">
        <template v-if="loading">
          <div v-for="n in 3" :key="n" class="skeleton-card">
            <div class="skeleton header">
              <div class="skeleton avatar shimmer"></div>
              <div class="skeleton title shimmer"></div>
              <div class="skeleton pill shimmer"></div>
            </div>
            <div class="skeleton body">
              <div class="skeleton line shimmer"></div>
              <div class="skeleton line shimmer"></div>
              <div class="skeleton line shimmer"></div>
              <div class="skeleton line shimmer"></div>
            </div>
            <div class="skeleton footer">
              <div class="skeleton pill shimmer"></div>
              <div class="skeleton pill shimmer"></div>
              <div class="skeleton pill shimmer"></div>
            </div>
          </div>
        </template>
        <template v-else-if="filteredDemands.length">
          <DemandCard
            v-for="demand in filteredDemands"
            :key="demand.id"
            :demand="demand"
            @view="logAction('view', demand)"
            @edit="handleEdit(demand)"
            @push="logAction('push', demand)"
          />
        </template>
        <div v-else class="empty-state">暂无需求，点击右下角发布新需求</div>
      </section>

      <div v-if="showPostForm" class="modal-backdrop" role="dialog" aria-modal="true">
        <div class="modal">
          <div class="modal-header">
            <div class="modal-title">{{ isEditing ? '编辑需求' : '发布新需求' }}</div>
            <button class="close-btn" type="button" aria-label="关闭" @click="closePostForm">×</button>
          </div>
          <form class="form" @submit.prevent="submitDemand">
            <label class="field">
              <span>客户名称</span>
              <input v-model.trim="draft.name" type="text" placeholder="请输入客户名称" required />
            </label>
            <label class="field">
              <span>联系方式</span>
              <input v-model.trim="draft.phone" type="tel" placeholder="手机或座机" required />
            </label>
            <label class="field">
              <span>服务需求</span>
              <input v-model.trim="draft.service" type="text" placeholder="例如：婚礼跟妆 / 商务造型" required />
            </label>
            <label class="field">
              <span>所在城市</span>
              <input v-model.trim="draft.location" type="text" placeholder="城市/区域" required />
            </label>
            <label class="field">
              <span>预算</span>
              <input v-model.trim="draft.budget" type="text" placeholder="可选，例如：¥3000-5000" />
            </label>
            <label class="field">
              <span>备注</span>
              <textarea v-model.trim="draft.note" rows="3" placeholder="时间、人数、风格偏好等"></textarea>
            </label>
            <div class="form-actions">
              <button type="button" class="btn ghost" @click="closePostForm">取消</button>
              <button type="submit" class="btn primary">{{ isEditing ? '保存修改' : '发布到需求池' }}</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import DemandCard from '../components/DemandCard.vue';
import { fetchDemandList } from '../mock/api';

export default {
  name: 'DemandPool',
  components: { DemandCard },
  data() {
    return {
      keyword: '',
      demands: [],
      loading: true,
      showPostForm: false,
      editingId: null,
      draft: {
        name: '',
        phone: '',
        service: '',
        location: '',
        budget: '',
        note: '',
      },
    };
  },
  computed: {
    isEditing() {
      return !!this.editingId;
    },
    filteredDemands() {
      if (!this.keyword) return this.demands;
      const kw = this.keyword.trim();
      return this.demands.filter(
        (item) =>
          item.name.includes(kw) ||
          item.phone.includes(kw) ||
          item.service.includes(kw) ||
          item.location.includes(kw),
      );
    },
  },
  created() {
    this.loadDemands();
  },
  methods: {
    async loadDemands() {
      this.loading = true;
      const result = await fetchDemandList();
      this.demands = result || [];
      setTimeout(() => {
        this.loading = false;
      }, 260);
    },
    handlePostClick() {
      this.resetDraft();
      this.editingId = null;
      this.showPostForm = true;
    },
    handleEdit(demand) {
      this.draft = {
        name: demand.name || '',
        phone: demand.phone || '',
        service: demand.service || '',
        location: demand.location || '',
        budget: demand.budget || '',
        note: demand.note || '',
      };
      this.editingId = demand.id;
      this.showPostForm = true;
    },
    closePostForm() {
      this.showPostForm = false;
    },
    resetDraft() {
      this.draft = {
        name: '',
        phone: '',
        service: '',
        location: '',
        budget: '',
        note: '',
      };
    },
    submitDemand() {
      const now = Date.now();
      const newDemand = {
        id: this.editingId || `draft-${now}`,
        name: this.draft.name || '未命名客户',
        phone: this.draft.phone || '',
        service: this.draft.service || '',
        location: this.draft.location || '',
        budget: this.draft.budget || '',
        note: this.draft.note || '',
        status: this.editingId ? 'new' : 'new',
        createdAt: now,
      };
      if (this.editingId) {
        this.demands = this.demands.map((d) => (d.id === this.editingId ? { ...d, ...newDemand } : d));
      } else {
        this.demands = [newDemand, ...this.demands];
      }
      this.showPostForm = false;
      this.editingId = null;
    },
    logAction(type, demand) {
      // 预留事件回调，当前只做占位
      // eslint-disable-next-line no-console
      console.log(`[${type}]`, demand);
    },
  },
};
</script>

<style scoped>
.demand-page {
  min-height: 100vh;
  background: #ffffff;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: linear-gradient(135deg, var(--primary), #2563eb);
  color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.search-area {
  flex: 1;
  margin-right: 10px;
}

.top-actions {
  display: flex;
  gap: 8px;
}

.icon-button {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.icon-button:hover {
  transform: translateY(-1px);
}

.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 0 14px 0 38px;
  font-size: 13px;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.82);
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  color: rgba(255, 255, 255, 0.9);
}

.page-body {
  padding: 4px 12px 110px;
  position: relative;
  background: #ffffff;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.fab {
  position: fixed;
  right: 14px;
  bottom: 90px;
  z-index: 11;
}

.post-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 14px;
  border: none;
  background: var(--primary);
  color: var(--primary-contrast);
  box-shadow: 0 12px 28px rgba(59, 130, 246, 0.25);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.post-button .icon {
  font-size: 16px;
  line-height: 1;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 14px;
  z-index: 2000;
}

.modal {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 14px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.modal-title {
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  color: #4b5563;
}

.form {
  display: grid;
  gap: 10px;
}

.field {
  display: grid;
  gap: 6px;
  font-size: 12.5px;
  color: #374151;
}

.field input,
.field textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 13px;
  color: #111827;
  outline: none;
}

.field textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 6px;
}

.btn {
  min-width: 96px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.btn.ghost {
  background: #f3f4f6;
  border-color: #e5e7eb;
  color: #374151;
}

.btn.primary {
  background: var(--primary);
  color: var(--primary-contrast);
  border-color: var(--primary);
}

.empty-state {
  padding: 28px 12px 60px;
  text-align: center;
  color: var(--gray-500);
  font-size: 12.5px;
}

.skeleton-card {
  background: #ffffff;
  border: 1px solid var(--gray-100);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.skeleton {
  background: #e5e7eb;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.skeleton.header {
  display: grid;
  grid-template-columns: 44px 1fr 80px;
  align-items: center;
  gap: 10px;
  background: transparent;
  padding: 0;
}

.skeleton.body {
  display: grid;
  gap: 8px;
  background: transparent;
  padding: 0;
}

.skeleton.footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  background: transparent;
  padding: 6px 0 0;
}

.skeleton.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.skeleton.title {
  height: 16px;
  width: 120px;
}

.skeleton.pill {
  height: 22px;
  border-radius: 999px;
}

.skeleton.line {
  height: 14px;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -140px;
  width: 120px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(260px);
  }
}
</style>
