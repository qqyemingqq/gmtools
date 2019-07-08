<template>
    <div>
        <md-table  v-model="channelData" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }" >
                <!--<md-table-cell md-label="星期" >{{item.update_date}}</md-table-cell>-->
                <md-table-cell md-label="日期" >{{item.update_date}}</md-table-cell>
                <md-table-cell md-label="活跃(新+活)" >{{item.register+item.active}}</md-table-cell>
                <md-table-cell md-label="新增" >{{item.register}}</md-table-cell>
                <md-table-cell md-label="活跃" >{{item.active}}</md-table-cell>
                <md-table-cell md-label="微信收入" >{{item.wechat_incoming}}</md-table-cell>

                <!--<md-table-cell md-label="微信收入" >-->
                    <!--<md-field >-->
                        <!--<label>-->
                            <!--拼夕夕收入</label>-->
                        <!--<md-input required></md-input>-->
                    <!--</md-field>-->
                <!--</md-table-cell>-->
                <md-table-cell md-label="卖量收入" >{{item.cpa_incoming}}</md-table-cell>
                <md-table-cell v-if="selectedAppId==54" md-label="娃娃注册" >{{item.wawa_register}}</md-table-cell>
                <md-table-cell v-if="selectedAppId==54" md-label="娃娃收入" >{{item.wawa_incoming}}</md-table-cell>
                <md-table-cell v-if="selectedAppId==54" md-label="拼夕夕收入" >{{item.pdd_incoming}}</md-table-cell>
                <md-table-cell md-label="用户单价" >{{((item.cpa_incoming+item.wawa_incoming+item.wechat_incoming)/(item.register+item.active)).toFixed(3)}}</md-table-cell>
                <md-table-cell md-label="总收入" >{{(item.cpa_incoming+item.wawa_incoming+item.wechat_incoming).toFixed(2)}}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    export default {
        name: "base-data-table",
        props: {
            tableHeaderColor: {
                type: String,
                default:
                    ""
            },
            selectedStartDate:{
                type:String
            },
            selectedEndtDate:{
                type:String
            },
            selectedAppId:{
                type:String
            }
        },
        methods:{
            queryData:function () {
                if(!this.selectedEndtDate || !this.selectedStartDate || !this.selectedAppId)return;
                this.$cpaData.getappdata({},(res)=>{
                   this.channelData = res;
                });
                console.log('queryData');
                }
        },
        created(){
            this.queryData();
        },
        watch:{
            selectedEndtDate:function () {
                this.queryData();
                console.log('this.selectedEndtDate='+this.selectedEndtDate);
            },
            selectedStartDate:function () {
                this.queryData();
                console.log('this.selectedStartDate='+this.selectedStartDate);
            },
            selectedAppId:function () {
                this.queryData();
                console.log('this.selectedAppId='+this.selectedAppId);
            }
        },
        data(){
            return {
                channelData:{}
            }
        }
    }
</script>

<style scoped>

</style>