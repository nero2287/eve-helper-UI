<template>
  <div>
    <div class="top-nav-container">
      <div class="nav-left-container">
        <span class="nav-item"><a href="http://localhost:81/">登录</a></span>
        <span class="nav-item"
          ><a href="http://localhost:81/home">主页</a></span
        >
        <span class="nav-item"
          ><a href="https://evepc.163.com/index.html" target="_blank"
            >国服官网</a
          ></span
        >
        <span class="nav-item"
          ><a href="https://evepc.163.com/index.html" target="_blank"
            >欧服官网</a
          ></span
        >
      </div>
      <div class="nav-right-container">
        <span class="nav-item"><a href="#">搜索</a></span>
        <span class="nav-item"><a href="#">切换账号</a></span>
        <span class="nav-item"><a href="#">退出</a></span>
      </div>
    </div>
    <div class="menu-container">
      <p class="menu-item">
        <el-dropdown @command="handleCommand" show-timeout="0">
          <span class="el-dropdown-link"
            >战斗助手<i class="el-icon-arrow-down el-icon--right"></i
          ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><a href="http://localhost:81/home/battle/abnormal"
                >异常空间</a
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><a href="http://localhost:81/home/battle/taskAgent"
                >任务代理</a
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><a href="http://localhost:81/home/battle/wormhole"
                >虫洞异常</a
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><a href="http://localhost:81/home/battle/expedition"
                >远征</a
              ></el-dropdown-item
            >
            <el-dropdown-item>转配中心</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>
      <p class="menu-item">
        <el-dropdown @command="handleCommand" show-timeout="0">
          <span class="el-dropdown-link">
            探索助手<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><a href="http://localhost:81/explore/ruinsAndData"
                >遗迹与数据</a
              ></el-dropdown-item
            >
            <el-dropdown-item command="b"
              ><a href="http://localhost:81/explore/gasCloud"
                >气云地点</a
              ></el-dropdown-item
            >
            <el-dropdown-item command="c"
              ><a href="http://localhost:81/explore/deadSpace"
                >战斗地点</a
              ></el-dropdown-item
            >
            <el-dropdown-item command="d"
              ><a href="http://localhost:81/explore/wormhole"
                >虫洞查询</a
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </p>
      <p class="menu-item">
        <el-dropdown @command="handleCommand" show-timeout="0">
          <span class="el-dropdown-link">
            商人助手<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><a href="http://localhost:81/trader/market"
                >市场查询</a
              ></el-dropdown-item
            >
            <el-dropdown-item command="b"
              ><a href="http://localhost:81/trader/contract"
                >合同查询</a
              ></el-dropdown-item
            >
            <el-dropdown-item command="c"
              ><a href="http://localhost:81/trader/blueprint"
                >蓝图查询</a
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </p>
      <p class="menu-item">
        <el-dropdown @command="handleCommand" show-timeout="0">
          <span class="el-dropdown-link">
            联盟助手<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">联盟管理</el-dropdown-item>
            <el-dropdown-item command="b">军团管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>
      <p class="menu-item">
        <el-dropdown @command="handleCommand" show-timeout="0">
          <span class="el-dropdown-link">
            其他工具<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">舰载扫描仪</el-dropdown-item>
            <el-dropdown-item command="a">合同估价</el-dropdown-item>
            <el-dropdown-item command="a">距离</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {},
  created() {},
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.top-nav-container {
  display: flex;
  justify-content: space-around;
  height: 30px;
  nav-left-container {
    flex: 1;
    background: #f00;
    .nav-left-item {
      padding: 0 5px;
    }
  }
  nav-right-container {
    flex: 3;
    background: #00f;
    .nav-right-item {
      padding: 0 5px;
    }
  }
}
.menu-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #000;
  color: #fff;
  .menu-item {
    flex: 1;
    text-align: center;
  }
}
.rotation {
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

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

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
