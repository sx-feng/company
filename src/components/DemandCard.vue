<template>
  <article class="demand-card">
    <header class="card-header">
      <div class="identity">
        <p class="name">{{ demand.name }}</p>
        <p class="phone">{{ demand.phone }}</p>
      </div>
      <span class="status" :class="statusClass">{{ demand.status }}</span>
    </header>

    <div class="details">
      <p class="detail-line">
        <span class="label">预算</span>
        <span class="value">{{ demand.budget }}</span>
      </p>
      <p class="detail-line">
        <span class="label">服务</span>
        <span class="value">{{ demand.service }}</span>
      </p>
      <p class="detail-line">
        <span class="label">时间</span>
        <span class="value">{{ demand.time }}</span>
      </p>
      <p class="detail-line">
        <span class="label">地点</span>
        <span class="value">{{ demand.location }}</span>
      </p>
    </div>

    <footer class="actions">
      <button class="action ghost" type="button" @click="$emit('view', demand)">查看详情</button>
      <button class="action ghost" type="button" @click="$emit('edit', demand)">编辑需求</button>
      <button class="action primary" type="button" @click="$emit('push', demand)">推送化妆师</button>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'DemandCard',
  props: {
    demand: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusClass() {
      if (this.demand.status === '已确认') return 'is-confirmed';
      if (this.demand.status === '紧急处理') return 'is-urgent';
      return 'is-pending';
    },
  },
};
</script>

<style scoped>
.demand-card {
  background: #ffffff;
  border: 1px solid var(--gray-100);
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.identity {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.phone {
  margin: 0;
  font-size: 12px;
  color: var(--gray-500);
}

.status {
  margin-left: auto;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.status.is-pending {
  background: #fef9c3;
  color: #854d0e;
}

.status.is-confirmed {
  background: #ecfdf3;
  color: #166534;
}

.status.is-urgent {
  background: #fee2e2;
  color: #b91c1c;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-line {
  margin: 0;
  font-size: 13px;
  color: #374151;
}

.label {
  color: #111827;
  font-weight: 600;
  margin-right: 12px;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid var(--gray-100);
}

.action {
  flex: 1;
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 12.5px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.action.ghost {
  background: #f9fafb;
  border-color: #e5e7eb;
  color: #374151;
}

.action.primary {
  background: var(--primary);
  color: var(--primary-contrast);
}

.action:hover {
  transform: translateY(-1px);
}
</style>
