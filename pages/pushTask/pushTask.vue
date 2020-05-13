<template>
    <view class="pushTask">
        <tabs @changeTabIndex="changeTabIndex" :list="['抖音点赞','悬赏任务','福利任务']"></tabs>
        <view v-show="taskType===1">
            <view>
                <view class="tasklogo u-f-ajc">
                    <image src="../../static/images/logo/logo.png" mode="widthFix"></image>
                </view>
                <view class="input">
                    <u-cell-group>
                        <u-field v-model="taskData.title" label="任务标题" placeholder="请填写任务标题">
                        </u-field>
                        <u-field v-model="taskData.price" label="价格" placeholder="请填写派发价格">
                        </u-field>
                        <u-field v-model="taskData.quota" label="数量" placeholder="请填写发放任务数量">
                        </u-field>
                        <u-field type="textarea" v-model="taskData.content" label="任务说明" placeholder="说一些注意事项吧？">
                        </u-field>
                    </u-cell-group>
                    <view class="u-f-ajc" style="color: red;font-size: 20rpx;font-weight: bold;height: 50rpx;">每一单收取
                        {{taskServePrice}}元作为平台服务费</view>
                </view>
                <!-- 预览步骤 -->
                <u-divider height="100">上传任务步骤</u-divider>
                <view>
                    <view class="addStep u-f-ajc">
                        <u-button @tap="openAddStepComponent('task')" size="medium" type="primary">添加步骤</u-button>
                    </view>
<step-card :stepList="taskStepList"></step-card>

                    <!-- push模板 -->
                    <!-- add步骤组件 -->
                    <pushstep
                     ref="taskStepComponent"
                      stepPicAction="http://api.taskarea.com/api/v1/upload_task_detail_pic"
                      :header="headerData"
                      @stepList="updateTaskStepList"
                      />
        </view></view>
 </view>
       
        
        
        
        
        
        
        
        
        <view v-show="taskType===0">
           <view class="dylogo u-f-ajc">
               <image src="../../static/images/pushTask/douyin.jpg" mode="widthFix"></image>
           </view>
           <view class="input">
               <u-cell-group>
                   <u-field v-model="formData.title" label="任务标题" placeholder="请填写任务标题">
                   </u-field>
                   <u-field v-model="formData.dy_url" label="视频链接" placeholder="请填写抖音分享链接">
                   </u-field>
                   <u-field v-model="formData.price" label="价格" placeholder="请填写派发价格">
                   </u-field>
                   <u-field v-model="formData.quota" label="数量" placeholder="请填写发放任务数量">
                   </u-field>
                   <u-field type="textarea" v-model="formData.content" label="任务说明" placeholder="说一些注意事项吧？">
                   </u-field>
               </u-cell-group>
               <view class="u-f-ajc" style="color: red;font-size: 20rpx;font-weight: bold;height: 50rpx;">每一单收取
                   {{dytaskServePrice}}元作为平台服务费</view>
               <u-divider height="110">上传视频图片</u-divider>
               <view class="uploadPicBox u-f-ajc">
                   <u-upload :auto-upload="false" 
                   ref="uUpload" max-size="2097152" max-count="1" :size-type="['compressed']"
                       :action="action" @on-success="success" @on-error="error" @on-oversize="oversize" @on-remove="remove"
                       @on-choose-complete="complete" name='dy_task_pic' :form-data="formData" :header="headerData"
                       :show-tips="false"></u-upload>
               </view>
           
           </view>
        </view>
    
    <view v-show="taskType==2">
         <u-divider>试用平台</u-divider>
        	<u-radio-group @change="currentRewardGoodsPlatformTypeChange" v-model="rewardTaskObj.currentRewardGoodsPlatformType">
        			<u-radio 
        				v-for="(item, index) in rewardGoodsPlatformTypeList" :key="index" 
        				:name="item.name"
        				:disabled="item.disabled"
        			>
        				{{item.name}}
        			</u-radio>
        		</u-radio-group>
            <u-divider height="110">试用类型</u-divider>
                <u-radio-group v-model="rewardTaskObj.currentRewardGoodsType">
                		<u-radio 
                			v-for="(item, index) in rewardGoodsTypeList" :key="index" 
                			:name="item.name"
                			:disabled="item.disabled"
                            
                          
                		>
                			{{item.name}}
                		</u-radio>
                	</u-radio-group>
        <u-cell-group>
        			<u-field
        				v-model="rewardTaskObj.title"
        				label="福利标题"
        				placeholder="请填写试用商品相关标题"
        			>
        			</u-field>
                    <u-field
                    	v-model="rewardTaskObj.goodsUrl"
                    	label="商品链接"
                    	placeholder="请把商品链接复制到这里"
                    >
                    <u-button size="mini" slot="button" type="success" @tap="pasteUrl">粘贴商品链接</u-button>
                    </u-field>
                    <u-field
                    	v-model="rewardTaskObj.keyword"
                         label-width="160"
                    	label="商品关键字"
                    	placeholder="搜索关键词,建议3个以上"
                    >
                    </u-field>
                    <u-field
                    	v-model="rewardTaskObj.liaison"
                    	label="QQ / WeChat"
                        label-width="190"
                    	placeholder="请填写您的联系方式,试客可能联系您"
                    >
                    </u-field>
                    <u-field
                    	v-model="rewardTaskObj.goodsPrice"
                    	label="下单价格"
                    	placeholder="请填写拍下价格"
                    >
                    </u-field>
                    <u-field
                    	v-model="rewardTaskObj.quota"
                    	label="发放数量"
                    	placeholder="请填写发放数量"
                    >
                    </u-field>
                    <u-field
                    	v-model="rewardTaskObj.content"
                    	label="商家要求"
                    	placeholder="填写一些要求吧,如 货比  加购"
                        type="textarea"
                    >
                    </u-field>
                      </u-cell-group>
                      <!-- 步骤上传 -->
                       <u-divider height="110">步骤上传</u-divider>
                      <view class="addStep u-f-ajc">
                          <u-button @tap="openAddStepComponent('reward')" size="medium" type="primary">添加步骤</u-button>
                          
                      </view>
                      <step-card :stepList="rewardStepList"></step-card>
                      <!-- add步骤组件 -->
                      <pushstep
                       ref="rewardStepComponent"
                        :stepPicAction="taskType===1?'http://api.taskarea.com/api/v1/upload_task_detail_pic':'http://api.taskarea.com/api/v1/upload_task_detail_pic'"
                        :header="headerData"
                        @stepList="updateRewardStepList"
                        />
                        
                        
    </view>
        <!-- 发布按钮 -->
        <view class="pushBtn u-f-column" @tap="post">
            <view>发布</view>
            <view class="payment">本次扣除 {{payment}}</view>
        </view>
    </view>
