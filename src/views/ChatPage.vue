<template>
  <div class="chat-page" v-if="user">
    <div class="chat-header">
      <button class="back" @click="$emit('back')">
        <img src="/icons/返回.png" alt="返回" />
      </button>
      <img :src="user.avatar" class="avatar" />
      <span class="name">{{ user.name }}</span>
    </div>

    <div class="chat-body" ref="chatBody">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['msg-row', msg.self ? 'self' : 'other']"
      >
        <img v-if="!msg.self" :src="user.avatar" class="msg-avatar" />
        <div class="msg-bubble">{{ msg.text }}</div>
        <img v-if="msg.self" :src="user.avatar" class="msg-avatar" />
      </div>
    </div>

    <div class="chat-input">
      <input type="text" v-model="inputMsg" placeholder="请输入消息..." />
      <button @click="sendMsg">发送</button>
    </div>
  </div>
</template>

<script>
import avatar1 from '@/assets/styles/avatar1.png';
import avatar2 from '@/assets/styles/avatar2.png';
import avatar3 from '@/assets/styles/avatar3.png';

export default {
  name: 'ChatPage',
  props: {
    chat: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      inputMsg: '',
      messages: [],
      allUsers: [
        { id: 1, name: '喜羊羊', avatar: avatar1 },
        { id: 2, name: '美羊羊', avatar: avatar2 },
        { id: 3, name: '懒羊羊', avatar: avatar3 },
      ],
    };
  },
  computed: {
    user() {
      if (this.chat) return this.chat;
      return {
        id: null,
        name: '访客',
        avatar: avatar1,
      };
    },
  },
  methods: {
    sendMsg() {
      if (!this.inputMsg.trim()) return;
      this.messages.push({
        text: this.inputMsg,
        self: true,
      });
      this.inputMsg = '';
      this.$nextTick(this.scrollToBottom);

      setTimeout(() => {
        this.messages.push({
          text: '收到啦，我这边马上安排～',
          self: false,
        });
        this.$nextTick(this.scrollToBottom);
      }, 600);
    },
    scrollToBottom() {
      const box = this.$refs.chatBody;
      if (box) box.scrollTop = box.scrollHeight;
    },
  },
};
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  padding-bottom: 4.25rem;
  box-sizing: border-box;
  overflow: hidden;
}

.chat-header {
  height: 3rem;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.6rem;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.06);
  border-bottom: 0.5px solid #eee;
}

.back {
  border: none;
  background: none;
  margin-right: 0.5rem;
}
.back img {
  width: 0.9rem;
  height: 0.9rem;
}

.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.name {
  font-size: 1rem;
  font-weight: bold;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #ffffff;
}

.msg-row {
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.6rem;
}
.msg-row.self {
  justify-content: flex-end;
}
.msg-row.other {
  justify-content: flex-start;
}

.msg-avatar {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}

.msg-bubble {
  max-width: 60%;
  padding: 0.5rem 0.8rem;
  border-radius: 0.6rem;
  margin: 0 0.4rem;
  font-size: 0.9rem;
  line-height: 1.2rem;
}
.self .msg-bubble {
  background: #ff4b7d;
  color: white;
}
.other .msg-bubble {
  background: #fff;
  color: #333;
  border: 1px solid #eee;
}

.chat-input {
  height: 3.2rem;
  display: flex;
  padding: 0.4rem;
  background: #fff;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  position: fixed;
  bottom: 1rem;
  left: 0;
  width: 100%;
}

.chat-input input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 0.3rem 0.6rem;
}

.chat-input button {
  margin-left: 0.4rem;
  padding: 0 0.8rem;
  background: #ff4b7d;
  color: #fff;
  border: none;
  border-radius: 1rem;
}
</style>
