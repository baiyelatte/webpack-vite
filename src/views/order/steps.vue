<template>
  <router-layout style="z-index: 12">
    <van-nav-bar
      title="查看物流"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell style="margin-bottom: 10px">
      <div style="float: left; width: 70px">
        <div :style="'width:60px;height:50px;line-height:50px;'">
          <img
            width="50"
            height="50"
            fit="contain"
            src="@/assets/image/common/wul.png"
          />
        </div>
      </div>
      <div style="width: calc(100% - 70px); float: left">
        <p>物流公司：{{ exprdata.name }}</p>
        <p>
          运单号：{{ exprdata.courierNum }}
          <van-button
            type="danger"
            size="mini"
            @click="copy(exprdata.courierNum)"
            >复制</van-button
          >
        </p>
      </div>
    </van-cell>
    <div>
      <van-steps direction="vertical" :active="0" class="exprbox-steps">
        <van-step v-for="(item, index) in exprdata.data" :key="index">
          <h3>{{ item.context }}</h3>
          <p>{{ item.time }}</p>
        </van-step>
      </van-steps>
    </div>
  </router-layout>
</template>

<script>
import { getExpressDetail } from "api";
import { Col } from "vant";
export default {
  name: "steps",
  data() {
    return {
      exprdata: []
    };
  },
  methods: {
    copy(item) {
      let oInput = document.createElement("input");
      oInput.value = item;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$toast("运单号复制成功");
      oInput.remove();
    },
    _getExpressDetail() {
      getExpressDetail({
        expId: this.$route.query.expId,
        expSn: this.$route.query.expSn
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this.exprdata = res.data;
        }
      });
    }
  },
  created() {
    this._getExpressDetail();
  }
};
</script>

<style>
.exprbox-steps p,
.exprbox-steps h3 {
  margin: 0;
  font-weight: normal;
  font-size: inherit;
}
</style>
