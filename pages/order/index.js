Page({
    data: {},
    onLoad: function (options) {

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