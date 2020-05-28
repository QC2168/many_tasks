<script>
    export default {
        onLaunch: function() {
          uni.showModal({
              title:"警告",
              content:'测试阶段',
              showCancel:false,
              confirmText:"已读"
          })
          // #ifdef H5
          uni.showModal({
              title: '提示',
              content: 'APP版本现已推出，是否马上下载~',
              success: function (res) {
                  if (res.confirm) {
                      window.open("http://task.taskarea.top/static/taskmore_test.apk")
                  }
              }
          });
          // #endif
       
         // console.log(this.$u.config.v);
        },
        onShow: function() {

        },
        onHide: function() {

        },
        globalData: {
        		 URL:"http://task.taskarea.top",
        		 // URL:"http://api.taskarea.com",
        	},
            methods:{
                
            }
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
