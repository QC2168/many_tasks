
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/reward/reward","pages/profile/profile","pages/login/login","pages/register/register","pages/douyinDetail/douyinDetail","pages/about/about","pages/taskDetail/taskDetail","pages/wallet/wallet","pages/pushTask/pushTask","pages/team/team","pages/myTaskOrder/myTaskOrder","pages/taskManagement/taskManagement","pages/myPushDyTaskOrder/myPushDyTaskOrder","pages/shortVideo/shortVideo","pages/placeOrder/placeOrder","pages/myPushTaskOrder/myPushTaskOrder","pages/news/news","pages/recharge/recharge","pages/buyVip/buyVip","pages/sign/sign","pages/rewardTaskDetail/rewardTaskDetail","pages/placeRewardOrder/placeRewardOrder","pages/myPushRewardTaskOrder/myPushRewardTaskOrder","pages/walletDetails/walletDetails"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"TASKAREA","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#9e9e9e","selectedColor":"#000000","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"static/images/tabbar/home.png","selectedIconPath":"static/images/tabbar/home_selected.png","text":"大厅"},{"pagePath":"pages/news/news","iconPath":"static/images/tabbar/news.png","selectedIconPath":"static/images/tabbar/news_selected.png","text":"消息"},{"pagePath":"pages/profile/profile","iconPath":"static/images/tabbar/profile.png","selectedIconPath":"static/images/tabbar/profile_selected.png","text":"会员中心"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"任务联盟","compilerVersion":"2.7.5","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"大厅","enablePullDownRefresh":true,"scrollIndicator":"none"}},{"path":"/pages/reward/reward","meta":{},"window":{"navigationBarTitleText":"福利","scrollIndicator":"none"}},{"path":"/pages/profile/profile","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"会员中心","enablePullDownRefresh":true,"scrollIndicator":"none","titleNView":{"buttons":[{"color":"#000000","colorPressed":"#BBBBBB","float":"right","fontSize":"22px","fontSrc":"/static/iconfont/iconfont.ttf","text":""}]}}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录账户","scrollIndicator":"none"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"创建账户","scrollIndicator":"none"}},{"path":"/pages/douyinDetail/douyinDetail","meta":{},"window":{"navigationBarTitleText":"抖音任务","scrollIndicator":"none"}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarTitleText":"关于","scrollIndicator":"none"}},{"path":"/pages/taskDetail/taskDetail","meta":{},"window":{"navigationBarTitleText":"标准任务","scrollIndicator":"none"}},{"path":"/pages/wallet/wallet","meta":{},"window":{"navigationBarTitleText":"我的资产","enablePullDownRefresh":true,"scrollIndicator":"none","titleNView":{"buttons":[{"color":"#000000","colorPressed":"#BBBBBB","float":"right","fontSize":"22px","fontSrc":"/static/iconfont/iconfont.ttf","text":""}]}}},{"path":"/pages/pushTask/pushTask","meta":{},"window":{"navigationBarTitleText":"发布任务","scrollIndicator":"none"}},{"path":"/pages/team/team","meta":{},"window":{"navigationBarTitleText":"我的团队","scrollIndicator":"none"}},{"path":"/pages/myTaskOrder/myTaskOrder","meta":{},"window":{"navigationBarTitleText":"我申请的任务","scrollIndicator":"none"}},{"path":"/pages/taskManagement/taskManagement","meta":{},"window":{"navigationBarTitleText":"我发布的任务","scrollIndicator":"none"}},{"path":"/pages/myPushDyTaskOrder/myPushDyTaskOrder","meta":{},"window":{"navigationBarTitleText":"订单详情","scrollIndicator":"none"}},{"path":"/pages/shortVideo/shortVideo","meta":{},"window":{"navigationBarTitleText":"shortVideo","scrollIndicator":"none"}},{"path":"/pages/placeOrder/placeOrder","meta":{},"window":{"navigationBarTitleText":"提交订单","scrollIndicator":"none"}},{"path":"/pages/myPushTaskOrder/myPushTaskOrder","meta":{},"window":{"navigationBarTitleText":"订单详情","scrollIndicator":"none"}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息与通知","enablePullDownRefresh":true,"scrollIndicator":"none"}},{"path":"/pages/recharge/recharge","meta":{},"window":{"navigationBarTitleText":"充值账户","scrollIndicator":"none"}},{"path":"/pages/buyVip/buyVip","meta":{},"window":{"navigationBarTitleText":"会员购买","scrollIndicator":"none"}},{"path":"/pages/sign/sign","meta":{},"window":{"navigationBarTitleText":"每天签到","scrollIndicator":"none"}},{"path":"/pages/rewardTaskDetail/rewardTaskDetail","meta":{},"window":{"navigationBarTitleText":"福利任务","scrollIndicator":"none"}},{"path":"/pages/placeRewardOrder/placeRewardOrder","meta":{},"window":{"navigationBarTitleText":"提交订单","scrollIndicator":"none"}},{"path":"/pages/myPushRewardTaskOrder/myPushRewardTaskOrder","meta":{},"window":{"navigationBarTitleText":"订单详情","scrollIndicator":"none"}},{"path":"/pages/walletDetails/walletDetails","meta":{},"window":{"navigationBarTitleText":"账户明细","scrollIndicator":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
