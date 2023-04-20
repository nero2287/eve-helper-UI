<template>
  <div>
      <common />
      <div style="text-align: center">
          <h1>异常空间</h1>
          <div>
              <span>天蛇集团</span>
              <span>天使集团</span>
              <span>血袭者同盟</span>
              <span>古斯塔斯</span>
              <span>萨沙集团</span>
              <span>自由无人机</span>
              <span>三神裔</span>
          </div>
      </div>
      <div>
          <h2>天蛇集团</h2>
          <el-table v-loading="loading" :data="serpentisList">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
              <el-table-column label="远征" align="center" prop="expedition"/>
              <el-table-column label="安等" align="center" prop="security"/>
          </el-table>
      </div>
      <div>
          <h2>天使集团</h2>
          <el-table v-loading="loading" :data="angelCartelList">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
              <el-table-column label="远征" align="center" prop="expedition"/>
              <el-table-column label="安等" align="center" prop="security"/>
          </el-table>
      </div>
      <div>
          <h2>萨沙集团</h2>
          <el-table v-loading="loading" :data="SanshaList">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
              <el-table-column label="远征" align="center" prop="expedition"/>
              <el-table-column label="安等" align="center" prop="security"/>
          </el-table>
      </div>
      <div>
          <h2>古斯塔斯</h2>
          <el-table v-loading="loading" :data="guristasList">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
              <el-table-column label="远征" align="center" prop="expedition"/>
              <el-table-column label="安等" align="center" prop="security"/>
          </el-table>
      </div>
      <div>
          <h2>血袭者同盟</h2>
          <el-table v-loading="loading" :data="bloodRaiderList">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
              <el-table-column label="远征" align="center" prop="expedition"/>
              <el-table-column label="安等" align="center" prop="security"/>
          </el-table>
      </div>
      <div>
          <h2>自由无人机</h2>
          <el-table v-loading="loading" :data="rogueDroneList">
              <el-table-column label="名称" align="center" prop="name"/>
              <el-table-column label="DED" align="center" prop="DED"/>
              <el-table-column label="远征" align="center" prop="expedition"/>
              <el-table-column label="安等" align="center" prop="security"/>
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
        serpentisList:[{'name':'天蛇隐蔽处','DED':'无','expedition':'3/10','security':'高安'}],
        angelCartelList:[{'name':'天使隐蔽处','DED':'无','expedition':'3/10','security':'高安'}],
        SanshaList:[{'name':'萨沙隐蔽处','DED':'无','expedition':'3/10','security':'高安'}],
        guristasList:[{'name':'古斯塔斯隐蔽处','DED':'无','expedition':'3/10','security':'高安'}],
        bloodRaiderList:[{'name':'血袭者隐蔽处','DED':'无','expedition':'3/10','security':'高安'}],
        rogueDroneList:[{'name':'无人机群','DED':'无','expedition':'3/10','security':'高安'}]
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
