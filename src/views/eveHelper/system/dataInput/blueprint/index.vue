<template>
	<div>

				<div style="margin:12px">录入蓝图</div>
		<div>
			<el-input type="textarea"  @keyup.enter.native="keyboardEvent" @change="dataChange" v-model="blueprintData" :rows="20" style="width:500px"/>
			<div style="display: inline-block">
				<el-table :data="blueprintList" style="width: 100%">
					<el-table-column prop="picture" width="64">
						<template slot-scope="scope">
							<img :src="scope.row.picture" style="height:32px;width:32px" :onerror="errorImg"/>
						</template>
					</el-table-column>
					<el-table-column prop="blueprint_name" label="蓝图名称" width="350"/>
					<el-table-column prop="operate_type" label="操作" width="50"/>
				</el-table>
			</div>
		</div>
		<div>
			<el-button @click="blueprintInput(blueprintData)">录入</el-button>
		</div>

		<el-dialog :title="title" :visible.sync="open" :close-on-click-modal ="false" width="500px" append-to-body>
			<p>{{newMaterialName}}</p>
			<el-select v-model="newMaterialType" >
				<el-option value="矿物">矿物</el-option>
				<el-option value="行星材料">行星材料</el-option>
				<el-option value="反应材料">反应材料</el-option>
				<el-option value="组件">组件</el-option>
				<el-option value="物品">物品</el-option>
				<el-option value="打捞件">打捞件</el-option>
				<el-option value="冰矿物">冰矿物</el-option>
				<el-option value="材料">材料</el-option>
			</el-select>
			<el-button @click="nameNewMaterialType()">确定</el-button>
		</el-dialog>

	</div>
</template>

<script>
    import { blueprintInput,checkBlueprint,addNewMaterialItem,getBlueprintOperate } from "@/api/public/industry/blueprint.js";
export default {
  data() {
    return {
        errorImg:"this.src='"+require('@/assets/images/question_32.jpg')+"'",
        url:process.env.VUE_APP_BASE_API+"/profile/eve/Invasion_1.0_Types/Types/",
        blueprintData:"",
		blueprintName:"",
		beforeData:"",
        title:"",
        open:false,
		newMaterialName:"",
		newMaterialType:"矿物",
		checkReset:false,
		blueprintList:[],
		repeat:false,
        exits:false,
    };
  },
	created(){
        this.startInterval();
	},
  methods: {
      async checkBlueprint(name){
          await checkBlueprint(name).then(async res=>{
              this.blueprintName = res.data.blueprintName;
              this.repeat = res.data.repeat;
              if(res.data.repeat){
                  await this.$confirm('蓝图已存在是否覆盖', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
				  }).then(async () => {
					  this.checkReset = true;
				  }).catch(() => {});
			  }
			  this.exits=res.data.exits;
		  })
	  },
      async blueprintInput(data) {
          let editedData = ""
          let blueprint_name = "";
          let product_name = "";
          data = data.replaceAll("\n", "回车符").replaceAll("\t"," ");
          let firstLine = data.split("回车符")[0];
          let index = firstLine.split("每流程时间");
          for(let i=0;i<index.length;i++){
              if(index[i]===""||index[i]===undefined){
                  index.splice(i,1);
			  }
		  }
          if(index.length>1){
              blueprint_name = index[0];
              editedData = data;
              await this.checkBlueprint(blueprint_name);
		  }else{
              product_name = data.split("回车符")[1].split(" x ")[1];
              await this.checkBlueprint(product_name);
              if(this.blueprintName!==null&&this.exits){
                  editedData = this.blueprintName+" "+data;
              }else{
                  editedData = "*** "+data;
              }
		  }

		  //重复并且确认覆盖    不重复
          if((this.checkReset&&this.repeat)||!this.repeat){
              await blueprintInput(editedData).then(res => {
				  if (res.data) {
					  this.title = res.msg;
					  this.open = true;
					  this.newMaterialName = res.data;
				  } else {
                      this.repeat = false;
					  this.blueprintName = "";
					  this.checkReset = false;
					  this.blueprintData = "";
					  this.getBlueprintOperate();
					  if(this.exits){
						  this.exits = false;
						  this.$message({type: 'success', message: res.msg});
					  }else
						  this.$message({type: 'success', message: "没有找到蓝图，但信息已缓存"});
				  }
              })
          }
      },
      async nameNewMaterialType(){
          let newMaterialType,newMaterialName
          newMaterialType = this.newMaterialType;
          newMaterialName = this.newMaterialName;
          await addNewMaterialItem(newMaterialName,newMaterialType).then(res=>{
              if(res.code===200){
                  this.open = false;
				  this.blueprintInput(this.blueprintData);
			  }

		  })
	  },
      async getBlueprintOperate(){
          await getBlueprintOperate().then(res=>{
              let bluePrintList = [];
              res.data.forEach(item=>{
                  let blueprint = {};
                  blueprint.blueprint_name =item.blueprint_name;
                  blueprint.operate_type = item.operate_type;
                  blueprint.picture = this.url+item.blueprint_type_id+"_32.png";
                  bluePrintList.push(blueprint);
			  })
			  this.blueprintList = bluePrintList;
		  })
	  },
	  dataChange(){
		if(this.beforeData===""){
			this.beforeData=this.blueprintData;
		}else{
		    if(this.blueprintData.split("每流程时间").length>2){
                this.blueprintData = this.beforeData;
			}
		}
	  },
      async startInterval(){
          await this.getBlueprintOperate();
          // this.interval = setInterval(async ()=>{
          //     await this.getBlueprintOperate();
          // },2000);
	  },
      keyboardEvent(){
          this.getBlueprintOperate();
          this.blueprintInput(this.blueprintData)
	  }
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

