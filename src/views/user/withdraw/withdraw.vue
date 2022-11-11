<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="witht_hb">
      <p class="tits">
        提现金额<span class="tisps" @click="ruleclick">提现规则</span>
      </p>
      <div class="witht_hd">
        <span class="witht_tit">￥</span>
        <van-field
          placeholder="请输入提现金额"
          type="number"
          name="actionMoney"
          v-model="actionMoney"
          :rules="[{ required: true }]"
        />
        <span class="witht_tip" @click="allwithdraw">全部提现</span>
      </div>
    </div>
    <div class="witht_hb">
      <p class="tits">提现至</p>
      <div class="witht_btn">
        <div
          class="van-icon btns bank"
          @click="withtchanges('bank')"
          :class="{ active: defaulactive == 'bank' }"
        >
          <i></i>银行卡
        </div>
        <div
          class="van-icon btns alipay"
          @click="withtchanges('alipay')"
          :class="{ active: defaulactive == 'alipay' }"
        >
          <i></i>支付宝
        </div>
      </div>
      <van-field
        class="nofl"
        v-if="defaulactive == 'bank'"
        readonly
        :value="bank.bankname"
        right-icon="arrow"
        @click="_clickbank"
      />
      <van-field
        class="nofl"
        v-if="defaulactive == 'alipay'"
        readonly
        :value="`支付宝账号 ${alipay.alipaydata[0].accountNum}`"
        right-icon="arrow"
      />
    </div>
    <div class="btnbox">
      <van-button type="danger" @click="sumit" block>提现</van-button>
    </div>
    <!-- 银行 -->
    <van-popup v-model="bank.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="bank.bankInfo"
        @confirm="onConfirmBank"
        @cancel="bank.showPicker = false"
      />
      <!--  <van-popup v-model="bank.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="bank.bankInfo"
        @cancel="bank.showPicker = false"
      /> -->
    </van-popup>
    <van-popup
      class="rulebox"
      v-model="withdrawrule"
      closeable
      get-container="body"
      :close-on-click-overlay="false"
    >
      <div class="rule_hd">
        <div class="rule_title">提现规则</div>
      </div>
      <div class="rule_hb">
        1、费率：0.10%/笔银行付款费；<br />
        2、单日最多提现5次；<br />
        3、单笔最高20000元；<br />
        4、单日最高50000元；<br />
        5、提现时间09：00至18：00；<br />
        6、工作日内提现申请将在2~24小时内审核；<br />
        7、非工作日将顺延
      </div>
    </van-popup>
    <router-view></router-view>
  </router-layout>
</template>

<script>
import { getsAccount } from "api";
// import { getsAccount, addWithdraw } from 'api'
import { mapGetters, mapActions } from "vuex";
export default {
  name: "withdraw",
  data() {
    return {
      withdrawrule: false,
      actionMoney: null,
      content: [],
      bank: {
        bankname: "请选择银行卡",
        showPicker: false,
        accountdata: [],
        bankInfo: []
      },
      alipay: {
        alipaydata: []
      },
      defaulactive: "bank", // 默认显示
      accountId: null // 账户id
    };
  },
  computed: {
    ...mapGetters({
      getwalletinfo: "getwalletinfo"
    })
  },
  created() {
    this._certification();
    this._getAccountlist();
    this.putwalletinfo("8");
  },
  methods: {
    ...mapActions(["putwalletinfo"]),
    _clickbank() {
      if (this.bank.bankInfo.length == 0) {
        this.$toast("请添加银行卡！");
      } else {
        this.bank.showPicker = true;
      }
    },
    _certification() {
      /*   let { getwalletinfo, $confirm, $router } = this
      if(getwalletinfo.identAuthStatus == 2 || getwalletinfo.identAuthStatus == 3 ){
        $confirm({
          message: '为了让您的交易更安全，请您在进行提现之前，首先进行实名认证',
          confirmButtonText: '去实名认证'
        }).then(() => {
          $router.replace({name: 'authentication'})
        }).catch(() => {
          $router.back()
        })
        
      } */
    },
    ruleclick() {
      this.withdrawrule = true;
    },
    allwithdraw() {
      this.actionMoney = this.getwalletinfo.availableMoney;
    },
    withtchanges(key) {
      let that = this;
      if (key == "alipay") {
        if (that.alipay.alipaydata.length == 0) {
          that.$toast("请添加支付宝");
          return;
        }
        that.accountId = that.alipay.alipaydata[0].id;
      }
      that.defaulactive = key;
    },
    _getAccountlist() {
      let that = this;
      getsAccount().then((res) => {
        // console.log('effff',res);
        this.content = res.data.content;
        res.data.content = that.content;
        if (res && res.errorCode == 1) {
          let bankcontent = res.data.content.filter(
            (res) => res.accountType == 4
          );
          let alipaycontent = res.data.content.filter(
            (res) => res.accountType == 1
          );
          if (bankcontent.length > 0 || alipaycontent.length > 0) {
            bankcontent.forEach((item) => {
              that.bank.bankInfo.push({
                text: `${item.bankName} ${item.accountNum}`,
                bankName: item.bankName,
                id: item.id,
                accountNum: item.accountNum
              });
            });
            that.alipay.alipaydata = alipaycontent;
          }
        }
      });
    },
    onConfirmBank(key) {
      if (key) {
        this.bank.bankname = key.text;
        this.accountId = key.id;
      }

      this.bank.showPicker = false;
    },
    sumit() {
      // let { actionMoney, accountId, $toast, $confirm, putwalletinfo, $router, alipay, bank } = this
      // let { actionMoney, accountId, $toast,$router,putwalletinfo } = this
      let { actionMoney, accountId, $toast } = this;
      if (!actionMoney) {
        $toast("请输入提现金额");
        this.actionMoney = this.value;
        return;
      }
      if (actionMoney == 0) {
        $toast("提现金额要大于0");
        return;
      }
      /*   if(bank.bankInfo.length == 0 && alipay.alipaydata.length == 0){
        $confirm({
          message: '抱歉，您还未添加银行卡，进行余额提现前，需首先添加一张支持提现的银行卡！',
          confirmButtonText: '去添加银行卡'
        }).then(() => {
          $router.push({name: 'receivablelist'})
        }).catch(() => {})
        return
      } */
      if (!accountId) {
        $toast("请选择银行卡");
        return;
      }

      this.$router.push({
        name: "widthdrawpassword",
        params: {
          //  password:this.value,
          actionMoney: this.actionMoney,
          accountId: this.accountId
        }
      });
      /*  addWithdraw({actionMoney:actionMoney,accountId:accountId }).then((res) => {
        console.log('提现',res);
        putwalletinfo()
        // $router.push({name:'widthdrawpassword'})
        if(res && res.errorCode == 1){
          $toast.success('提现成功')
          $router.push({name:'wdetails', params: {id: res.data.id}} )
        } else {
          $toast.fail('提现失败')
        }
      }) */
    }
    // postwidthdraw(){
    //   let { actionMoney, accountId, $toast,$router,putwalletinfo } = this
    //    addWithdraw({actionMoney:actionMoney,accountId:accountId }).then((res) => {
    //     console.log('提现',res);
    //     putwalletinfo()
    //     // $router.push({name:'widthdrawpassword'})
    //     if(res && res.errorCode == 1){
    //       $toast.success('提现成功')
    //       $router.push({name:'wdetails', params: {id: res.data.id}} )
    //     } else {
    //       $toast.fail('提现失败')
    //     }
    //   })
    // }
  }
};
</script>

