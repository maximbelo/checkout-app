<template>
  <the-header></the-header>
  <payment-form></payment-form>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import PaymentForm from "./components/payment/PaymentForm.vue";

export default {
  components: { TheHeader, PaymentForm },
};
</script>

<style lang="scss">
@import "../src/assets/style.scss";
</style>
