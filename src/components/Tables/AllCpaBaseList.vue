<template>
    <div>
        <md-dialog-alert
                :md-active.sync="dialogAlert"
                :md-content="dialogAlertMessage"
                md-confirm-text="好的" />

        <md-table md-sort="id"  md-numeric :table-header-color="tableHeaderColor">
            <md-table-row>
                <md-table-head md-label="">产品</md-table-head>
                <md-table-head md-label="">ID</md-table-head>
                <md-table-head md-label="">APPID</md-table-head>
                <md-table-head md-label="">操作</md-table-head>
                <!-- gm_url，gm_account，gm_secret
                app_description，app_type，app_owner -->
            </md-table-row>
            <md-table-row v-for="(item, index) in allCpaData" :key="index">
                <md-table-cell>{{ item.app_name }}</md-table-cell>
                <md-table-cell md-sort="index" md-numeric md-sort-order="asc">{{ item.app_id }}</md-table-cell>
                <md-table-cell>{{ item.app_appid }}</md-table-cell>
                <md-table-cell>
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
                    console.log(res)
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