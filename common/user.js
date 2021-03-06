export default{
    // 用户token 测试token：4cd36bf70649475ac0cd6fae78250954474a4350
    token:false,
    // 用户信息
    userinfo:false,
    // 权限验证跳转
    navigate(options,type = "navigateTo"){
    	// 是否登录验证
    	if (!$http.checkToken(true)) return;
    	// 验证是否绑定手机号
    	if (!$http.checkAuth(true)) return;
    	// 跳转
    	switch (type){
    		case "navigateTo":
    		uni.navigateTo(options);
    			break;
    		case "redirectTo":
    		uni.redirectTo(options);
    			break;
    		case "reLaunch":
    		uni.reLaunch(options);
    			break;
    		case "switchTab":
    		uni.switchTab(options);
    			break;
    	}
    },

    }