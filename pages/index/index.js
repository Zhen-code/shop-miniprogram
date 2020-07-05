import {request} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    categoryList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET',
    //   header:{
    //     "content-type": 'application/json',
    //   },
    // success:(res)=>{
    //   if(res.statusCode === 200){
    //     this.setData({
    //       swiperList: res.data.message
    //     })
    //   }
    // },
    //   fail:(error)=>{
    //     console.log(error);
    //   }
    // })
   this.getSwiperList();
   this.getCategoryList();
   this.getFloorList();
  },
  getSwiperList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      method: 'GET'
    }).then(res=>{
      if(res.statusCode === 200){
        this.setData({
          swiperList: res.data.message
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  getCategoryList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      method: 'GET'
    }).then(res=>{
        this.setData({
          categoryList: res.data.message
        })
    }).catch(err=>{
      console.log(err)
    })
  },
  getFloorList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      method: 'GET'
    }).then(res=>{
      console.log(res)
      this.setData({
        floorList: res.data.message
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})