</template>

<script>
    import tabs from "../../components/common/tabs/tabs.vue";
    import pushstep from "../../components/pushTask/pushstep/pushstep.vue"
    import stepCard from "../../components/stepCard/stepCard.vue"
    export default {
        components:{
            tabs,pushstep,stepCard
        },
        created(){
            // 请求服务费接口
            this.getServePrice();
          // 为图片上传添加请求头
            uni.getStorage({
                key:'token',
                success:(res)=>{
                    this.headerData.token=res.data
                }
            })
        },
        data() {
            return {
                URL:getApp().globalData.URL,
                // 界面任务内容 
                taskType:0,    
                // 是否开启添加任务步骤窗口
                pushTaskBox:false,
                // 服务费用
                dytaskServePrice:0,
                taskServePrice:0,
                taskData:{
                  title: "",
                price: "",
                quota: "",
                content: "",  
                },
                //抖音页  是否选择了图片
                isImg: false,
                // 上传路径
                action: 'http://121.42.13.36:9000/api/v1/push_dy_task',
                // 步骤图上传路径
                stepPicAction: 'http://121.42.13.36:9000/api/v1/upload_task_detail_pic',
                formData: {
                    title: '',
                    content: '',
                    price: '',
                    quota: '',
                    dy_url: '',
                },
                headerData: {
                    token: null
                },
                // 悬赏任务步骤数组
                currentPushTaskBoxData:{
                    text:'',
                    pic:'',
                    //悬赏任务页  是否选择了图片
                    isImg: false,
                },
                taskStepList:[
                    
                ],
                rewardStepList:[],
                rewardGoodsPlatformTypeList: [
                				{
                					name: '淘宝',
                					checked: false,
                					disabled: false
                				},
                				{
                					name: '拼多多',
                					checked: false,
                					disabled: false
                				},
                				{
                					name: '京东',
                					checked: false,
                					disabled: false
                				},
                                
                                {
                                	name: '天猫',
                                	checked: false,
                                	disabled: false
                                },
                                {
                                	name: '阿里巴巴',
                                	checked: false,
                                	disabled: false
                                },
                                {
                                	name: '其他',
                                	checked: false,
                                	disabled: false
                                }
                			],
                			
                            rewardGoodsTypeList: [
                            				{
                            					name: '红包试用',
                            					checked: false,
                            					disabled: false
                            				},
                            				{
                            					name: '商品试用',
                            					checked: false,
                            					disabled: false
                            				}
                            			],
                                        
                    // 福利任务model
                      rewardTaskObj:{
                          currentRewardGoodsPlatformType: '',
                          currentRewardGoodsType: '',
                          title:"",
                          goodsUrl:"",
                          liaison:"",
                          goodsPrice:"",
                          quota:"",
                          content:"",
                          keyword:""
                          
                      }   
            }
        },
        methods: {
            async getServePrice(){
               await this.$u.get('/get_serve_price',{name:'push_task'}).then(res=>this.taskServePrice=res.data)
               await this.$u.get('/get_serve_price',{name:'push_dy_task'}).then(res=>this.dytaskServePrice=res.data)
            },
            // 网络请求返回过滤
            response(res){
              if (res.errorCode === 10000) {
                  uni.showToast({
                      title: res.msg,
                      icon: "none"
                  })
                  return false;
              } else if (res.errorCode === 20003) {
                  uni.showToast({
                      title: res.msg,
                      icon: "none"
                  })
                  setTimeout(() => {
                      uni.reLaunch({
                          url: "../login/login"
                      })
                      return false;
                  }, 1500)
              } else {
                  return true;
              }
            },
            // post
            post(){
                if(this.taskType===0){
                    this.postDyTask();
                }
                if(this.taskType===1){
                    this.postTask();
                }
                if(this.taskType===2){
                  console.log(this.rewardTaskObj)
                }
            },
            // tabs 监听
            changeTabIndex(index){
                // 0 抖音  1 普通任务
                this.taskType=index;
            },
            hidePushTaskBox(){
               this.pushTaskBox=false;
            },
            openPushTaskBox(){
               this.pushTaskBox=true;
            },
            imglist(res) {

            },
            dycheckParam() {
                if (this.$u.test.empty(this.formData.title)) {
                    uni.showToast({
                        title: "你还没有填写标题",
                        icon: "none"
                    })
                    return false;
                };
                if (this.$u.test.empty(this.formData.price)) {
                    uni.showToast({
                        title: "你还没有填写点赞价格",
                        icon: "none"
                    })
                    return false;
                };
                if (this.$u.test.empty(this.formData.dy_url)) {
                    uni.showToast({
                        title: "你还没有填写视频链接",
                        icon: "none"
                    })
                    return false;
                };
                if (this.$u.test.empty(this.formData.quota)) {
                    uni.showToast({
                        title: "你还没有填写发布数量",
                        icon: "none"
                    })
                    return false;
                };
                if (this.$u.test.empty(this.formData.content)) {
                    uni.showToast({
                        title: "你还没有填写任务说明",
                        icon: "none"
                    })
                    return false;
                };

                    return true;
            },
            postDyTask() {
                if (!this.dycheckParam()) return;
                // 上传
                this.$refs.uUpload.upload();
            },
            taskcheckParam() {
                if (this.$u.test.empty(this.taskData.title)) {
                    uni.showToast({
                        title: "你还没有填写标题",
                        icon: "none"
                    })
                    return false;
                };
                if (this.taskData.title.length > 10 ) {
                    uni.showToast({
                        title: "标题太长了",
                        icon: "none"
                    })
                    return false;
                };
                if (this.$u.test.empty(this.taskData.price)) {
                    uni.showToast({
                        title: "你还没有填写任务价格",
                        icon: "none"
                    })
                    return false;
                };
                if (this.$u.test.empty(this.taskData.quota)) {
                    uni.showToast({
                        title: "你还没有填写发布数量",
                        icon: "none"
                    })
                    return false;
                };
                if (this.$u.test.empty(this.taskData.content)) {
                    uni.showToast({
                        title: "你还没有填写任务说明",
                        icon: "none"
                    })
                    return false;
                };
                // 验证是否有步骤图片
                if (this.$u.test.empty(this.taskStepList)) {
                    uni.showToast({
                        title: "至少添加一个步骤",
                        icon: "none"
                    })
                    return false;
                }
                    return true;
            },
            async postTask(){
                if(!this.taskcheckParam())return;
               await this.$u.post('/push_task',{
                      title:this.taskData.title,
                      price:this.taskData.price,
                      quota:this.taskData.quota,
                      content:this.taskData.content,
                    task_step_list:JSON.stringify(this.taskStepList)
                }).then(res=>{
                    uni.showToast({
                        title: res.msg,
                    }) 
                    setTimeout(()=>{
                       uni.switchTab({
                           url:"../home/home"
                       })
                    },2000)
                    
                })
            },
            oversize() {
                uni.showToast({
                    title: "图片过大，请重新上传",
                    icon: 'none'
                })
            },
            //抖音图片上传成功 任务发布完成
            success(data) {
                let data2 = JSON.parse(data)
                 if(!this.response(data2)) return;
                if (data2.errorCode === 0) {
                    uni.showToast({
                        title: data2.msg
                    })
                    setTimeout(() => {
                        uni.switchTab({
                            url: '../home/home'
                        })
                    }, 1500)
                    return;
                }
                if (data2.errorCode === 20010) {
                    uni.showToast({
                        title: data2.msg,
                        icon: 'none'
                    })
                    setTimeout(() => {
                        uni.switchTab({
                            url: '../home/home'
                        })
                    }, 1500)
                    return;
                }
                if (data2.errorCode === 20005) {
                    uni.showToast({
                        title: data2.msg,
                        icon: 'none'
                    })
                    setTimeout(() => {
                        uni.switchTab({
                            url: '../home/home'
                        })
                    }, 1500)
                    return;
                }
            },
            // 悬赏任务步骤图上传成功
            taskstepPicSuccess(data){
                let data2 = JSON.parse(data)
                if (data2.errorCode === 0) {
                    this.currentPushTaskBoxData.pic=data2.data;
                }
            },
            //图片上传失败
            error(res) {
                uni.showToast({
                    title: "上传遇到未知错误",
                    icon: 'none'
                })

            },
            //抖音页
            complete(list) {
                this.isImg = true
            },
            remove(index) {
                this.isImg = false
            },
            // 悬赏任务页
            taskComplete(list) {
                this.currentPushTaskBoxData.isImg = true
            },
            taskRemove(index) { 
                this.currentPushTaskBoxData.isImg = false
            },
            
            // 粘贴url
            pasteUrl(){
                uni.getClipboardData({
                    success:  (res) =>{
                       this.rewardTaskObj.goodsUrl=res;
                    }
                });
            },
            openAddStepComponent(type){
                switch(type){
                    case 'reward':
                     this.$refs.rewardStepComponent.showBox();
                     return;
                     case 'task':
                     this.$refs.taskStepComponent.showBox();
                     return;
                }
             
                
            },
            updateRewardStepList(list){
                this.rewardStepList=list;
            },
            updateTaskStepList(list){
                console.log(list)
                this.taskStepList=list;
            },

            
        },
        computed: {
            payment() {

                if(this.taskType===0){
                   return (this.formData.price * this.formData.quota) + (this.dytaskServePrice * this.formData.quota); 
                }
                if(this.taskType===1){
                    return (this.taskData.price * this.taskData.quota) + (this.taskServePrice * this.taskData.quota); 
                }

                
            }
        }

    }
