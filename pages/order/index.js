Page({
    data: {
        userinfo : {},
        collectNums:0
    },
    onLoad: function (options) {

    },
    onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect');
    this.setData({
        userInfo,
        collectNums: collect.length
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