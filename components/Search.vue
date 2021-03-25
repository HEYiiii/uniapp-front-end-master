<template>
		<view class="topBar justify-center">
			<view class="cu-bar search InSearch">
				<view class="search-form round" @tap="ToSearch" style="box-shadow:rgba(80, 80, 80, 0.5) 2rpx 2rpx 2rpx 0rpx;">
					<text class="cuIcon-search"></text>
					<input  :adjust-position="false" type="text" placeholder="输入商品，或者下拉页面试试~"
					 confirm-type="search"  ></input>
				</view>
				
			</view>
		</view>
		
</template>

<script>
	export default {
		data() {
			return {
				
			};
		} ,
		methods:{
			ToSearch(){
				console.log("yes")
				uni.navigateTo({
					url:'/pages/HM-search/HM-search',
					success() {
						console.log("to")
					},
					fail() {
						console.log("fail");
					}
				});
			}
		}
	}
</script>

<style>
/*顶部搜索框*/
	.topBar {
		width: 100%;
		top: 0;
		background-color: #5B8FF9;
	}
	.InSearch{
		width: 100%;
		padding: 0 3%;
		
	}
</style>
