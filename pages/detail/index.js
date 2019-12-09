// pages\detail\index.js
Page({
  /**
   * 页面的初始数据
   */
  data: () => ({
    id: "",
    obj: "",
    text: "",
    list: []
  }),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // console.log(option)
    this.id = option.id;
    // console.log(this.id)
    var str = `<xml><id>${this.id}</id></xml>`;
    var base64 = window.btoa(str);
    // console.log(base64)
    /** 
     * 时间戳转化为年 月 日 时 分 秒 
     * number: 传入时间戳 
     * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
    */

    var that = this
    qh.request({
      url: 'https://api.jiaxunmedia.com/v1/getNewsContext', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: base64,
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      success: function (data) {
        that.$hideLoading();
        that.obj = data.data.data.data[0];
        // console.log(data.data.data.data[0]);
        that.text = that.obj.newstext
        that.text = that.text.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        that.text = that.text.replace(/\<table/gi, '<table style="width:380px;height:auto" ')
        // console.log(that.text)
        that.loadshow = false
        // setTimeout(() => {
        //   $("center>img").css({ "width": "100%", "height": "auto" })
        //   $("table").css("width", "380px")
        // }, 50);
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
  },
  onReady() {
    // 详情推荐
    //原数组
    var arr = [83, 295, 163, 329, 137, 136, 15];
    //输出数组
    var out = [];
    //输出个数
    var num = 1;
    while (out.length < num) {
      var temp = (Math.random() * arr.length) >> 0;
      out.push(arr.splice(temp, 1));
      console.log(out)
    }
    var str = "<xml><pageIndex>" + 0 + "</pageIndex><pageSize>10</pageSize><typeid>" + out[0] + "</typeid></xml>";
    var base64 = window.btoa(str);
    // console.log(base64)

    var that = this
    qh.request({
      url: 'https://api.jiaxunmedia.com/v1/getNewsList', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: base64,
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      success: function (data) {
        that.list = data.data.data.data;
        console.log(that.list)
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
  },
  methods: {
    detile(option) {
      var id = option
      console.log(id)
      qh.reLoad();
      qh.navigateTo({
        url: '/pages/detail/index?id=' + id
      });
    },
  },
  filters: {
    formatDate: function (value) {
      var date1 = value * 1000
      // console.log(date1)
      let date = new Date(date1);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d;
    }
  },
  onUnload() {

  },
  onShow() {

  },
  onHide() {

  }
})
