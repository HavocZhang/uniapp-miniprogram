import { defineStore } from "pinia";
import { ref } from "vue";

export const useNumberStore = defineStore(
  "number",
  () => {
    const number = ref<number>(0);

    const setNumber = (val: number) => {
      number.value = val;
    };

    const resetNumber = () => {
      console.log("12123");
      number.value = 0;
    };

    return {
      number,
      setNumber,
      resetNumber,
    };
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      },
    },
  }
);
