<template>
  <view class="container">
    <view class="ui-all">
      <view class="avatar bg-white" style="border-radius: 20rpx 20rpx 0 0" @tap="avatarChoose">
        <view class="imgAvatar">
          <view class="iavatar" :style="'background: url(' + avater + ') no-repeat center/cover #eeeeee;'"></view>
        </view>
        <text v-if="avater">修改头像</text>
        <text v-if="!avater">授权微信</text>
        <button v-if="!avater" open-type="getUserInfo" @getuserinfo="getUserInfo" class="getInfo"></button>
      </view>
      <view class="ui-list bg-white cu-bar">
        <text class="action">昵称</text>
        <input type="text" :placeholder="value" :value="nickName" @input="bindnickName" placeholder-class="place" class="bun" />
      </view>
      <view class="ui-list bg-white cu-bar">
        <text class="action">手机号</text>
        <input v-if="mobile" type="tel" :placeholder="value" :value="mobile" @input="bindmobile" placeholder-class="place" />
        <button v-if="!mobile" open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="getInfo bun">授权手机号</button>
      </view>
      <view class="ui-list right bg-white cu-bar">
        <text class="action">性别</text>
        <picker @change="bindPickerChange" mode="selector" range-key="name" :value="index" :range="sex">
          <view class="picker">
            {{ sex[index].name }}
          </view>
        </picker>
      </view>
      <view class="ui-list right bg-white cu-bar">
        <text class="action">城市</text>
        <picker @change="bindRegionChange" mode="region">
          <view class="picker"> {{ region[0] }} {{ region[1] }} {{ region[2] }} </view>
        </picker>
      </view>
      <view class="ui-list bg-white cu-bar">
        <text class="action">地址</text>
        <input type="text" :placeholder="value" :value="nickAdd" @input="bindnickAdd" placeholder-class="place" class="bun" />
      </view>
      <view class="ui-list right bg-white cu-bar">
        <text class="action">生日</text>
        <picker mode="date" :value="date" @change="bindDateChange">
          <view class="picker">
            {{ date }}
          </view>
        </picker>
      </view>
      <view class="ui-list bg-white cu-bar" style="align-items: flex-start">
        <view class="action">
          <text>签名</text>
        </view>
      </view>
      <view class="ui-list bg-white" style="align-items: flex-start; border-radius: 0 0 20rpx 20rpx">
        <textarea :placeholder="value" placeholder-class="place" :value="description" @input="binddescription"></textarea>
      </view>

      <button class="cu-btn block bg-blue lg save" @tap="showModal">保 存 修 改</button>

      <!--模态提示框-->
      <view :class="['cu-modal', modalName == 'Modal' ? 'show' : '']">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl" style="padding-bottom: 80rpx; padding-top: 20rpx"> 保存成功! </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "请填写",
      sex: [
        {
          id: 1,
          name: "男",
        },
        {
          id: 2,
          name: "女",
        },
      ],
      index: 0,
      region: ["北京", "北京市", "东城区"],
      date: "2000-00-00",
      avater: "",
      description: "",
      url: "",
      nickName: "",
      nickAdd: "",
      mobile: "",
      headimg: "",
      modalName: "hide",
    };
  },
  methods: {
    showModal() {
      this.modalName = "Modal";
    },
    hideModal() {
      this.modalName = "hide";
      // uni.switchTab({
      // 	url:"/pages/home/main"
      // })
      if (window.history.length <= 1) {
        this.$router.push({ path: "/pages/home/main" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    bindPickerChange(e) {
      this.index = e.detail.value;
    },
    bindRegionChange(e) {
      this.region = e.detail.value;
    },
    bindDateChange(e) {
      this.date = e.detail.value;
    },
    bindnickName(e) {
      this.nickName = e.detail.value;
    },
    bindnickAdd(e) {
      this.nickAdd = e.detail.value;
    },
    bindmobile(e) {
      this.mobile = e.detail.value;
    },
    binddescription(e) {
      this.description = e.detail.value;
    },
    avatarChoose() {
      let that = this;
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          that.imgUpload(res.tempFilePaths);
          const tempFilePaths = res.tempFilePaths;
        },
      });
    },
    getUserInfo(e) {
      if (e.detail.iv) {
        console.log(e.detail.iv); //传后台解密换取用户信息
        uni.showToast({
          title: "已授权",
          icon: "none",
          duration: 2000,
        });
      }
    },
    getphonenumber(e) {
      if (e.detail.iv) {
        console.log(e.detail.iv); //传后台解密换取手机号
        uni.showToast({
          title: "已授权",
          icon: "none",
          duration: 2000,
        });
      }
    },
    savaInfo() {
      let that = this;
      let nickname = that.nickName;
      let headimg = that.headimg;
      let gender = that.index + 1;
      let mobile = that.mobile;
      let region = that.region;
      let birthday = that.date;
      let description = that.description;
      let updata = {};
      if (!nickname) {
        uni.showToast({
          title: "请填写昵称",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      updata.nickname = nickname;
      if (!headimg) {
        headimg = that.avater;
      }
      updata.headimg = headimg;
      updata.gender = gender;
      if (that.isPoneAvailable(mobile)) {
        updata.mobile = mobile;
      } else {
        uni.showToast({
          title: "手机号码有误，请重填",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (region.length == 1) {
        uni.showToast({
          title: "请选择常住地",
          icon: "none",
          duration: 2000,
        });
        return;
      } else {
        updata.province = region[0];
        updata.city = region[1];
        updata.area = region[2];
      }
      if (birthday == "0000-00-00") {
        uni.showToast({
          title: "请选择生日",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      updata.birthday = birthday;
      updata.description = description;
      that.updata(updata);
    },
    isPoneAvailable(poneInput) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(poneInput)) {
        return false;
      } else {
        return true;
      }
    },
    async updata(datas) {
      //传后台
    },
    imgUpload(file) {
      let that = this;
      uni.uploadFile({
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        url: "/api/upload/image", //需传后台图片上传接口
        filePath: file[0],
        name: "file",
        formData: {
          type: "user_headimg",
        },
        success: function (res) {
          var data = JSON.parse(res.data);
          data = data.data;
          that.avater = that.url + data.img;

          that.headimg = that.url + data.img;
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
  },
  onLoad() {},
};
</script>

<style>
.container {
  display: block;
}

.ui-all {
  padding: 20rpx 40rpx;
}

.avatar {
  width: 100%;
  text-align: left;
  padding: 20rpx 0rpx 20rpx 40rpx;
  position: relative;
}

.avatar .imgAvatar {
  width: 140rpx;
  height: 140rpx;

  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}

.avatar .iavatar {
  width: 100%;
  height: 100%;
  display: block;
}

.avatar text {
  display: inline-block;
  vertical-align: middle;
  color: #8e8e93;
  font-size: 28rpx;
  margin-left: 40rpx;
}

.avatar:after {
  content: " ";
  width: 20rpx;
  height: 20rpx;
  border-top: solid 1px #030303;
  border-right: solid 1px #030303;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  /* IE 9 */
  -moz-transform: rotate(45deg);
  /* Firefox */
  -webkit-transform: rotate(45deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(45deg);
  position: absolute;
  top: 85rpx;
  right: 40rpx;
}
.bun {
  position: absolute;
  left: 150rpx;
  color: #4a4a4a;
  line-height: 40rpx;
}
.ui-list {
  width: 100%;
  text-align: left;
  padding: 20rpx 0;
  position: relative;
}

.ui-list text {
  color: #4a4a4a;
  font-size: 30rpx;
  display: inline-block;
  vertical-align: middle;
  min-width: 150rpx;
}

input {
  color: #4a4a4a;
  font-size: 30rpx;
  display: inline-block;
  vertical-align: middle;
}

button {
  color: #4a4a4a;
  font-size: 30rpx;
  display: inline-block;
  vertical-align: middle;
  background: none;
  margin: 0;
  padding: 0;
}

button::after {
  display: none;
}

picker {
  width: 90%;
  color: #4a4a4a;
  font-size: 30rpx;
  margin: auto 0;
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  /* top: 18rpx; */
  left: 150rpx;
}

textarea {
  color: #030303;
  font-size: 30rpx;
  vertical-align: middle;
  height: 150rpx;
  width: 100%;
  margin: 0rpx 30rpx;
}

.place {
  color: #4a4a4a;
  font-size: 30rpx;
}

.right:after {
  content: " ";
  width: 20rpx;
  height: 20rpx;
  border-top: solid 1px #030303;
  border-right: solid 1px #030303;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  /* IE 9 */
  -moz-transform: rotate(45deg);
  /* Firefox */
  -webkit-transform: rotate(45deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(45deg);
  position: absolute;
  top: 30rpx;
  right: 40rpx;
}
.save {
  background: #177fff;
  border: none;
  color: #ffffff;
  margin-top: 40rpx;
}
.cu-bar1 {
  display: flex;
  position: relative;
  align-items: center;
  min-height: 100rpx;
  justify-content: space-between;
}

.cu-bar1 > button {
  /* 		position: absolute;
		left: 150rpx; */
}
</style>
