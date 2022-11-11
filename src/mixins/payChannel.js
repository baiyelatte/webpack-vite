import { getPayChannelList } from "api";

export default {
  data() {
    return {
      channelList: []
    };
  },
  created() {
    this._getPayChannelList();
  },
  methods: {
    async _getPayChannelList() {
      const {
        data: { content }
      } = await getPayChannelList({ source: 2 });
      this.channelList = content;
    },

    accountClick(channelId) {
      if (!this.isSetPayPwd) {
        this.$confirm({
          message: "请设置支付密码"
        })
          .then(() => {
            this.$router.push({
              path: "/user/wallet/Changepassword",
              query: {
                isSetPassword: true
              }
            });
          })
          .catch(() => {
            // on cancel
          });
        return;
      }

      this.$store.commit("order/changeChannelId", channelId);
      this.$emit("passwordOpen");
    },
    handlePay({ payType, channelId }) {
      switch (payType) {
        case 3:
          this.accountClick(channelId);
          break;
        case 2:
          this.triggerPay(this.iswechat ? "4" : "2", channelId);
          break;
        default:
          this.triggerPay(payType, channelId);
          break;
      }
    }
  }
};
