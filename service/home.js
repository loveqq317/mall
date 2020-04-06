import request from './network.js'
export function getMutiData(){
  return request({
    url:'/mini/mall/mutidata'
  })
}
export function getGoodsData(type,page){
  return request({
    url:'/mini/mall/mutidata',
    data:{
      type,page
    }
  })
}