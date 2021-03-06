// pages/home/home.js
import { getMutiData,getGoodsData } from '../../service/home.js'
const types=['pop','new','sell']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    },
    currentType:'pop',
    showBackTop:false,
    isTabFixed:false,
    tabScrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1、请求轮播图以及推荐数据
    this._getMultidata();
    //2、请求商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');

  },
  //-------------------网络请求-----------------------------
  _getMultidata(){
    getMutiData().then(res=>{
      //console.log(res)
      const banners=res.data.data.banner.list;
      const recommends=res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    //1.获取页面
    const page=this.data.goods[type].page+1;
    //2.发送网络请求
    getGoodsData(type,page).then(res=>{
      console.log(res)
      //2.1.取出数据
      const list=res.data.data.banner.list;
      //2.2.将数据设置到对应type的list中
      const oldList=this.data.goods[type].list
      oldList.push(...list)
      //2.3.将数据设置到data中的goods中
      const typeKey=`goods.${type}.list`
      const pageKey=`goods.${type}.page`
      this.setData({
        [typeKey]:oldList,
        [pageKey]:page
      })
    })
  },
  //-------------------网络请求-----------------------------
  //-------------------事件封装-----------------------------
  handleTabClick(event){
    console.log(event.detail)
    const index=event.detail.index
    
    //设置currentType
    const type=types[index]
    this.setData({
      currentType:type
    })
  },
  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
      this.setData({
        tabScrollTop:rect.top
      })
    }).exec()
  },
   //-------------------事件封装-----------------------------
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面滚动到底部");
    this._getMultidata(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll(options){  
    const scrollTop=options.scrollTop;
    const flag=scrollTop>=367
    if(flag != this.data.showBackTop){
      console.log(options)
      this.setData({
        showBackTop:flag
      })
    } 
    //修改isTabFixed属性
    const flag2=scrollTop>= this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed){
        this.setData({
          isTabFixed:flag2
        })
    }
  }
})