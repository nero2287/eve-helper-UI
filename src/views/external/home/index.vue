<template>
  <div>
    <common />
    <div class="block">
      <el-carousel height="300px" :interval="3500">
        <el-carousel-item v-for="(item, index) in picture" :key="index">
          <img :src="getUrl(item.url)" />
          <h3 class="small">{{ item.message }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="business-container">
      <div class="navigation business-item">
        <p class="item-name">物品查询</p>
        <el-form :model="form" label-width="80px" style="padding: 0 10px">
          <el-form-item label="输入框">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="extension business-item">
        <p class="item-name">合同查询</p>
      </div>
      <div class="tools business-item">
        <p class="item-name">击杀榜</p>
      </div>
      <div class="feet business-item">
        <p class="item-name">虫洞查询</p>
      </div>
    </div>
  </div>
</template>

<script>
  import common from "@/views/external/common/common.vue";
export default {
  components: { common },
  data() {
    return {
      form: {
        name: "张三",
      },
      picture: [
        {
          name: "图片一",
          url: "login-background.jpg",
          message: "这是第一张图",
        },
        { name: "图片二", url: "profile.jpg", message: "这是第二张图" },
        { name: "图片三", url: "2.png", message: "这是第三张图" },
        {
          name: "图片三",
          url: "61cac7914940eab2f3506b1fUDXTMjFi03.png",
          message: "这是第四张图",
        },
      ],
    };
  },
  watch: {},
  created() {},
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    getUrl(type) {
      if (type != undefined && type != "") {
        return require(`@/assets/public/images/${type}`);
      } else {
        return false;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
// .top-nav-container {
//   display: flex;
//   justify-content: space-around;
//   height: 30px;
//   nav-left-container {
//     flex: 1;
//     background: #f00;
//     .nav-left-item {
//       padding: 0 5px;
//     }
//   }
//   nav-right-container {
//     flex: 3;
//     background: #00f;
//     .nav-right-item {
//       padding: 0 5px;
//     }
//   }
// }
// .menu-container {
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   background: #000;
//   color: #fff;
//   .menu-item {
//     flex: 1;
//     text-align: center;
//   }
// }
// .rotation {
//   width: 1200px;
//   display: flex;
//   justify-content: center;
//   align-content: center;
// }

// .el-carousel__item h3 {
//   color: #475669;
//   font-size: 14px;
//   opacity: 0.75;
//   line-height: 150px;
//   margin: 0;
// }

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }

.business-container {
  display: flex;
  justify-content: space-between;
  .business-item {
    flex: 1;
    margin: 10px 5px;
    border: 1px solid #000;
    height: 200px;
    .item-name {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
