<template>
  <div class="page">
    <div class="header">
      <div class="search-wrap">
        <input v-model="searchKeyword" class="search" type="text" placeholder="搜索化妆师..." />
        <span class="icon search-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <circle cx="11" cy="11" r="6" stroke="#6b7280" stroke-width="1.6" />
            <path d="M15.5 15.5L20 20" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </span>
      </div>
    </div>

    <div class="chips">
      <button
        v-for="chip in filtersWithCount"
        :key="chip.id"
        class="chip"
        :class="{ active: chip.id === activeFilter }"
        type="button"
        @click="activeFilter = chip.id"
      >
        {{ chip.label }}
      </button>
    </div>

    <div class="stat-row">
      <div class="stat-card">
        <div class="stat-number">{{ statusCounts.all }}</div>
        <div class="stat-label">总化妆师</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ statusCounts.working }}</div>
        <div class="stat-label">工作中</div>
      </div>
      <div class="stat-card">
        <div class="stat-number holiday">{{ statusCounts.holiday }}</div>
        <div class="stat-label">休假中</div>
      </div>
    </div>

    <section class="block">
      <div class="block-title">化妆师团队</div>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else>
        <div v-for="artist in filteredArtists" :key="artist.id" class="team-card">
          <div class="card-main">
            <img :src="artist.avatar" :alt="artist.name" class="avatar" @error="setFallbackAvatar(artist)" />
            <div class="info">
              <div class="name">{{ artist.name }}</div>
              <div class="meta">{{ artist.experienceBadges.join(' · ') }}</div>
              <div class="metrics">
                <span class="with-icon">
                  <svg class="icon-star" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path
                      d="M12 4.5l2.2 4.46 4.92.71-3.56 3.47.84 4.9L12 15.9l-4.4 2.14.84-4.9L4.88 9.67l4.92-.71L12 4.5Z"
                      fill="#f59e0b"
                      stroke="#f59e0b"
                      stroke-width="1"
                    />
                  </svg>
                  {{ artist.rating.toFixed(1) }}
                </span>
                <span>￥{{ artist.price }}</span>
                <span>{{ artist.comments }} 条评论</span>
              </div>
              <div class="metrics">
                <span class="status" :class="artist.status">{{ statusText(artist.status) }}</span>
                <span v-if="artist.favorite" class="favorite with-icon">
                  <svg class="icon-star" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path
                      d="M12 4.5l2.2 4.46 4.92.71-3.56 3.47.84 4.9L12 15.9l-4.4 2.14.84-4.9L4.88 9.67l4.92-.71L12 4.5Z"
                      fill="#f59e0b"
                      stroke="#f59e0b"
                      stroke-width="1"
                    />
                  </svg>
                  收藏
                </span>
              </div>
            </div>
          </div>
          <div class="card-actions">
            <button type="button" class="btn plain" @click="openEdit(artist)">编辑</button>
            <button type="button" class="btn danger">删除</button>
            <button type="button" class="btn primary">查看详情</button>
          </div>
        </div>
        <div v-if="!filteredArtists.length" class="empty">暂无化妆师</div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="block">
      <div class="block-title">优质化妆师推荐</div>
      <div class="recommend-list">
        <div v-for="artist in recommendedArtists" :key="artist.id" class="recommend-card">
          <div class="recommend-main">
            <img :src="artist.avatar" :alt="artist.name" class="avatar" @error="setFallbackAvatar(artist)" />
            <div class="info">
              <div class="name">{{ artist.name }}</div>
              <div class="meta">{{ artist.experienceBadges.join(' · ') }}</div>
              <div class="metrics">
                <span class="with-icon">
                  <svg class="icon-star" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path
                      d="M12 4.5l2.2 4.46 4.92.71-3.56 3.47.84 4.9L12 15.9l-4.4 2.14.84-4.9L4.88 9.67l4.92-.71L12 4.5Z"
                      fill="#f59e0b"
                      stroke="#f59e0b"
                      stroke-width="1"
                    />
                  </svg>
                  {{ artist.rating.toFixed(1) }}
                </span>
                <span>{{ artist.comments }} 条评论</span>
              </div>
            </div>
          </div>
          <button type="button" class="btn primary">立即邀请</button>
        </div>
      </div>
    </section>

    <div v-if="showEditModal" class="modal-backdrop" role="dialog" aria-modal="true">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">编辑化妆师</div>
          <button class="close-btn" type="button" aria-label="关闭" @click="closeEdit">×</button>
        </div>
        <form class="form" @submit.prevent="saveArtist">
          <label class="field">
            <span>姓名</span>
            <input v-model.trim="draft.name" type="text" required />
          </label>
          <label class="field">
            <span>经验标签</span>
            <input v-model.trim="draft.experienceText" type="text" placeholder="多年经验 · 团队/擅长" />
          </label>
          <label class="field">
            <span>评分</span>
            <input v-model.number="draft.rating" type="number" step="0.1" min="0" max="5" required />
          </label>
          <label class="field">
            <span>价格</span>
            <input v-model.trim="draft.price" type="text" placeholder="¥3000-5000" />
          </label>
          <label class="field">
            <span>评论条数</span>
            <input v-model.number="draft.comments" type="number" min="0" />
          </label>
          <label class="field">
            <span>状态</span>
            <select v-model="draft.status">
              <option value="online">在线</option>
              <option value="working">工作中</option>
              <option value="holiday">休假中</option>
            </select>
          </label>
          <label class="field">
            <span>头像</span>
            <div class="avatar-picker">
              <label v-for="(src, idx) in avatarOptions" :key="idx" class="avatar-option">
                <input v-model="draft.avatar" type="radio" :value="src" />
                <img :src="src" alt="头像" />
              </label>
            </div>
          </label>
          <div class="form-actions">
            <button type="button" class="btn ghost" @click="closeEdit">取消</button>
            <button type="submit" class="btn primary">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArtistList } from '../mock/api';
