<template>
    <div>
        <md-dialog-alert
                :md-active.sync="dialogAlert"
                :md-content="dialogAlertMessage"
                md-confirm-text="好的" />

        <md-table v-model="allCpaData" md-sort="app_id" md-sort-order="desc"  :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="产品"> {{ item.app_name }}</md-table-cell>
                <md-table-cell md-label="ID" md-sort-by="app_id">{{ item.app_id }}</md-table-cell>
                <md-table-cell md-label="APPID">{{ item.app_appid }}</md-table-cell>
                <md-table-cell md-label="操作">
                    <md-button class="md-primary md-raised">
                    <!--v-on:click=""-->
                    查看
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    export default {
        props:{
            tableHeaderColor: {
                type: String,
                default: ""
            }
        },
        created() {
            this.getAllCpaData();
        },
        methods:{
            getAllCpaData:function () {
                this.$cpaData.allappbase((res)=> {
                    this.allCpaData = res;
                    // for (let i = 0; i < res.length; i++) {
                    //     if (res[i]['app_id'])
                    //         this.allCpaData[res[i]['app_id']] = res[i];
                    // }

                });

            }
        },
        name: "all-cpa-base-list",
        data(){
            return {
                allCpaData:[],
                dialogAlert:false,
                dialogAlertMessage:''
            }
        }
    }
</script>

<style scoped>

</style>