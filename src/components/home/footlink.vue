<template>
  <div class="footer">
    <div class="fzd">
      ©禄可集团诚聊开发团队
      <a
        href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUzNzA2ODYxMg==#wechat_redirect"
        >关注诚聊购</a
      >
    </div>
    <div class="fottis">
      增值电信业务经营许可证
      <a href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
        >闽B2-20201016</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "footlink",
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>
<style scoped lang="scss">
.footer {
  text-align: center;
  padding-bottom: 10px;
  .fzd {
    font-size: 13px;
    height: 20px;
    color: #b4b4b4;
    a {
      color: #b4b4b4;
    }
  }
  .fottis {
    color: #bebebe;
    font-size: 12px;
  }
  a {
    color: #bebebe;
  }
}
</style>
