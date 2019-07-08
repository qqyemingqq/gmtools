<template>
    <div>
        <md-table  v-model="channelData" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }" >
                <md-table-cell md-label="买量(元)" >{{'不知道'}}</md-table-cell>
                <md-table-cell md-label="30天LV" >{{'不知道'}}</md-table-cell>
                <md-table-cell md-label="用户单价" >{{'不知道'}}</md-table-cell>
                <md-table-cell md-label="日期" >{{item.day}}</md-table-cell>
                <md-table-cell md-label="30日回本" >{{'不知道'}}</md-table-cell>
                <md-table-cell md-label="创角" >{{item.role_count}}</md-table-cell>
                <md-table-cell md-label="活跃" >{{item.role_id_count}}</md-table-cell>
                <md-table-cell md-label="次登" >{{item.keep1}}</md-table-cell>
                <md-table-cell md-label="7登" >{{item.keep7}}</md-table-cell>
                <md-table-cell md-label="14登" >{{item.keep14}}</md-table-cell>
                <md-table-cell md-label="30登" >{{item.keep30}}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    export default {
        name: "channel-data-table",
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
                if(!this.selectedEndtDate || !this.selectedStartDate)return console.warn('EndtDate or StartTime is wrong');
                if(new Date(this.selectedEndtDate)-new Date(this.selectedStartDate)<0)return console.warn('EndtDate is smaller than StartTime');
                if(!this.selectedAppId)return console.warn('selectedAppId  is wrong');
                let postData = {};
                postData.start_time = this.selectedStartDate;
                postData.stop_time = this.selectedEndtDate;
                postData.gid = this.selectedAppId;
                this.$cpaData.getGmData(postData,(res)=>{
                    this.channelData = res;
                })
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