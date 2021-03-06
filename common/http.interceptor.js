const install = (Vue, vm) => {
    // 此为自定义配置参数，具体参数见上方说明
    Vue.prototype.$u.http.setConfig({
        // #ifdef H5
        baseUrl: process.env.NODE_ENV === 'development'?'http://api.taskarea.com/api/v1':'http://task.taskarea.top/api/v1',
        // #endif
        // #ifdef APP-PLUS
        baseUrl: 'http://task.taskarea.top/api/v1',
        // #endif
        header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        sslVerify: false,
        showLoading: true, // 是否显示请求中的loading
        loadingText: '全速加载中~',
        originalData: true, // 是否在拦截器中返回服务端的原始数据
        loadingTime: 500, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    });

    // 请求拦截部分，如配置，每次请求前都会执行
    Vue.prototype.$u.http.interceptor.request = (config) => {
        if (config.method == 'post') {
            config.header['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        // 免token请求数组
        let arr=[
            '/register',
            '/login',
            '/A_login',
            '/get_task_list',
            '/get_dy_task_list',
            '/get_dy_task_detail',
            '/get_task_detail',
            '/get_home_pic',
            '/get_notice_bar',
        ];
        if(!arr.includes(config.url)){
            // 引用token
            const token = uni.getStorageSync('token');
            config.header.token = token;
            return config;
        }
        
       
    }

    // 响应拦截，如配置，每次请求结束都会执行本方法
    Vue.prototype.$u.http.interceptor.response = (res) => {
        if (res.statusCode == 200) {
            // res为服务端返回值，可能有code，result等字段
            // 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
            // 如果配置了originalData为true，请留意这里的返回值
            if(res.data.errorCode === 0 ||res.data.errorCode === 20011 ) {
                return res.data;
            }
            if (res.data.errorCode === 10000) {
                uni.showToast({
                    title: res.data.msg,
                    icon: "none"
                })
                return false;
            } 
            if (res.data.errorCode === 20003) {
                    uni.reLaunch({
                        url: "../login/login"
                    })
                    uni.showToast({
                        title: res.data.msg,
                        icon: "none"
                    })
                    return false;
       
            } 
            
            if(res.data.errorCode===20014){
                uni.showToast({
                    title: res.data.msg,
                    icon: "none"
                })
                 return false;
            }
            if(res.data.errorCode!==0){
                uni.showToast({
                    title: res.data.msg,
                    icon: "none"
                })
                 return false;
            }
           
            if(res.data.errorCode === 20014) {
                uni.showToast({
                    title: res.data.msg,
                    icon: "none"
                })
                setTimeout(()=>{
                    //退出 应用
                    // #ifdef APP-PLUS
                    	 if (plus.os.name.toLowerCase() === 'android') {
                    		 plus.runtime.quit();
                    	 }
                    	 else{ 
                    		 const threadClass = plus.ios.importClass("NSThread");
                    		 const mainThread = plus.ios.invoke(threadClass, "mainThread");
                    		 plus.ios.invoke(mainThread, "exit");
                    	 }
                    	// #endif
                          return false;
                },1000)
            }
        } else if (res.data.statusCode == 400) {
            // 400
            // 服务器异常
            uni.showToast({
                title: res.data.msg,
                icon: "none"
            })
            // setTimeout(() => {
            //     // 此为uView的方法，详见路由相关文档
            //     this.$u.route({
            //         url: "../login/login"
            //     })
            // }, 1500)
            return false;
        } else {
            // 如果返回false，则会调用Promise的reject回调，
            // 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
            return false;
        }
    }
}


export default {
    install
}
