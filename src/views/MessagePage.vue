<template>
  <div class="message-page">
    <TopBar v-model="keyword" />

    <!-- 聊天 / 互动 -->
    <ChatSwitch v-model="mode" />

    <!-- 全部 / 婚庆公司 / 化妆师 -->
    <CategorySelector v-model="category" />

    <!-- 会话列表 -->
    <MessageList :list="filteredList" :active-id="activeId" @select="handleSelect" />

    <BottomNav v-model="currentTab" />
  </div>
</template>

<script>
import TopBar from '@/MessageComponents/TopBar.vue';
import ChatSwitch from '@/MessageComponents/ChatSwitch.vue';
import CategorySelector from '@/MessageComponents/CategorySelector.vue';
import MessageList from '@/MessageComponents/MessageList.vue';
import BottomNav from '@/components/BottomNav.vue';

import systemAvatar from '@/assets/styles/avater.png';
import avatar1 from '@/assets/styles/avatar1.png';
import avatar2 from '@/assets/styles/avatar2.png';
import avatar3 from '@/assets/styles/avatar3.png';

export default {
  name: 'MessagePage',
  components: {
    TopBar,
    ChatSwitch,
    CategorySelector,
    MessageList,
    BottomNav,
  },
  data() {
    return {
      keyword: '',
      mode: 'chat',
      category: 'all',
      currentTab: 'message',
      activeId: 2,
      messageList: [
        {
          id: 1,
          name: '系统通知',
          preview: '您有新的婚庆订单消息',
          time: '11:29',
          type: 'system',
          avatar: systemAvatar,
        },
        {
          id: 2,
          name: '贾先生',
          preview: '你好，我要新娘妆容…',
          time: '11:30',
          type: 'user',
          avatar: avatar2,
          role: 'user',
        },
        {
          id: 3,
          name: '贾先生',
          preview: '麻烦帮我确认下档期～',
          time: '11:30',
          type: 'user',
          avatar: avatar3,
          role: 'company',
        },
        {
          id: 4,
          name: '张女士',
          preview: '好的，谢谢～',
          time: '11:32',
          type: 'user',
          avatar: avatar1,
          role: 'company',
        },
      ],
    };
  },
  computed: {
    filteredList() {
      let list = this.messageList;

      if (this.keyword.trim()) {
        const k = this.keyword.trim();
        list = list.filter((i) => i.name.includes(k) || i.preview.includes(k));
      }

      if (this.category === 'wedding') {
        list = list.filter((i) => i.role === 'company');
      } else if (this.category === 'user') {
        list = list.filter((i) => i.role === 'user');
      }

      return list;
    },
  },
  methods: {
    handleSelect(item) {
      this.$emit('open-chat', {
        id: item.id,
        name: item.name,
        avatar: item.avatar,
      });
    },
  },
  watch: {
    currentTab(newName) {
      if (newName && newName !== this.$route.name) {
        this.$router.push({ name: newName });
      }
    },
    $route(to) {
      if (to.name && to.name !== this.currentTab) {
        this.currentTab = to.name;
      }
    },
  },
};
</script>

<style scoped>
.message-page {
  padding: 10px;
}
</style>
