<template>
	<view class="container">
		<view class="topContainer">
			<view class="status_bar">
				<view class="top_view" :class="{ top_view_active: top_view_active_flag == 1 }"></view>
			</view>
			<view class="topBar">
				<text class="cuIcon-back lg" @tap="navBack"></text>
			</view>
			<view class="topUserInfo">
				<view class="flex topUserInfo_1">
					<view class="flex-sub">
						<view class="cu-avatar radius xl topUserInfoAvatar" mode="widthFix" style="background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg)"></view>
					</view>

					<view class="flex-twice topUserInfoName">
						<view class="flex-sub">空间页（功能未开放）</view>
						<view class="flex-sub" style="flex-direction: column">
							<view class="flex-sub"> 地区：<text>广东</text> </view>
						</view>
						<view class="flex-sub">
							<view class="cu-tag bg-grey sm round" style="font-size: 16rpx">未实名</view>
						</view>
					</view>

					<view class="margin-tb-sm text-center flex-sub topUserInfoSetting">
						<button class="cu-btn radius line-white" style="font-size: 26rpx; font-weight: 200" v-if="status == 1" @tap="changeBtn()">已关注</button>
						<button class="cu-btn radius line-white" style="font-size: 26rpx; font-weight: 200" v-else-if="status == -1" @tap="changeBtn()">关注</button>
					</view>
				</view>

				<view class="topUserInfo_2">
					<view class="message">
						{{ message }}
					</view>
					<view class="flex friend">
						<view class="" v-for="(item, index) in List" :key="index" @tap="navTo(item.url)">
							<text>{{ item.count }}</text>{{ item.itemName }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="InnerContent">
			<view class="depart" :class="{ depart_active: depart_active_flag == 1 }">
				<view v-for="(item, index) in EventItems" :key="item.id" @tap="change(item)">
					{{ item.event }}
					<view :class="[act == index ? 'line' : '']"></view>
				</view>
			</view>
			<view :class="{ active: btnnum == 0, inner_active: depart_active_flag == 1 }" class="inner">
				<!-- <view v-if="showNoCommentData" style="transform: translateY(50%)">
					<tui-no-data :fixed="false" imgUrl="/static/images/nodata/img_nodata.png">功能暂未开放，程序员哥哥和姐姐们要加油啦！</tui-no-data>
				</view> -->
				<view class="product-card-list">
				  <CardItem v-for="(item, index) in productsList" :key="index" :item="item" :index="index" class="card-item"></CardItem>
				  <view id="tip" style="width: 100%" v-if="productsList.length == 0">
				    <view class="padding-lr bg-white margin-top">
				      <view class="solid-bottom padding">
				        <text class="text-Abc">Powered By 515code</text>
				      </view>
				      <view class="padding">您还没有发布商品</view>
				    </view>
				  </view>
				</view>
			</view>
			<!--评价-->
			<view :class="{ active: btnnum == 1 }" class="inner">
				<Discuss :commentList="commentList" @clickPraise="clickPraiseComment" @clickDelete="clickDeleteComment"
					 @clickDeleteChild="clickDeleteCommentChild" @clickRecommentChild="clickRecommentChild" @clickRecomment="clickRecomment"></Discuss>
				
				<!-- <view v-if="showNoCommentData" style="transform: translateY(50%)">
					<tui-no-data :fixed="false" imgUrl="/static/images/nodata/img_nodata.png">功能暂未开放，程序员哥哥和姐姐们要加油啦！</tui-no-data>
					
				</view> -->
			</view>
			<view :class="{ active: btnnum == 2 }" class="inner" style="background-color: #fff">
				<IssuanceCard class="issuance" v-for="(item, index) in issuanceList" :key="index" :item="item" :issuanceList="item"></IssuanceCard>
			</view>
		</view>
	</view>
</template>

<script>
	import IssuanceCard from "@/components/issuanceCard.vue";
	import CardItem from "@/components/product_card_template.vue";
	import Discuss from '@/components/five-mul-commentlist/five-mul-commentlist.vue';

	export default {
		components: {
			Discuss,
			CardItem,
			IssuanceCard,
		},
		data() {
			return {
				showNoCommentData: true,
				top_view_active_flag: 0,
				depart_active_flag: 0,
				btnnum: 0,
				act: 0,
				productsList: {},
				EventItems: [{
						id: 0,
						event: "正在卖",
						count: 0,
					},
					{
						id: 1,
						event: "评价",
						count: 0,
					},
					{
						id: 2,
						event: "动态",
						count: 0,
					},
				],
				List: [{
						id: 0,
						count: 0,
						itemName: "超赞",
						url: "setting",
					},
					{
						id: 1,
						count: 0,
						itemName: "关注",
						url: "#",
					},
					{
						id: 2,
						count: 0,
						itemName: "粉丝",
						url: "#",
					},
				],
				issuanceList: [{
						month: 7,
						date: 16,
						issList: [{
								id: 0,
								img: "https://img.alicdn.com/imgextra/i1/196993935/O1CN01C9aXRP1ewH9WFPHOq_!!196993935-0-picasso.jpg_430x430q90.jpg",
								text: "大头贴",
								price: 2.5,
							},
							{
								id: 1,
								img: "https://yun.515code.com/blog/background-image/Abstract%204.jpg",
								text: "壁纸",
								price: 3.5,
							},
							{
								id: 2,
								img: "https://yun.515code.com/blog/background-image/Bahamas%20Aerial.jpg",
								text: "蓝色海洋",
								price: 4.5,
							},
						],
					},
					{
						month: 8,
						date: 18,
						issList: [{
								id: 0,
								img: "https://img.alicdn.com/imgextra/i1/196993935/O1CN01C9aXRP1ewH9WFPHOq_!!196993935-0-picasso.jpg_430x430q90.jpg",
								text: "高清贴膜",
								price: 5.5,
							},
							{
								id: 1,
								img: "https://yun.515code.com/blog/background-image/Abstract%204.jpg",
								text: "艺术画",
								price: 3.5,
							},
						],
					},
				],
				message: "我就是我，不一样的烟火！",
				status: 0,
				commentList: [{
					// 前端样式测试用例
					"COMMENT_TIME": "2020-11-19 20：20", //创建时间
					"FIRSTNICKNAME": "芒果", //楼主
					"IS_PRAISE": 1, //我是否点赞
					"COMMENT": "优秀的店家，书本很新几乎没有使用痕迹", //楼主的话
					"PRAISE_NUM": 1, //点赞量
					"CANDELETE": 0,
					"HEADIMGURL": "https://yun.515code.com/blog/background-image/Bahamas%20Aerial.jpg", //楼主头像
					"PARENTID": "",
					"SECONDNICKNAME": null,
					"CHILD_ANWSER_LIST": [{ //回复列表
						"COMMENT_TIME": "2020-11-19 20：50",
						"FIRSTNICKNAME": "小鸭",
						"IS_PRAISE": null,
						"COMMENT": "谢谢好评",
						"PRAISE_NUM": 0,
						"CANDELETE": 1,
						"HEADIMGURL": "https://yun.515code.com/blog/background-image/Abstract%204.jpg",
						"SECONDNICKNAME": "芒果"
					}]
				}, {
				
					"COMMENT_TIME": "2020-10-19 20：20",
					"FIRSTNICKNAME": "草莓",
					"IS_PRAISE": null,
					"COMMENT": "鸭子很可爱很搞笑，店家态度也很好",
					"PRAISE_NUM": 0,
					"CANDELETE": 0,
					"HEADIMGURL": "https://yun.515code.com/blog/background-image/Bahamas%20Aerial.jpg",
					"PARENTID": "",
					"SECONDNICKNAME": null,
					"CHILD_ANWSER_LIST": [{
						"COMMENT_TIME": "2020-11-19 20：50",
						"FIRSTNICKNAME": "小鸭",
						"IS_PRAISE": null,
						"COMMENT": "欢迎下次购买",
						"PRAISE_NUM": 0,
						"CANDELETE": 1,
						"HEADIMGURL": "https://yun.515code.com/blog/background-image/Abstract%204.jpg",
						"SECONDNICKNAME": "草莓"
					}]
				}, {
				
					"COMMENT_TIME": "2020-11-19 20：20",
					"FIRSTNICKNAME": "低价出售水果",
					"IS_PRAISE": null,
					"COMMENT": "很好的卖家，沟通态度很好",
					"PRAISE_NUM": 0,
					"CANDELETE": 0,
					"HEADIMGURL": "https://yun.515code.com/blog/background-image/Bahamas%20Aerial.jpg",
					"PARENTID": "",
					"SECONDNICKNAME": null,
					"CHILD_ANWSER_LIST": []
				}]
			};
		},
		onLoad() {
			this.getProdcuts();
		},
		methods: {
			onPageScroll(e) {
				if (e.scrollTop > 0) {
					this.top_view_active_flag = 1;
				} else {
					this.top_view_active_flag = 0;
				}

				// #ifdef MP
				if (e.scrollTop > 238.8) {
					this.depart_active_flag = 1;
				} else {
					this.depart_active_flag = 0;
				}
				//#endif
				//#ifdef APP-PLUS
				if (e.scrollTop > 263.8) {
					this.depart_active_flag = 1;
				} else {
					this.depart_active_flag = 0;
				}
				//#endif
				//#ifdef H5
				if (e.scrollTop > 197) {
					this.depart_active_flag = 1;
				} else {
					this.depart_active_flag = 0;
				}
				//#endif
			},
			changeBtn(e) {
				this.status = this.status * -1;
			},
			change(e) {
				this.btnnum = e.id;
				this.act = e.id;
			},
			navBack() {
				uni.navigateBack({

				});
			},
			navTo(e) {
				uni.navigateTo({
					url: "../" + e + "/" + e,
				});
			},

			getProdcuts() {
				this.$fly.interceptors.request.use((config, promise) => {
					config.headers["Content-Type"] = "application/x-www-form-urlencoded";
					return config;
				});
				this.$fly
					.get(this.globalData.backgroundURL + "products/recommend", {
						num: 12, //随机获取12条商品
					})
					.then(
						function(response) {
							this.productsList = response.data.data;
						}.bind(this)
					)
					.catch(function(error) {
						wx.showToast({
							title: "加载失败，请检查网络",
							icon: "none",
							image: "",
							duration: 3000,
							mask: false,
							success: (result) => {},
							fail: () => {},
							complete: () => {},
						});
						console.log(error);
					});
			},
				clickPraiseComment(item) { //只能在前端改变，缺少后端的----------------------------
							if (item.IS_PRAISE == 1) {
								item.IS_PRAISE = 0;
								item.PRAISE_NUM--;
								// console.log("0");
							} else {
								item.IS_PRAISE = 1;
								item.PRAISE_NUM++;
								// console.log("1");
							}
						},
		},
	};
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		top: 0rpx;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;

		top: 0;
		z-index: 999;
	}

	.top_view_active {
		background-color: #5b8ff9;
	}

	.topContainer {
		display: flex;
		flex-direction: column;
		background: linear-gradient(to top right, #3e6369, #5b8ff9);
	}

	/* #ifdef H5 */
	.topBar {
		height: 88rpx;
		font-size: 54rpx;
		color: white;
		padding: 17rpx;
	}

	/* #endif */
	/* #ifdef APP-PLUS */
	.topBar {
		height: 88rpx;
		font-size: 54rpx;
		color: white;
		padding: 17rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.topBar {
		height: 88rpx;
		font-size: 54rpx;
		color: white;
		margin-top: 42rpx;

		border-bottom: 1rpx black;
	}

	.topBar>text {
		margin: 17rpx;
	}

	/* #endif */
	.topUserInfo {
		color: white;
	}

	.topUserInfoAvatar {
		margin: 40rpx 20rpx 40rpx 40rpx;
	}

	.topUserInfoName {
		margin: 32rpx 0;
		font-size: 28rpx;
		line-height: 28rpx;
	}

	.topUserInfoName>view {
		padding: 11rpx;
	}

	.topUserInfoSetting {
		margin: 73rpx 40rpx 0 0;
	}

	.topUserInfo_2 {
		flex-direction: column;
		margin: 10rpx 40rpx;
	}

	.topUserInfo_2>view {
		margin-bottom: 30rpx;
		font-size: 26rpx;
	}

	.message {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}

	.product-card-list {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.card-item {
		width: 48%;
	}

	.friend>view {
		padding-right: 40rpx;
	}

	.depart {
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
	}

	.depart_active {
		width: 100%;
		position: fixed;
		top: var(--status-bar-height);
		z-index: 999;
	}

	.depart>view {
		width: 33%;
		text-align: center;
		display: inline-block;
	}

	.inner {
		display: none;
	}

	.inner_active {
		padding-top: 80rpx;
	}

	.active {
		display: block;
	}

	.line {
		margin: -4rpx auto 0;
		width: 30rpx;
		height: 4rpx;
		background-color: #5b8ff9;
	}
</style>
