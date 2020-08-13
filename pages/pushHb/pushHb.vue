<template>
    <view class="pushHb">
        <view class="inputBox u-f-ajc">
            <textarea v-model="input" maxlength="1000" placeholder="开始发布你想法吧,比如 微信二维码 获取更多的客源" />
            </view>
		   <view class="updatePicBox u-f-ajc">
               <u-upload :action="URL+'/api/v1/upload_hb_detail_pic'" max-size="2097152" 
		            max-count="8" 
		            :size-type="['compressed']"
                     name='pic'
                     :header="headerToken"
                      @on-uploaded="onUploaded"
                     @on-error="error" 
                     @on-oversize="oversize"
                     ></u-upload>
           </view>
           <view class="amountList">
     <u-field @click="selectAmount=true" v-model="currentAmount.label" 
     		:disabled="true" label="金币" placeholder="请选择金币数量"
     		right-icon="arrow-down-fill"
     		>
     		</u-field>
            <u-field
            			v-model="quota"
            			label="红包数量"
                        :disabled="quotaStatus"
            		>
            		</u-field>
             <u-select v-model="selectAmount" mode="single-column" :list="Amountlist" @confirm="clickItem"></u-select>
           </view>
           <!-- 发布按钮 -->
           <view class="pushBtn u-f-ajc" @tap="post">
               <view>发布</view>
           </view>
	</view>
</template>

<script>
	export default {
        created() {
            // 为图片上传添加请求头
              uni.getStorage({
                  key:'token',
                  success:(res)=>{
                      this.headerToken.token=res.data
                  },
                  
              })
              // 请求数据
              this.getData()
        },
		data() {
			return {
				 URL:getApp().globalData.URL,
                 input:'',
                 // 已上传的图片
                 lists:[],
                 headerToken: {
                     token: null
                 },
                 quota:10,
                 quotaStatus:false,
                 currentAmount:{label:"",value:""},
                 selectAmount: false,
                 				Amountlist: [
                 				
                 				],
			};
		},
        methods:{
           async getData(){
               await this.$u.get('/get_Amount_list').then(res=>{
                   this.Amountlist=res.data
               })
           },
            // 选择器
            	// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
            			clickItem(e) {
            						this.currentAmount.label = e[0].label;
            						this.currentAmount.value = e[0].value;
                                    if(e[0].value==0){
                                        this.quota=10
                                        this.quotaStatus=true
                                    }else{
                                          this.quotaStatus=false
                                    }
            					},
            //图片上传失败
            error(res) {
                uni.showToast({
                    title: "上传遇到未知错误",
                    icon: 'none'
                })
            
            },
            oversize() {
                uni.showToast({
                    title: "图片过大，请重新上传",
                    icon: 'none'
                })
            },
            	onUploaded(lists) {
                            this.lists=lists
            			},
                        post(){
                            this.quota=parseFloat(this.quota)
                            if(typeof this.quota !=='number' || this.quota==='NaN'){
                                uni.showToast({
                                    title:"数量有误",
                                    icon:"none"
                                })
                                return ;
                            }
                            if(this.input.length===0 || this.input==false){
                                uni.showToast({
                                    title:"内容不能为空",
                                    icon:"none"
                                })
                                return ;
                            }
                            if(this.currentAmount.label.length===0){
                                uni.showToast({
                                    title:"红包金币不能为空，可以选择免费",
                                    icon:"none"
                                })
                          return ;
                            }
                            
                            this.$u.post('/push_hb',{
                                content:this.input,
                                hb_amount:this.currentAmount.value,
                                quota:this.quota,
                                hb_pic_list:JSON.stringify(this.picPathList),
                            }).then(res=>{
                             // #ifndef APP-PLUS
                               uni.showToast({
                                   icon:"success",
                                   title: res.msg,
                                   duration: 2000
                               });
                               // #endif
                             // #ifdef APP-PLUS
                             plus.nativeUI.toast(res.msg);
                             // #endif
                             setTimeout(()=>{
                                uni.switchTab({
                                    url: '/pages/rewardArea/rewardArea'
                                });
                             },1000)
                            })
                        }
        },
        computed:{
            picPathList(){
                 // 存放图片路径
                 let arr =[]
                this.lists.forEach((item)=>{
                    let data =item.response;
                    if(data.errorCode===0){
                         arr.push(data.data)
                    }
                })
                return arr;
            }
        }
	}
</script>

<style lang="scss">
.pushHb{
    .inputBox{
        padding: 20rpx 0;
        textarea{
            width: 90%;
          padding:8rpx;
          border-radius: 10rpx;
          border: 1rpx solid #F1F1F1;
          text-align: justify;
          max-height: 500rpx;
          margin: 14rpx 0;
        }
    }
    .updatePicBox{
        view{
            display: flex;
            justify-content: center;
        }
    }
    .amountList{
        
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
   }
}
</style>
