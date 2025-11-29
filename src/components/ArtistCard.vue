<template>
  <article class="card">
    <div class="cover">
      <img :src="artist.cover" :alt="artist.name" />
      <p class="works">{{ artist.worksText }}</p>
    </div>
    <div class="content">
      <header class="header">
        <img class="avatar" :src="artist.avatar" :alt="artist.name" />
        <div class="meta">
          <div class="name">{{ artist.name }}</div>
          <div class="badges">
            <span v-for="badge in artist.experienceBadges" :key="badge" class="badge">{{ badge }}</span>
          </div>
        </div>
      </header>

      <div class="rating-row">
        <div class="stars" aria-label="评分">
          <span v-for="(_, index) in 5" :key="index" class="star">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  :id="`star-grad-${_uid}-${index}`"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stop-color="#FACC15" />
                  <stop :offset="`${fillPercent(index) * 100}%`" stop-color="#FACC15" />
                  <stop :offset="`${fillPercent(index) * 100}%`" stop-color="#E5E7EB" />
                  <stop offset="100%" stop-color="#E5E7EB" />
                </linearGradient>
              </defs>
              <path
                d="M8.006 13.51c-.246.464-.793.492-1.32.464L4.67 9.901l-3.937-.601C.214 9.217.049 8.725.214 8.206l2.844-2.816-.684-3.992c-.055-.52.355-.848.848-.601l3.5 1.859 3.527-1.859c.464-.246.902.054.94.574l.656 3.992 2.844 2.816c.355.383.219.902-.301.984l-3.938.602-1.75 3.61z"
                :fill="`url(#star-grad-${_uid}-${index})`"
              />
            </svg>
          </span>
        </div>
        <span class="comment-count">{{ artist.comments }} 条评论</span>
      </div>

      <div class="tags">
        <span v-for="tag in artist.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <div class="actions">
        <button class="btn ghost" type="button">咨询</button>
        <button class="btn primary" type="button">预约</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ArtistCard',
  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
  methods: {
    fillPercent(index) {
      const value = this.artist.rating - index;
      if (value >= 1) return 1;
      if (value <= 0) return 0;
      return value;
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  display: flex;
  background: var(--surface);
  border: 1px solid var(--gray-100);
  border-radius: 7px;
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  min-height: 154px;
}

.cover {
  position: relative;
  width: 115px;
  height: 152.5px;
  flex-shrink: 0;
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 0;
}

.cover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
  z-index: 1;
}

.works {
  position: absolute;
  bottom: 6px;
  left: 12px;
  margin: 0;
  padding: 4px 0;
  color: #ffffff;
  font-size: 10.5px;
  line-height: 14px;
  z-index: 2;
}

.content {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  line-height: 21px;
}

.badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 3.5px 7px;
  background: var(--pink-soft);
  color: var(--pink);
  border-radius: 9999px;
  font-size: 10.5px;
  line-height: 14px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star svg {
  display: block;
}

.comment-count {
  font-size: 10.5px;
  color: var(--gray-500);
  line-height: 14px;
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 3.5px 7px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 9999px;
  font-size: 10.5px;
  line-height: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
  margin-top: auto;
}

.btn {
  border-radius: 9999px;
  padding: 3.5px 10.5px;
  min-width: 45px;
  font-size: 12.25px;
  line-height: 17.5px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.btn.ghost {
  background: var(--button-surface);
  border-color: var(--gray-300);
  color: var(--gray-600);
}

.btn.primary {
  background: var(--button-active);
  color: var(--button-active-contrast);
}
</style>
