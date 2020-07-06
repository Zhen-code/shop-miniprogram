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
            let {index} = e.currentTarget.dataset;
            this.triggerEvent('tabItemChange',{index:index});
        }
    }
});