import avatar1 from '../assets/styles/huazhuangshi.png';
import avatar2 from '../assets/styles/huazhuangshi1.png';
import avatar3 from '../assets/styles/xinniang.png';
import avatar4 from '../assets/styles/richang.png';

export default {
  name: 'MakeupArtists',
  data() {
    return {
      searchKeyword: '',
      activeFilter: 'all',
      artists: [],
      loading: true,
      showEditModal: false,
      draft: {},
      avatarOptions: [],
      localAvatars: [avatar1, avatar2, avatar3, avatar4],
    };
  },
  computed: {
    statusCounts() {
      const counts = { all: this.artists.length, online: 0, working: 0, holiday: 0, favorite: 0 };
      this.artists.forEach((a) => {
        if (counts[a.status] !== undefined) counts[a.status] += 1;
        if (a.favorite) counts.favorite += 1;
      });
      return counts;
    },
    filtersWithCount() {
      return [
        { id: 'all', label: `全部 (${this.statusCounts.all})` },
        { id: 'online', label: `在线 (${this.statusCounts.online})` },
        { id: 'holiday', label: `休假中 (${this.statusCounts.holiday})` },
        { id: 'favorite', label: `收藏 (${this.statusCounts.favorite})` },
      ];
    },
    filteredArtists() {
      const kw = this.searchKeyword.trim();
      let list = [...this.artists];
      if (this.activeFilter === 'online') list = list.filter((a) => a.status === 'online');
      if (this.activeFilter === 'holiday') list = list.filter((a) => a.status === 'holiday');
      if (this.activeFilter === 'favorite') list = list.filter((a) => a.favorite);
      if (kw) {
        list = list.filter(
          (artist) =>
            artist.name.includes(kw) ||
            artist.tags?.some((tag) => tag.includes(kw)) ||
            artist.experienceBadges.some((badge) => badge.includes(kw)),
        );
      }
      return list;
    },
    recommendedArtists() {
      return [...this.artists].sort((a, b) => b.rating - a.rating).slice(0, 2);
    },
  },
  async created() {
    const fallbackAvatars = this.localAvatars.length ? this.localAvatars : [];
    const list = await fetchArtistList();
    this.artists = list.map((a, idx) => ({
      ...a,
      avatar: a.avatar || fallbackAvatars[idx % fallbackAvatars.length] || '',
    }));
    this.avatarOptions = Array.from(new Set([...this.artists.map((a) => a.avatar), ...fallbackAvatars])).slice(0, 8);
    this.loading = false;
  },
  methods: {
    statusText(status) {
      if (status === 'online') return '在线';
      if (status === 'working') return '工作中';
      if (status === 'holiday') return '休假中';
      return '';
    },
    setFallbackAvatar(artist) {
      const fallbackAvatars = this.localAvatars;
      if (!fallbackAvatars.length) return;
      const idx = this.artists.findIndex((a) => a.id === artist.id);
      const fallback = fallbackAvatars[idx % fallbackAvatars.length];
      this.artists = this.artists.map((a) => (a.id === artist.id ? { ...a, avatar: fallback } : a));
    },
    openEdit(artist) {
      this.draft = {
        id: artist.id,
        name: artist.name,
        experienceText: artist.experienceBadges.join(' · '),
        rating: artist.rating,
        price: artist.price,
        comments: artist.comments,
        status: artist.status,
        avatar: artist.avatar,
      };
      this.showEditModal = true;
    },
    closeEdit() {
      this.showEditModal = false;
    },
    saveArtist() {
      const badges = this.draft.experienceText
        ? this.draft.experienceText.split('·').map((s) => s.trim()).filter(Boolean)
        : [];
      this.artists = this.artists.map((a) =>
        a.id === this.draft.id
          ? {
              ...a,
              name: this.draft.name,
              experienceBadges: badges,
              rating: Number(this.draft.rating) || 0,
              price: this.draft.price,
              comments: Number(this.draft.comments) || 0,
              status: this.draft.status,
              avatar: this.draft.avatar || a.avatar,
            }
          : a,
      );
      this.showEditModal = false;
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 12px 12px 80px;
  background: #ffffff;
  color: #333;
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.search-wrap {
  position: relative;
  width: 100%;
}

.search {
  width: 100%;
  height: 34px;
  border-radius: 18px;
  border: 1px solid #d1d5db;
  padding: 0 34px 0 32px;
  font-size: 12.5px;
  background: #f9fafb;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  opacity: 0.65;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.chip {
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  font-size: 12px;
  color: #4b5563;
  cursor: pointer;
}

.chip.active {
  background: #ede9fe;
  border-color: #a855f7;
  color: #7c3aed;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.stat-card {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.stat-number {
  font-size: 18px;
  font-weight: 700;
  color: #4f46e5;
}

.stat-number.holiday {
  color: #ef4444;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

.block {
  margin-bottom: 18px;
}

.block-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.team-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 12px;
}

.card-main {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 10px;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  object-fit: cover;
}

.info .name {
  font-size: 14px;
  font-weight: 700;
}

.info .meta {
  font-size: 12px;
  color: #6b7280;
  margin: 4px 0;
}

.metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: #4b5563;
}

.with-icon {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.icon-star {
  flex-shrink: 0;
}

.status {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  background: #eef2ff;
  color: #4338ca;
}

.status.working {
  background: #e0f2fe;
  color: #0369a1;
}

.status.holiday {
  background: #fee2e2;
  color: #b91c1c;
}

.favorite {
  color: #f59e0b;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.btn {
  flex: 1;
  border-radius: 12px;
  border: 1px solid transparent;
  height: 34px;
  font-size: 12.5px;
  cursor: pointer;
}

.btn.plain {
  background: #f3f4f6;
  border-color: #e5e7eb;
  color: #374151;
}

.btn.danger {
  background: #fef2f2;
  border-color: #fca5a5;
  color: #b91c1c;
}

.btn.primary {
  background: #3b82f6;
  color: #ffffff;
}

.divider {
  height: 1px;
  border-top: 1px dashed #d1d5db;
  margin: 6px 0 12px;
}

.recommend-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recommend-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px;
  background: #f9fafb;
}

.recommend-main {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 10px;
  align-items: center;
}

.loading,
.empty {
  padding: 12px;
  font-size: 12.5px;
  color: #6b7280;
  text-align: center;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  z-index: 2000;
}

.modal {
  width: 100%;
  max-width: 520px;
  background: #fff;
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
  color: #111827;
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
.field textarea,
.field select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 13px;
  color: #111827;
  outline: none;
}

.avatar-picker {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 8px;
}

.avatar-option {
  position: relative;
  display: block;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 6px;
  cursor: pointer;
  background: #f9fafb;
}

.avatar-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.avatar-option img {
  width: 100%;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
}

.avatar-option:has(input:checked) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.18);
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
</style>
