export const login = ()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            success(res){
                const {code} = res;
                resolve(code);
            },
            fail(err){
                reject(err);
            }
        });
    })
}