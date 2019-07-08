<template>
    <div class="content">
        <md-dialog-alert
                :md-active.sync="uploadSusseccBox"
                md-content="操作成功！"
                md-confirm-text="好的" />
        <md-dialog-alert
                :md-active.sync="UpdateSusseccBox"
                md-content="更新成功！"
                md-confirm-text="好的" />
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">

                <div  class="md-layout-item md-layout md-gutter">
                    <div class="md-layout-item" style="display: inline-block">
                        <md-datepicker style="width: 200px;" v-model="selectedDate" :md-immediately="true" >
                            <label>选择时间</label>
                        </md-datepicker>
                    </div>
                    <div class="md-layout-item"  style="width: 200px;display: inline-block;margin-left: 20px;">
                        <md-field md-layout>
                            <label >选择游戏</label>
                            <md-select style="align-content: center" v-model="selectedAppId" name="app_id" id="app_id">
                                <md-option v-for="item in $cpaData.gmIdList"  :value="item.app_id" >{{item.name}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item" style="display: inline-block">
                        <md-button @click="uploadCpaRecord" class="md-raised md-primary">提交</md-button>
                    </div>
                </div>
                <md-card >
                    <md-card-header data-background-color="green">
                        <h4 class="title">CPA数据录入与查看</h4>
                    </md-card-header>
                    <md-card-content>
                        <cpa-price-input-table @saveCpaRecord="SaveCpaRecord" :selectedDate="selectedDate" :selectedAppId="selectedAppId"  table-header-color="green"></cpa-price-input-table>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {CpaPriceInputTable} from "@/components";
    export default {
        methods:{
            fetchcparecord:function () {
                this.$cpaData.fetchcparecord(()=> {
                    this.UpdateSusseccBox = true;
                });
            },
            SaveCpaRecord(res){
                this.saveCpaRecord = res;
            },
            uploadCpaRecord(){
                console.log(this.saveCpaRecord);
                if(!this.saveCpaRecord)return;
                this.$cpaData.uploadCpaRecord({dd:JSON.stringify(this.saveCpaRecord),ai:this.selectedAppId},()=>{
                        this.uploadSusseccBox = true;
                })
            }
        },
        created(){

        },
        data(){
            return {
                non_current:false,
                current:true,
                selectedDate: new Date(),
                selectedAppId:54,
                cpaRecord:{},
                saveCpaRecord:{},
                app_id:null,
                uploadSusseccBox:false,
                UpdateSusseccBox:false
            };
        },
        watch:{
        },
        components: {
            CpaPriceInputTable
        }
    };
</script>
