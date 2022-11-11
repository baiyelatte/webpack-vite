/*
 * @Author: Crush
 * @Date: 2022-04-19 16:37:28
 * @LastEditTime: 2022-09-27 14:32:05
 * @FilePath: \mallh5\src\views\bindPhone\hooks\useFormData.js
 */
import { regphone } from "@/utils/dom";
import { reactive, computed, watch } from "vue";
import { Toast } from "vant";

export default function () {
  const filedMap = {
    telephoneNumber: null,
    validiteCode: null
  };

  const formData = reactive({ ...filedMap });
  const validateMap = reactive({ ...filedMap });

  watch(
    () => formData.telephoneNumber,
    (val) => (validateMap.telephoneNumber = regphone(val))
  );

  watch(
    () => formData.validiteCode,
    (val) => (validateMap.validiteCode = /^[0-9]{6}$/.test(val))
  );

  const isPass = computed(() =>
    Object.values(validateMap).every((formItem) => formItem)
  );

  const handleFormValidate = (validateKey) => {
    let flag = true;
    switch (validateKey) {
      case "telephoneNumber":
        !validateMap.telephoneNumber &&
          ((flag = false), Toast("请输入正确的手机号"));
        break;
      case "validiteCode":
        !validateMap.validiteCode &&
          ((flag = false), Toast("验证码格式不正确"));
        break;
      default:
        flag = isPass.value;
        break;
    }

    return flag;
  };

  return { formData, isPass, handleFormValidate };
}
