import {http} from "../../request/index";
Page({
    data: {
        tabs:[
            {
                id: 0,
                name: '综合',
                active: true
            },
            {
                id: 1,
                name: '待付款',
                active: false
            },
            {
                id: 2,
                name: '待发货',
                active: false
            },
            {
                id: 3,
                name: '退款/退货',
                active: false
            }
        ],
        orders:[]
    },
    handleItemChange(e){
        const {index} = e.detail;
        this.setTabs(index);
        this.getOrders(index+1);
    },
    onLoad: function (options) {
        console.log(options)
    },
    onShow(options) {
        let pages = getCurrentPages();
        let curentpage = pages[pages.length-1];
        const {type} = curentpage.options;
        this.getOrders(type);
        this.setTabs(type-1);
    },
    setTabs(index){
        let tabs = this.data.tabs;
        tabs.forEach(i=>i.id===index?i.active=true:i.active=false)
        this.setData({
            tabs: tabs
        })
    },
    async getOrders(type){
        const res = await http({
            url: '/my/orders/all',
            method: 'GET',
            headers:{
                Authorization: ''
            },
            data:{
                type
            }
        });
        console.log(res)
    }
});