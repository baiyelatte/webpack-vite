<!--
 * @Date: 2022-11-07 10:59:44
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 16:47:08
 * @FilePath: \mallh5\src\views\securityCenter\suggestions.vue
-->
<template>
  <router-layout>
    <div class="center">
      <van-nav-bar
        fixed
        placeholder
        :title="$route.meta.title"
        safe-area-inset-top
        left-arrow
        @click-left="$router.back()"
      />
      <van-form
        validate-first
        @failed="onFailed"
        @submit="onSubmit"
        submit-on-enter
        ref="formRef"
      >
        <van-field
          name="textSuggestions"
          style="flex-direction: column"
          class="generalFormat"
          v-model="message"
          rows="2"
          :autosize="{ minHeight: 150 }"
          label="建议内容"
          type="textarea"
          maxlength="500"
          placeholder="请输入建议内容......"
          show-word-limit
          :formatter="formatter"
          clearable
          :rules="[
            {
              validator: inputValidator,
              message: '请输入不少于10个字符',
              trigger: 'onBlur'
            },
            { require: true, message: '请输入必填项' }
          ]"
        />
        <van-field
          class="unload"
          name="uploader"
          label="文件上传"
          style="
            flex-direction: column;
            height: auto;
            margin: 0 auto;
            padding: 0 0;
            margin-top: 10px;
          "
        >
          <template #input>
            <van-uploader
              :after-read="uploadCallback"
              class="generalFormat"
              v-model="fileList"
              multiple
              :max-count="6"
            />
          </template>
        </van-field>
      </van-form>
      <van-button class="generalFormat btn" color="#CF0000" @click="submit"
        >提交建议</van-button
      >
    </div>
  </router-layout>
</template>

<script setup>
import { ref } from "vue";
import { getAddFeedback } from "@/api";
import { _uploadFiler } from "@/utils/dom";
import router from "@/router";
import { Toast } from "vant";

const formRef = ref(null);
const message = ref("");
const fileList = ref([]);
const uploadCallback = (file, detail) => {
  if (Array.isArray(file) && file.length > 0) {
    file.forEach((item, index) => {
      item.status = "uploading";
      item.message = "上传中...";
      _uploadFiler(item, 7)
        .then((res) => {
          item.status = "done"; // 上传成功
          // list.value.push(res);
          item.name = res;
        })
        .catch(() => {
          item.status = "failed";
          item.message = "上传失败";
          // list.value.splice(index, 1);
        });
    });
  } else {
    file.status = "uploading";
    file.message = "上传中...";
    _uploadFiler(file, 7)
      .then((res) => {
        file.status = "done"; // 上传成功
        // list.value.push(res);
        file.name = res;
      })
      .catch(() => {
        file.status = "failed";
        file.message = "上传失败";
        // list.value = [];
      });
  }
};
// 提交失败
const onFailed = (errorMsg) => {
  console.log(errorMsg);
};
// 提交成功
const onSubmit = ({ textSuggestions, uploader }) => {
  const arr = uploader.map((item) => {
    return item.name;
  });
  getAddFeedback({
    feedbackContent: textSuggestions,
    feedbackImgUrl: arr.join(",")
  }).then((res) => {
    if (res.errorCode === 1) {
      Toast("提交成功,多谢您的反馈");
      router.back();
    }
  });
};
const inputValidator = (val) => {
  if (val.length >= 10) {
    return true;
  } else {
    return false;
  }
};
const formatter = (val) => {
  return val.replace(/\s+/g, "");
};
const submit = () => {
  formRef.value.submit();
};
</script>

<style lang="scss" scoped>
:deep(.van-field__error-message) {
  position: absolute;
  bottom: -10px;
}
.unload {
  width: 355px;
  :deep(.van-field__label) {
    position: relative;
    left: 20px;
    top: 10px;
  }
}
.center {
  position: relative;
  width: 100%;
  height: 100%;
  .generalFormat {
    width: 355px;
    height: auto;
    margin: 0 auto;
    margin-top: 10px;
    overflow: hidden;
    border-radius: 6px;
  }
  .btn {
    position: absolute;
    bottom: 50px;
    height: 50px;
    display: block;
    left: 0;
    right: 0;
  }
}
:deep(.van-uploader) {
  background-color: #fff;
  padding: 10px;
  display: block;
  width: 355px;
  height: 100%;
}
:deep(.van-uploader__preview) {
  margin: 0 0;
  width: 100px;
  height: 100px;
  margin-right: 5%;
}
:deep(.van-uploader__preview-image) {
  width: 100% !important;
  height: 100% !important;
  border-radius: 6px;
  overflow: hidden;
}
:deep(.van-uploader__upload) {
  margin: 0 0;
  width: 100px;
  height: 100px;
}
:deep(.van-uploader__input) {
  height: 100%;
}
:deep(.van-uploader__wrapper) {
  > div:nth-child(3) {
    margin-right: 0px;
    margin-bottom: 10px;
  }
  > div:nth-child(6) {
    margin-right: 0px;
  }
}
</style>