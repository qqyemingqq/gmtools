<template>
    <div>
        <md-table md-sort="id" md-numeric :table-header-color="tableHeaderColor">
            <md-table-row>
                <md-table-head md-label="">产品</md-table-head>
                <md-table-head md-label="">UV价</md-table-head>
                <md-table-head md-label="">反量</md-table-head>
                <md-table-head md-label="">收益</md-table-head>
                <md-table-head md-label="">转化</md-table-head>
                <md-table-head md-label="">导量</md-table-head>
                <!-- gm_url，gm_account，gm_secret
                app_description，app_type，app_owner -->
            </md-table-row>
            <md-table-row v-if="$cpaData.CpaCpList[selectedAppId].indexOf(item['main_app_id'])!==-1" v-for="(item, index) in cpaMpdata" :key="index">
                <md-table-cell>{{cpaData[item['sub_app_id']]?cpaData[item['sub_app_id']]['app_name']+'('+(cpaData[item['main_app_id']]?cpaData[item['main_app_id']]['app_name']+')':'('+cpaData[item['main_app_id']]+')'):'需要更新CPA信息('+item['sub_app_id']+')' }}
                </md-table-cell>
                <md-table-cell>{{cpaData[item['sub_app_id']]?cpaData[item['sub_app_id']]['app_price']:'需要更新CPA信息（'+item['sub_app_id']+'）' }}
                </md-table-cell>
                <md-table-cell>
                    <md-field class="myInput">
                        <md-input  type="number" @input="sumData" v-model="item['fetched_data']"></md-input>
                    </md-field>
                </md-table-cell>
                <md-table-cell>{{ item['profit'] }}</md-table-cell>
                <md-table-cell>{{ (item['turn_rate']*100).toFixed(2)+"%" }}</md-table-cell>
                <md-table-cell>{{ item['ramount'] }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>

</template>

<script>
    // import { constants } from 'crypto';
    // import {cpaData} from "Data";
    export default {

        name: "cpa-price-input-table",
        props: {
            tableHeaderColor: {
                type: String,
                default: ""
            },
            selectedDate: {
                type: Date
            },
            selectedAppId: ''
        },
        computed: {},
        created() {
            // this.getCpaRecordOneDay = this.$cpaData.getCpaRecordOneDay;
            this.queryData();

        },
        methods: {
            sendDataToCpaPriceInput() {
                if (!this.selectedDate || !this.selectedAppId) return;
                this.$emit("saveCpaRecord", this.cpaMpdata);
            },
            sumData() {
                for (let i = 0; i < this.cpaMpdata.length; i++) {
                    if (!this.cpaData[this.cpaMpdata[i]['sub_app_id']]) continue;
                    if(this.savedCpaRecord[this.cpaMpdata[i]['sub_app_id']]){
                        this.cpaMpdata[i]['fetched_data'] = this.savedCpaRecord[this.cpaMpdata[i]['sub_app_id']]['fetched_data']
                    }
                    if (this.cpaMpdata[i]['sub_app_id'] && this.cpaMpdata[i]['fetched_data']) {
                        this.cpaMpdata[i]['profit'] = this.cpaMpdata[i]['fetched_data'] * (this.cpaData[this.cpaMpdata[i]['sub_app_id']]['app_price'] * 1000) / 1000
                    } else {
                        this.cpaMpdata[i]['profit'] = 0;
                    }
                    this.cpaMpdata[i]['fetched_data'] ?
                        (this.cpaMpdata[i]['turn_rate'] = (this.cpaMpdata[i]['fetched_data'] / this.cpaMpdata[i]['ramount'])) : (this.cpaMpdata[i]['turn_rate'] = 0);
                }
                this.cpaMpdata = Object.assign([], this.cpaMpdata);
            },

            queryData() {
                if (!this.selectedDate || !this.selectedAppId) return;
                this.$cpaData.getCPAData({dd:this.selectedAppId},(res) => {
                    this.cpaData = {};
                    for (let i = 0; i < res.length; i++) {
                        if (res[i]['app_id'])
                            this.cpaData[res[i]['app_id']] = res[i];
                    }
                });

                // for (let i = 0; i <this.cpaRecord.length; i++) {
                //     this.cpaRecord[i]['fetched_data'] = '';
                // }

                this.$cpaData.getSavedCpaRecord({dd:this.$tools.formatTime(this.selectedDate),ai:this.selectedAppId},(res)=> {
                    this.savedCpaRecord={};
                    for (let i = 0; i < res.length; i++) {
                        if (res[i]['app_id'] && res[i]['update_date']=== this.$tools.formatTime(this.selectedDate))
                            this.savedCpaRecord[res[i]['sub_app_id']] = res[i];
                    }
                    console.log(this.savedCpaRecord);
                });
                this.$cpaData.getCpaRecordOneDay({dd: this.$tools.formatTime(this.selectedDate), ma: this.selectedAppId}, (res) => {
                    this.cpaMpdata = res;
                    this.sumData();
                    this.sendDataToCpaPriceInput()
                });
            }

        },
        watch: {
            selectedDate: function () {
                this.queryData();
            },
            selectedAppId: function () {
                this.queryData();
            }
        },
        data() {
            return {
                // cpaRecord: {},
                cpaData: {},
                cpaMpdata: {},
                savedCpaRecord:{}
            };
        }
    };
</script>

<style>
    .myInput{
        padding:0 !important;
        margin: 0 !important;;
        min-height: 15px !important;
    }
</style>

