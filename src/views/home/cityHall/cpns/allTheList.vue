<!--
 * @Date: 2022-10-13 11:14:20
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-02 14:26:13
 * @FilePath: \mallh5\src\views\home\cityHall\cpns\allTheList.vue
-->
<template>
  <div class="allTheList">
    <div class="allTheListDiv">
      <template v-for="(item, index) in itemList">
        <div
          @click="!item ? '' : handleJump(item)"
          :key="index"
          :class="{
            allTheListBoxNone: !item,
            allTheListBox: item
          }"
        >
          <img
            :src="
              !item
                ? require('../../../../assets/image/newVersion/notAvailable.png')
                : item.logImage
            "
            alt=""
            class="allTheListImg img"
            :style="
              !item
                ? 'width:100%;height:100%;border-radius: 5px;margin-top:0;overflow: hidden;'
                : `border: 2px ${colorList[index]} solid;`
            "
            :class="{ active: !item }"
          />
          <!-- <van-image
            v-if="item"
            round
            width="0.9rem"
            height="0.9rem"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          /> -->

          <span v-if="item" class="allTheListSpan">{{ item.shopName }}</span>
          <span v-if="item" class="span">{{ item?.rankScore }}人买过</span>
        </div>
        <!-- </template> -->
        <!-- <template v-else>
          <img
            :key="item"
            src="../../../../assets/image/newVersion/notAvailable.png"
            alt=""
            style="width: 92px; width: 113.5px"
          />
        </template> -->
      </template>
      <p class="allTheListP" @click="$router.push('/rankingList')">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onActivated,
  ref,
  toRefs,
  onMounted,
  onBeforeMount
} from "vue";
import router from "@/router";
import vue from "@/main";
const props = defineProps({
  itemList: {
    type: Array,
    default: () => []
  }
});
const colorList = ["#9DD6FF", "#FFD75C", "#FFCB98"];
const { itemList } = toRefs(props);
const itemLists = JSON.parse(localStorage.getItem("firstThree"));
const text = ref("全部榜単»");
const upload = () => {
  text.value = "全部榜単»";
  setTimeout(() => {
    text.value = "全部榜单»";
  }, 600);
};
onMounted(() => {
  upload();
});
const handleJump = (item) => {
  router.push({
    name: "shopinfo",
    params: {
      shopId: item.shopId
    }
  });
};
defineExpose({
  upload
});
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.active {
  width: 100%;
  height: 100% !important;
}
.allTheList {
  width: 351px;
  height: 172px;
  margin: 0 auto;
  margin-top: 12px;
  background: url("../../../../assets/image/newVersion/allTheList.png")
    no-repeat;
  background-size: 100%;
  overflow: hidden;
  .allTheListDiv {
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    margin: 0 15.5px;
    position: relative;
    .allTheListP {
      font-family: "FangSong";
      position: absolute;
      color: red;
      font-weight: 700;
      font-size: 14px;
      right: 0px;
      top: 14.5px;
    }
    .allTheListBox {
      position: relative;
      width: 91.5px;
      height: 109px;
      margin-top: 40.5px;
      text-align: center;
      border-radius: 14px;
      overflow: hidden;
      background-color: #fff;
      -moz-box-shadow: 2px 2px 10px #bbbbbb;
      -webkit-box-shadow: 2px 2px 10px#bbbbbb;
      box-shadow: 2px 2px 10px #bbbbbb;
      .van-image {
        margin-top: 0px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .allTheListImg {
        width: 50px;
        height: 50px;
      }
      .allTheListSpan {
        display: block;
        width: 100%;
        font-size: 11px;
        height: auto;
        color: #333333;
        font-weight: 700;
        margin-top: 12px;
        line-height: 16px;
        @include no-wrap-multi(1);
      }
    }
    .allTheListBoxNone {
      position: relative;
      width: 91.5px;
      height: 109px;
      margin-top: 40.5px;
      text-align: center;
      -moz-box-shadow: 2px 2px 10px #bbbbbb;
      -webkit-box-shadow: 2px 2px 10px#bbbbbb;
      box-shadow: 2px 2px 10px #bbbbbb;
      overflow: hidden;
      border-radius: 15px;

      .van-image {
        margin-top: 0px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .allTheListImg {
        width: 50px;
        height: 50px;
      }
      .allTheListSpan {
        display: inline-block;
        font-size: 11px;
        color: #333333;
        font-weight: 700;
        margin-top: 21px;
      }
    }
  }
  .allTheListDiv :nth-child(2) {
    width: 113px;
    height: 130px;
    margin-top: 18.5px;
    .allTheListImg {
      height: 60px;
      width: 60px;
    }
    .allTheListSpan {
      font-size: 13px;
      color: #333333;
      font-weight: 700;
      margin-top: 18px;
    }
  }
  .allTheListBox::before {
    position: absolute;
    content: "";
    width: 91.5px;
    height: 22px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  // .allTheListBox::after {
  //   position: absolute;
  //   content: "";
  //   width: 36.5px;
  //   height: 6px;
  //   background-size: 100%;
  //   margin-top: 10px;
  // }

  .allTheListDiv :nth-child(1)::before {
    background: url("../../../../assets/image/newVersion/salesTwo.png")
      no-repeat;
    background-size: 100%;
  }
  .allTheListDiv :nth-child(3)::before {
    background: url("../../../../assets/image/newVersion/salesThree.png")
      no-repeat;
    background-size: 100%;
  }
  .allTheListDiv :nth-child(2)::before {
    width: 113px;
    height: 27px;
    background: url("../../../../assets/image/newVersion/salesOne.png")
      no-repeat;
    background-size: 100%;
  }

  // .allTheListDiv :nth-child(2)::after {
  //   width: 44.5px;
  //   height: 8px;
  //   background-size: 100%;
  // }
}
.img {
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 9px;
}
.span {
  position: absolute;
  font-size: 11px;
  color: #a8a8a8;
  width: 100%;
  height: auto;
  left: 0;
  margin-top: 5px;
}
</style>
