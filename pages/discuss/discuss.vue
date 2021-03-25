<template>
	<view>
		<Discuss
		  :commentList="commentList"
		  @clickPraise="clickPraiseComment"
		  @clickDelete="clickDeleteComment"
		  @clickDeleteChild="clickDeleteCommentChild"
		  @clickRecommentChild="clickRecommentChild"
			@clickRecomment="clickRecomment"
		></Discuss>
	</view>
</template>

<script>
	import Discuss from '../../components/five-mul-commentlist/five-mul-commentlist.vue'
	
	export default {
		components:{
			Discuss
		},
		data() {
			return {
				commentList:[{
					// 前端样式测试用例
						"COMMENT_TIME": "2020-11-19 20：20",//创建时间
						"FIRSTNICKNAME": "网友1",//楼主
						"IS_PRAISE": null,//我是否点赞
						"COMMENT": "网友一说jsifjdaiofjsidf",//楼主的话
						"PRAISE_NUM": 0,//点赞量
						"CANDELETE": 0,
						"HEADIMGURL": "https://yun.515code.com/blog/background-image/Bahamas%20Aerial.jpg",//楼主头像
						"PARENTID": "",
						"SECONDNICKNAME": null,
						"CHILD_ANWSER_LIST": [{//回复列表
							"COMMENT_TIME": "2020-11-19 20：50",
							"FIRSTNICKNAME": "网友2",
							"IS_PRAISE": null,
							"COMMENT": "网友二说hfdshaohisadfasf",
							"PRAISE_NUM": 0,
							"CANDELETE": 1,
							"HEADIMGURL": "https://yun.515code.com/blog/background-image/Abstract%204.jpg",
							"SECONDNICKNAME": "网友1"
						}]
					},{
					
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
					},{
					
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
					},{
					
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
		methods: {
			/**
			 * 点赞
			 * @param {Object} item
			 */
			
			clickPraiseComment(item) {//只能在前端改变，缺少后端的----------------------------
				if(item.IS_PRAISE==1){
					item.IS_PRAISE=0;
					item.PRAISE_NUM--;
					// console.log("0");
				}else{
					item.IS_PRAISE=1;
					item.PRAISE_NUM++;
					// console.log("1");
				}
			},
			/**
			 * 回复 评论
			 * @param {Object} item
			 */
			clickRecomment(item) {
				
			},
			/**
			 * 删除一级评论
			 * @param {Object} item
			 */
			clickDeleteComment(item) {
				
			},
			/**
			 * 删除二级评论
			 * @param {Object} item
			 */
			clickDeleteCommentChild(item) {
				
			},
			/**
			 * 回复评论的评论
			 * @param {Object} item
			 */
			clickRecommentChild(item) {
				
			}
			
			
		}
	}
</script>

<style>

</style>
