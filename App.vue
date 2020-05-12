<script>
    export default {
        onLaunch: function() {
          uni.showModal({
              title:"警告",
              content:'此版本为测试版,非发布版本 可能发生一些小问题',
              showCancel:false,
              confirmText:"已读"
          })
          
         console.log(this.$u.config.v);
        },
        onShow: function() {

        },
        onHide: function() {

        },
        globalData: {
        		 URL:"http://121.42.13.36:9000",
        	},
    }
</script>

<style lang="scss">
    @import "@/node_modules/uview-ui/index.scss";
    /* 引入自定义icon库 */
    @import "./static/iconfont/iconfont.css";
    /* 自定义动画库 */
    @import "./common/animate.css";
    /* 自定义公共css */
    @import "./common/common.css";
    /*每个页面公共css */
    /* 自定义JS */
    @import "./common/common.js";
</style>
