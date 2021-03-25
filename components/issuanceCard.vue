<template>
		<view class="issuanceCard">
			<view class="flex justify-between " style=" align-items:center">
				<view class="dateBox">
					{{issuanceList.month}}月{{issuanceList.date}}日
				</view>
				<view class="" style="font-size: 30px;color: #e7e7e7;">
					<text class="lg " :class="[flag?'cuIcon-unfold':'cuIcon-fold']" @tap="put()"></text>
					
				</view>
			</view>
			<view :class="{iss_active:flag == false}">
				<view class="description">
				上新了{{issuanceList.issList.length}}个宝贝
			</view>
			
			
			<view class="issuance  flex left" v-for="(item,id) in issuanceList.issList" 
			
			:key="id" :item="item">
				<view class="issLeft">
					<image :src="item.img" mode="aspectFill"></image>
				</view> 
				<view class="issRight">
					<view class="issText"> 
						{{item.text}}
					</view>
					<view class="issPrice">
						￥{{item.price}}
					</view>
					
				</view>
			</view>
			</view>
			
		</view>
</template>

<script>
	export default {
		props:[
			"issuanceList",
			"month",
			"date"
		],
		data() {
			return {
				flag:true
			};
		},
		onLoad: function () { 
      flag=true
    },
		methods:{
			put(){
				this.flag=!this.flag;
				console.log(this.flag);
			}
		}
	}
</script>

<style>
	.issuanceCard{
		padding: 0 48rpx;
	}
	.dateBox{
		font-size: 44rpx;
		height: 116rpx;
		line-height: 116rpx;
		color: #333333;
	}
	.description{
		height: 84rpx;
		line-height: 84rpx;
		font-size: 34rpx;
		color: #a3a3a3;
	}
	.issuance{
		/* height: 230rpx; */
		/* overflow: hidden; */
	}
	.issLeft{
		width: 30%;
		height: 180rpx;
		margin: 12rpx 48rpx 12rpx 0;
		overflow: hidden;
	}
	.issRight{
		width: 70%;
	}
	.issText{
		height: 92rpx;
		line-height: 50rpx;
		font-size: 36rpx;
		margin: 27rpx 0;
		color: #333333;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
	}
	.issPrice{
		padding-top: 10rpx;
		height: 82rpx;
		line-break: 62rpx;
		font-size: 30rpx;
		color: #ff3e3c;
	}
	.iss_active{
		display: none;
	}
	.topImg{
		font-size: 30rpx;
		width: 30rpx;
	}
</style>
