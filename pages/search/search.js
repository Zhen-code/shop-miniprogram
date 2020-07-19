import {request} from "../../request/index";
import regeneratorRuntime from 'regenerator-runtime';
Page({
    data: {
        goods: []
    },
    timeId: -1,
    onLoad: function (options) {

    },
    handleInput(e){
        const value = e.detail.value;
        console.log(value)
        if(!value.trim()){
            return
        }
        clearTimeout(this.timeId);
        this.timeId=setTimeout(()=>{
            this.handleSearch(value);
        },1000)
    },
    async handleSearch(query){
        let res = await request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
            method: 'GET',
            data:{
                query
            }
        });
        console.log(res.data.message.goods)
        this.setData({
            goods: res.data.message.goods
        })
    }
});