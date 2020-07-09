import regeneratorRuntime from 'regenerator-runtime';
import {http} from "../../request/index";
Page({
    data: {
        tabTitle:[
            {id:0,name:'综合',active:true},
            {id:1,name:'销量',active:false},
            {id:2,name:'价格',active:false}
        ],
        goodsList: []
    },
    detailParams:{
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    pageTotal: 1,
    onLoad: function (options) {
        this.detailParams.cid = options.cid;
        this.getGoodsList();
    },
    async getGoodsList(){
        let res = await http({
            url: '/goods/search',
            method: 'GET',
            data: this.detailParams
        });
        this.pageTotal = Math.ceil(res.total/this.detailParams.pagesize);
        this.setData({
            goodsList: [...this.data.goodsList,...res.goods]
        })
    },
    handleTabItemChange(e){
        let {index} = e.detail;
        // console.log(index)
        let tabTitle = this.data.tabTitle;
        tabTitle.forEach((item,i)=>i===index?item.active=true:item.active=false);
        this.setData({
            tabTitle
        })
    },
    onPullDownRefresh() {
        this.setData({
            goodsList: []
        });
        this.detailParams.pagenum = 1;
        this.getGoodsList();
        wx.stopPullDownRefresh();
    },
    onReachBottom() {
        if(this.detailParams.pagenum>=this.pageTotal){
            wx.showToast({
                title: '下一页无数据'
            })
        }else{
            this.detailParams.pagenum+=1;
            this.getGoodsList();
        }
    }
});