/*
 * @Author: Crush
 * @Date: 2022-04-19 16:17:46
 * @LastEditTime: 2022-09-27 14:32:16
 * @FilePath: \mallh5\src\views\bindPhone\hooks\useValidate.js
 */
import { Toast } from "vant";
import { ref, computed } from "vue";
import { smscode } from "api";
import { localCache } from "@/utils";

export default function useValidate(formData, handleFormValidate) {
  const downTime = ref(61);

  const validiteText = computed(() =>
    downTime.value === 61 ? "获取验证码" : downTime.value
  );

  const validiteClass = computed(() => (downTime.value === 61 ? "danger" : ""));

  const validateDisabled = computed(() => downTime.value !== 61);

  const validateProps = {
    validiteText,
    validiteClass,
    validateDisabled
  };

  const handleDownTime = () => {
    if (downTime.value <= 0 || downTime.value === 61) {
      downTime.value = 61;
      return;
    }
    downTime.value--;

    setTimeout(handleDownTime, 1000);
  };

  const handleValidateClick = async () => {
    const flag = handleFormValidate?.("telephoneNumber");
    const { telephoneNumber } = formData;
    if (!flag) return;

    downTime.value--;
    handleDownTime();

    try {
      const { errorCode } = await smscode({
        smsType: -1,
        phone: telephoneNumber
      });

      if (errorCode === 1) {
        formData.validiteCode = null;
      } else {
        downTime.value = 61;
      }
    } catch (err) {
      localCache.setCache("errMsg", JSON.stringify(err));
      downTime.value = 61;
    }
  };

  return [validateProps, handleValidateClick, validiteClass];
}
