Component({
    properties: {
        tabs:{
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        tabItemChange(e){
            console.log(e)
            let {index} = e.currentTarget.dataset;
            this.triggerEvent('tabItemChange',{index:index});
        }
    }
});
