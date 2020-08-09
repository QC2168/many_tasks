<template>
    <div class="lines">
        <div class="t u-f">
            <div class="left"><slot name="left"></slot></div>
            <div class="center"><slot name="center"></slot></div>
            <div><slot name="right"></slot></div>
        </div>
 <div class="b" :style="{'backgroundColor':b_Background_color}"></div>
        
    </div>
</template>

<script>
    export default{
        data(){
            return{
              
            }
        },
        props:{
            b_Background_color:{
                type:String,
                default:'#ffffff'
            }
        }
    }
</script>

<style scoped lang="scss">
    .lines{
   height: 85rpx;
    margin: 15rpx 0;
       background-color: #1e9eff;
           border-top-left-radius: 30rpx;
           border-top-right-radius: 30rpx;
           position: relative;
           color: white;
       .t{
            height: 55rpx;
            width: 100%;
         
            align-items: center;
            font-size: 30rpx;
            // padding: 0 15rpx 0 35rpx;
            font-family: "Gill Sans", sans-serif;
            // box-shadow: 0rpx 2rpx 6rpx #3168ff;
           border-top-left-radius: 22rpx;
           border-top-right-radius: 22rpx;
            div{
             flex:1;
             white-space: nowrap; 
            }
            .left{
                  // padding: 0 15rpx 0 35rpx;
            }
            .center{
               text-align: center;
            }
        }
      
       .b{
           // background-color: red;
           background-color: white;
            // opacity: 0;
           // background-color: white;
           height:30rpx;
           width: 100%;
           border-top-left-radius: 30rpx;
           border-top-right-radius: 30rpx;
           
                 position: absolute;
           bottom: 0;
       }
    }
</style>
