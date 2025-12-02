<template>
  <div class="top-bar">
    <SearchInput
      :value="modelValue"
      placeholder="搜索客户或需求..."
      variant="primary"
      @input="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue';
export default {
  name: 'MessageTopBar',
  components: { SearchInput },
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
};
</script>

<style scoped>
.top-bar {
  padding: 0.7rem 1rem;
  background: #fff;
  border-bottom: 1px solid #ffffff;
}
</style>
