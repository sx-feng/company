<template>
  <div id="app" class="app-shell">
    <component
      :is="currentViewComponent"
      v-bind="currentViewProps"
      @change-theme="handleThemeChange"
      @open-settings="handleOpenSettings"
      @open-chat="handleOpenChat"
      @back="handleBack"
    />
    <BottomNav
      v-if="showBottomNav"
      v-model="activeNav"
      :items="navItems"
      @input="handleNavChange"
    />
  </div>
</template>

<script>
import DemandPool from './views/DemandPool.vue';
import MakeupArtists from './views/MakeupArtists.vue';
import MyPage from './views/MyPage.vue';
import MessagePage from './views/MessagePage.vue';
import SettingsPage from './views/SettingsPage.vue';
import ChatPage from './views/ChatPage.vue';
import BottomNav from './components/BottomNav.vue';

export default {
  name: 'App',
  components: { DemandPool, MakeupArtists, MyPage, MessagePage, SettingsPage, ChatPage, BottomNav },
  data() {
    return {
      activeNav: 'home',
      currentView: 'home',
      chatSession: null,
      navItems: [
        { id: 'home', label: '需求池', icon: 'home' },
        { id: 'artists', label: '化妆师', icon: 'artists' },
        { id: 'message', label: '消息', icon: 'message' },
        { id: 'profile', label: '我的', icon: 'profile' },
      ],
      activeTheme: 'blue',
      themeOptions: [
        { id: 'blue', label: '白蓝' },
        { id: 'pink', label: '白粉' },
      ],
    };
  },
  computed: {
    currentViewComponent() {
      if (this.currentView === 'settings') return 'SettingsPage';
      if (this.currentView === 'artists') return 'MakeupArtists';
      if (this.currentView === 'message') return 'MessagePage';
      if (this.currentView === 'chat') return 'ChatPage';
      if (this.currentView === 'profile') return 'MyPage';
      return 'DemandPool';
    },
    currentViewProps() {
      if (this.currentView === 'profile') {
        return {
          themeOptions: this.themeOptions,
          activeTheme: this.activeTheme,
        };
      }
      if (this.currentView === 'settings') {
        return {
          themeOptions: this.themeOptions,
          activeTheme: this.activeTheme,
        };
      }
      if (this.currentView === 'chat') {
        return {
          chat: this.chatSession,
        };
      }
      return {};
    },
    showBottomNav() {
      return ['home', 'artists', 'message', 'profile'].includes(this.currentView);
    },
  },
  created() {
    this.applyTheme(this.activeTheme);
  },
  methods: {
    handleNavChange(val) {
      this.activeNav = val;
      this.currentView = val;
      if (val !== 'message') this.chatSession = null;
    },
    handleOpenSettings() {
      this.currentView = 'settings';
    },
    handleBack() {
      if (this.currentView === 'chat') {
        this.currentView = 'message';
        this.activeNav = 'message';
        this.chatSession = null;
      } else {
        this.currentView = 'profile';
      }
    },
    handleOpenChat(payload) {
      this.chatSession = payload;
      this.currentView = 'chat';
      this.activeNav = 'message';
    },
    applyTheme(themeId) {
      const themeMap = {
        blue: {
          primary: '#3B82F6',
          primaryLight: '#EFF6FF',
          primaryContrast: '#FDFDFD',
          surface: '#FFFFFF',
          appBg: '#FFFFFF',
          buttonSurface: '#FFFFFF',
          buttonActive: '#3B82F6',
          buttonActiveContrast: '#FFFFFF',
        },
        pink: {
          primary: '#EC4899',
          primaryLight: '#FDF2F8',
          primaryContrast: '#FFFFFF',
          surface: '#FFFFFF',
          appBg: '#FFFFFF',
          buttonSurface: '#FFFFFF',
          buttonActive: '#EC4899',
          buttonActiveContrast: '#FFFFFF',
        },
      };
      const preset = themeMap[themeId] || themeMap.blue;
      const root = document.documentElement.style;
      root.setProperty('--primary', preset.primary);
      root.setProperty('--primary-light', preset.primaryLight);
      root.setProperty('--primary-contrast', preset.primaryContrast);
      root.setProperty('--surface', preset.surface);
      root.setProperty('--app-bg', preset.appBg);
      root.setProperty('--button-surface', preset.buttonSurface);
      root.setProperty('--button-active', preset.buttonActive);
      root.setProperty('--button-active-contrast', preset.buttonActiveContrast);
    },
    handleThemeChange(themeId) {
      this.activeTheme = themeId;
      this.applyTheme(themeId);
    },
  },
  watch: {
    activeNav(newVal) {
      if (this.currentView !== 'settings') {
        this.currentView = newVal;
      }
    },
  },
};
</script>

<style>
.app-shell {
  min-height: 100vh;
  background: var(--app-bg);
}
</style>
