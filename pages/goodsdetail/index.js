import regeneratorRuntime from 'regenerator-runtime';
import {http} from "../../request/index";

Page({
    data: {
        detailObj: {}
    },
    onLoad: function (options) {
        let {goods_id} = options;
        this.getGoodsDetail(goods_id);
    },
    async getGoodsDetail(goods_id){
        let res = await http({
            url: '/goods/detail',
            method: 'GET',
            data:{
                goods_id
            }
        });
        this.setData({
            detailObj: res
        })
    }
});