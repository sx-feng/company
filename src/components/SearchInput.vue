<template>
  <label class="search-input">
    <span class="search-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.375 2.3125C11.3203 4.71875 9.70703 6.33203 7.30078 6.38672C6.75781 6.39844 6.23438 6.32422 5.75 6.17578C6.04688 6.82422 6.25 7.53125 6.25 8.3125C6.25 10.7187 4.63672 12.332 2.23047 12.3867C0.625 12.3516 0 11.7266 0 10.125C0 8.52344 0.625 7.89844 2.23047 7.86328C2.9375 7.875 3.61719 8.07031 4.19922 8.41406C3.8125 7.57422 3.59375 6.63281 3.61328 5.64453C3.65625 3.23828 5.26953 1.625 7.67578 1.57031C10.0703 1.625 11.7031 3.23828 11.375 2.3125Z"
          fill="#6B7280"
        />
      </svg>
    </span>
    <input
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="search-field"
      type="text"
    />
  </label>
</template>

<script>
export default {
  name: 'SearchInput',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '搜索化妆师 / 服务类型',
    },
  },
};
</script>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  padding: 0 14px 0 34px;
  border: 1px solid var(--gray-300);
  border-radius: 9999px;
  background: var(--surface);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-field {
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  padding: 0;
  font-size: 12.25px;
  color: var(--gray-500);
}

.search-field::placeholder {
  color: var(--gray-500);
}
</style>
