<template>
	<view class="placeOrder">
        <view class="data" v-if="data.length!==0">
            <view class="currentOrder u-f">
            <view>任务名称</view>
		<view>{{data.task_list[0].title}}</view>
        </view>
        <view class="currentOrder u-f">
            <view>订单号</view>
        <view>{{data.orderSn}}</view>
        </view>
        <view class="currentOrder u-f">
            <view>创建时间</view>
        <view>{{data.create_time}}</view>
        </view>
        </view>
        <view class="submit">
            <u-divider margin-top="20">提交区域</u-divider>
            <!-- <view class="postArea u-f-ajc">提交区域</view> -->
            <view class="content u-f-ajc">
                <textarea auto-height v-model="content" placeholder="请输入提交的信息.... (选填)" />
            </view>
            <view class="upload u-f-ajc">
                <u-upload 
                max-size="2097152" 
                class="u-f-ajc"
                 ref="uUpload" 
                 :action="action"  
                 max-count="6" 
                 :size-type="['compressed']"
                 name='pic'
                 @on-uploaded="onUploaded"
                 @on-error="error"
                 @on-oversize="oversize"
                 :header="headerData"
                 ></u-upload>
            </view>
        </view>
        <!-- tips -->
        <view class="tips u-f-ajc">
            <view>
                <u-icon name="info-circle"></u-icon><text>提交前，请核实提交的内容是否正确</text>
            </view>
            
        </view>
		<!-- 提交任务 -->
		<view @tap="postOrder" class="post u-f-ajc">
		    提交订单
		</view>
	</view>
</template>

<script>
	export default {
        onLoad:function(option){
            this.getData(option.orderSn)
            this.orderSn=option.orderSn;
        },
        created(){
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
                action:"http://121.42.13.36:9000/api/v1/upload_task_order_pic",
				content:"",
                orderSn:null,
                headerData:{},
                filesArr:[],
                pic_list:[],
                data:[]
                
			};
		},
        methods:{
            // 请求页面数据
            async getData(orderSn){
                await this.$u.get('/get_task_order_info',{orderSn}).then(res=>{
                this.data=res.data    
                })
            },
            // 验证参数
            paramCheck(){
                if(this.$u.test.empty(this.filesArr)&&this.$u.test.empty(this.content)){
                    uni.showToast({
                        title:"图片和文字至少填写一项",
                        icon:"none"
                    })
                    return false;
                }
                return true;
            },
            async postOrder(){
                if(!this.paramCheck())return;
                // push 到要添加的订单队列中
                //response是服务器返回数据
                //将response 转 表达式
                this.filesArr.forEach((item)=>{
                    //将图片路径push到要上传的列表
                    let res=JSON.parse(item.response)
                 this.pic_list.push(res.data)
                })
                // 发送请求
                await this.$u.post('/place_order',{
                    orderSn:this.orderSn,
                    content:this.content,
                    pic_list:JSON.stringify(this.pic_list)
                }).then(res=>{
                    uni.showToast({
                        title:res.msg,
                    })
                    setTimeout(()=>{
                       uni.navigateBack({
                           delta:1
                       })
                    },2000)
                })
               
                
            },
            	onUploaded(lists) {
            				this.filesArr = lists;
            			},
                        // 图片上传失败
                        error(res) {
                            uni.showToast({
                                title: "上传遇到未知错误",
                                icon: 'none'
                            })
                        
                        },
                        // 图片过大
                        oversize() {
                            uni.showToast({
                                title: "图片过大，请重新上传",
                                icon: 'none'
                            })
                        },
        }
	}
</script>

<style lang="scss" scoped>
    .placeOrder{
        .data{
                padding: 20rpx;
                .currentOrder{
            justify-content: space-between;
            font-size: 32rpx;
            height: 50rpx;
            view:first-child{
                  letter-spacing: 4rpx;
            }
            view:last-child{
                color: #b5b5b5;
            }
        
        }
            }
            .submit{
                .postArea{
                    color: #007AFF;
                    font-size: 28rpx;
                }
                .content{
                    margin: 20rpx 0;
                  textarea{
                    max-height: 200rpx;
                    border-radius: 6rpx;
                    border: 1rpx solid black;
                    padding: 9rpx;
                    text-align: justify;
                }  
                }
                .upload{
                     margin: 20rpx 0;
                    width: 100%;
                    height: auto;
                }
            }
            .tips{
               
                view{
                    
                    height: 50rpx;
                    line-height: 44rpx;
                    font-size: 20rpx;
                color:red;
                font-weight: bold;
                }
                text{
                    height: 44rpx;
                    line-height: 44rpx;
                    margin: 0 3rpx;
                }
            }
            .post{
                height: 80rpx;
                width: 100%;
                background-color: #007AFF;
                position: fixed;
                bottom: 0;
                left: 0;
                color: white;
                font-size: 30rpx;
                font-family: Sans-serif;
                font-weight: bold;
                letter-spacing:10rpx;
            }
    }
    

</style>
