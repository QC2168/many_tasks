<template>
    <view class="rewardDetail" v-if="Object.keys(hbData).length!==0">
        <view class="rewardPanl">
            <view class="userinfo u-f-ac">
                <image class="userPic"  :src="URL+hbData.user.user_pic"  mode="scaleToFill"></image>
                <view class="username">{{hbData.username}}</view>

                <view class="rewardIconBox">
                    <image class="rewardIcon" src="../../static/images/rewardArea/hongbao.png" mode="aspectFill"></image>

                </view>
                <view class="tag">
                    <u-tag :text="hbData.tag" shape="circle" mode="dark" type="error" size="mini" />
                </view>
            </view>
            <view class="content">
{{hbData.content}}
            </view>
            <view class="miniImages">
                <image v-for="(item,index) in hbData.hb_area_pic" :key="item.pic" @tap="showPic(URL+item.pic)" class="img" :src="URL+item.pic" mode="scaleToFill"></image>
             
            </view>

        </view>
<space></space>
        <!-- comment -->
        <view class="commentList">
            <view class="tips u-f">评论区（小贴士：评论领红包）</view>
            <view class="comment u-f" v-for="(item,index) in commentList" :key="index">
                <view class="userPicBox u-f">
                    <image class="userPic" :src="URL+item.user.user_pic" mode="scaleToFill"></image>
                </view>
                <view class="rightC">
                    <view class="username">{{item.username}}</view>
                    <view class="content">{{item.content}}</view>
                    <br>
                <!-- #ifdef H5 -->
                          <view class="time">评论时间：{{new Date(item.create_time).getTime()| timeFrom}}</view> 
                           <!-- #endif -->
            <!-- #ifdef APP-PLUS -->
                    <view class="time">评论时间：{{new Date(item.create_time.replace(/-/g, '/')).getTime()| timeFrom}}</view>
                        <!-- #endif -->
                </view>

            </view>
        </view>
        <!-- 输入框 -->
        <chat-bottom @submit="submit"></chat-bottom>
    </view>
</template>

<script>
    import chatBottom from "../../components/chatBottom/chatBottom.vue"
    import space from "../../components/space/space.vue"
    export default {
        onLoad:function(option){
            // 请求数据
            this.hb_id=option.hb_id;
        },
        created(){
            this.getData(this.hb_id)
        },
        components:{
            chatBottom,space
        },
        data() {
            return {
                  URL: getApp().globalData.URL,
            hbData:[],
            picList:[],
            commentList:[],
            hb_id:null
            };
        },
        methods:{
            async getData(hb_id){
               await this.$u.get('/get_hb_detail',{hb_id}).then(res => {
                  this.hbData=res.data;
                  this.hbData.hb_area_pic.forEach((item)=>{
                      this.picList.push(this.URL+item.pic)
                  })
                  uni.setNavigationBarTitle({
                      title: "来自"+res.data.username+"的红包"
                  });
                })
                await this.$u.get('/get_hb_detail_comment_list',{hb_id}).then(res=>{
                    this.commentList=res.data
                })
            },
            showPic(picPath){
            uni.previewImage({
                current:picPath,
                urls:this.picList
            })
            },
            submit(text){
                if(text.length===0){
                    uni.showToast({
                        title:"您还没输入内容",
                        icon:'none'
                    })
                    return
                }
               // 请求 发送评论接口
               this.$u.post('/commitComment',{hb_id:this.hb_id,content:text}).then(res=>{
                   // #ifndef APP-PLUS
                   uni.showToast({
                       icon:"none",
                       title: res.msg,
                       duration: 2000
                   });
                   // #endif
                 // #ifdef APP-PLUS
                 plus.nativeUI.toast(res.msg);
                 // #endif
                 setTimeout(()=>{
                     this.getData(this.hb_id)
                 },300)
               })
               
            }
        }
    }
</script>

<style lang="scss">
    .rewardDetail {padding-bottom: 120rpx;
        .rewardPanl {
            padding: 10rpx 25rpx;
            margin: 5rpx 0 14px 0;

            .userinfo {
                height: 110rpx;

                .userPic {
                    width: 67rpx;
                    height: 67rpx;
                    border-radius: 100%;
                    border: 1rpx solid #C8C7CC;
                    margin: 0 10px 0 10rpx;
                }

                .username {
                    // margin: 0 20rpx 0 0;
                    font-size: 32rpx;
                }

                .tag {
                    margin: 0 0 0 10rpx;
                }

                .rewardIconBox {
                    margin: 0 0 0 10rpx;

                    .rewardIcon {
                        width: 60rpx;
                        height: 60rpx;
                    }
                }
            }

            .content {
                // letter-spacing:1rpx;
                text-align: justify;
            }

            .miniImages {
                margin: 10rpx 0;

                .img {
                    width: 200rpx;
                    height: 200rpx;
                    margin: 0 10rpx;
                    border-radius: 13rpx;
                }
            }

            .bottom {
                flex-direction: row-reverse;

                view {
                    margin: 0 10rpx;
                }

                height: 90rpx;

            }
        }

        .commentList {
            .tips{
                height: 68rpx;
           background-image: linear-gradient(to right, #f4f4f4 , white);
                // background-color: #f4f4f4;
                margin: 15rpx 0;
                align-items: center;
                padding: 0 20rpx;
                font-size: 30rpx;
                // box-shadow: 2rpx 4rpx 2rpx #c8c8c8;
            }
            .comment {
                   padding: 15rpx 20rpx;
                   height: auto;
                   border-bottom: 1rpx solid #eeeeee;
                    .userPicBox{
                        padding: 20rpx 0 0 0;
                        justify-content: center;
                        width: 120rpx;
                        .userPic{
                           width: 80rpx;
                           height: 80rpx;
                           border-radius: 100%;
                           border: 1rpx solid #C8C7CC;
                           margin: 0 10px 0 10rpx;
                        }
                    }
                    .rightC{
                        flex:1;
                         padding: 0 12rpx 16rpx 12rpx;
                        .username{
                            font-size: 30rpx;
                            padding: 15rpx 0;
                            font-weight: bold;
                        }
                        .content{
                                font-size: 30rpx;
                                line-height: 40rpx;
                        }
                        .time{
                            color: #b4b4b4;
                        }
                    }
  
            }

        }
    }
</style>
