<template>
  <div class="joins">
    <div class="title">
      <p>店铺信息</p>
      <div class="Details">
        <img
          src="../../assets/image/common/shopbg.png"
          width="60px"
          height="60px"
        />
        <p>{{ shopName }}</p>
      </div>
      <van-cell-group inset>
        <van-field v-model="nickName" label="店主名称：" readonly />
        <van-field v-model="tel1" type="tel" label="联系电话:" readonly />
        <van-field
          v-model="message1"
          rows="1"
          autosize
          label="店铺介绍："
          readonly
          type="textarea"
        />
      </van-cell-group>
    </div>
    <div class="titles">
      <p>用户信息</p>

      <van-cell-group inset style="margin-top: 16px">
        <van-field
          v-model="name"
          label="姓名："
          required
          error
          placeholder="请输入用户名"
        />
        <van-field
          v-model="tel"
          type="tel"
          label="电话:"
          required
          error
          placeholder="请输入电话号码"
        />
        <van-field
          v-model="message"
          rows="1"
          autosize
          label="
                备注："
          type="textarea"
        />
      </van-cell-group>
    </div>
    <van-button type="danger" @click="getJoin">申请加入</van-button>
  </div>
</template>

<script>
import { applyJoin, getShop } from "api";
export default {
  data() {
    return {
      name: "",
      tel: "",
      message: "",
      nickName: "",
      tel1: "",
      message1: "",
      shopName: ""
    };
  },
  created() {
    this._getShop();
  },
  methods: {
    // 根据shopId查询店铺信息
    _getShop() {
      getShop({
        // shopId:182,
        shopId: this.$route.query.shopId
      }).then((res) => {
        this.nickName = res.data.nickName;
        this.tel1 = res.data.phoneNumber;
        this.shopName = res.data.name;
      });
    },
    //申请加入店铺按钮
    getJoin() {
      let params = {
        shopId: 128,
        username: this.name,
        phone: this.tel,
        applyuser: 185,
        message: this.message
      };
      applyJoin(params).then((res) => {});
    }
  }
};
</script>

<style scoped lang="scss">
.joins {
  padding: 0 12px;
  .title,
  .titles {
    padding: 15px 24px 36px 16px;
    background: #fff;
    margin: 7px 0;
    border-radius: 10px;
    > p {
      font-size: 15px;
      color: #333333;
      margin-bottom: 8px;
    }
    .Details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        border-radius: 8px;
      }
      p {
        margin: 8px 0 10px 0;
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
.titles {
  // :deep( .van-cell) {
  //   padding: 10px 0;
  // }
}
:deep(.van-button) {
  width: 100%;
  border-radius: 6px;
  background: #bb0000;
}
</style>
