<template>
  <div>
    <common />
    <div class="max-container">
      <div class="left-container">
        <el-card class="box-card">
          <el-form>
            <el-form-item label="物品名称">
				  <el-input v-model="condition.itemName"/>
			</el-form-item>
			  <el-form-item>
				  <div>合同类型</div>
				  <el-select v-model="condition.contract_type" placeholder="请选择合同类型">
					  <el-option value=""></el-option>
					  <el-option value="sell" label="出售">出售</el-option>
					  <el-option value="buy" label="求购">求购</el-option>
					  <el-option value="auction" label="拍卖">拍卖</el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item>
				  <div>星域</div>
				  <el-select v-model="condition.region_id" placeholder="请选择星域" label-width="130px">
					  <el-option value="10000002" label="吉他" selected>吉他</el-option>
			  </el-select>
            </el-form-item>
            <el-button @click="searchContract()">搜索</el-button>
          </el-form>
        </el-card>
      </div>
      <div class="right-container">
        <el-card>
          <el-table :data="tableData" v-loading="loading" style="width: 100%">
			  <el-table-column prop="picture" width="64">
				  <template slot-scope="scope">
				  	<img :src="scope.row.picture" style="height:32px;width:32px" :onerror="errorImg"/>
				  </template>
			  </el-table-column>
			  <el-table-column prop="items" label="包含物品" width="350">
				  <template slot-scope="scope">
					  <span @click="nameClick(scope.row)" class="content_click">
						  <span class="contract_item_name">{{scope.row.items}}</span>
						  (
						  <span class="contract_auction" v-if="scope.row.sell_buy=='拍卖'">{{scope.row.sell_buy}}</span>
						  <span class="contract_sell" v-if="scope.row.sell_buy=='出售'||scope.row.sell_buy=='物品交换'">{{scope.row.sell_buy}}</span>
						  <span class="contract_buy" v-if="scope.row.sell_buy=='收购'">{{scope.row.sell_buy}}</span>
						  )
					  </span>
				  </template>
			  </el-table-column>
			  <el-table-column prop="price" label="合同价格" width="250">
				  <template slot-scope="scope">
					  <span class="contract_sell" v-if="scope.row.price_type=='reward'">{{scope.row.price}}</span>
					  <span class="contract_buy" v-if="scope.row.price_type=='price'">{{scope.row.price}}</span>
				  </template>
			  </el-table-column>
			  <el-table-column prop="type" label="合同类型"/>
			  <el-table-column prop="location" label="合同地点"/>
			  <el-table-column prop="location" label="到期时间"/>
			  <el-table-column prop="issuer" label="发布人"/>
			  <el-table-column prop="title" label="合同信息"/>
          </el-table>
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="1" layout="prev, pager, next, jumper" :total="total_page"/>
        </el-card>
      </div>
    </div>
    <el-dialog title="物品详情" :visible.sync="dialogOpen" width="50%">
	  <el-form>
			<el-form-item>
				<p>合同发起人： {{contractInfo.issuer}}</p>
				<p>合同地点： {{contractInfo.location}}</p>
				<p>发布时间： {{contractInfo.start_data}}</p>
				<p>剩余时间： {{contractInfo.end_data}}</p>
				<p>合同类型： {{contractInfo.type}}</p>
				<p>合同备注： {{contractInfo.title}}</p>
				<p>合同价格： <span v-if="contractInfo.price_type=='price'" class="contract_buy">{{contractInfo.price}}</span><span v-if="contractInfo.price_type=='reward'" class="contract_sell">{{contractInfo.price}}</span></p>
			</el-form-item>
	  </el-form>
      <el-card style="margin-top: 10px" v-if="sell_items.length>0">
		<div class="contract_sell">您将获得</div>
        <el-table :data="sell_items" style="width: 100%">
			<el-table-column prop="picture" width="64">
				<template slot-scope="scope">
					<img :src="scope.row.picture" style="height:32px;width:32px" :onerror="errorImg"/>
				</template>
			</el-table-column>
			<el-table-column prop="item_name" label="物品" width="350">
				<template slot-scope="scope">
					<div>{{scope.row.item_name}}</div>
					<div v-if="scope.row.is_blueprint_copy=='true'">
						<span>时间效率：{{scope.row.time_efficiency}}</span>
						<span style="margin-left: 12px">材料效率：{{scope.row.material_efficiency}}</span>
					</div>
				</template>
			</el-table-column>
          	<el-table-column prop="quantity" label="数量" width="80"/>
			<el-table-column prop="price" label="卖单价格" width="220"/>
			<el-table-column prop="price" label="买单价格"/>
        </el-table>
      </el-card>
		<el-card style="margin-top: 10px" v-if="buy_items.length>0">
			<div class="contract_buy">您将支付</div>
			<el-table :data="buy_items" style="width: 100%">
				<el-table-column prop="picture" width="64">
					<template slot-scope="scope">
						<img :src="scope.row.picture" style="height:32px;width:32px" :onerror="errorImg"/>
					</template>
				</el-table-column>
				<el-table-column prop="item_name" label="物品" width="350">
					<template slot-scope="scope">
						<div>{{scope.row.item_name}}</div>
						<div v-if="scope.row.is_blueprint_copy=='true'">
							<span>时间效率：{{scope.row.time_efficiency}}</span>
							<span style="margin-left: 12px">材料效率：{{scope.row.material_efficiency}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="quantity" label="数量" width="80"/>
				<el-table-column prop="price" label="卖单价格" width="220"/>
				<el-table-column prop="price" label="买单价格"/>
			</el-table>
		</el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOpen = false">取 消</el-button>
        <el-button type="primary" @click="dialogOpen = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from "@/views/external/common/common.vue";
import { contractConditions } from "@/api/public/contract/contract.js";
export default {
  components: { common },
  data() {
    return {
        errorImg:"this.src='"+require('@/assets/images/question_32.jpg')+"'",
        url:process.env.VUE_APP_BASE_API+"/profile/eve/Invasion_1.0_Types/Types/",
        loading:false,
        tableData: [],
        dialogOpen: false,
		regionList:[{value:"10000002",label:"吉他"}],
		sell_items:[],
		buy_items:[],
		condition:{
            type_name:"",
            page:1,
            contract_type:"",
			region_id:"10000002",
            dataSource:"serenity",
		},
		contractInfo:{

		},
        total_page:1,
		page:1,
    };
  },
  watch: {},
  created() {
      this.searchContract();
  },
  methods: {
	   handleSizeChange(val){
           this.condition.page = `${val}`;
           this.searchContract();
	   },
	   handleCurrentChange(val) {
           this.condition.page = `${val}`;
           this.searchContract();
	   },
		//   点击物品名称弹框
		nameClick(row) {
            this.sell_items=[];
			this.buy_items=[];
			this.contractInfo = {};
			this.dialogOpen = true;
            let contractInfo = {};
            contractInfo.issuer = row.issuer;
            contractInfo.location = row.location;
            contractInfo.start_data = row.start_data;
            contractInfo.end_data = row.end_data;
            contractInfo.type = row.type;
            contractInfo.titel = row.titel;
            contractInfo.price = row.price;
            contractInfo.price_type = row.price_type;
            this.contractInfo = contractInfo;
            row.contractItems.forEach(item=>{
                let contractItem = {};
                contractItem.is_blueprint_copy = item.is_blueprint_copy;
                contractItem.item_name = item.item_name;
                contractItem.material_efficiency = item.material_efficiency;
                contractItem.time_efficiency = item.time_efficiency;
                contractItem.runs = item.runs;
                contractItem.quantity = item.quantity;
                contractItem.type_id = item.type_id;
                contractItem.picture = this.url+item.type_id+"_32.png";
				if(item.is_included==="true"){
                    this.sell_items.push(contractItem);
				}else{
                    this.buy_items.push(contractItem);
				}
			})

		},
		getUrl(type) {
			if (type != undefined && type != "") {
				//return require(`@/assets/public/Invasion_1.0_Types/Types/${type}`);
                //return require(`@/assets/public/images/${type}`);
			} else {
				return false;
			}
		},
		searchContract(){
            this.loading = true;
            this.tableData = [];
            contractConditions(this.condition).then(res=>{
                let contractList = res.data.contractList;
                this.total_page = res.data.amount;
                contractList.forEach(item=>{
                    let contract = {};
                    contract.items = item.items;
                    contract.location = item.location_name;
                    contract.issuer = item.character_name;
					contract.title = item.title;
                    contract.type = item.type;
                    contract.contractItems = item.contractItems;
                    contract.start_data = item.date_issued;
                    contract.end_data=item.date_expired;
                    //是否拍卖
                    //只有一个物品时
					let sell_buy = "";
					let item_name = "";
					let picture = "";
                    if(item.contractItems.length==1){
                        item_name = item.contractItems[0].item_name;
                        picture = item.contractItems[0].type_id+"_32.png";
                        //出售还是收购
                        if(item.contractItems[0].is_included=="true"){
                            sell_buy = "出售"
						}else{
                            sell_buy = "收购"
						}
					}else{
                        picture="0_32.png"
                        let included = 0;
                        item_name = "[多件物品]"
						let sell_item_name = "";
                        //多个物品时
						let wtb = false;
						let wts = false;
                        item.contractItems.forEach((contractItem)=>{
							if(contractItem.is_included=="true"){
                                included++;
                                sell_item_name = contractItem.item_name;
							    wts = true;
							}else if(contractItem.is_included=="false"){
							    wtb = true;
							}

							if(included==1){
                                item_name = sell_item_name;
							}else{
                                item_name = "[多件物品]"
							}
                        })
						if(wts&&wtb){
                            sell_buy ="物品交换"
						}else if(wts){
                            sell_buy ="出售"
						}else if(wtb){
                            sell_buy ="收购"
						}else{
						    debugger;
						}
					}
                    contract.picture = this.url+picture;
                    contract.items = item_name;
                    if(item.type==="拍卖"){
                        contract.sell_buy = "拍卖";
					}else{
                        contract.sell_buy = sell_buy;
                    }

                    if(item.price==0&&item.reward!=0){
                        contract.price_type = "reward";
                        contract.price = this.toThousands(item.reward)+" isk";
                    }else if(item.reward==0&&item.price!=0){
                        contract.price_type = "price";
                        contract.price = this.toThousands(item.price)+" isk";
					}else{
                        contract.price = "";
					}

					this.tableData.push(contract);
				})
                this.loading = false;
                console.log(res);
			})
		},
      toThousands(num) {
          return num.toString().replace(/\d+/, function (n) {
              return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
          });
      },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
	.max-container {
	  display: flex;
	  .left-container {
		flex: 1;
	  }
	  .right-container {
		flex: 3;
		margin-left: 10px;
	  }
	}
	.contract_auction{
		color:#ffba00;
	}
	.contract_buy{
		color:red;
	}
	.contract_sell{
		color:green;
	}
	.content_click{
		cursor: pointer;
	}
	.contract_item_name {
		color: #36a3f7;
	}
</style>


