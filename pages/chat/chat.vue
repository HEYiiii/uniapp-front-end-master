<template>
	<view class="content">
		<view class="content-box" @touchstart="touchstart" id="content-box" :class="{'content-showfn':showFunBtn}">
			
			<view class="content-box-loading" v-if="!loading"><u-loading mode="flower"></u-loading></view>
			<view class="message" v-for="(item, index) in messageList" :key="index" :id="`msg-${item.hasBeenSentId}`">
				<view class="message-item " :class="item.isItMe ? 'right' : 'left'">
					<image class="img" :src="item.fromUserHeadImg" mode="" @tap="linkToBusinessCard(item.fromUserId)"></image>
					<!-- contentType = 1 文本 -->
					<view class="content" v-if="item.contentType == 1">{{ item.content }}</view>
					
					<!-- contentType = 3 图片 -->
					<view 
						class="content contentType3" 	
						v-if="item.contentType == 3"
						@tap="viewImg([item.content])"
					>
						<image :src="item.content" class="img" mode="widthFix"></image>
					</view>
				</view>
			</view> 
		</view>
		
		<!-- 底部聊天输入框 -->
		<view class="input-box" :class="{ 'input-box-mpInputMargin': mpInputMargin }">
			<view class="input-box-flex">
				<!-- #ifndef H5 -->
				<!-- #endif -->
				<view class="input-box-flex-grow"> 
					<input
						
						type="text"
						class="content"
						id="input"
						v-model="formData.content"
						:hold-keyboard="true"
						:confirm-type="'send'"
						:confirm-hold="true"
						placeholder-style="color:#DDDDDD;"
						:cursor-spacing="10"
						@confirm="sendMsg(null)"
					/>
					
				</view>
				<!-- 功能性按钮 -->
				<image class=" icon_btn_add" :src="require('@/static/icon/add.png')" @tap="switchFun"></image>
				
			<!-- 发送按钮 -->
				<button class="btn" type="primary" size="mini" @touchend.prevent="sendMsg(null)">发送</button>
				
			</view>
			
			<!-- 功能区 -->
			<view class="fun-box" :class="{'show-fun-box':showFunBtn}">
				<u-grid :col="4"  hover-class="contentType2-hover-class" :border="false" @click="clickGrid">
					<u-grid-item v-for="(item, index) in funList" :index="index" :key="index" bg-color="#eaeaea">
						<u-icon :name="item.icon" :size="52"></u-icon>
						<view class="grid-text">{{ item.title }}</view>
					</u-grid-item>
				</u-grid>
			</view>

		</view>
		
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			fromUserInfo: {},
			formData: {
				content: '',
				limit: 15,
				index: 1
			},
			messageList: [],
			loading: true, //标识是否正在获取数据
			imgHeight: '1000px',
			mpInputMargin: false, //适配微信小程序 底部输入框高度被顶起的问题
			Recorder: uni.getRecorderManager(),
			Audio: uni.createInnerAudioContext(),
			showFunBtn:false, //是否展示功能型按钮
			AudioExam:null, //正在播放音频的实例
			funList: [
				{ icon:"photo-fill",title:"照片",uploadType:["album"] },
				{ icon:"camera-fill",title:"拍摄",uploadType:["camera"] },
			],
		};
	},
	methods: {
		//拼接消息 处理滚动
		async joinData() {
			if (!this.loading) {
				//如果没有获取数据 即loading为false时，return 避免用户重复上拉触发加载
				return;
			}
			this.loading = false;
			const data = await this.getMessageData();
			//获取节点信息
			const { index } = this.formData;
			const sel = `#msg-${index > 1 ? this.messageList[0].hasBeenSentId : data[data.length - 1].hasBeenSentId}`;
			this.messageList = [...data, ...this.messageList];
			//填充数据后，视图会自动滚动到最上面一层然后瞬间再跳回bindScroll的指定位置 ---体验不是很好，后期优化
			this.$nextTick(() => {
				this.bindScroll(sel);
				//如果还有数据
				if (this.formData.limit >= data.length) {
					this.formData.index++;
					setTimeout(() => {
						this.loading = true;
					}, 200);
				}
			});
		},
		//处理滚动
		bindScroll(sel, duration = 0) {
			const query = uni.createSelectorQuery().in(this);
			query
				.select(sel)
				.boundingClientRect(data => {
					uni.pageScrollTo({
						scrollTop: data && data.top - 40,
						duration
					});
				})
				.exec();
		},
		//获取消息
		getMessageData() {
			let getData = () => {
				let arr = [];
				let startIndex = (this.formData.index - 1) * this.formData.limit;
				let endIndex = startIndex + this.formData.limit;
				for (let i = startIndex; i < endIndex; i++) {
					const isItMe = Math.random() > 0.5 ? true : false;
					arr.unshift({
						hasBeenSentId: i, //已发送过去消息的id
						content: `很高兴认识你，这是第${i + 1}条消息。`,
						fromUserHeadImg: isItMe ? this._user_info.headImg : this.fromUserInfo.fromUserHeadImg, //用户头像
						fromUserId: isItMe ? this._user_info.id : this.fromUserInfo.fromUserId,
						isItMe, //true此条信息是我发送的 false别人发送的
						createTime: Date.now(),
						contentType: 1, // 1文字文本 2语音
						anmitionPlay: false //标识音频是否在播放
					});
				}
				return arr;
			};
			return new Promise((resolve, reject) => {
				const data = getData();
				setTimeout(() => {
					resolve(data);
				}, 500);
			});
		},
		//切换功能性按钮
		switchFun(){
			this.chatType = 'keyboard'
			this.showFunBtn = !this.showFunBtn;
			uni.hideKeyboard()
		},
		//发送消息
		sendMsg(data) {
			const params = {
				hasBeenSentId: Date.now(), //已发送过去消息的id
				content: this.formData.content,
				fromUserHeadImg: this._user_info.headImg, //用户头像
				fromUserId: this._user_info.id,
				isItMe: true, //true此条信息是我发送的  false别人发送的
				createTime: Date.now(),
				contentType: 1
			};

			if (data) {
				 if(data.contentType == 3){
					//发送图片
					params.content = data.content;
					params.contentType = data.contentType;
				}
			} else if (!this.$u.trim(this.formData.content)) {
				//验证输入框书否为空字符传
				return;
			}

			this.messageList.push(params);

			this.$nextTick(() => {
				this.formData.content = '';
				// #ifdef MP-WEIXIN
					if(params.contentType == 1){
						uni.pageScrollTo({
							scrollTop: 99999,
							duration: 0, //小程序如果有滚动效果 input的焦点也会随着页面滚动...
						});
					}else{
						setTimeout(()=>{
							uni.pageScrollTo({
								scrollTop: 99999,
								duration: 0, //小程序如果有滚动效果 input的焦点也会随着页面滚动...
							});
						},150)
					}
				// #endif
					
				// #ifndef MP-WEIXIN
					uni.pageScrollTo({
						scrollTop: 99999,
						duration: 100
					});
				// #endif
				
				if(this.showFunBtn){
					this.showFunBtn = false;
				}
				
				// #ifdef MP-WEIXIN 
				if (params.contentType == 1) {
					this.mpInputMargin = true;
				} 
				// #endif
				//h5浏览器并没有很好的办法控制键盘一直处于唤起状态 而且会有样式性的问题
				// #ifdef H5
				uni.hideKeyboard();
				// #endif
			});
		},
		//用户触摸屏幕的时候隐藏键盘
		touchstart() {
			uni.hideKeyboard();
		},
		// userid 用户id
		linkToBusinessCard(userId) {
			this.$u.route({
				url: '',
				params: {
					userId
				}
			});
		},
	
		//关闭动画
		closeAnmition() {
			const hasBeenSentId = this.Audio.hasBeenSentId;
			const item = this.messageList.find(it => it.hasBeenSentId == hasBeenSentId);
			item.anmitionPlay = false;
		},
		//点击宫格时触发
		clickGrid(index){
			if(index == 0){
				this.chooseImage(['album'])
			}else if(index == 1){
				this.chooseImage(['camera'])
			}
		},
		//发送图片
		chooseImage(sourceType){
			uni.chooseImage({
				sourceType,
				sizeType:['compressed'], 
				success:res=>{ 
					this.showFunBtn = false;
					for(let i = 0;i<res.tempFilePaths.length;i++){
						const params = {
							contentType: 3,
							content: res.tempFilePaths[i],
						};
						this.sendMsg(params)
					}
				}
			})
		},
		//查看大图
		viewImg(imgList){
			uni.previewImage({
				urls: imgList,
				// #ifndef MP-WEIXIN
				indicator: 'number'
				// #endif
			});
		},
	},
	onPageScroll(e) {
		if (e.scrollTop < 50) {
			this.joinData();
		}
	},
	// onNavigationBarButtonTap() {
	// 	console.log("点击了自定义按钮");
	// 	uni.navigateTo({
	// 		url:'../chatList/chatList'
	// 	})
	// 		// this.$u.route({
	// 		// 	type: 'switchTab',
	// 		// 	url: 'pages/chatList/chatList'
	// 		// });
		
	// },
	//返回按钮事件
	// onBackPress(e) {
	// 	//以下内容对h5不生效
	// 	//--所以如果用浏览器自带的返回按钮进行返回的时候页面不会重定向 正在寻找合适的解决方案
	// 	console.log("点击了自定义按钮");
	// 	uni.navigateBack({
			
	// 	})
	// 	return true;
	// },
	onLoad(info) {
		// { messageId,fromUserName,fromUserHeadImg } = info
		const userInfo = this.firendList.filter(item => item.userId == info.fromUserId)[0];
		this.fromUserInfo = {
			fromUserName: userInfo.userName,
			fromUserHeadImg: userInfo.headImg,
			fromUserId: userInfo.userId,
			messageId: info.messageId
		};

		
	},
	onReady() {
		//自定义返回按钮 因为原生的返回按钮不可阻止默认事件
		// // #ifdef H5
		// const icon = document.getElementsByClassName('uni-page-head-btn')[0];
		// icon.style.display = 'none';
		// // #endif

		uni.setNavigationBarTitle({
			title: this.fromUserInfo.fromUserName
		});
		this.joinData();
		uni.getSystemInfo({
			success: res => {
				this.imgHeight = res.windowHeight + 'px';
			}
		});
		
		uni.onKeyboardHeightChange(res => {
			if (res.height == 0) {
				// #ifdef MP-WEIXIN
				this.mpInputMargin = false;
				// #endif
			}else{
				this.showFunBtn = false;
			}
		});
	}
};
</script>

<style lang="scss" scoped>
 @import './index.scss'
</style>
