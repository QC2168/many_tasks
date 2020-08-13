<template>
    <view class="douyinDetail" v-if="dyTaskDetail">
        <view class="vidoePic u-f-ajc">
            <image :src="this.URL+dyTaskDetail.dy_task_pic" mode="widthFix"></image>
        </view>
        <lines>
            <template v-slot:center>
                任务数据
            </template>
        </lines>
        <!-- <u-divider fontSize="30" height="60">任务数据</u-divider> -->
        <view class="wrap" justify="around">
            <u-row gutter="16">
                <u-col span="6">
                    <view class="demo-layout bg-purple u-f-ajc">金币</view>
                </u-col>
                <u-col span="6">
                    <view class="demo-layout bg-purple-light u-f-ajc">剩余名额</view>
                </u-col>
                <!--      <u-col span="4">
                    <view class="demo-layout bg-purple-dark u-f-ajc">积分</view>
                </u-col> -->
            </u-row>
            <u-row gutter="16">
                <u-col span="6">
                    <view class="demo-layout bg-purple u-f-ajc">{{dyTaskDetail.price}}</view>
                </u-col>
                <u-col span="6">
                    <view class="demo-layout bg-purple-light u-f-ajc">{{dyTaskDetail.remaining_quota}}</view>
                </u-col>
                <!--          <u-col span="4">
                    <view class="demo-layout bg-purple-dark u-f-ajc">{{dyTaskDetail.price*.1}}</view>
                </u-col> -->
            </u-row>
        </view>
        <!-- 任务简介 -->
        <!-- <u-divider fontSize="30" height="60">任务简介</u-divider> -->
        <lines>
            <template v-slot:center>
                任务简介
            </template>
        </lines>
        <view class="describe">
            <text>
                {{dyTaskDetail.content}}
            </text>
        </view>
        <!-- <u-divider fontSize="30" height="90">选择一种方式完成任务</u-divider> -->
        <lines>
            <template v-slot:center>
                选择一种方式完成任务
            </template>
        </lines>
        <!-- #ifdef H5 -->
        <view class="opendouyinbox u-f-ajc">
            <u-button shape="circle" type="success" size="medium" @tap="copy()">复制分享链接</u-button>
        </view>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS -->
        <view class="opendouyinbox u-f-ajc">
            <u-button shape="circle" v-show="showCopyBtn" type="success" size="medium" @tap="copy()">复制分享链接</u-button>
            <u-button shape="circle" type="success" size="medium" @tap="open()">跳转到指定视频中</u-button>
        </view>
        <!-- #endif -->
        <lines>
            <template v-slot:center>
                上传任务图证
            </template>
        </lines>
        <!-- <u-divider fontSize="30" height="60">上传点赞图证</u-divider> -->
        <view class="uploadimg u-f-ajc">
            <u-upload ref="uUpload" max-size="2097152" max-count="6" :size-type="['compressed']" :action="this.URL+'/api/v1/upload_dy_task_order_pic'"
                @on-uploaded="onUploaded" @on-error="error" @on-oversize="oversize" name='pic' :header="headerData"></u-upload>
            <!-- 
            <u-upload 
            :auto-upload="false" 
            ref="uUpload" 
            max-size="2097152" 
            max-count="6" 
            :size-type="['compressed']"
               :action="this.URL+'/api/v1/upload_dy_task_order_pic'"  
                @on-success="success"
                @on-error="error"
                @on-oversize="oversize" 
                @on-remove="remove" 
                @on-choose-complete="complete" 
                 name='pic'
                :form-data="formData"
                :header="headerData"
                :show-tips="false"
                ></u-upload> -->
        </view>


        <!-- 提交按钮 -->
        <view class="submitBtn u-f-ajc" @tap="submitDyTask">
            <view class="u-f-ajc">提 交</view>
        </view>
    </view>
</template>

