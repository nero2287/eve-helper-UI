<template>
  <div>
    <el-form>
      <el-form-item>
        <span style="margin:0 12px">物品数据:</span>
        <el-button @click="cacheUniverseTypeInfo('serenity')" :disabled="executing">获取国服物品数据</el-button>
        <el-button @click="cacheUniverseTypeInfo('tranquility')" :disabled="executing">获取欧服物品数据</el-button>
       </el-form-item>
      <el-form-item>
        <span style="margin:0 12px">市场分类:</span>
        <el-button @click="cacheMarketGroups('serenity')" :disabled="executing">获取国服市场分类数据 </el-button>
        <el-button @click="cacheMarketGroups('tranquility')" :disabled="executing">获取欧服市场分类数据</el-button>
      </el-form-item>
      <el-form-item>
        <span style="margin:0 12px">星系信息:</span>
        <el-button @click="cacheUniverseSystemInfo('serenity')" :disabled="executing">获取国服星系信息</el-button>
        <el-button @click="cacheUniverseSystemInfo('tranquility')" :disabled="executing">获取欧服星系信息</el-button>
      </el-form-item>
      <el-form-item>
        <span style="margin:0 12px">空间站信息:</span>
        <el-button @click="cacheUniverseStationInfo('serenity')" :disabled="executing">获取国服所有星系NPC空间站</el-button>
        <el-button @click="cacheUniverseStationInfo('tranquility')" :disabled="executing">获取欧服所有星系NPC空间站</el-button>
      </el-form-item>
      <el-form-item>
        <span style="margin:0 12px">物品分类:</span>
        <el-button @click="cacheUniverseTypeGroupInfo('serenity')" :disabled="executing">获取国服物品分类</el-button>
        <el-button @click="cacheUniverseTypeGroupInfo('tranquility')" :disabled="executing">获取欧服物品分类</el-button>
      </el-form-item>
      <el-form-item>
        <span style="margin:0 12px">加载蓝图</span>
        <div>
          物品分类id<el-input style="width:120px" v-model="universeGroupId" />蓝图分类id<el-input style="width:120px" v-model="blueprintGroupId" /> <el-button @click="typeIdLoading()">加载</el-button>
        </div>
      </el-form-item>
    </el-form>


    <el-dialog :title="title" :visible.sync="open" :show-close="false" :close-on-click-modal ="false"  width="500px" append-to-body>
      <p>正在从接口获取数据.....</p>
      <p>整个过程可能持续3-10分钟，为保证顺利完成，请耐心等待.</p>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="progress" :status="progress_static"></el-progress>
      <el-button @click="close()" v-if="!executing">完成</el-button>
    </el-dialog>
  </div>

</template>

<script>
  import { cacheSerenityMarketGroups,cacheTranquilityMarketGroups,checkCacheProgress } from "@/api/public/market/market.js";
  import {
    cacheSerenityUniverseTypeInfo,
    cacheTranquilityUniverseTypeInfo,
    checkThreadTempData,
    cacheSerenityUniverseSystemInfo,
    cacheTranquilityUniverseSystemInfo,
    cacheSerenityStationInfo,
    cacheTranquilityStationInfo,
    cacheSerenityUniverseGroupInfo,
    cacheTranquilityUniverseGroupInfo,
    blueprintCheck
  } from "@/api/public/universe/universe.js";
