<template>
		<view v-show="pushTaskBox" class="addStepTemplate u-f-ajc">
		            <view class="content">
		                <view class="sub u-f-ajc">步骤详细</view>
		                <view class="u-f-ajc">
		                    <!-- textarea  -->
		                    <textarea placeholder="填写一下这一步的说明..." auto-height adjust-position type="text" v-model="currentPushTaskBoxData.text" /></view>
		        <view class="uploadBox u-f-ajc">
		            <u-upload 
		            max-size="5242880" 
		            max-count="1" 
		            :size-type="['compressed']"
		            :action="stepPicAction" 
		            @on-success="taskstepPicSuccess" 
		            @on-error="error" 
		            @on-oversize="oversize"
		            @on-remove="taskRemove"
		            name='pic' 
		            :header="headerToken"
		            ref="uploadPushBox"
		                ></u-upload>
		        </view>
		        <!-- addStep  -->
		        <view class="addSetpBox u-f-ajc">
		            <u-button ripple type="error" @tap="addSetp" class="addSetp" size="mini">追加</u-button>
		            <u-button @tap="hideBox" ripple type="error" class="addSetp" size="mini">退出</u-button>
		        </view>
		        
		    </view>
		</view>
</template>

<script>
	export default {
        created() {
            this.currentPushTaskBoxData.text="";
            this.currentPushTaskBoxData.pic="";
            this.currentPushTaskBoxData.isImg=false;
            // 为图片上传添加请求头
              uni.getStorage({
                  key:'token',
                  success:(res)=>{
                      this.headerToken.token=res.data
                  }
              })
        },
		data() {
			return {
				pushTaskBox:false,
                currentPushTaskBoxData:{},
                stepList:[],
                headerToken: {
                    token: null
                },
			};
		},
     methods:{
      
         // 显示
         showBox(){
             this.pushTaskBox=true;
         },
         hideBox(){
              this.pushTaskBox=false;
         },
         // 任务步骤图上传成功
         taskstepPicSuccess(data){
             let data2 = data
             if (data2.errorCode === 0) {
                 this.currentPushTaskBoxData.pic=data2.data;
                  this.currentPushTaskBoxData.isImg = true;
             }else{
                 uni.showToast({
                     title: "上传遇到未知错误",
                     icon: 'none'
                 })
                 this.currentPushTaskBoxData.isImg=false
             }
         },
         //图片上传失败
         error(res) {
             uni.showToast({
                 title: "上传遇到未知错误",
                 icon: 'none'
             })
         
         },
         
         taskRemove(index) { 
             this.currentPushTaskBoxData.isImg = false
         },
         oversize() {
             uni.showToast({
                 title: "图片过大，请重新上传",
                 icon: 'none'
             })
         },
         // 添加步骤
                     addSetp(){
                        let text=this.$u.test.empty(this.currentPushTaskBoxData.text)
                      let isImg=this.currentPushTaskBoxData.isImg;
         if(text!==""&&isImg){
             // 追加list
             let obj=JSON.parse(JSON.stringify(this.currentPushTaskBoxData))
             this.stepList.push(obj)
             this.hideBox();
             this.currentPushTaskBoxData.text="";
             this.currentPushTaskBoxData.pic="";
             this.currentPushTaskBoxData.isImg=false;
            this.$refs.uploadPushBox.lists = [];
            this.$emit('stepList',this.stepList)
         }else{
            uni.showToast({
                title:"请完善再添加",
                icon:'none'
            })
         }
                        
                     },
     },
        props:{
            stepPicAction:[String]
        },
	}
</script>

<style lang="scss" scoped>
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
    
</style>