<style scoped lang="scss">
.rulebox {
  border-radius: 8px;
  width: 300px;
  .rule_hd {
    background: #f95d5d;
    padding: 15px 0;
    color: #fff;
    position: relative;
    .rule_title {
      text-align: center;
      font-size: 16px;
    }
  }
  :deep(.van-popup__close-icon) {
    top: 12px;
    font-size: 18px;
    color: #fff;
  }
  .rule_hb {
    padding: 20px;
    line-height: 24px;
    font-size: 14px;
  }
}
.witht_hb {
  margin: 10px;
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  .nofl {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
  }
  .witht_btn {
    display: flex;
    margin: 10px 0;
    .btns {
      width: 300px;
      height: 45px;
      padding-bottom: 5px;
      border: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      overflow: hidden;
      position: relative;
      i {
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        display: block;
        margin: 0 4px -4px 0;
      }
    }
    .bank {
      margin-right: 10px;
      i {
        background-image: url(../../../assets/image/common/bank.png);
      }
    }
    .alipay {
      margin-left: 10px;
      i {
        background-image: url(../../../assets/image/common/alipay.png);
      }
    }
    .active {
      border-color: #f00;
      &::after {
        width: 50px;
        height: 50px;
        background: #f00;
        content: "";
        position: absolute;
        left: -32px;
        top: -32px;
        transform: rotate(45deg);
        z-index: 1;
      }
      &::before {
        width: 50px;
        height: 50px;
        content: "\F0C8";
        position: absolute;
        z-index: 2;
        left: 1px;
        top: 2px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .tits {
    font-size: 0.37333rem;
    padding: 0 0 10px 0;
    display: flex;
    justify-content: space-between;
    .tisps {
      font-size: 12px;
    }
  }
  .witht_btn {
    display: flex;
  }
  .witht_hd {
    display: flex;
    align-items: flex-end;
    .witht_tit {
      font-size: 14px;
    }
    .witht_tip {
      font-size: 12px;
      color: #f00;
    }
    .van-cell {
      margin-top: 10px;
      padding-bottom: 5px;
      flex: 1;
      .van-field__control {
        font-size: 18px;
      }
    }
  }

  /* 输入支付密码 */

  .pass {
    margin: 5px;
    padding: 29.33px;
    font-size: 15px;
    color: #666666;
  }
  //   .placeholder {
  //   width: 40px;
  //   height: 40px;
  //   background: #CCCCCC;
  //   padding: 28.67px ;
  //   margin: 29.33px
  // }
  .a {
    padding: 28.67px;
    width: 90%;
    margin-left: 16px;
    height: 159.67dp;
  }
  .input-box {
    input {
      width: 40px;
      height: 40px;
      border: 2px solid #cccccc;
      border-radius: 8px;
      padding: 10px;
    }

    .input-content {
      width: 80%;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      margin-top: 1px;
    }
  }

  .van_button {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    display: block;
    margin-top: 120px;
  }
  li.van-password-input__item {
    border-color: 1px #cccccc;
  }
}
</style>
