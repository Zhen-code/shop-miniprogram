Page({
    data: {
        address: {},
        cart:[],
        allChecked: false,
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
        // let allChecked = cart.length===0?false:cart.every(i=>i.checked);//根据every返回true/false
        // let allChecked = true;
        // let totalPrice = 0;
        // let totalNum = 0;
        // cart.forEach(i=>{
        //     if(i.checked){
        //         totalPrice+= (i.num*i.goods_price);
        //         totalNum+= i.num;
        //     }else{
        //         allChecked = false;//有一个没选择则不全选
        //     }
        // });
        // allChecked = cart.length===0?false:allChecked;//如果列表为空则返回不全选
        // this.setData({
        //     cart,
        //     allChecked,
        //     totalPrice,
        //     totalNum
        // });
        },
    getAddress(){
        //收货地址权限为undefined或true可以直接获取地址，false重新发起请求权限
        wx.getSetting({
            success(res){
                if(res.authSetting['scope.address']===true){
                    wx.chooseAddress({
                        success(res){
                            res.all = res.provinceName+res.cityName+res.countyName+res.detailInfo;
                            wx.setStorageSync('address',res);
                            console.log(res);
                        },
                        fail(err){
                            console.log(err);
                        }
                    })
                }else if(res.authSetting['scope.address']===false||res.authSetting['scope.address']===undefined){
                    wx.openSetting({
                        success(res1){
                            console.log('调出授权设置')
                            console.log(res1)
                            wx.chooseAddress({
                                success(res2){
                                    console.log('选择地址成功')
                                    console.log(res2)
                                    res2.all = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
                                    wx.setStorageSync('address',res2);
                                },
                                fail(err){
                                    console.log('选择地址失败')
                                    console.log(err);
                                }
                            })
                        },
                        fail(err){
                            console.log('调出授权设置失败');
                            console.log(err)
                        }
                    })
                    // wx.authorize({//查看权限
                    //     scope: 'scope.address',
                    //     success(res){
                    //         console.log(res);
                    //     },
                    //     fail(err){
                    //         console.log(err)
                    //     }
                    // })
                }
            }
        })
    },
    handleChangeItem(e){
        const goods_id = e.currentTarget.dataset.id;
        let {cart} = this.data;
        let index = cart.findIndex(i=>i.goods_id===goods_id);
        cart[index]['checked'] = !cart[index]['checked'];
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
    allChange(){
        let {cart,allChecked} = this.data;
        allChecked = !allChecked;
        cart.forEach(i=>i.checked=allChecked);
        if (!allChecked){
            this.setData({
                totalNum: 0,
                totalPrice: 0
            });
        }else{
            this.setCart(cart);//全选则重新计算
        }
        this.setData({
            cart,
            allChecked
        });
        wx.setStorageSync('cart',cart);
    },
    handleItemNum(e){
        const {id,operation} = e.currentTarget.dataset;
        let { cart } = this.data;
        let index = cart.findIndex(i=>i.goods_id===id);
        if(cart[index]['num']===1&&operation===-1){
            wx.showModal({
                title:'提示',
                content:'是否删除?',
                success:(res)=>{
                    if(res.confirm){
                        cart.splice(index,1);
                        this.setCart(cart);
                    }
                }
            })
        }else{
            cart[index]['num'] = cart[index]['num']+=operation;
            this.setCart(cart);
        }
    },
    handlePay(){
        let {address,totalNum} = this.data;
        if(!address.provinceName){
            wx.showToast({
                title:'未选择收货地址',
                icon: 'none'
            })
            return;
        }else if(totalNum===0){
            wx.showToast({
                title:'未选择购买商品',
                icon: 'none'
            })
            return;
        }
        wx.navigateTo({
            url: '../pay/pay'
        })
    }
});