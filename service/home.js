import request from './network.js'
export function getMutiData(){
  return request({
    url:'/mini/mall/mutidata'
  })
}