export default {
  data() {
    return {
      // 版本号
      version: "3.7.0",
      executing:false,
      title:"系统提示",
      open:false,
      interval:"",
      tick:10,
      progress:0,
      progress_static:"exception",
      progress_ready:100,
      universeGroupId:0,
      blueprintGroupId:0,
    };
  },
  methods: {
    cacheUniverseStationInfo(dataSource){
      this.$confirm('确定更新空间站信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.progress = 0;
        this.executing =true;
        this.open = true;
        switch (dataSource) {
          case "serenity":
            cacheSerenityStationInfo().then(res=>{
              if(res.msg.indexOf('成功')===-1){
                this.$message({ type: 'error', message: res.msg });
                this.closeInterval();
                this.open = false;
              }
            });
            break;
          case "tranquility":
            cacheTranquilityStationInfo().then(res=>{
              if(res.msg.indexOf('成功')===-1){
                this.$message({ type: 'error', message: res.msg });
                this.closeInterval();
                this.open = false;
              }
            });
            break;
        }
        this.startInterval('type');
      }).catch(() => {});

    },
    cacheUniverseSystemInfo(dataSource){
      this.$confirm('确定需要更新星系信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.progress = 0;
        this.executing =true;
        this.open = true;
        switch (dataSource) {
          case "serenity":
            cacheSerenityUniverseSystemInfo().then(res=>{
              if(res.msg.indexOf('成功')===-1){
                this.$message({ type: 'error', message: res.msg });
                this.closeInterval();
                this.open = false;
              }
            });
            break;
          case "tranquility":
            cacheTranquilityUniverseSystemInfo().then(res=>{
              if(res.msg.indexOf('成功')===-1){
                this.$message({ type: 'error', message: res.msg });
                this.closeInterval();
                this.open = false;
              }
            });
            break;
        }
        this.startInterval('type');
      }).catch(() => {});
    },

    cacheUniverseTypeInfo(dataSource){
      this.$confirm('确定更新所有物品信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.progress = 0;
        this.executing =true;
        this.open = true;
        switch (dataSource) {
          case "serenity":
            cacheSerenityUniverseTypeInfo().then(res=>{
              if(res.msg.indexOf('成功')===-1){
                this.$message({ type: 'error', message: res.msg });
                this.closeInterval();
                this.open = false;
              }
            });
            this.tick = 8;
            break;
          case "tranquility":
            cacheTranquilityUniverseTypeInfo().then(res=>{
              if(res.msg.indexOf('成功')===-1){
                this.$message({ type: 'error', message: res.msg });
                this.closeInterval();
                this.open = false;
              }
            });
            this.tick = 15;
            break;
        }
        this.startInterval('type');
      }).catch(() => {});
    },
    cacheMarketGroups(dataSource){
      this.$confirm('确定需要更新市场分类信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.progress = 0;
        this.executing =true;
        this.open = true;
        switch (dataSource) {
          case "serenity":
            cacheSerenityMarketGroups().then(res=>{
              if(res.msg.indexOf('成功')===-1){
                this.$message({ type: 'error', message: res.msg });
                this.closeInterval();
                this.open = false;
              }
            });
            break;
          case "tranquility":
            cacheTranquilityMarketGroups().then(res=>{
              if(res.msg.indexOf('成功')===-1){
                this.$message({ type: 'error', message: res.msg });
                this.closeInterval();
                this.open = false;
              }
            });
            break;
        }
        this.startInterval('group');
      }).catch(() => {});
    },
    cacheUniverseTypeGroupInfo(dataSource){
      this.$confirm('确定需要更新物品分类信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.progress = 0;
        this.executing =true;
        this.open = true;
        switch (dataSource) {
          case "serenity":
            cacheSerenityUniverseGroupInfo().then(res => {
              if (res.msg.indexOf('成功') === -1) {
                this.$message({type: 'error', message: res.msg});
                this.closeInterval();
                this.open = false;
              }
            });
            break;
          case "tranquility":
            cacheTranquilityUniverseGroupInfo().then(res => {
              if (res.msg.indexOf('成功') === -1) {
                this.$message({type: 'error', message: res.msg});
                this.closeInterval();
                this.open = false;
              }
            });
            break;
        }
        this.startInterval('type');
      }).catch(() => {});
    },


    async checkProgress(type){
      switch (type) {
        case "type":
          await checkThreadTempData().then(res => {
            this.progress_ready = res.data;
          })
          break;
        case "group":
          await checkCacheProgress().then(res => {
            this.progress_ready = res.data;
          })
          break;
      }
    },
    startInterval(type){
      let num = 20;
      this.interval = setInterval( async()=>{
        num = this.progress;
        await this.checkProgress(type);
        console.log("progress_ready:"+this.progress_ready);
        console.log("is ready:"+this.progress_ready===0);
        if(this.progress_ready===0){
          this.progress =100;
        }
        if(this.progress<100){
          let num = Math.floor(Math.random()*10);
          let progress = this.progress + num;
          if(progress<100){
            this.progress = progress;
          }
        }else{
          this.closeInterval();
        }
      },1000*num)
    },
    closeInterval(){
      clearInterval(this.interval);
      this.executing =false;
      console.log("获取结束");
    },
    close(){
      this.executing =false;
      this.open = false;
    },

    typeIdLoading(){
      blueprintCheck(this.universeGroupId,this.blueprintGroupId).then((res)=>{
        this.$message({type: 'success', message: res.msg});
      })
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

