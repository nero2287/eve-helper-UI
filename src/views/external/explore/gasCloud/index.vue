<template>
  <div>
      <common />
      <div>
          <h1>气云地点</h1>
          <el-table v-loading="loading" :data="battleLevel1">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="安等" align="center" prop="security"/>
              <el-table-column label="种族" align="center" prop="race"/>
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
        battleLevel1:[{'name':'示例','security':'示例'},{'name':'示例','security':'示例'},{'name':'示例','security':'示例'},{'name':'示例','security':'示例'},{'name':'示例','security':'示例'},{'name':'示例','security':'示例'}],

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
