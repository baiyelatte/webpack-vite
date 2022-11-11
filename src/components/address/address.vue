<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="select"
    >
      <template #default>
        <div class="van-empty" v-if="!list.length > 0">
          <div class="van-empty__image" style="width: 50%; height: auto">
            <img src="@/assets/image/common/drfaultaddress.png" />
          </div>
          <p class="van-empty__description">暂无数据</p>
        </div>
      </template>
    </van-address-list>
    <van-popup
      v-model="showPicker"
      position="bottom"
      :style="'height:' + winheight + 'px'"
    >
      <van-nav-bar
        title="新增地址"
        left-arrow
        @click-left="showPicker = false"
        :style="
          'padding-top:' + headerAttr.statusbar + 'px;box-sizing:border-box'
        "
      />
      <van-address-edit
        :area-list="areaList"
        :address-info="addressinfo"
        :tel-validator="regphone"
        show-set-default
        :validator="customvalidator()"
        tel-maxlength="11"
        name-maxlength="10"
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="addonSave"
      />
    </van-popup>
    <van-popup
      v-model="updatashowPicker"
      position="bottom"
      :style="'height:' + winheight + 'px'"
    >
      <van-nav-bar
        title="修改地址"
        left-arrow
        @click-left="updatashowPicker = false"
      />
      <van-address-edit
        :area-list="areaList"
        :address-info="addressinfo"
        show-delete
        show-set-default
        show-search-result
        name-maxlength="10"
        tel-maxlength="11"
        @focus="inputfocus"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="uponSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import areaList from "@/utils/area";
import { regphone } from "@/utils/dom";

import {
  getsUserAddress,
  addUserAddress,
  delUserAddress,
  updateUserAddress
} from "api";
export default {
  name: "addresss",
  props: {
    winwidth: {
      default: document.documentElement.clientWidth
    },
    winheight: {
      default: document.documentElement.clientHeight
    }
  },
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      regphone: regphone,
      Sourcedlist: [],
      addressinfo: {},
      areaList,
      showPicker: false, // 弹窗
      updatashowPicker: false,
      chosenAddressId: "1", // 默认
      list: [],
      addUserAddress: true,
      addonSaveclick: false
    };
  },
  created() {
    this._getsUserAddress();
  },
  methods: {
    inputfocus(a) {
      console.log(a);
    },
    _getsUserAddress() {
      let toats = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      getsUserAddress().then((res) => {
        toats.clear();
        if (res && res.errorCode == 1) {
          let arr = [];
          this.Sourcedlist = res.data.content;
          res.data.content.forEach((element) => {
            arr.push({
              id: element.id,
              name: element.consigneeName,
              tel: element.consigneeMobile,
              address:
                element.consigneeProvince +
                element.consigneeCity +
                element.consigneeCounty +
                element.consigneeAddress,
              isDefault: element.canDefault
            });
          });
          if (arr.length === 1) {
            this.chosenAddressId = arr[0].id;
            // this.Sourcedlist=res.data.content
          } else if (arr.length > 1) {
            const choseDefault = arr.filter((address) => address.isDefault);
            //  console.log(choseDefault,00)
            if (choseDefault.length === 1) {
              this.chosenAddressId = choseDefault[0].id;
            }
          }

          this.list = arr;
          // console.log(this.Sourcedlist,'sss');
        }
      });
    },
    select(item, index) {
      this.$emit("select", item, this.Sourcedlist[index]);
    },
    onAdd() {
      this.showPicker = true;
      this.addressinfo = {};
    },
    customvalidator(key, val) {
      console.log(key, val);
    },
    onEdit(item, index) {
      this.addUserAddress = false;
      this.updatashowPicker = true;
      let sourdata = this.Sourcedlist;
      let cityList = areaList.city_list;
      let dats = areaList.county_list;
      let areaCode = null;

      for (let cityKey in cityList) {
        if (cityList[cityKey] === sourdata[index].consigneeCity) {
          const cityId = cityKey.substring(0, 2);
          for (let areaKey in dats) {
            if (dats[areaKey] === sourdata[index].consigneeCounty) {
              const areaId = areaKey.substring(0, 2);
              if (cityId === areaId) {
                areaCode = areaKey;
                break;
              }
            }
          }
        }
      }
      this.addressinfo = {
        id: sourdata[index].id,
        name: sourdata[index].consigneeName,
        tel: sourdata[index].consigneeMobile,
        isDefault: sourdata[index].canDefault,
        addressDetail: sourdata[index].consigneeAddress,
        province: sourdata[index].consigneeProvince,
        city: sourdata[index].consigneeCity,
        county: sourdata[index].consigneeCounty,
        areaCode: areaCode
      };
    },
    addonSave(data) {
      if (data.name.length > 10) {
        this.$toast("姓名不能大于10个字符");
        return;
      }
      let arrdata = {
        id: data.id,
        consigneeName: data.name,
        consigneeMobile: data.tel,
        consigneeProvince: data.province,
        consigneeCity: data.city,
        consigneeCounty: data.county,
        consigneeTown: "",
        consigneeAddress: data.addressDetail,
        canDefault: data.isDefault
      };
      if (this.addonSaveclick) {
        this.$toast("请勿重复提交");
        return;
      }
      let toats = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.addonSaveclick = true;

      addUserAddress(arrdata).then((res) => {
        if (res && res.errorCode === 1) {
          this.addonSaveclick = false;
          this.$toast("增加成功");
          this.showPicker = false;
          setTimeout(() => {
            this._getsUserAddress();
          }, 100);
        }
      });
    },
    uponSave(data) {
      if (data.name.length > 10) {
        this.$toast("姓名不能大于10个字符");
        return;
      }
      let arrdata = {
        id: data.id,
        consigneeName: data.name,
        consigneeMobile: data.tel,
        consigneeProvince: data.province,
        consigneeCity: data.city,
        consigneeCounty: data.county,
        consigneeTown: "",
        consigneeAddress: data.addressDetail,
        canDefault: data.isDefault
      };
      updateUserAddress(arrdata).then((res) => {
        if (res && res.errorCode === 1) {
          this.$toast("更新成功");
          this.updatashowPicker = false;
          setTimeout(() => {
            this._getsUserAddress();
          }, 100);
        }
      });
    },
    onDelete(item) {
      delUserAddress({ id: item.id }).then((res) => {
        if (res && res.errorCode == 1) {
          this.updatashowPicker = false;
          setTimeout(() => {
            this._getsUserAddress();
          }, 100);
        }
      });
    }
  }
};
</script>
