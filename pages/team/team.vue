<template>
    <view class="team">
        <image src="/static/images/xb-share/top_img.png" class="xb-share-img" mode="widthFix"></image>
        <view class="xb-share-content">
            <text class="xb-share-title">我的邀请码</text>
            <text class="xb-share-code">{{team.code}}</text>
            <text class="xb-share-desc">扫描该二维码注册 无需输入邀请码</text>
            <text class="xb-share-desc">每邀一好友至少得 0.3金币</text>
            <!-- <uni-qrcode class="xb-share-margin-top" cid="qrcode1446" text="uQRCode" foregroundColor="#ECA26A" logo="/static/logo.png" makeOnLoad /> -->
            <canvas canvas-id="qrcode" style="width: 160px;height: 160px;" />
            <button @tap="saveQrCode" class="xb-share-button xb-share-margin-top">保存二维码</button>
        </view>
    </view>
</template>

<script>
    import uQRCode from '@/common/uqrcode.js'
    import h5Copy from '@/common/h5Copy.js'
    export default {
        created() {
            this.getData()
        },
        data() {
            return {
                team: [],
                pH: 0,
                navHeight: 0,
                URL: getApp().globalData.URL,
            };
        },
        methods: {
        
            async getData() {
                await this.$u.get('get_team').then(res => {
                    this.team = res.data
                    this.setScrollHeight()
                    this.makeQRCode()
                })

            },
            copyCode() {
                // #ifndef H5
                uni.setClipboardData({
                    data: 'http://www.taskarea.top/pages/register/register?INC=' + this.team.code,
                    success: function() {
                        uni.showToast({
                            title: "复制邀请链接成功",
                            icon: "none"
                        })
                    }
                });
                // #endif
                // #ifdef H5
                const result = h5Copy(window.location.host + '/pages/register/register?INC=' + this.team.code);
                if (result === false) {
                    uni.showToast({
                        title: '该浏览器不支持复制功能',
                    })
                } else {
                    uni.showToast({
                        title: '复制邀请链接成功',
                        icon: 'none'
                    })
                }
                // #endif

            },
            setScrollHeight() {
                if (!this.team.list) return;
                uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
                    success: (res) => { //成功回调函数
                        this.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
                        let titleH = uni.createSelectorQuery().in(this).select("#scroll"); //想要获取高度的元素名（class/id）
                        titleH.boundingClientRect(data => {
                            let pH = this.pH;
                            this.navHeight = pH - data.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
                        }).exec()
                    }
                })
            },
            
            saveQrCode() {
                // #ifdef H5
               uni.showToast({
                   title:"该功能暂不支持网页版本，请使用APP",
                   icon:"none"
               })
                // #endif
                // #ifndef H5
     uni.canvasToTempFilePath({
                    canvasId: 'qrcode',
                    success: (res)=> {
                        uni.saveFile({
                            tempFilePath: res.tempFilePath,
                            success: function(res) {
                                let savedFilePath = res.savedFilePath;
                                // app
                                plus.nativeUI.toast("保存成功，文件位置：" + savedFilePath);
                            }
                        });
            
                    }
                })
            // #endif
           
            },
              makeQRCode() {
                  uQRCode.make({
                      canvasId: 'qrcode',
                      text: `http://www.taskarea.top/pages/register/register?INC=${this.team.code}`,
                      size: 160,
                      margin: 10,
                      backgroundColor: '#ffffff',
                      foregroundColor: '#000000',
                      fileType: 'jpg',
                      correctLevel: uQRCode.errorCorrectLevel.H,
                      success: res => {
                          // console.log(res)
                      }
                  })
              },
        }

    }
</script>

<style lang="scss" scoped>


    .team {
        height: 100vh;
         background-color: #d63e3d;
        .xb-share-margin-top {
            margin-top: 20px;
        }

        .xb-share-img {
            width: 750rpx;
        }

        .xb-share-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 50rpx;
            margin: 10rpx 50rpx 50rpx 50rpx;
            background-color: #ffffff;
            border-radius: 15rpx;

            text {
                margin: 0 3rpx 0 0;
            }
        }

        .xb-share-title {
            font-size: 30rpx;
        }

        .xb-share-code {
            font-size: 40rpx;
            color: red;
        }

        .xb-share-desc {
            font-size: 24rpx;
            color: #808080;
        }

        .xb-share-button {
            width: 370rpx;
            background-color: #d63e3d;
            border-radius: 40rpx;
            color: #ffffff;
            font-size: 20rpx;
            padding-left: 40rpx;
            padding-right: 40rpx;
        }

        .xb-share-bottom-border {
            border-bottom: #c8c7cc solid 1px;
            padding: 10px 10px 10px 0px;
        }

        .imageBox {
            width: 100%;
            height: 500rpx;
        }

        .dataTitle {
            font-size: 33rpx;
            font-weight: bold;

        }

        .dataValue {
            margin: 8rpx 0;
            font-size: 26rpx;
            font-weight: bold;

        }

        .list {
            .item {
                padding: 0 30rpx;
                align-items: center;
                justify-content: space-between;
                height: 70rpx;
                border-bottom-left-radius: 20rpx;
                border-bottom-right-radius: 20rpx;
                border-bottom: 1rpx solid #eeeeee;
                box-shadow: 5rpx 5rpx 5rpx #EEEEEE;
            }
        }
    }
</style>
