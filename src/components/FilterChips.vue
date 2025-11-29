<template>
  <div class="chip-row">
    <button
      v-for="option in options"
      :key="option.id"
      class="chip"
      :class="{ active: option.id === value }"
      @click="$emit('input', option.id)"
      type="button"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterChips',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.chip-row {
  display: flex;
  gap: 7px;
  width: 100%;
  margin-top: 8px;
}

.chip {
  flex: 1;
  padding: 9px 12px;
  border-radius: 9999px;
  border: 1px solid var(--gray-300);
  background: var(--surface);
  color: var(--gray-600);
  font-size: 12.25px;
  font-weight: 500;
  line-height: 17.5px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.chip.active {
  background: var(--primary);
  color: var(--primary-contrast);
  border-color: var(--primary);
}
</style>
