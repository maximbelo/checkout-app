<template>
  <section class="payment">
    <h2 class="main-header">Payment</h2>
    <base-card>
      <div class="form-content">
        <div class="payment-type">
          <h3>We only accept Master and Visa</h3>
          <div class="payment-logos">
            <div class="master-container">
              <img
                src="@/assets/images/mastercard.svg"
                alt="Mastercard logo"
                class="logo"
                :class="{ 'selected-card': cardType === 'MASTERCARD' }"
              />
            </div>
            <div class="visa-container">
              <img
                src="@/assets/images/visa.svg"
                alt="Visa logo"
                class="logo"
                :class="{ 'selected-card': cardType === 'VISA' }"
              />
            </div>
          </div>
        </div>

        <form @submit.prevent>
          <div class="form-group">
            <label for="card-name" :class="{ 'error-text': errorType === 'Invalid Name' }"
              >Name on Card<span>*</span></label
            >
            <input
              id="card-name"
              type="text"
              v-model.trim="cardName"
              :class="{ 'error-highlight': errorType === 'Invalid Name' }"
            />
          </div>
          <p v-if="errorType === 'Invalid Name'" class="error-message">
            Please enter a valid name and try again.
          </p>

          <div class="form-group">
            <label for="card-number" :class="{ 'error-text': errorType === 'Invalid Card' }"
              >Card Number<span>*</span></label
            >
            <input
              id="card-number"
              type="text"
              maxlength="16"
              v-model.trim="cardNumber"
              @keyup="detectCardType(cardNumber)"
              :class="{ 'error-highlight': errorType === 'Invalid Card' }"
            />
          </div>
          <p v-if="errorType === 'Invalid Card'" class="error-message">
            Sorry, this card number is not valid. Please try again.
          </p>

          <div class="expiry-date-and-cvv">
            <div class="form-group card-month">
              <label for="card-month"></label>
              <span class="requiredOne">*</span>
              <select id="card-month" v-model="cardMonth">
                <option value="" disabled selected>Month</option>
                <option
                  :value="n < 10 ? '0' + n : n"
                  v-for="n in 12"
                  :disabled="n < minCardMonth"
                  :key="n"
                >
                  {{ n < 10 ? "0" + n : n }}
                </option>
              </select>
            </div>

            <div class="form-group card-year">
              <label for="card-year"></label>
              <span class="requiredTwo">*</span>
              <select id="card-year" v-model="cardYear">
                <option value="" disabled selected>Year</option>
                <option :value="$index + minCardYear" v-for="(n, $index) in 12" :key="n">
                  {{ $index + minCardYear }}
                </option>
              </select>
            </div>

            <div class="form-group card-cvv">
              <label for="card-cvv" :class="{ 'error-text': errorType === 'Invalid CVV' }"
                >CSC/CVV<span>*</span></label
              >
              <input
                id="card-cvv"
                type="text"
                maxlength="3"
                v-model.trim="cardCvv"
                :class="{ 'error-highlight': errorType === 'Invalid CVV' }"
              />
              <p v-if="errorType === 'Invalid CVV'" class="error-message">
                Sorry, that is not a valid CVV number.
              </p>
            </div>
          </div>
        </form>
      </div>
    </base-card>

    <div class="buttons-container">
      <base-button mode="back">Back</base-button>
      <base-button
        @click="handleSubmit"
        :disabled="!formIsValid"
        :mode="{ 'allow-submission': formIsValid }"
        >Continue</base-button
      >
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cardName: "",
      cardNumber: "",
      cardType: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      errorType: "",
      readyToContinue: false,
    };
  },

  computed: {
    // Function that is used to disable input if the selected month has already passed for the given year
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    },

    // Function to check if all the require fields have been filled out in order to remove disabled pseudo class from the button
    formIsValid() {
      if (
        this.cardName === "" ||
        this.cardNumber === "" ||
        this.cardMonth === "" ||
        this.cardYear === "" ||
        this.cardCvv === ""
      ) {
        return false;
      }
      return true;
    },
  },

  watch: {
    // Watcher to make sure that if the selected month is < the minCardMonth (which is the current month)
    // We reset the cardMonth so that the user can't select an expired date
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    },
  },

  methods: {
    // Handles form submission and checks if there are any errors
    handleSubmit() {
      this.errorType = "";
      const cvvRegex = /^[0-9]{3}$/;
      const nameRegex = /^[a-zA-Z ]+$/;

      this.detectCardType(this.cardNumber);

      if (nameRegex.test(this.cardName) === false) {
        this.errorType = "Invalid Name";
      }

      if (this.cardType === "unknown") {
        this.errorType = "Invalid Card";
      }

      if (cvvRegex.test(this.cardCvv) === false) {
        this.errorType = "Invalid CVV";
      }

      if (this.errorType === "") {
        this.cardName = "";
        this.cardNumber = "";
        this.cardType = "";
        this.cardMonth = "";
        this.cardYear = "";
        this.cardCvv = "";
        alert("Payment has been processed!");
      }
    },

    // Detects the card type - since we only accept Mastercard or Visa, any other format will result in an error
    detectCardType(cc) {
      let visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
      let mastercard =
        /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;

      if (visa.test(+cc)) {
        return (this.cardType = "VISA");
      }

      if (mastercard.test(+cc)) {
        return (this.cardType = "MASTERCARD");
      }

      return (this.cardType = "unknown");
    },
  },
};
</script>
