<script>
    export default {
        onLaunch: function() {
          // uni.showModal({
          //     title:"警告",
          //     content:'测试阶段',
          //     showCancel:false,
          //     confirmText:"已读"
          // })
          // #ifdef H5
          // uni.showModal({
          //     title: '提示',
          //     content: 'APP安卓版本现已推出，是否马上下载~',
          //     success: function (res) {
          //         if (res.confirm) {
          //             window.open("http://task.taskarea.top/static/taskmore.apk")
          //         }
          //     }
          // });
          
          // 判断是不是微信内置浏览器
          let ua = window.navigator.userAgent.toLowerCase(); 
               
               if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
                      // uni.showToast({
                      //     icon:"none",
                      //     title:"请不要在微信中直接访问该网站，使用浏览器打开",
                      //     duration:100000
                      // })
                  } 
          // #endif
        
       
         // console.log(this.$u.config.v);
        },
        onShow: function() {
            console.log( process.env.NODE_ENV);
        },
        onHide: function() {
// #ifdef  APP-PLUS
            plus.nativeUI.toast("切换至后台运行");
            // #endif
        },
        globalData: {
            URL:process.env.NODE_ENV === 'development'?'http://api.taskarea.com':'http://task.taskarea.top',
        		 // URL:"http://task.taskarea.top",
        		 // URL:"http://api.taskarea.com",
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
