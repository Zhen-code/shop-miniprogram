export const request = (params)=>{
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
            }
        })
    })
};
export const http = (params)=>{
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
            }
        })
    })
};