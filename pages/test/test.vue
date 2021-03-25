
<template>
	<view>
		<view style="overflow: hidden;">
		<canvas style="width: 100%; height: 220px;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onReady(e) {
			var context=uni.createCanvasContext("firstCanvas");
			context.arc(187.5,-396,600,1.26,1.88,false);
			context.closePath()
			context.stroke()
      context.strokeStyle = "#ff0004";
			context.setFillStyle("#ff0004")
			context.draw()
			context.fill()
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
