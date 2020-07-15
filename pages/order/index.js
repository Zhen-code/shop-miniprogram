Page({
    data: {
        userinfo : {}
    },
    onLoad: function (options) {

    },
    onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
        userInfo
    })
        },
    goAuth(){
            wx.navigateTo({
                url: '../auth/index',
                success(res){
                    console.log(res)
                }
            })
    }
});