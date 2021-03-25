<template>
	<div>
		<view class="cu-list menu-avatar  ">
			<view class="cu-item">
				<view class="cu-avatar round lg" :style="{backgroundImage:'url(' + goods.subAvatar + ')'}"></view>
				<view class="content">
					<view class="text-grey" style="color: black;">{{goods.subUser}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">商品创建于 {{goods.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品描述 -->
		<view class="padding-xs flex align-center">
			<view class=" text-left">
				<view class=" text-xxl padding" style="font-size: 38rpx;">{{goods.prodName}}</view>
				<view class=" text-xl padding">
					<text class="text-price text-red" style="font-size: 42rpx;">{{goods.nowPrice}}</text>
					<text class="text-price text-red" style="font-size: 34rpx; text-decoration: line-through;margin-left: 23rpx;">{{goods.prePrice}}</text>
				</view>
			</view>
		</view>

		<view class="cu-bar ">
			<view class="action">
				<text class="cuIcon-title text-blue" style="font-size: 34rpx;">商品详情</text>
			</view>
		</view>

		<view class="padding-xs flex align-center w-discript" style="padding: 0 20rpx 60rpx;">
			<view class="flex-sub description">
				<text class="text-xl padding" style="font-size: 32rpx;padding:0">{{goods.prodDescription}}</text>
			</view>
		</view>

		<!--模态提示框-->
		<view :class="['cu-modal',modalName=='hide'?'':'show']">
			<view class="cu-dialog">
				<view class="bg-img" style="background-image: url('https://cdn.jsdelivr.net/gh/BA-NANA/ba-nana.github.io@1.0/assets/img/tjut.jpg');height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">购买时请确认对方的学生身份，谨防诈骗!</view>
				</view>
			</view>
		</view>

		<!-- 图片 -->
		<view class="w-goods" style="margin-top:20rpx;">
			<image :src="goods.prodImg1" mode="widthFix"></image>
			<image v-if="goods.prodImg2!=undefined" :src="goods.prodImg2" mode="widthFix"></image>
			<image v-if="goods.prodImg3!=undefined" :src="goods.prodImg3" mode="widthFix"></image>
			<image v-if="goods.prodImg4!=undefined" :src="goods.prodImg4" mode="widthFix"></image>
		</view>
		
		<!-- 分割 -->
		<view class="between"></view>
		
		<!-- 评论区 -->
		<view class="blocks" style="height: 430rpx;">
			
			<view class="cu-bar ">
				<view class="action" @tap="navTo('discuss')">
					<view class="cuIcon-title text-black" style="font-size: 34rpx;">买家评价</view>
					<view class="cuIcon-right text-black" style="font-size: 34rpx;"></view>
				</view>
			</view>
			
				<Discuss
				  :commentList="commentList"
				  @clickPraise="clickPraiseComment"
				  @clickDelete="clickDeleteComment"
				  @clickDeleteChild="clickDeleteCommentChild"
				  @clickRecommentChild="clickRecommentChild"
				></Discuss>
		</view>
		
		<!-- 分割 -->
		<view class="between"></view>
		
		<!-- 推荐模块 -->
		<view class="blocks">
			
			<view class="cu-bar ">
				<view class="action" @tap="navTo('recommend')">
					<view class="cuIcon-title text-black" style="font-size: 34rpx;">为您推荐</view>
					<view class="cuIcon-right text-black" style="font-size: 34rpx;"></view>
				</view>
			</view>
			<view class="product-card-list">
				<CardItem v-for="(item,index) in productsList" :key="index" :item="item" :index="index" class="card-item"></CardItem>
				<view id="tip" style="width: 100%;" v-if="productsList.length==0">
				</view>
			</view>
		</view>
		
		
		<view style="height:150rpx;"></view>

		<!-- 导航栏 -->
		<view class="box">
			<view class="cu-bar bg-white tabbar border shop">
				<view class="action text" @tap="showModal">
					<view class="cuIcon-info"></view> 
					购买须知
				</view>
				<view :class="[goods.isCollect?'action text-orange':'action text']" @tap="getCollect">
					<view class="cuIcon-favorfill"></view>
					<p v-if="goods.isCollect==false">收藏</p>
					<p v-if="goods.isCollect==true">已收藏</p>
				</view>
				<view :class="[goods.isAppreciate?'action text-orange':'action text']" @tap="getAppreciate">
					<view class="cuIcon-appreciate"></view>
					<p v-if="goods.isAppreciate==false">超赞</p>
					<p v-if="goods.isAppreciate==true">已超赞</p>
				</view>
				<view v-if="goods.prodStatus==1" class="submit" @tap="toBuy" style="background-color: #5B8FF9;color:white">立即订购</view>
				<view v-if="goods.prodStatus!=1" class="bg-grey submit">已卖出</view>
			</view>
		</view>
		
		
	</div>
</template>
<script>
	import CardItem from '../../components/product_card_template.vue'
	import Discuss from '../../components/five-mul-commentlist/five-mul-commentlist.vue'
	export default {
		components:{
			Discuss,
			CardItem
		},
		data() {
			return {
				goods: {
					"subUser":"test",
					"createTime":"2020-11-11",
					"prodName":"这是一个商品",
					"nowPrice":11.5,
					"prePrice":23,
					"prodDescription":"这是一个商品描述，用来测试样式。这是一个商品描述，用来测试样式",
					"prodImg1":'https://cdn.jsdelivr.net/gh/BA-NANA/ba-nana.github.io@1.0/assets/img/tjut.jpg',
					"prodImg2":'https://yun.515code.com/static/miniprogram/%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6.jpg',
					"prodImg3":'https://yun.515code.com/static/miniprogram/1.jpg',
					"prodImg4":'https://www.515code.com/viedo/index/banner.jpg',
				},
				ImgUrls: [],
				productsList: {},
				modalName: 'hide',
				
					commentList:[{
						
							"COMMENT_TIME": "2020-11-19 20：20",
							"FIRSTNICKNAME": "网友1",
							"IS_PRAISE": null,
							"COMMENT": "网友一说jsifjdaiofjsidf",
							"PRAISE_NUM": 0,
							"CANDELETE": 0,
							"HEADIMGURL": "https://yun.515code.com/blog/background-image/Bahamas%20Aerial.jpg",
							"PARENTID": "",
							"SECONDNICKNAME": null,
							"CHILD_ANWSER_LIST": [{
								"COMMENT_TIME": "2020-11-19 20：50",
								"FIRSTNICKNAME": "网友2",
								"IS_PRAISE": null,
								"COMMENT": "网友二说hfdshaohisadfasf",
								"PRAISE_NUM": 0,
								"CANDELETE": 1,
								"HEADIMGURL": "https://yun.515code.com/blog/background-image/Abstract%204.jpg",
								"SECONDNICKNAME": "网友1"
							}]
						}
					]
			}
		},
		onLoad() {
			//获取商品详细信息
			this.getProductInfo();

			var _this = this;
			wx.getSystemInfo({
				success: function(res) {
					_this.screenHeight = res.windowHeight;
					_this.screenWidth = res.windowWidth;
				}
			});
			this.getProdcuts();
		},
		
		
		beforeMount() {

		},
		//compunted打错了
		computed: {
			//映射状态到组件,名字和state.js中一致

		},
		methods: {
			navTo(e){
				uni.navigateTo({
					url:"../"+e+"/"+e
				})
			},
			imageLoad() {
				var _this = this;
				var $width = e.detail.width, //获取图片真实宽度
					$height = e.detail.height,
					ratio = $width / $height; //图片的真实宽高比例
				var viewWidth = 720, //设置图片显示宽度，
					viewHeight = 720 / ratio; //计算的高度值
				this.setData({
					imgwidth: viewWidth,
					imgheight: viewHeight
				})
			},
			
			getProdcuts() {
			
				this.$fly.interceptors.request.use((config, promise) => {
					config.headers["Content-Type"] = "application/x-www-form-urlencoded";
					return config;
				})
				this.$fly.get(this.globalData.backgroundURL + 'products/recommend', {
						num: 4 //随机获取12条商品
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

			//获取商品详细信息
			getProductInfo() {
				wx.login({
					timeout: 10000,
					success: (result) => {
						this.code = result.code;
					},
					fail: () => {},
					complete: () => {
						//完成code获取后再更新数据
						this.$fly.interceptors.request.use((config, promise) => {
							config.headers["Content-Type"] = "application/x-www-form-urlencoded";
							return config;
						})
						this.$fly.get(this.globalData.backgroundURL + 'products/getDetailById', {
								code: this.code,
								id: this.$mp.query.prodId
							})
							.then(function(response) {
								this.goods = response.data.data
							}.bind(this))
							.catch(function(error) {
								console.log(error);
							});
					}
				});

			},

			//触发收藏事件
			getCollect() {

				wx.login({
					timeout: 10000,
					success: (result) => {
						this.code = result.code;
					},
					fail: () => {},
					complete: () => {
						//完成code获取后再更新数据
						this.$fly.interceptors.request.use((config, promise) => {
							config.headers["Content-Type"] = "application/x-www-form-urlencoded";
							return config;
						})
						this.$fly.post(this.globalData.backgroundURL + 'click/collect', {
								code: this.code,
								productId: this.goods.prodId
							})
							.then(function(response) {
								this.goods.isCollect = !this.goods.isCollect;
								this.handleCollection(); //提示收藏成功或失败
							}.bind(this))
							.catch(function(error) {
								console.log(error);
							});
					}
				});

			},
			//触发收藏事件
			getAppreciate() {

				wx.login({
					timeout: 10000,
					success: (result) => {
						this.code = result.code;
					},
					fail: () => {},
					complete: () => {
						//完成code获取后再更新数据
						this.$fly.interceptors.request.use((config, promise) => {
							config.headers["Content-Type"] = "application/x-www-form-urlencoded";
							return config;
						})
						this.$fly.post(this.globalData.backgroundURL + 'click/like', {
								code: this.code,
								productId: this.goods.prodId
							})
							.then(function(response) {
								this.goods.isAppreciate = !this.goods.isAppreciate;
							}.bind(this))
							.catch(function(error) {
								console.log(error);
							});
					}
				});

			},
			handleCollection() {
				let title = this.goods.isCollect ? '收藏成功' : '取消收藏';
				wx.showToast({
					title: title,
					icon: 'success',
					image: '',
					duration: 1000,
					mask: false,
					success: (result) => {

					},
					fail: () => {},
					complete: () => {}
				});
			},
			showModal() {
				this.modalName = '温馨提示'
			},
			hideModal() {
				this.modalName = 'hide'
			},
			toBuy() {
				wx.navigateTo({
					url: '/pages/buy_product/main?prodName=' +
						this.goods.prodName + '&nowPrice=' + this.goods.nowPrice + '&prePrice=' + this.goods.prePrice +
						'&subUser=' + this.goods.subUser + '&prodId=' + this.goods.prodId + '&prodImage=' + encodeURIComponent(this.goods
							.prodImg1),
					success: (result) => {

					},
					fail: (res) => {},
					complete: () => {}
				});

			}
		}
	}
</script>
<style>
	page {
		background-color: white;
	}

	.w-goods {
		width: 100%;
		padding: 0 60rpx;
	}

	.w-goods>image {
		width: 100%;
		border-radius: 20rpx;
	}

	.w-sellerInfo {
		/* box-shadow: 0 5rpx 5rpx 5rpx black; */
	}

	.box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.w-discript {
		padding: 0 60rpx 60rpx;
		line-height: 44rpx;
	}

	.description {
		padding-left: 45rpx;
		padding-right: 45rpx;
		text-align: justify;
	}
	.blocks{
		background-color: #fff;
		/* width: 95%; */
		height: auto;
		/* border-radius: 50rpx; */
		/* margin: 2.5%; */
		/* box-shadow:rgba(80, 80, 80, 0.5) 2rpx 2rpx 2rpx 0rpx; */
		overflow: hidden;
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
	.between{
		margin: 30rpx 0;
			height: 30rpx;
			line-height: 56rpx;
			border-bottom: 1rpx solid #e8ebeb;
			color: #bec2c6;
			background-color: #f4f7f7;
	}
</style>
