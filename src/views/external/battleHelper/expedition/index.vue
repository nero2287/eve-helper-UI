<template>
  <div>
      <common />
      <div>
          <h1>远征</h1>
          <div>
              <span>古斯塔斯</span>
              <span>萨沙</span>
              <span>天使</span>
              <span>天蛇</span>
              <span>自由无人机</span>
              <span>血袭者</span>
          </div>
      </div>
      <div>
          <h3>古斯塔斯</h3>
          <el-table v-loading="loading" :data="battleLevel1">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
          </el-table>
      </div>
      <div>
          <h3>萨沙</h3>
          <el-table v-loading="loading" :data="battleLevel1">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
          </el-table>
      </div>
      <div>
          <h3>天使</h3>
          <el-table v-loading="loading" :data="battleLevel1">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
          </el-table>
      </div>
      <div>
          <h3>天蛇</h3>
          <el-table v-loading="loading" :data="battleLevel1">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
          </el-table>
      </div>
      <div>
          <h3>自由无人机</h3>
          <el-table v-loading="loading" :data="battleLevel1">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
          </el-table>
      </div>
      <div>
          <h3>血袭者</h3>
          <el-table v-loading="loading" :data="battleLevel1">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
          </el-table>
      </div>
  </div>
</template>

<script>
import common from "@/views/external/common/common.vue";
export default {
    components: { common },
  data() {
    return {
        loading:false,
        battleLevel1:[{'name':'示例','DED':'示例'},{'name':'示例','DED':'示例'},{'name':'示例','DED':'示例'},{'name':'示例','DED':'示例'},{'name':'示例','DED':'示例'},{'name':'示例','DED':'示例'}],

    }
  },
  watch: {
  },
  created() {
  },
  methods: {
      handleCommand(command) {
          this.$message('click on item ' + command);
      },
      getUrl(type){
          if(type!=undefined&&type!=""){
              return require(`@/assets/public/images/${type}`);
          }else{
              return false;
          }
      },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .top-nav-container{
        display: flex;
        justify-content: space-around;
        height: 30px;
        nav-left-container{
            flex: 1;
            background: #f00;
            .nav-left-item{
                padding: 0 5px;
            }
        }
        nav-right-container{
            flex: 3;
            background: #00f;
            .nav-right-item{
                padding: 0 5px;
            }
        }
    }
    .menu-container{
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #000;
        color: #fff;
        .menu-item{
            flex: 1;
            text-align: center;
        }
    }
    .rotation{
        width: 1200px;
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .business-container{
        display: flex;
        justify-content: space-between;
        .business-item{
            flex: 1;
            margin: 10px 5px;
            border:1px solid #000;
            height: 200px;
            .item-name{
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
