Page({
  name: "Home",
  data() {
    return {
      // hasUserInfo: false,
      // userInfo: {}
      navFlag: false,
      list: [],
      pageIndex: 1,
      typeid: 0,
      loadshow: true,
      dataList: [
        { "icon": "./img/icon_qb1.png", "name": "全部", "classId": "163" },
        { "icon": "./img/icon_zx1.png", "name": "资讯", "classId": "83" },
        { "icon": "./img/icon_sp.png", "name": "商品", "classId": "295" },
        { "icon": "img/icon_yc1.png", "name": "原创", "classId": "163" },
        { "icon": "img/icon_zq.png", "name": "证券", "classId": "329" },
        { "icon": "img/icon_qh.png", "name": "期货", "classId": "137" },
        { "icon": "img/icon_wh.png", "name": "外汇", "classId": "136" },
        { "icon": "img/icon_bk.png", "name": "百科", "classId": "15" }
      ],
      listswiper: [1, 2, 3],
      listAdd: []
    }
  },
  created() {
    // this.typeid = this.$route.query.id;
    // console.log(this.typeid)
    var str = "<xml><pageIndex>" + this.pageIndex + "</pageIndex><pageSize>10</pageSize><typeid>163</typeid></xml>";
    var base64 = window.btoa(str);
    // console.log(base64)
    var that = this
    // $.ajax({
    //   type: "POST",
    //   url: "https://api.jiaxunmedia.com/v1/getNewsList",
    //   // header: { "Content-Type": "application/json" },
    //   // header: ('Access-Control-Allow-Origin: *'),
    //   data: { data: base64 },
    //   dataType: "json",
    //   success: function (data) {
    //     console.log(data);
    //     that.list = data.data.data;
    //     // console.log(that.list)
    //   }
    // });
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
        console.log(data.data.data.data);
        that.loadshow = false
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
    // 滚动条底部加载
    var that = this;
    window.onscroll = function () {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        // console.log(that.pageIndex)
        that.pageIndex++;
        // console.log(that.pageIndex);
        var str = "<xml><pageIndex>" + that.pageIndex + "</pageIndex><pageSize>10</pageSize><typeid>163</typeid></xml>";
        var base64 = window.btoa(str);
        // console.log(base64)
        qh.request({
          url: 'https://api.jiaxunmedia.com/v1/getNewsList', // 仅为示例，并非真实的接口地址
          method: 'POST',
          dataType: 'json',
          data: base64,
          // header: {
          //   'content-type': 'application/json' // 默认值
          // },
          success: function (data) {
            that.listAdd = data.data.data.data;
            // console.log(that.listAdd)
            that.list = that.list.concat(that.listAdd)
            that.loadshow = false
          },
          fail: function (err) {
            console.log('错误码：' + err.errCode);
            console.log('错误信息：' + err.errMsg);
          }
        });
        // $.ajax({
        //   type: "POST",
        //   url: "https://api.jiaxunmedia.com/v1/getNewsList",
        //   data: { data: base64 },
        //   dataType: "json",
        //   success: function (data) {
        //     // console.log(data);
        //     that.listAdd = data.data.data;
        //     // console.log(that.listAdd)
        //     that.list = that.list.concat(that.listAdd)
        //   }
        // });
      }
    };
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
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  mounted() {
    this.typeid = this.$route.params;
    // console.log(this.typeid)
    // 轮播图
    // setTimeout(() => {
    //   var mySwiper = new Swiper('.swiper-container', {
    //     loop: true, // 循环模式选项
    //     autoplay: {
    //       disableOnInteraction: false,
    //     },
    //     observer: true,
    //     // 如果需要分页器
    //     pagination: {
    //       el: '.swiper-pagination',
    //     },
    //   })
    // }, 300);
  },
  methods: {
    getUserInfo() {
      // 授权
      qihoo.Authorize('user_base_info', (code) => {
        if (code == 0) {
          // 获取用户信息
          qihoo.GetBaseUserInfo((code, res) => {
            if (code == 0) {
              // this.hasUserInfo = true
              // this.userInfo = JSON.parse(res)
              this.$store.commit('update', {
                name: 'hasUserInfo',
                value: true
              })
              this.$store.commit('update', {
                name: 'userInfo',
                value: JSON.parse(res)
              })
            } else {
              // 获取用户信息失败
            }
          })
        } else {
          // 授权失败
        }
      })
    },
    showNav() {
      // console.log(666)
      this.navFlag = true
    },
    hiddenNav() {
      this.navFlag = false
    },
    detile(id) {
      // console.log(id)
      this.$showToast({
        title: '正在加载...',
        icon: 'loading',
        duration: 200
      });
      qh.navigateTo({
        url: '/pages/detail/index?id=' + id
      });
      // this.$router.push({
      //   name: "detile",
      //   params: { id: id }
      // });
    },
    all(id) {
      console.log(id)
      var str = "<xml><pageIndex>" + this.pageIndex + "</pageIndex><pageSize>10</pageSize><typeid>" + id + "</typeid></xml>";
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
          console.log(data.data.data.data);
          that.loadshow = false
        },
        fail: function (err) {
          console.log('错误码：' + err.errCode);
          console.log('错误信息：' + err.errMsg);
        }
      });
      // 滚动条底部加载
      var that = this;
      window.onscroll = function () {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight == scrollHeight) {
          console.log(that.pageIndex)
          that.pageIndex++;
          console.log(that.pageIndex);
          var str = "<xml><pageIndex>" + that.pageIndex + "</pageIndex><pageSize>10</pageSize><typeid>" + id + "</typeid></xml>";
          var base64 = window.btoa(str);
          // console.log(base64)
          qh.request({
            url: 'https://api.jiaxunmedia.com/v1/getNewsList', // 仅为示例，并非真实的接口地址
            method: 'POST',
            dataType: 'json',
            data: base64,
            // header: {
            //   'content-type': 'application/json' // 默认值
            // },
            success: function (data) {
              that.listAdd = data.data.data.data;
              // console.log(that.listAdd)
              that.list = that.list.concat(that.listAdd)
              that.loadshow = false
            },
            fail: function (err) {
              console.log('错误码：' + err.errCode);
              console.log('错误信息：' + err.errMsg);
            }
          });
        }
      };
      this.navFlag = false
    },
  }
});
