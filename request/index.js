let ajaxTime = 0;
export const request = (params)=>{
    ajaxTime++;
    wx.showLoading({
        title: '加载中'
    });
    return new Promise((resolve,reject)=>{
        const baseurl = 'https://api-hmugo-web.itheima.net/api/public/v1';
        wx.request({
            ...params,
            // url: baseurl+params.url
            success:(result)=>{
                resolve(result);
            },
            fail:(error)=>{
                reject(error);
            },
            complete(){
                ajaxTime--;
                if(ajaxTime===0){
                    wx.hideLoading();
                }
            }
        })
    })
};
export const http = (params)=>{
    ajaxTime++;
    wx.showLoading({
        title: '加载中'
    });
    return new Promise((resolve,reject)=>{
        const baseurl = 'https://api-hmugo-web.itheima.net/api/public/v1';
        wx.request({
            ...params,
            url: baseurl+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(error)=>{
                reject(error);
            },
            complete(){
                ajaxTime--;
                if(ajaxTime===0){
                    wx.hideLoading();
                }
            }
        })
    })
};