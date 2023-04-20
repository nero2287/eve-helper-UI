<template>
  <div class="app-container">
    <common />
    <div class="app-box">
      <div class="app-left">
        <div>111</div>
        <div>111</div>
        <div>111</div>
        <div>111</div>
      </div>
      <div id="item-box" class="app-right">
        <div class="right-top">222</div>
        <div class="right-item-container">
          <div @click="developDiv">

          </div>
          <div>33</div>
          <div>33</div>
          <div>33</div>
          <div>33</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "@/views/external/common/common.vue";
export default {
  data() {
    return {
      leftList: [
        {
          aa: "",
          ab: "",
        },
      ],
      var_item_box:"",
    };
  },
  components: { common },
  methods:{
    developDiv(){
      let item_box = document.getElementById("item-box");
      let fatherDiv = document.createElement("div");
      let img = document.createElement("img");
      let sonDiv = document.createElement("div");
      sonDiv.setAttribute("class","right-item-container");
      let itemImg = document.createElement("img");
      let itemDiv = document.createElement("div");
      sonDiv.append(sonDiv);
      sonDiv.append(itemDiv);
      fatherDiv.append(img);
      fatherDiv.append(sonDiv);
      this.var_item_box = item_box.innerText;
    }
  },
};
</script>

<style lang="less" scoped>
.app-box {
  display: flex;
  .app-left {
    width: 200px;
    height: 400px;
    border: 1px solid #f00;
  }
  .app-right {
    width: 600px;
    height: 400px;
    border: 1px solid #0f0;
    margin-left: 10px;
    .right-top {
      width: 100px;
      height: 100px;
      border: 1px solid #f00;
      margin: 10px auto;
    }
    .right-item-container {
      margin-top: 40px;
      display: flex;
      justify-content: center;

      div {
        display: flex;
        justify-content: center;
        width: 80px;
        height: 80px;
        border: 1px solid #f00;
        margin: 0 10px;
      }
    }
  }
}
</style>