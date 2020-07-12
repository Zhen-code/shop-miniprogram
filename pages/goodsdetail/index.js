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
    goodsInfo:{},
    previewImage(e){
        let {url} = e.currentTarget.dataset;
        wx.previewImage({
            urls: this.goodsInfo.pics.map(i=>i.pics_mid),
            current: url,
            success(result){
                console.log(result);
            },
            fail(err){
                console.log(err);
            }
        })
    },
    async getGoodsDetail(goods_id){
        let res = await http({
            url: '/goods/detail',
            method: 'GET',
            data:{
                goods_id
            }
        });
        this.goodsInfo = res;
        this.setData({
            detailObj: {
                goods_name: res.goods_name,
                goods_price: res.goods_price,
                goods_introduce: res.goods_introduce,
                pics:res.pics
            }
        })
    },
    addCart(){
        let cart = wx.getStorageSync('cart') || [];
        let index = cart.findIndex(i=>i.goods_id === this.goodsInfo.goods_id);
        // console.log(index)
        if(index === -1){
            this.goodsInfo.num = 1;
            this.goodsInfo.checked = true;
            cart.push(this.goodsInfo);
        }else{
            cart[index]['num']++;
        }
        wx.setStorageSync('cart',cart);
        wx.showToast({
            title:'添加成功',
            type: 'success'
        });
    }
});