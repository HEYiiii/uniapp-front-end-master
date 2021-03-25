<template>
  <view class="login-type">
    <view class="logo">
      <image src="/static/pngs/logo2.png"></image>
    </view>
    <button
        class="confirm-btn"
        :disabled="btnLoading"
        @tap="navTo('/pages/login/login')"
    >
      已有账号登录
    </button>
    <button
        class="confirm-btn"
        :disabled="btnLoading"
        @tap="navTo(`/pages/login/login?type=1`)"
    >
      立即注册
    </button>
    <!--协议popup--> 
    <rf-protocol-popup
        ref="mapState"
        @popupState="popupState"
        protocolPath="/pages/set/about/detail?field=protocol_register&title=注册协议"
        policyPath="/pages/set/about/detail?field=protocol_privacy&title=隐私协议"
        v-if="isRfProtocolPopupShow"
    ></rf-protocol-popup>
    <!-- 底部协议 -->
    <view class="footer-protocol">
      <text class="content">登录表示同意</text>
      <!-- 协议地址 -->
      <text @tap="handleRfProtocolPopupShow" style="color: #5B8FF9;">《{{appName}} 协议》</text>
    </view>
    <!-- 底部协议 -->
    <view class="footer">
      <view class="d-header">
        <text>其他登录方式</text>
      </view>
      <view class="login-type-list">
				<!-- #ifdef APP-PLUS -->
					<button
              :disabled="btnLoading"
              :loading="btnLoading" 
              @tap="handleAuthLogin()"
              class="login-type-btn">
            <image class="image" :src="wxIcon"></image>
          </button>
				<!-- #endif -->
				<!-- ifdef H5 -->
					<!-- <button
              :disabled="btnLoading"
              :loading="btnLoading" 
              @tap="handleAuthLogin()"
              class="login-type-btn">
            <image class="image" :src="wxIcon"></image>
          </button> -->
				<!-- endif-->
				<!-- #ifdef MP-WEIXIN -->
					  <button
								open-type="getUserInfo"
					      :disabled="btnLoading"
					      :loading="btnLoading" 
					      @getuserinfo="handleGetUserInfo"
					      class="login-type-btn">
					    <image class="image" :src="wxIcon"></image>
					  </button>
				<!-- #endif -->
      </view>
    </view>
  </view>
</template>
<script>
	import rfProtocolPopup from '@/components/rf-protocol-popup';
	export default {
		components: { rfProtocolPopup },
		data() {
			return {
				btnLoading: false,
				isRfProtocolPopupShow: false, // 控制协议popup显示
				appAgreementDefaultSelect: true,
				appName: '商城',
				wxIcon: '/static/pngs/wechat.png' ,
				openid:"",
				userKey:"",
				userInfo:{}
			};
		},
		onShow() {
			if (uni.getStorageSync('accessToken')) {
				this.$mRouter.reLaunch({ route: '/pages/index/index' });
			}
		},
		onLoad(options) {
			// 如果不是第一次进来 就不需要强制阅读协议
			if (!uni.getStorageSync('notFirstTimeLogin')) {
        this.appAgreementDefaultSelect = false;
			} else {
				this.appAgreementDefaultSelect = true;
			}
		},
		methods: {
			createUser(){
			    //存储用户信息到数据库中
			    this.$fly.interceptors.request.use((config,promise)=>{
			      config.headers["Content-Type"]="application/x-www-form-urlencoded";
			      return config;
			    })
			    this.$fly.post(this.globalData.backgroundURL+'user/create',{
			          nickName: this.userInfo.nickName,
			          avatarUrl: this.userInfo.avatarUrl,
			          gender: this.userInfo.gender,
			              country: this.userInfo.country,
			              province: this.userInfo.province,
			              city: this.userInfo.city,
			              code: this.code
			
			            })
			            .then(function (response) {
			            })
			            .catch(function (error) {
			              console.log(error);
			            });
			
			      },
			//  #ifdef MP-WEIXIN
			handleGetUserInfo(res){
				console.log(res);
				if(res.mp.detail.userInfo){
					// 如果获取成功就存到data里
					this.userInfo=res.mp.detail.userInfo;
					this.createUser();
					uni.showToast({ title: "Hi！"+res.mp.detail.userInfo.nickName })
				};
				uni.login({
					success: function(res){
						let js_code=res.code;
						// let appId='wxa286b44849ff9eec';
						// let appSecret='3ea48da0c081102f5f37d72347fa139e';
						// let url="https://api.weixin.qq.com/sns/jscode2session?appid="+"appId"+"&secret="+"appSecret"+"&js_code="+"js_code";
						//先获取code,有效期只有五分钟
						uni.request({
							url:url,
							method:"POST",
							success:response=>{
								console.log(response)
							}
						})
					}
				})
			},
			//#endif
			
		  handleAuthLogin() {
		  	uni.showToast({ title: `点击了weixin授权登录` })
				
      },
			// 通用跳转
			navTo(url) {
		    if (!this.appAgreementDefaultSelect) {
					uni.showToast({ title: '请勾选并阅读协议，才能进行下一步哦' });
					return;
				}
		    uni.navigateTo({ url });
			},
			// 显示协议popup
			handleRfProtocolPopupShow() {
				this.isRfProtocolPopupShow = true;
			},
			// 监听是否同意协议
			popupState(e) {
				if (e) {
					this.appAgreementDefaultSelect = true;
					uni.setStorageSync('notFirstTimeLogin', true);
					this.isRfProtocolPopupShow = false;
				} else {
					this.appAgreementDefaultSelect = false;
					this.isRfProtocolPopupShow = false;
				}
			}
		}
	};
</script>
<style lang="scss">
  page {
    background: #fff;
  }
  .login-type {
    padding-top: 80rpx;
    .logo {
      text-align: center;
      margin-bottom: 80rpx;

      image {
        width: 180rpx;
        height: 180rpx;
        border-radius: 28rpx;
      }
    }
    .confirm-btn {
      width: 84%;
      margin: 0 7% 50rpx;
      height: 84rpx;
      line-height: 84rpx;
      font-size: 32rpx;
      border: 1rpx solid;
      color: $base-color;
      background: none;
    }
    
    .footer {
      width: 100%;
      text-align: center;
      position: fixed;
      bottom: 200rpx;
      font-size:  24rpx + 2rpx;
      .protocol {
        margin: 0 10rpx;
      }
      .d-header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80rpx;
        margin-bottom: 20rpx;
        font-size: 28rpx + 2rpx;
        position: relative;
        text {
          padding: 0 32rpx;
          background: #fff;
          position: relative;
          z-index: 1;
        }
        &:after {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%);
          width: 300rpx;
          height: 0;
          content: '';
          border-bottom: 1px solid #ccc;
        }
      }
      .login-type-list {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-type-btn {
          border: none;
          background: none;
          padding: 0 40rpx 0 0;
          margin: 0;
          .image {
            width: 64rpx;
            height: 64rpx;
          }
          &:after {
            border: none;
          }
        }
        .iconfont {
          font-size: 50rpx;
        }
      }
    }
    .footer-protocol {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28upx;
      margin-bottom: 30upx;
      padding-bottom: 30upx;
      .cuIcon {
				width: 44upx;
				height: 44upx;
        padding: 6upx;
      }
      .content {
        margin: 0 4upx 0 10upx;
      }
    }
  }
</style>
