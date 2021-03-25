<template>
	<view class="container">
	<view class="ui-all">
		<view class="head">
			<view class="solids-bottom padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xsl padding">
						<text class=" cuIcon-roundcheckfill text-green"></text>
					</view>
					<text class="text-black text-bold">您的订单已提交成功！</text>
				</view>
			</view>
		</view>
		<view>
			<view class="ui-list">
				<text>商品名称：</text>
				<text>手机</text>
			</view>
			<view class="ui-list">
				<text>订单金额：</text>
				<text>2222元</text>
			</view>
			<view class="ui-list">
				<text>订单编号：</text>
				<text>123456789</text>
			</view>
			<view class="ui-list">
				<text>交易时间：</text>
				<text>2020-06-06</text> 
			</view>
		</view>
		
		<button class="cu-btn block bg-blue margin-tb-sm lg save" @tap="navTo">关闭</button>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderForm:{}
			}
		},
		methods: {
			navTo(){
				uni.switchTab({
					url:"../shop_index/main"
				})
			}
		}
	}
</script>

<style>

	.container {
		display: block;
	}

	.ui-all {
		padding: 20rpx 40rpx;
	}
	.ui-list {
		width: 100%;
		text-align:left;
		padding: 20rpx 0;
		position: relative;
		border-top: 3px solid #ececec;
	}

	.ui-list text {
		color: #4a4a4a;
		font-size: 28rpx;
		display: inline-block;
		vertical-align: middle;
		min-width: 150rpx;
	}
</style>
