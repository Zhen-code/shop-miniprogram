Page({
    data: {
        address: {},
        cart:[],
        totalPrice: 0,
        totalNum: 0
    },
    onLoad: function (options) {

    },
    onShow() {
        let address = wx.getStorageSync('address')||{};
        this.setData({
            address:address
        });
        let cart = wx.getStorageSync('cart') || [];
        this.setCart(cart);
    },
    setCart(cart){
        let allChecked = true;
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(i=>{
            if(i.checked){
                totalPrice+= (i.num*i.goods_price);
                totalNum+= i.num;
            }else{
                allChecked = false;//有一个没选择则不全选
            }
        });
        allChecked = cart.length===0?false:allChecked;//如果列表为空则返回不全选
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        });
        wx.setStorageSync('cart',cart);//cart一定要设置回缓存
    },
    handlePay(){
        const token = wx.getStorageSync('token');
        if(!token){
            wx.navigateTo({
                url: '../auth/index'
            })
        }else{

        }
    }
});