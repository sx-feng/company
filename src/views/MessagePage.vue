<template>
  <div class="page message-page">
    <div class="page-inner">
      <div class="search-bar">
        <SearchInput v-model="keyword" placeholder="搜索聊天" />
      </div>

      <FilterChips v-model="activeFilter" :options="filters" class="filter-row" />

      <div class="sections">
        <div class="block">
          <MessageCategoryItem
            v-for="cat in categories"
            :key="cat.id"
            :title="cat.title"
            :subtitle="cat.subtitle"
            :date="cat.date"
            :color="cat.color"
          />
          <div class="divider"></div>
        </div>

        <div class="block conversations">
          <template v-if="loading">
            <div v-for="n in 4" :key="n" class="skeleton-row">
              <div class="skeleton avatar shimmer"></div>
              <div class="skeleton text shimmer"></div>
            </div>
          </template>
          <template v-else-if="filteredConversations.length">
            <ConversationItem
              v-for="item in filteredConversations"
              :key="item.id"
              :name="item.name"
              :message="item.message"
              :date="item.date"
              :avatar="item.avatar"
              :unread="item.unread"
            />
          </template>
          <div v-else class="placeholder">暂无消息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '../components/SearchInput.vue';
import FilterChips from '../components/FilterChips.vue';
import MessageCategoryItem from '../components/MessageCategoryItem.vue';
import ConversationItem from '../components/ConversationItem.vue';
import { fetchMessageData } from '../mock/api';

export default {
  name: 'MessagePage',
  components: { SearchInput, FilterChips, MessageCategoryItem, ConversationItem },
  data() {
    return {
      keyword: '',
      activeFilter: 'all',
      filters: [
        { id: 'all', label: '全部' },
        { id: 'company', label: '婚庆公司' },
        { id: 'artist', label: '化妆师' },
      ],
      categories: [],
      conversations: [],
      loading: true,
    };
  },
  computed: {
    filteredConversations() {
      const kw = this.keyword.trim();
      if (!kw) return this.conversations;
      return this.conversations.filter(
        (item) => item.name.includes(kw) || item.message.includes(kw),
      );
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const result = await fetchMessageData(this.activeFilter);
      this.categories = result.categories || [];
      this.conversations = result.conversations || [];
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
  },
  watch: {
    activeFilter() {
      this.loadData();
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--app-bg);
}

.page-inner {
  padding: 12px 12px 110px;
}

.search-bar {
  margin-bottom: 10px;
}

.filter-row {
  margin-bottom: 14px;
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.block {
  background: transparent;
  border-radius: 0;
}

.divider {
  height: 1px;
  background: #e9eaec;
}

.conversations {
  padding: 4px 0;
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
}

.placeholder {
  padding: 20px 0;
  text-align: center;
  color: var(--gray-500);
  font-size: 12px;
}

.skeleton-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
}

.skeleton {
  background: #e5e7eb;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.skeleton.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.skeleton.text {
  flex: 1;
  height: 16px;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120px;
  width: 100px;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%);
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(220px);
  }
}
</style>
