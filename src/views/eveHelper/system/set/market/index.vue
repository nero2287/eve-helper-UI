<template>
  <div class="app-container home">
    <el-button @click="cacheContract('serenity')" :disabled="executing">更新国服合同信息</el-button>
    <el-button @click="cacheContract('tranquility')" :disabled="executing">更新欧服合同信息</el-button>

    <el-dialog :title="title" :visible.sync="open" :show-close="false" :close-on-click-modal ="false"  width="500px" append-to-body>
      <p>正在从接口获取数据.....</p>
      <p>整个过程可能持续3-10分钟，为保证顺利完成，请耐心等待.</p>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="progress" :status="progress_static"></el-progress>
      <el-button @click="close()" v-if="!executing">完成</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {cacheContractData,checkContractDataProgress} from "@/api/public/contract/contract.js";

export default {
  name: "Index",
  data() {
    return {
      executing:false,
      title:"系统提示",
      open:false,
      interval:"",
      tick:10,
      progress:0,
      progress_static:"exception",
      progress_ready:100,
    };
  },
  methods: {
    cacheContract(type){
      this.$confirm('确定是否重新更新合同信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.executing =true;
        this.open = true;
        this.progress = 0;
        cacheContractData(type).then(res=>{
          if(res.msg.indexOf('成功')===-1){
            this.$message({ type: 'error', message: res.msg });
            this.closeInterval();
            this.open = false;
          }else{
            this.startInterval();
          }
        });
      }).catch(() => {});
    },
    startInterval(){
      let num = 20;
      this.interval = setInterval(async ()=>{
        num = this.progress;
        await this.checkProgress();
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
    async checkProgress(){
      await checkContractDataProgress().then(res => {
        this.progress_ready = res.data;
      })
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
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>

