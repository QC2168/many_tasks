<template>
    <view class="root">
        <view v-if="list" class="tabs u-f">
            <view ref="label" v-for="(item,index) in list" :key="index" class="'u-f-ajc'" :class="[currentIndex===index?'active':'','u-f-ajc']"
                @tap="clickItem(index)">{{item}}</view>

        </view>
        <view class='tabs-active-bar'></view>
 
    </view>

</template>

<script>
    export default {
        props: {
            list: Array
        },
        mounted(){
            this.clickItem(0)
        }
        ,
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            clickItem(index) {
                this.currentIndex = index;
                      let doc = document.getElementsByClassName("tabs-active-bar")[0];
                      
             
                      let left = this.$refs.label[index].$el.offsetLeft + "px"; //返回当前元素的相对水平偏移位置的偏移容器
                      let width = this.$refs.label[index].$el.clientWidth - 8 + "px"; //	在页面上返回内容的可视宽度（不包括边框，边距或滚动条）
                      doc.style.width = `${width}`;
                      doc.style.transform = `translateX(${left})`;
                      doc.style.transition = ".3s";
                this.$emit('changeTabIndex', index);
            },
            setCurrentIndex(index) {
                    this.currentIndex = index;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .root {
        margin: 10rpx 0 20rpx 0;
        .tabs {
            height: 90rpx;
            width: 100%;

            view {
                flex: 1;
                font-size: 32rpx;

            }

            .active {
                color: #007AFF;
                font-weight: bold;
            }

        }

        .tabs-active-bar {
            position: absolute;
            left: 0;
         
            width: 56rpx;
            height: 5rpx;
            margin-left: 4px;
            transform: translateX(0px);
            box-sizing: border-box;
            background-color: #409eff;
            z-index: 1;
        }
    }
</style>
