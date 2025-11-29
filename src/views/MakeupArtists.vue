<template>
  <div class="page">
    <div class="page-inner">
      <div class="search-bar">
        <SearchInput v-model="searchKeyword" :placeholder="searchPlaceholder" />
      </div>

      <FilterChips v-model="activeFilter" :options="filters" class="filter-row" />

      <section class="list">
        <template v-if="loading">
          <div v-for="n in 5" :key="n" class="skeleton-card">
            <div class="skeleton shimmer cover"></div>
            <div class="skeleton-body">
              <div class="skeleton shimmer title"></div>
              <div class="skeleton shimmer badge-row"></div>
              <div class="skeleton shimmer rating"></div>
              <div class="skeleton shimmer tags"></div>
              <div class="skeleton shimmer actions"></div>
            </div>
          </div>
        </template>
        <template v-else-if="displayArtists.length">
          <ArtistCard
            v-for="artist in displayArtists"
            :key="artist.id"
            :artist="artist"
            class="list-card"
          />
        </template>
        <div v-else class="loading-state">暂无匹配化妆师</div>
      </section>
    </div>

  </div>
</template>

<script>
import SearchInput from '../components/SearchInput.vue';
import FilterChips from '../components/FilterChips.vue';
import ArtistCard from '../components/ArtistCard.vue';
import { fetchArtistList, fetchFilters } from '../mock/api';

export default {
  name: 'MakeupArtists',
  components: { SearchInput, FilterChips, ArtistCard },
  data() {
    return {
      searchKeyword: '',
      searchPlaceholder: '搜索化妆师 / 服务类型',
      filters: [],
      activeFilter: '',
      artists: [],
      loading: true,
    };
  },
  computed: {
    displayArtists() {
      if (!this.searchKeyword.trim()) return this.artists;
      const keyword = this.searchKeyword.trim();
      return this.artists.filter(
        (artist) =>
          artist.name.includes(keyword) ||
          artist.tags.some((tag) => tag.includes(keyword)) ||
          artist.experienceBadges.some((badge) => badge.includes(keyword)),
      );
    },
  },
  created() {
    this.loadFilters();
  },
  methods: {
    async loadFilters() {
      const result = await fetchFilters();
      this.filters = result;
      this.activeFilter = result?.[0]?.id || '';
      if (this.activeFilter) {
        this.loadArtists(this.activeFilter);
      }
    },
    async loadArtists(filterId) {
      this.loading = true;
      const result = await fetchArtistList(filterId || this.activeFilter);
      this.artists = result;
      setTimeout(() => {
        this.loading = false;
      }, 350);
    },
  },
  watch: {
    activeFilter(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.loadArtists(newVal);
      }
    },
  },
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--app-bg);
}

.page-inner {
  flex: 1;
  padding: 14px 12px 80px;
  width: 100%;
}

.search-bar {
  padding-top: 12px;
  margin-bottom: 8px;
}

.filter-row {
  margin-bottom: 10px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.list-card {
  width: 100%;
}

.loading-state {
  padding: 40px 0;
  text-align: center;
  color: var(--gray-500);
  font-size: 12.25px;
}

.skeleton-card {
  display: flex;
  border: 1px solid var(--gray-100);
  border-radius: 7px;
  background: var(--surface);
  overflow: hidden;
  min-height: 154px;
  box-shadow: var(--shadow-soft);
}

.skeleton-card .cover {
  width: 115px;
  height: 152.5px;
  flex-shrink: 0;
}

.skeleton-body {
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton {
  background: #e5e7eb;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150px;
  width: 120px;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%);
  animation: shimmer 1.4s infinite;
}

.skeleton.title {
  width: 120px;
  height: 20px;
  border-radius: 4px;
}

.skeleton.badge-row {
  width: 180px;
  height: 18px;
}

.skeleton.rating {
  width: 160px;
  height: 14px;
}

.skeleton.tags {
  width: 200px;
  height: 18px;
}

.skeleton.actions {
  width: 140px;
  height: 26px;
  margin-top: auto;
  border-radius: 999px;
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
