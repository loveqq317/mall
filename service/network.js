import { baseURL } from './config.js'
export default function(options){
 return new Promise((resolove,reject)=>{
  wx.request({
    url: baseURL+options.url,
    method:options.method || 'get',
    data:options.data || {},
    success:resolove,
    fail:reject
  })
 })
}