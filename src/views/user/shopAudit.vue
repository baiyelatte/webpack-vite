<template>
  <div class="shopAudit">
    <div>
      <img src="@/assets/image/audit.png" alt="" />
      <p>店铺审核中</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.shopAudit {
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  > div {
    img {
      width: 100px;
      height: 100px;
    }
    p {
      font-size: 18px;
      margin-top: 10px;
    }
  }
}
</style>
