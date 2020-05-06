<template>
    <view v-if="list" class="tabs u-f">
        <view v-for="(item,index) in list" :key="index" class="'u-f-ajc'" :class="[currentIndex===index?'active':'','u-f-ajc']" @tap="clickItem(index)">{{item}}</view>
    </view>
</template>

<script>
    export default{
        props:{
            list:Array
        },
        data(){
            return {
                currentIndex:0
            }
        },
        methods:{
            clickItem(index){
                this.currentIndex=index;
                this.$emit('changeTabIndex',index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tabs{
        height: 90rpx;
        width: 100%;
        view{
            flex:1;
            font-size: 30rpx;
            
        }
        .active{
            color: #007AFF;
            font-weight: bold;
        }
    }
</style>
