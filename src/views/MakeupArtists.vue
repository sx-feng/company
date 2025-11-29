<template>
  <div class="page">
    <div class="header">
      <div class="title">化妆师管理</div>
      <div class="search-wrap">
        <input v-model="searchKeyword" class="search" type="text" placeholder="搜索化妆师..." />
        <span class="icon search-icon" aria-hidden="true">🔍</span>
      </div>
      <button class="icon bell" type="button" aria-label="通知">🔔</button>
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
        <div
          v-for="artist in filteredArtists"
          :key="artist.id"
          class="team-card"
        >
          <div class="card-main">
            <img :src="artist.avatar" :alt="artist.name" class="avatar" />
            <div class="info">
              <div class="name">{{ artist.name }}</div>
              <div class="meta">{{ artist.experienceBadges.join(' · ') }}</div>
              <div class="metrics">
                <span>⭐ {{ artist.rating.toFixed(1) }}</span>
                <span>￥ {{ artist.price }}</span>
                <span>{{ artist.comments }} 条评论</span>
              </div>
              <div class="metrics">
                <span class="status" :class="artist.status">{{ statusText(artist.status) }}</span>
                <span v-if="artist.favorite" class="favorite">★ 收藏</span>
              </div>
            </div>
          </div>
          <div class="card-actions">
            <button type="button" class="btn plain">编辑</button>
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
        <div
          v-for="artist in recommendedArtists"
          :key="artist.id"
          class="recommend-card"
        >
          <div class="recommend-main">
            <img :src="artist.avatar" :alt="artist.name" class="avatar" />
            <div class="info">
              <div class="name">{{ artist.name }}</div>
              <div class="meta">{{ artist.experienceBadges.join(' · ') }}</div>
              <div class="metrics">
                <span>⭐ {{ artist.rating.toFixed(1) }}</span>
                <span>{{ artist.comments }} 条评论</span>
              </div>
            </div>
          </div>
          <button type="button" class="btn primary">立即邀请</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fetchArtistList } from '../mock/api';

export default {
  name: 'MakeupArtists',
  data() {
    return {
      searchKeyword: '',
      activeFilter: 'all',
      artists: [],
      loading: true,
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
    this.artists = await fetchArtistList();
    this.loading = false;
  },
  methods: {
    statusText(status) {
      if (status === 'online') return '在线';
      if (status === 'working') return '工作中';
      if (status === 'holiday') return '休假中';
      return '';
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
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.title {
  font-size: 16px;
  font-weight: 700;
}

.search-wrap {
  position: relative;
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

.icon.bell {
  background: transparent;
  border: none;
  font-size: 18px;
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
</style>
