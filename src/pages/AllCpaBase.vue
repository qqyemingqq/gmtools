<template>
    <div class="content">
        <md-dialog-alert
                :md-active.sync="dialogAlert"
                md-content="提交成功！！"
                md-confirm-text="好的" />
        <md-dialog style="width: 608px;padding: 3px 0px 1px 0px" :md-active.sync="addBoxActive" :md-click-outside-to-close="false">
            <div class="md-layout md-alignment-vertical">
                <div class="md-layout-item">
                    <md-field >
                        <label>名字</label>
                        <md-input required v-model="addedcpadata.app_name">{{addedcpadata.app_name}}</md-input>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field >
                        <label>游戏ID</label>
                        <md-input required v-model="addedcpadata.app_id">{{addedcpadata.app_id}}</md-input>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <md-field >
                        <label>APPID</label>
                        <md-input required v-model="addedcpadata.app_appid">{{addedcpadata.app_appid}}</md-input>
                    </md-field>
                </div>
                <md-content class="md-layout-item" md-theme="selection-orange">
                    <p>{{'提示：'+addcpatips}}</p>
                </md-content>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" :disabled="updating" @click="addBoxActive = false">关闭</md-button>
                <md-button class="md-primary" :disabled="updating" @click="checkAndUpload">{{"提交"}}</md-button>
            </md-dialog-actions>
            <md-progress-bar style="margin-bottom: 1px" v-if="updating" md-mode="indeterminate"></md-progress-bar>
        </md-dialog>
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <div class="md-layout-item">
                    <md-button class="md-primary md-raised" @click="addBoxActive = true">添加</md-button>
                </div>
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">所有CPA列表</h4>
                    </md-card-header>
                    <md-card-content>
                        <all-cpa-base-list table-header-color="green"></all-cpa-base-list>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>
<script>
    import {AllCpaBaseList} from "@/components";
    export default {
        components: {
            AllCpaBaseList
        },
        data(){
            return {
                addBoxActive:false,
                addcpatips:'请填空',
                allCpaData:{},
                addedcpadata:{
                    app_appid:'',
                    app_id:0,
                    app_name:''
                },
                bigestId:0,
                updating:false,
                dialogAlert:false,
            }
        },
        created(){
            this.getAllCpaData();
        },
        methods:{
            checkAndUpload:function(){
              if(this.allCpaData && this.checkData()){
                  this.upLoadData();
              }
            },
            checkData:function(){
                if(this.addedcpadata.app_name.trim()===""){
                    this.addcpatips = '名字没填';
                    return false;
                }else if(this.addedcpadata.app_id===0) {
                    this.addcpatips = '游戏ID没填';
                    return false;
                }else if (this.addedcpadata.app_appid.trim()==='') {
                    this.addcpatips = '微信APPID没填';
                    return false;
                }else if (this.allCpaData[this.addedcpadata.app_id]){
                    this.addcpatips = '和 '+this.allCpaData[this.addedcpadata.app_id]['app_name']+ ' 的ID重复了';
                    return false;
                }else{
                    this.addcpatips = '老铁没毛病，正在上传中...';
                    this.updating = true;
                    return true;
                }
            },
            upLoadData:function(){
                this.$cpaData.addappbase(this.addedcpadata,(res)=> {
                    this.addcpatips='请填空';
                    this.dialogAlert = true;
                    this.updating = false;
                    this.addBoxActive = false;
                    this.addedcpadata = {
                        app_appid:'',
                        app_id:++this.bigestId,
                        app_name:''
                    }
                });
            },
            getAllCpaData:function () {
                this.$cpaData.allappbase((res)=> {
                    for  (let i = 0; i <res.length ; i++) {
                        this.allCpaData[res[i]['app_id']] = res[i];
                        if(parseInt(res[i]['app_id'])>this.bigestId){
                            this.bigestId=parseInt(res[i]['app_id']);
                        }
                    }
                    this.addedcpadata.gameid = this.bigestId+1;
                });

            }
        },
    };
</script>

<style scoped>

</style>