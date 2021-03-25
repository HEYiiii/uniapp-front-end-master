<template>
	<view class="Container">
		<!--顶部搜索框-->
	<!-- 	<view class="topBar justify-center">
			<view class="cu-bar search InSearch">
				<view class="search-form round" style="box-shadow:rgba(80, 80, 80, 0.5) 2rpx 2rpx 2rpx 0rpx;">
					<text class="cuIcon-search"></text>
					<input v-model="inputValue" :adjust-position="false" type="text" placeholder="输入商品，或者下拉页面试试~"
					 confirm-type="search"></input>
				</view>
				
			</view>
		</view> -->
		<view style="width: 100%;">
			
		<Search ></Search>
		</view>
		<!--轮播图-->
		<view class="RoundBg">
			
		</view>
		<swiper 
		indicator-dots
		 indicator-color="white" 
		 indicator-active-color="#5B8FF9"
			autoplay=true interval=5000 
			circular
		style="box-shadow:rgba(80, 80, 80, 0.5) 2rpx 2rpx 2rpx 0rpx;">
			<block v-for="(item,index) in imgUrls" :key="index" :item="item" :index="index">
				<swiper-item class="" item-id="" >
					<image :src="item" alt="" >
				</swiper-item>
			</block>
		</swiper>
		<!--卡片组件-->
		<view class="product-card-list">
			<CardItem v-for="(item,index) in productsList" :key="index" :item="item" :index="index" class="card-item"></CardItem>
			<view id="tip" style="width: 100%;" v-if="productsList.length==0">
				<view class="padding-lr bg-white margin-top">
					<view class="solid-bottom padding">
						<text class="text-Abc">Powered By 515code</text>
					</view>
					<view class="padding">暂时没有搜索到商品哦，建议换个关键字试试~</view>
				</view>
			</view>
		</view>

		<!-- <view style="height:150rpx;"></view> -->


	</view>
	</view>
	</view>
</template>

<script>
	import CardItem from '../../components/product_card_template.vue'
	import Search from '../../components/Search.vue'
	export default {
		components: {
			CardItem,
			Search
		},
		data() {
			return {
				inputValue: '',
				imgUrls: [
					'https://cdn.jsdelivr.net/gh/BA-NANA/ba-nana.github.io@1.0/assets/img/tjut.jpg',
					'https://yun.515code.com/static/miniprogram/%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6.jpg',
					'https://yun.515code.com/static/miniprogram/1.jpg',
					'https://www.515code.com/viedo/index/banner.jpg',
					'https://yun.515code.com/static/miniprogram/4.jpg'
				],
				productsList: {}
			}
		},
		onPullDownRefresh() {
			wx.showNavigationBarLoading();
			this.getProdcuts();
			wx.hideNavigationBarLoading();
			wx.stopPullDownRefresh();
		},
		beforeMount() {

		},
		onLoad() {
			this.getProdcuts();
		},
		//compunted打错了
		computed: {
			//映射状态到组件,名字和state.js中一致

		},
		methods: {
			//随机获取商品（推荐）
			getProdcuts() {

				this.$fly.interceptors.request.use((config, promise) => {
					config.headers["Content-Type"] = "application/x-www-form-urlencoded";
					return config;
				})
				this.$fly.get(this.globalData.backgroundURL + 'products/recommend', {
						num: 12 //随机获取12条商品
					})
					.then(function(response) {
						this.productsList = response.data.data;

					}.bind(this))
					.catch(function(error) {
						wx.showToast({
							title: '加载失败，请检查网络',
							icon: 'none',
							image: '',
							duration: 3000,
							mask: false,
							success: (result) => {

							},
							fail: () => {},
							complete: () => {}
						});
						console.log(error);
					});
			},
			searchProducts() {
				this.$fly.interceptors.request.use((config, promise) => {
					config.headers["Content-Type"] = "application/x-www-form-urlencoded";
					return config;
				})
				this.$fly.get(this.globalData.backgroundURL + 'products/search', {
						prodName: this.inputValue
					})
					.then(function(response) {
						this.productsList = response.data.data;
					}.bind(this))
					.catch(function(error) {
						console.log(error);
					});
			} //结束
		}
	}
</script>
<style>
	page {
		width: 100%;
		height: auto;
	}

	.Container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/*顶部搜索框*/
	

	/*轮播图*/
	swiper{
	  width: 90%;
	  border-radius: 20rpx;
	  overflow: hidden;
	  /* height: 400rpx; */
	  margin: 20rpx;
	}
	swiper image{
	  width: 100%;
	  height:100%;
	}
	.swiper-item{
	  width: 100%;
	  height: 100%;
	}
	.RoundBg{
		position: absolute;
		top:100rpx;
		background-color: #5B8FF9;
		width: 100%;
		height: 220rpx;
		border-bottom-right-radius: 70rpx;
		border-bottom-left-radius: 70rpx;
	}
	/* .card{
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	card-item{
		height: auto;
		width: 48%;
		display: block;
	} */
	
	.product-card-list{
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.card-item{
		width: 48%;
	}
</style>
