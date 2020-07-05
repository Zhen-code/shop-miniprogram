import regeneratorRuntime from 'regenerator-runtime';
import {http} from "../../request/index";
Page({
    data: {
        leftMenuList: [],
        rightContent: [],
        activeIndex: 0,
        scrollTop: 0
    },
    cates: [],
    onLoad: function (options) {
        let cates = wx.getStorageSync('cates');//获取本地数据，如果没则发请求，有判断是否过期，不过期使用，过期重新请求
        if(!cates){
            this.getCates()
        }else if((Date.now()-cates.time)/1000>60){
            this.getCates()
        }else{
            this.cates = cates.data;
            this.setData({
                leftMenuList: this.cates.map(item=>item.cat_name),
                rightContent: this.cates[0].children
            })
        }
    },
    async getCates(){
        // request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
        //     method: 'GET'
        // }).then(res=>{
        //     this.cates = res.data.message;
        //     wx.setStorageSync('cates',{
        //         time: Date.now(),
        //         data: this.cates
        //     });
        //     this.setData({
        //         leftMenuList: this.cates.map(item=>item.cat_name),
        //         rightContent: this.cates[0].children
        //     })
        // }).catch(err=>{
        //     console.log(err);
        // })
        let response = await http({
                    url: '/categories',
                    method: 'GET'
                });
        this.cates = response;
        wx.setStorageSync('cates',{
                time: Date.now(),
                data: this.cates
                });
        this.setData({
                leftMenuList: this.cates.map(item=>item.cat_name),
                rightContent: this.cates[0].children
                });
    },
    tapLeftMenu(e){
        let index = e.currentTarget.dataset.index;
        let rightContent = this.cates[index].children;
        this.setData({
            activeIndex: index,
            rightContent: rightContent,
            scrollTop: 0
        })
    }
});