</script>

<style lang="scss" scoped>
    .pushTask {
        padding-bottom:95rpx ;
        .tabs{
            height: 90rpx;
            width: 100%;
            view{
                flex:1;
                font-size: 32rpx;
                
            }
            .active{
                color: #007AFF;
                font-weight: bold;
            }
        }
        .dylogo,.tasklogo {
            image {
                width: 150rpx;
                border-radius: 100%;
                margin: 40rpx 0;
            }
        }

        .uploadPicBox {
            height: 230rpx;

        }
.step{
    .st{
        display: inline-flex;
        width: 100%;
         .index{
             margin: 0 20rpx;
        border-radius: 100%;
        background-color: #DD524D;
        color: white;
        height: 52rpx;
        width: 52rpx;
        font-size: 33rpx;
    }
    .text{
        line-height: 52rpx;
        width:80%;
        font-size: 33rpx;
        overflow: hidden; /*自动隐藏文字*/
        text-overflow: ellipsis;/*文字隐藏后添加省略号*/
        white-space: nowrap;/*强制不换行*/
    }
    }
   .picBox{
       margin: 20rpx 0 20rpx 30rpx;
        position: relative;
       .pic{
           border-radius: 15rpx;
    }
    .tips{
            width: 125rpx;
            height: 55rpx;
            font-size: 28rpx;
            border-top-right-radius: 15rpx;
            border-top-left-radius: 15rpx;
            border-bottom-right-radius: 15rpx;
            position: absolute;
            background-color: #DD524D;
            color: white;
            top: 0;
            left: 0;
            padding: 6rpx;
            
        }
   }
    
   
}
.addStep{
    height: 150rpx;
}
.addStepTemplate{
   position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width:100%;
    z-index: 800;
    background-color: rgba(0,0,0,.5);
    .content{
        padding: 10rpx;
        height: auto;
        max-height: 730rpx;
        width: 480rpx;
        border-radius: 10rpx;
        background-color: white;
        box-shadow: 2rpx 2rpx 2rpx #EEEEEE;
        z-index: 999;
        .sub{
            letter-spacing:2px;
            margin:8rpx 0;
        }
        textarea{
            padding:8rpx;
            width: 430rpx;
            border-radius: 10rpx;
            border: 1rpx solid #3F536E;
            text-align: justify;
            max-height: 300rpx;
            margin: 14rpx 0;
        }
        .uploadBox{
            margin: 10rpx;
        }
        .addSetpBox{
            margin: 10rpx;
        }
    }
   
    
}
        .pushBtn {
            z-index: 999;;
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 95rpx;
            font-size: 35rpx;
            background-color: red;
            color: white;
            text-align: center;
            .payment {
                font-size: 20rpx;
            }
        }
    }
</style>
