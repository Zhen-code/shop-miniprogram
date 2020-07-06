Page({
    data: {
        tabTitle:[
            {id:0,name:'综合',active:true},
            {id:1,name:'销量',active:false},
            {id:2,name:'价格',active:false}
        ]
    },
    onLoad: function (options) {
        console.log(options);
    },
    handleTabItemChange(e){
        let {index} = e.detail;
        // console.log(index)
        let tabTitle = this.data.tabTitle;
        tabTitle.forEach((item,i)=>i===index?item.active=true:item.active=false);
        this.setData({
            tabTitle
        })
    }
});