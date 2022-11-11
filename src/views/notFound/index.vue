<!--
 * @Author: Admin
 * @Date: 2022-04-07 14:03:19
 * @LastEditors: Crush
 * @LastEditTime: 2022-05-11 15:16:59
 * @FilePath: \mallh5\src\views\notFound\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved. 
-->
<template>
  <div class="not-found">
    <van-nav-bar
      title="NOT FOUND"
      left-arrow
      @click-left="$router.push('/index')"
    />
    <div class="content">
      <div class="image-box">
        <van-image class="image" :src="require('@/assets/image/404.png')" />
      </div>
      <div class="info">
        <p>
          很抱歉，您的页面找不到了， <br />
          请联系管理员进行反馈~
        </p>
      </div>
    </div>
    <!-- <van-empty
      image="error"
      description="很抱歉，您的页面找不到了，请联系管理员进行反馈~"
    /> -->
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  .content {
    text-align: center;
    .image-box {
      margin-top: 26px;
      .image {
        width: 280px;
      }
    }
    .info {
      font-size: 13px;
      line-height: 18.5px;
      color: #999;
    }
  }
}
</style>
