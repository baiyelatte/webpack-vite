<template>
  <div>
    <div class="record" v-for="(item, index) in list" :key="index">
      <van-cell
        v-if="item.isAgree == 1"
        :title="item.shopName"
        is-link
        value="已同意"
        value-class="yes"
        @click="goApply(item)"
      />
      <van-cell
        v-else-if="item.isAgree == 0"
        :title="item.shopName"
        is-link
        value="待商家同意"
        value-class="wait"
        @click="goApply(item)"
      />
      <van-cell
        v-else-if="item.isAgree == 2"
        :title="item.shopName"
        is-link
        value="已拒绝"
        value-class="no"
        @click="goApply"
      />
    </div>
  </div>
</template>

<script>
import { applyRecord } from "api";
export default {
  data() {
    return {
      shopName: "",
      // isAgree:''
      list: []
    };
  },
  methods: {
    getApplyRecord() {
      applyRecord({ applyuser: 186 }).then((res) => {
        // let list = res.data.content;
        // for (let i = 0; i < list.length; i++) {
        //  this.shopName = list[i].shopName;
        //  this.isAgree = list[i].isAgree;
        // }
        this.list = res.data.content;
      });
    },
    goApply(item) {
      this.$router.push({
        path: "Apply?isAgree=" + item.isAgree + "&shopName=" + item.shopName
      });
    }
  },
  created() {
    this.getApplyRecord();
  }
};
</script>

<style scoped lang="scss">
.yes {
  color: #333;
}
.wait {
  color: #faad14;
}
.no {
  color: #f20003;
}
</style>
