import Vue from 'vue'
import App from './App'
import store from '@/store';
import cuCustom from './colorui/components/cu-custom.vue'
import uView from "uview-ui";
import * as filters from '@/filter/index.js'
const vuexStore = require("@/store/$u.mixin.js");

Vue.component('cu-custom', cuCustom)


Vue.config.productionTip = false

App.mpType = 'app'

//将store对象放置在vue原型上，每个实例都可以使用
Vue.prototype.$store = 'store'

//使用flyio
var Fly = require("flyio/dist/npm/wx")
let fly = new Fly
Vue.prototype.$fly = fly

// const app = new Vue(App)


const app = new Vue({
	store,
    ...App
})
//挂载应用
app.$mount()

//挂载后端服务器地址
Vue.prototype.globalData = {
	backgroundURL: "https://api.515code.com/shopping/"
}
//Vue.prototype.globalData = {backgroundURL:"http://localhost:8080/"}

uni.getSystemInfo({
	success: function(e) {
		// #ifndef MP
		Vue.prototype.StatusBar = e.statusBarHeight;
		if (e.platform == 'android') {
			Vue.prototype.CustomBar = e.statusBarHeight + 50;
		} else {
			Vue.prototype.CustomBar = e.statusBarHeight + 45;
		};
		// #endif
		// #ifdef MP-WEIXIN
		Vue.prototype.StatusBar = e.statusBarHeight;
		let custom = wx.getMenuButtonBoundingClientRect();
		Vue.prototype.Custom = custom;
		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
		// #endif       
		// #ifdef MP-ALIPAY
		Vue.prototype.StatusBar = e.statusBarHeight;
		Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
		// #endif
	}
})


// 以下是chat轮子里的代码

Vue.mixin(vuexStore);
Vue.use(uView);

Object.keys(filters).forEach(name=>{
	Vue.filter(name,filters[name])
})

Promise.prototype.finally = function(callback) {
    let constructor = this.constructor;
    return this.then(function(value) {
        return constructor.resolve(callback()).then(function() {
            return value
        })
    }, function(issue) {
        return constructor.resolve(callback()).then(function() {
            throw issue
        })
    })
}



