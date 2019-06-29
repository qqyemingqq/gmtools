<template>
    <div>
        <md-table  v-model="cpaMpdata" md-sort="sub_app_id" md-sort-order="desc" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }" >
                <md-table-cell v-if="checkAppId(item['main_app_id'])" md-label="产品" md-sort-by="sub_app_id">{{ cpaData[item['sub_app_id']]?cpaData[item['sub_app_id']]['app_name']+'('+(cpaData[item['main_app_id']]?cpaData[item['main_app_id']]['app_name']+')':'('+cpaData[item['main_app_id']]+')'):'需要更新CPA信息('+item['sub_app_id']+')' }}</md-table-cell>
                <md-table-cell v-if="checkAppId(item['main_app_id'])" md-label="UV价" >{{ cpaData[item['sub_app_id']]?cpaData[item['sub_app_id']]['app_price']:'需要更新CPA信息（'+item['sub_app_id']+'）' }}</md-table-cell>
                <md-table-cell v-if="checkAppId(item['main_app_id'])" md-label="收益" >{{ (savedCpaRecord[item.sub_app_id]&&cpaData[item.sub_app_id])?savedCpaRecord[item.sub_app_id]['fetched_data'] * (cpaData[item['sub_app_id']]['app_price'] * 1000) / 1000:'未反量（'+item['sub_app_id']+'）' }}</md-table-cell>
                <md-table-cell v-if="checkAppId(item['main_app_id'])" md-label="转化" md-sort-by="turn_rate">{{  item.turn_rate?item.turn_rate:0 }}</md-table-cell>
                <!--(savedCpaRecord[item.sub_app_id]&&cpaData[item.sub_app_id])?(savedCpaRecord[item.sub_app_id]['fetched_data']/item['ramount']*100).toFixed(2)+"%":'0%'-->
                <md-table-cell v-if="checkAppId(item['main_app_id'])" md-label="导量" md-sort-by="ramount">{{ item.ramount }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>

</template>

<script>
    export default {

        name: "cpa-stat-table",
        props: {
            tableHeaderColor: {
                type: String,
                default: ""
            },
            current: {
                type: Boolean,
                default: true
            },
            selectedDate:{
                type:Date,
                default:''
            },
            selectedAppId:{
                type:String,
                default:'54'
            }
        },
        created() {
            this.queryDatas(this.selectedAppId);

        },
        methods: {
            checkAppId:function(main_app_id){
                return this.$cpaData.CpaCpList[this.selectedAppId].indexOf(main_app_id)!==-1
            },
            queryDatas:function(ma){

                this.cpaCpList = this.$cpaData.CpaCpList[this.selectedAppId];
                console.log(this.cpaCpList);
                console.log(ma);
                ma=ma||54;
                this.$cpaData.getSavedCpaRecord({dd:this.$tools.formatTime(this.selectedDate),ai:ma},(res)=> {
                    this.savedCpaRecord={};
                    for (let i = 0; i < res.length; i++) {
                        this.savedCpaRecord[res[i]['sub_app_id']] = res[i];
                    }
                });
                this.$cpaData.getCPAData({dd:ma},(res)=>{
                    this.cpaData = {};
                    for (let i = 0; i < res.length; i++) {
                        if(res[i]['app_id'])
                            this.cpaData[res[i]['app_id']] = res[i];
                    }
                });
                this.$cpaData.getCpaRecordOneDay({dd: this.$tools.formatTime(this.selectedDate), ma: ma}, (res) => {
                    this.cpaMpdata = res;
                    for (let i = 0; i < res.length; i++) {
                        if(this.cpaMpdata[res[i].sub_app_id]){
                            this.cpaMpdata[res[i].sub_app_id]['turn_rate'] = this.cpaMpdata[res[i].sub_app_id]['fetched_data']/res[i]['ramount']
                        }
                    }

                });
                this.cpaMpdata = Object.assign([],this.cpaMpdata);
            }
            
        },
        computed: {

        },
        watch:{
            selectedDate:function () {
                this.queryDatas(this.selectedAppId);

            },
            selectedAppId:function () {
                this.queryDatas(this.selectedAppId);
            }
        },
        data() {
            return {
                cpaCpList:{},
                cpaData:{},
                cpaMpdata:{},
                savedCpaRecord:{}
            };
        }
    };
</script>
