<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view>
      <text>{{ title }}</text>
    </view>
    <view m-5>
      <uni-number-box v-model="numberStore.number" @change="changeValue" />
    </view>
    <button @click="numberStore.resetNumber" size="mini" plain>重置数字</button>
    <button m-5 @click="getData" size="mini" plain>网络请求</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNumberStore } from "@/store";
import { http } from "@/utils/http";
const numberStore = useNumberStore();
const title = ref("Hello uniapp");
const changeValue = (value: number) => {
  console.log("返回数值：", value);
  numberStore.setNumber(value);
};
const getData = async () => {
  const res = http({
    method: "GET",
    url: "/test/hello",
  });
  console.log(res);
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
