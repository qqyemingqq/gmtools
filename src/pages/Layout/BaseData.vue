<template>
    <div>
        <md-dialog style="width: 608px;padding: 3px 1px 0px 0px" :md-active.sync="addBoxActive" :md-click-outside-to-close="false">
            <div class="md-layout md-alignment-vertical">
                <div class="md-layout-item" >
                    <md-datepicker  v-model="selectedStartDate" :md-immediately="true" >
                        <label>选择开始时间</label>
                    </md-datepicker>
                </div>
                <md-field class="md-layout-item">
                    <label >选择游戏</label>
                    <md-select style="align-content: center" v-model="selectedAppId" name="app_id" id="app_id">
                        <md-option v-for="item in $cpaData.gmIdList"  :value="item.app_id" >{{item.name}}</md-option>
                    </md-select>
                </md-field>
                <div class="md-layout-item">
                    <md-field >
                        <label>微信收入</label>
                        <md-input required></md-input>
                    </md-field>
                </div>
                <div v-if="selectedAppId==54" class="md-layout-item">
                    <md-field >
                        <label>娃娃注册</label>
                        <md-input></md-input>
                    </md-field>
                </div>
                <div v-if="selectedAppId==54" class="md-layout-item">
                    <md-field >
                        <label>娃娃收入</label>
                        <md-input></md-input>
                    </md-field>
                </div>
                <div v-if="selectedAppId==54" class="md-layout-item">
                    <md-field >
                        <label>
                            拼夕夕收入</label>
                        <md-input></md-input>
                    </md-field>
                </div>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" >清空</md-button>
                <md-button class="md-primary" @click="addBoxActive = false">关闭</md-button>
                <md-button class="md-primary" >{{"提交"}}</md-button>
            </md-dialog-actions>
        </md-dialog>
        <div class="md-layout">
            <div class="md-layout-item" style="display: inline-block">
                <md-datepicker style="width: 200px;" v-model="selectedStartDate" :md-immediately="true" >
                    <label>选择开始时间</label>
                </md-datepicker>
            </div>
            <div class="md-layout-item" style="display: inline-block">
                <md-datepicker style="width: 200px;" v-model="selectedEndtDate" :md-immediately="true" >
                    <label>选择结束时间</label>
                </md-datepicker>
            </div>
            <div class="md-layout-item" style="width: 200px;display: inline-block;margin-left: 20px;">
                <md-field md-layout>
                    <label >选择游戏</label>
                    <md-select style="align-content: center" v-model="selectedAppId" name="app_id" id="app_id">
                        <md-option v-for="item in $cpaData.gmIdList"  :value="item.app_id" >{{item.name}}</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="md-layout-item">
                <md-button class="md-primary md-raised" @click="addBoxActive = true">添加</md-button>
            </div>
        </div>
        <md-card >
            <md-card-header data-background-color="green">
                <h4 class="title">基础数据</h4>
            </md-card-header>

            <md-card-content>
                <base-data-table :selectedAppId="selectedAppId" :selectedEndtDate="selectedEndtDate" :selectedStartDate="selectedStartDate" table-header-color="green"></base-data-table>
            </md-card-content>
        </md-card>
    </div>

</template>

<script>
    import {BaseDataTable} from "@/components";
    export default {
        components: {
            BaseDataTable
        },
        data(){
            return {
                selectedStartDate:this.$tools.formatTime(new Date(new Date()-7*86400000)),
                selectedEndtDate:this.$tools.formatTime(new Date()),
                selectedAppId:'',
                addBoxActive:false,
            }
        }
    };
</script>

<style scoped>

</style>