<template>
	<view class="space" :style="'height:'+size+'px;background:'+bgColor">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
        props:{
            size:{
                type:Number|String,
                default:10
            },
            bgColor:{
                //背景颜色
                type: String,
                default: "white",
            }
            
        }
	}
</script>

<style lang="scss">
.space{
    width: 100%;
}
</style>
