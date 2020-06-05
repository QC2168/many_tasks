<template>
	<view class="changePassword">
        <view class="userPic u-f-ajc">
            <image class="animated flipInX" :src="URL+userData.user_pic" mode="aspectFit"></image>
        </view>
			<u-cell-group>
					<u-field
						v-model="pass"
						label="输入新密码"
						placeholder="请填写新密码"
                        label-width='150'
					>
					</u-field>
					<u-field
						v-model="rpassword"
						label="确认新密码"
						placeholder="请二次确认新密码"
                        label-width='150'
					>
					</u-field>
				</u-cell-group>
                <view class="btn u-f-ajc">
                    <u-button @tap="change" type="error" size='medium'>确认修改</u-button>
                </view>
	</view>
</template>

<script>
	export default {
        created() {
            this.$u.get('/get_user').then(res => {
                if (res.errorCode !== 0) return;
                this.userData = res.data[0];
            })
        },
		data() {
			return {
				pass:'',
                rpassword:'',
                URL: getApp().globalData.URL,
                 userData: [],
			};
		},
        methods:{
            change(){
                if(this.pass!==this.rpassword){
                    uni.showToast({
                        title:'两次输入内容不一致',
                        icon:'none'
                    })
                    return;
                }
                this.$u.post('/change_password',{'rpassword':this.rpassword}).then(res=>{
                    uni.showToast({
                        title:res.msg,
                        success:()=>{
                            uni.clearStorageSync();
                            uni.navigateTo({
                                url:'../login/login'
                            })
                        }
                    })
                })
            }
        }
	}
</script>

<style lang="scss">
.changePassword{
    .userPic{
            margin: 100rpx 0;
            height: 220rpx;
            image {
                width: 200rpx;
                height: 200rpx;
                border-radius: 100%;
                border: .5rpx solid gray;
        }
    }
    .btn{
        width: 100%;
        height: 170rpx;
    }
}
</style>
