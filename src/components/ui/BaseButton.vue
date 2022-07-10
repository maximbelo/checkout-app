<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      required: false,
      default: null,
    },
  },
};
</script>
