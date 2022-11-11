<template>
  <div class="ratebox">
    <div class="rate-card" v-for="(item, index) in ratedata" :key="index">
      <div class="rate-card-header">
        <van-image :src="item.headPic" alt="" />
        <div class="rate-media-body">
          <p class="nickName">{{ item.nickName }}</p>
          <p class="rate-card-date">{{ item.createTime }}</p>
          <!-- <p>发表于 2016-06-30 15:30</p> -->
        </div>
      </div>
      <div class="rate-card-content">
        {{ item.evContent }}
        <div v-if="item.fileArrayUrl">
          <van-image
            @click="imgpreview(item.fileArrayUrl.split(','), indexs)"
            width="100"
            height="100"
            :src="items"
            v-for="(items, indexs) in item.fileArrayUrl.split(',')"
            :key="indexs"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    ratedata: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    imgpreview(imgarr, imgindex) {
      this.$imagepreview({
        images: imgarr,
        startPosition: imgindex
      });
    }
  }
};
</script>
<style scoped lang="scss">
.rate-card {
  :deep(.van-cell__value) {
    color: #ff0036;
  }
  padding: 10px;
  background-color: #fff;
  font-size: 16px;
  .rate-card-header {
    position: relative;
    display: flex;
    min-height: 44px;
    align-items: center;
    .van-image {
      width: 34px;
      height: 34px;
      border-radius: 100%;
      overflow: hidden;
    }
    .rate-media-body {
      font-size: 14px;
      font-weight: 500;
      margin-left: 15px;
      color: #333;
      .nickName {
        font-size: 13px;
        color: #101010;
      }
      .rate-card-date {
        margin-top: 3px;
        font-size: 11px;
        color: #666666;
      }
    }
  }
  .rate-card-content {
    margin: 20px;
    word-wrap: break-word;
  }
}
</style>
