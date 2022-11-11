<template>
  <div>
    <div v-if="userinfo">
      <van-cell>
        <!-- <template #right-icon>
           <van-image round width="40" height="40" fit="contain" :src="userinfo.headPic" />
        </template> -->
        <div style="float: left; width: 70px">
          <div :style="'width:60px;height:60px;line-height:60px;'">
            <van-uploader :after-read="_uplogo">
              <van-image
                round
                width="60"
                height="60"
                fit="contain"
                :src="userinfo.headPic"
              />
            </van-uploader>
          </div>
        </div>
        <div style="width: calc(100% - 70px); float: left; margin-top: 10px">
          <p>{{ userinfo && userinfo.nickName }}</p>
          <p>用户id:{{ userinfo && userinfo.uid }}</p>
        </div>
      </van-cell>
      <!-- <van-field label="昵称" @blur="upduser('nickName',userinfo.nickName)" maxlength="20" placeholder="请输入昵称" v-model="userinfo.nickName" is-link input-align="right" /> -->
      <van-field
        label="昵称"
        readonly
        maxlength="20"
        placeholder="请输入昵称"
        :value="userinfo.nickName"
        is-link
        input-align="right"
        @click="goToChangeName"
      />
      <van-field
        readonly
        clickable
        name="sex"
        v-model="sex.value"
        label="性别"
        is-link
        input-align="right"
        placeholder="请选择性别"
        @click="sex.showPicker = true"
      />
      <van-popup v-model="sex.showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="sex.columns"
          @confirm="sexonConfirm"
          @cancel="sex.showPicker = false"
        />
      </van-popup>
      <van-field
        label="出生日期"
        is-link
        readonly
        clickable
        name="date"
        input-align="right"
        v-model="date.value"
        placeholder="选择时间"
        @click="date.showPicker = true"
      />
      <van-popup v-model="date.showPicker" position="bottom">
        <van-datetime-picker
          v-model="date.currentDate"
          type="date"
          :min-date="date.minDate"
          :formatter="formatter"
          :max-date="date.maxDate"
          @confirm="dateconfirm"
          @cancel="date.showPicker = false"
        />
      </van-popup>

      <!-- <div style="margin: 16px;">
        <van-button round block type="info" @click="save" native-type="submit">
          提交
        </van-button>
      </div> -->
    </div>
  </div>
</template>
<script>
import { _uploadFiler } from "@/utils/dom";
import { getUserInfo, updateBase } from "api";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "personalinfo",
  data() {
    return {
      userinfo: null,
      sex: {
        value: "男",
        columns: ["男", "女"],
        showPicker: false
      },
      date: {
        showPicker: false,
        value: "请选择",
        minDate: new Date(1979, 0, 1),
        maxDate: new Date(),
        currentDate: new Date()
      }
    };
  },
  computed: {
    ...mapGetters({
      getuserinfo: "getuserinfo"
    })
  },
  created() {
    this._getUserInfo();
  },
  methods: {
    ...mapActions({
      setuserinfo: "userinfo"
    }),
    _uplogo(file) {
      let self = this;
      _uploadFiler(file, 13)
        .then((res) => {
          self.userinfo.headPic = res;
          this.save();
        })
        .catch(() => {
          self.userinfo.headPic = "";
        });
    },
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
    _getUserInfo() {
      getUserInfo().then((res) => {
        if (res && res.errorCode == 1) {
          this.userinfo = res.data;
          this.sex.value = res.data.sex ? "男" : "女";
          // this.date.value = String(/\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.birthdate))
          this.date.value = res.data.birthdate;
        }
      });
    },
    dateconfirm(time) {
      let y = time.getMonth() + 1;
      if (y < 10) {
        y = "0" + y;
      }
      let r = time.getDate();
      if (r < 10) {
        r = "0" + r;
      }
      this.date.value = time.getFullYear() + "-" + y + "-" + r;
      this.date.showPicker = false;
      this.save();
    },
    sexonConfirm(value) {
      this.sex.value = value;
      this.sex.upvalue = value === "男" ? true : false;
      this.sex.showPicker = false;
      this.save();
    },
    upduser() {
      this.save();
    },
    save() {
      let userdata = {
        nickName: this.userinfo.nickName,
        birthdates: this.date.value,
        sex: this.sex.upvalue,
        headPic: this.userinfo.headPic
      };
      updateBase(userdata).then((res) => {
        if (res && res.errorCode === 1) {
          let userd = this.getuserinfo;
          userd.nickName = this.userinfo.nickName;
          userd.headPic = this.userinfo.headPic;
          this.setuserinfo(userd);
        }
      });
    },
    goToChangeName() {
      const { nickName, headPic } = this.userinfo;
      const { upvalue } = this.sex;
      const { value: birthdates } = this.date;

      this.$router.push({
        name: "changeName",
        query: { nickName, headPic, upvalue, birthdates }
      });
    }
  }
};
</script>
