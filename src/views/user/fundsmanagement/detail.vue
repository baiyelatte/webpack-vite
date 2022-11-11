<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="帐户类型" :value="`${$route.query.bankName}`" />
      <van-cell
        :title="`${$route.query.bankName}账号`"
        :value="`${$route.query.accountNum}`"
      />
    </van-cell-group>
    <div class="btnbox">
      <van-button type="danger" block @click="_deletecard">解绑账户</van-button>
    </div>
  </router-layout>
</template>

<script>
import { deleteAccount } from "api";
export default {
  name: "receivadetail",
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    _deletecard() {
      this.$confirm({
        message: "确认解除该收款账户吗？",
        confirmButtonText: "确认"
      })
        .then(() => {
          this._deleteAccount();
        })
        .catch(() => {});
    },
    _deleteAccount() {
      deleteAccount({ id: this.$route.query.id }).then((res) => {
        if (res && res.errorCode == 1) {
          this.$toast("解绑成功");
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss"></style>
