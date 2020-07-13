import regeneratorRuntime from 'regenerator-runtime';
import {http} from "../../request/index";
import {login} from "../../utils/asyncWX";
Page({
    data: {},
    onLoad: function (options) {

    },
    async handleUserInfo(e){
        const {encryptedData,iv,rawData,signature} = e.detail;
        const code = await login();
        // console.log(code)
        let res = await http({
            url: '/users/wxlogin',
            data:{
                encryptedData,
                iv,
                rawData,
                signature,
                code
            },
            method: 'POST'
        });
        console.log(res)//获取不到token因为个人未被添加白名单
    }
});