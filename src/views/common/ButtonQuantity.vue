<template>
  <div class="bk-button-quantity">
    <div
      class="button-decrease button-square-quantity"
      @click="decreaseNumber()"
    >
      -
    </div>
    <div class="quantity-value button-square-quantity">
      <input
        v-model="number"
        @keypress="isNumber($event)"
        maxlength="3"
      >
    </div>
    <div
      class="button-increase button-square-quantity"
      @click="increaseNumber()"
    >
      +
    </div>
  </div>
</template>
  <script>
export default {
  name: "ButtonQuantity",
  data() {
    return {
      number: 1,
      numberRule: (val) => {
        if (val < 0) return "Please enter a positive number";
        return true;
      },
    };
  },
  created() {},
  methods: {
    isNumber(evt) {
      console.log(evt.which);
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    decreaseNumber() {
      if (this.number > 1) {
        this.number--;
      }
    },
    increaseNumber() {
      if (this.number < 999) {
        this.number++;
      }
    },
  },
};
</script>
  <style scoped>
.bk-button-quantity {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
}
.button-square-quantity {
  border: solid 1px rgb(176, 176, 176);
  background-color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-decrease {
  font-size: 30px;
  border-right: none;
  cursor: pointer;
}

.button-increase {
  border-left: none;
  cursor: pointer;
}

.quantity-value input {
  outline: none;
  width: 40px;
  height: 40px;
  padding: 2px;
  box-sizing: border-box;
  text-align: center;
  font-weight: bold;
}
</style>