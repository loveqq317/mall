// components/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLoad(){
      if(!this.data.isLoad){
        console.log("图片加载完成了")
        this.triggerEvent('imageload')//发送出去的事件
        this.data.isLoad=true
      }
     
    }
  }
})
