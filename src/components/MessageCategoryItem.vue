<template>
  <div class="category-row">
    <div class="icon" :style="{ background: color }">
      <slot name="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="9" fill="white" fill-opacity="0.2" />
        </svg>
      </slot>
    </div>
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
    </div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script>
export default {
  name: 'MessageCategoryItem',
  props: {
    title: String,
    subtitle: String,
    date: String,
    color: {
      type: String,
      default: '#5595FF',
    },
  },
};
</script>

<style scoped>
.category-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 0 14px 0;
  position: relative;
}

.icon {
  width: 40px;
  height: 38px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  font-size: 15px;
  color: #1c2023;
  line-height: 21px;
}

.subtitle {
  font-size: 12px;
  color: #c5c8cb;
  line-height: 17px;
}

.date {
  margin-left: auto;
  font-size: 12px;
  color: #c5c8cb;
  line-height: 17px;
  white-space: nowrap;
}
</style>
