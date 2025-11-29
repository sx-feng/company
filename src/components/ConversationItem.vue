<template>
  <div class="conversation-row">
    <div class="avatar-wrap">
      <img :src="avatar" :alt="name" class="avatar" />
      <span v-if="unread > 0" class="badge">{{ unread }}</span>
    </div>
    <div class="content">
      <div class="top-row">
        <span class="name">{{ name }}</span>
        <span class="date">{{ date }}</span>
      </div>
      <div class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConversationItem',
  props: {
    name: String,
    message: String,
    date: String,
    avatar: String,
    unread: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.conversation-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  position: relative;
}

.conversation-row + .conversation-row {
  border-top: 1px solid #e3e4e5;
}

.avatar-wrap {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: -4px;
  left: -6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #f65755;
  color: #ffffff;
  border-radius: 8px;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}

.content {
  flex: 1;
  min-width: 0;
}

.top-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name {
  font-size: 15px;
  color: #1c2023;
  line-height: 21px;
}

.date {
  margin-left: auto;
  font-size: 12px;
  color: #c5c8cb;
  line-height: 17px;
  white-space: nowrap;
}

.message {
  margin-top: 4px;
  font-size: 12px;
  color: #c5c8cb;
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
