<template>
    <view class="dataBox u-f-ajc" @tap="hide" v-if="Object.keys(item).length!==0 && show">
        <view class="data">
            <table class="tbe">
                        <tr>
                            <td class="h">申请用户</td>
                            <td>{{item.username}}</td>
                        </tr>
                        <tr>
                            <td class="h">订单状态</td>
                            <td>{{item.status|taskOrder}}</td>
                        </tr>
                        <tr v-if="item.goods_orderSn">
                            <td class="h">下单商品订单号</td>
                            <td>{{item.goods_orderSn}}</td>
                        </tr>
                        <tr>
                            <td class="h">任务订单号</td>
                            <td>{{item.orderSn}}</td>
                        </tr>
                        <tr>
                            <td class="h">申请时间</td>
                            <td>{{item.create_time}}</td>
                        </tr>
                        </table>

   
            <view class="line">
                <view class="title u-f-ajc">提交备注信息</view>
                <view class="content">{{item.content}}</view>
            </view>
           
        </view>
    </view>
</template>

<script>
   export default{
       data(){
           return{
               show:false
           }
       },
       props:{
           item:Object|Array,
           filterName:String,
       },
       methods:{
           hide(){this.show=false},
           open(){this.show=true}
       }
   }
</script>

<style lang="scss" scoped>
    .dataBox{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.6);
          z-index: 10;
        .data{
            max-height:880rpx;
            height: auto;
            width: 600rpx;
            background-color: white;
            border-radius: 10rpx;
            box-shadow: 3rpx 3rpx 3rpx #EEEEEE;
            padding: 15rpx;
            z-index: 100;
             .tbe{
                        font-family: verdana,arial,sans-serif;
                        font-size:27rpx;
                        color:#333333;
                        border-width: 1rpx;
                        border-color: #666666;
                        border-collapse: collapse;
                        width: 100%;
                        .h {
                            border-width: 1rpx;
                            padding: 10rpx;
                            border-style: solid;
                            border-color: #666666;
                            background-color: #dedede;
                        }
                        td {
                            border-width: 1rpx;
                            padding: 10rpx;
                            border-style: solid;
                            border-color: #666666;
                            background-color: #ffffff;
                            text-align: center;
                        }
                    }
           
            .line{
                
               .title{
                   margin: 10rpx 0;
                  background: #EEEEEE;
                    font-weight: bold;
                  padding: 4rpx 0;
                    font-size:31rpx;
               }
               .content{
                   text-align: justify;
                   word-break:break-all;
                     font-size:28rpx;
                   
               }
            }
        }
    }
</style>
