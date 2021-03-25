<template>
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
</template>

<script>
	import CardItem from '../../components/product_card_template.vue'
	export default {
		components: {
			CardItem
		},
		data() {
			return {
				productsList: {}
			}
		},
		onLoad() {
			this.getProdcuts();
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
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
	}
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
