<template>
  <router-layout>
    <van-nav-bar
      title="昵称"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="wrapper">
      <div class="area-box">
        <textarea
          class="area"
          v-focus
          v-model="nickName"
          maxlength="20"
          cols="30"
          rows="10"
        >
        </textarea>
        <div class="limitNum">{{ nickLen }}/20</div>
      </div>

      <div class="btn-save" @click="saveHandle">保存</div>
    </div>
  </router-layout>
</template>
<script>
import { updateBase } from "api";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ChangeName",
  data() {
    const { nickName } = this.$route.query;
    return {
      nickName
    };
  },
  computed: {
    ...mapGetters({
      getuserinfo: "getuserinfo"
    }),
    nickLen() {
      return this.nickName?.length || 0;
    }
  },
  mounted() {
    console.log(this.$router);
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  methods: {
    ...mapActions({
      setuserinfo: "userinfo"
    }),
    saveHandle() {
      const { headPic, upvalue, birthdates } = this.$route.query;

      updateBase({
        nickName: this.nickName,
        headPic,
        upvalue,
        birthdates
      }).then((res) => {
        if (res && res.errorCode === 1) {
          const { headPic } = this.$route.query;
          this.setuserinfo({
            ...this.getuserinfo,
            nickName: this.nickName,
            headPic
          });
          this.$toast("修改成功");
          this.$router.back();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  min-height: calc(100vh - 46px);
  background-color: #fff;
  padding: 16px;
  .area-box {
    position: relative;
    .area {
      border: 1px solid #999999;
      border-radius: 12px;
      width: 100%;
      padding: 16px 16px 50px;
      font-size: 13px;
    }
    .limitNum {
      position: absolute;
      right: 16px;
      bottom: 12px;
      color: #999999;
      font-size: 12px;
    }
  }

  .btn-save {
    margin-top: 70px;
    height: 40px;
    background-color: #cf1d1d;
    text-align: center;
    line-height: 40px;
    border-radius: 8px;
    font-size: 18px;
    color: #fff;
  }
}
</style>