<script>
    import h5Copy from '@/common/h5Copy.js'
    import lines from '@/components/common/lines/lines'
    export default {
        onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
            this.getData(option.dy_task_id);
            this.dy_task_id = option.dy_task_id;
            this.formData.dy_task_id = option.dy_task_id;
        },
        components: {
            lines
        },
        created() {
            // 为图片上传添加请求头
            uni.getStorage({
                key: 'token',
                success: (res) => {
                    this.headerData.token = res.data
                }
            })
        },
        data() {
            return {
                URL: getApp().globalData.URL,
                //抖音数据
                dy_task_id: null,
                  filesArr:[],
                  pic_list:[],
                dyTaskDetail: {},
                //是否选择了图片
                isImg: false,
                showCopyBtn: false,
                url: null,
                formData: {
                    dy_task_id: this.dy_task_id
                },
                headerData: {
                    token: null
                }

            };
        },
        methods: {
            // 请求详细数据
            async getData(dy_task_id) {
                await this.$u.get('get_dy_task_detail', {
                    dy_task_id
                }).then(res => {
                    this.dyTaskDetail = res.data;
                    this.url = res.data.dy_url;
                    uni.setNavigationBarTitle({
                        title: res.data.title
                    });
                })
            },
            oversize() {
                uni.showToast({
                    title: "图片过大，请重新上传",
                    icon: 'none'
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
     
        copy() {
            // #ifdef H5
            const result = h5Copy(this.url);
            if (result === false) {
                uni.showToast({
                    title: '该浏览器不支持复制功能',
                })
            } else {
                uni.showToast({
                    title: '复制视频链接成功',
                    icon: 'none'
                })
            }
            // #endif
            // #ifdef APP-PLUS
            uni.setClipboardData({
                data: this.url,
                success: () => {
                    uni.showToast({
                        title: "复制成功:" + this.url,
                        icon: 'none'
                    })
                }
            });
            // #endif

        },
        open() {
            plus.runtime.openURL(this.url, (res) => {
                uni.showModal({
                    title: "警告",
                    content: '跳转被阻止！请允许调起抖音App，或者自行复制视频链接后打开抖音App',
                    showCancel: false,
                    confirmText: "已读"
                })
                this.showCopyBtn = true;
            });
        },


        async submitDyTask() {
            // push 到要添加的订单队列中
            //response是服务器返回数据
            //将response 转 表达式
            this.pic_list=[];
            this.filesArr.forEach((item)=>{
                //将图片路径push到要上传的列表
                let res=JSON.parse(item.response)
             this.pic_list.push(res.data)
            })
            // 发送请求
            // 验证是否有图片
            if (Array.isArray(this.filesArr) && this.filesArr === 0) {
                uni.showToast({
                    title: "请提交图证",
                    icon: "none"
                })
                return;
            }
            // 验证id
            if (this.dy_task_id === null) {
                uni.showToast({
                    title: "ID为NULL",
                    icon: "none"
                })
                return;
            }
            // 上传
            // this.$refs.uUpload.upload();
           await this.$u.post('/create_dy_task_order',{
                dy_task_id:this.dy_task_id,
              pic_list:JSON.stringify(this.pic_list)
            }).then((res)=>{
                if (res.errorCode === 0) {
                    // #ifdef H5
                    uni.showToast({
                        title: "提交成功",
                        duration: 2000
                    })
                    // #endif
                    // #ifdef APP-PLUS
                    plus.nativeUI.toast("提交成功");
                    // #endif
                    setTimeout(() => {
                        uni.switchTab({
                            url: "../home/home"
                        })
                    }, 2000)
                
                    return;
                }
                if (data2.errorCode !== 0) {
                    uni.showToast({
                        title: data2.msg,
                        icon: "none"
                    })
                    return false;
                }
            })
        },
        //图片上传成功
        success(data) {
            let data2 = JSON.parse(data)
            if (data2.errorCode === 0) {
                // #ifdef H5
                uni.showToast({
                    title: "提交成功",
                    duration: 2000
                })
                // #endif
                // #ifdef APP-PLUS
                plus.nativeUI.toast("提交成功");
                // #endif
                setTimeout(() => {
                    uni.switchTab({
                        url: "../home/home"
                    })
                }, 2000)

                return;
            }
            if (data2.errorCode !== 0) {
                uni.showToast({
                    title: data2.msg,
                    icon: "none"
                })
                return false;
            }
        },
        //
        complete(list) {
            this.isImg = true
        },
        remove(index) {
            this.isImg = false
        }
           }
    }
</script>

<style lang="scss" scoped>
    .douyinDetail {
        padding-bottom: 105rpx;

        .vidoePic {
            image {
                border-radius: 15rpx;
            }
        }

        .wrap {
            padding: 24rpx;
            font-size: 28rpx;
        }



        .submitBtn {
            height: 88rpx;
            width: 100%;
            background-color: #f5f5f5;
            position: fixed;
            bottom: 0;
            left: 0;
            color: white;
            font-size: 30rpx;
            font-family: Sans-serif;
            font-weight: bold;
            letter-spacing: 10rpx;
            z-index: 999;

            view {
                background-color: #007AFF;
                width: 600rpx;
                height: 60rpx;
                border-radius: 30rpx;
            }
        }
.uploadimg{
    width: 100%;

}
        .describe {
            padding: 5rpx 50rpx;
            text-align: justify;
            font-size: 32rpx;
        }
    }
</style>
