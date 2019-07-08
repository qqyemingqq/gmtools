<template>
    <div>
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
        </div>
    <md-card >
        <md-card-header data-background-color="green">
            <h4 class="title">渠道数据</h4>
        </md-card-header>

        <md-card-content>
            <channel-data-table :selectedAppId="selectedAppId" :selectedEndtDate="selectedEndtDate" :selectedStartDate="selectedStartDate" table-header-color="green"></channel-data-table>
        </md-card-content>
    </md-card>
    </div>

</template>

<script>
    import {ChannelDataTable} from "@/components";
    export default {
        components: {
            ChannelDataTable
        },
        data(){
            return {
                selectedStartDate:this.$tools.formatTime(new Date(new Date()-7*86400000)),
                selectedEndtDate:this.$tools.formatTime(new Date()),
                selectedAppId:''
            }
        }
    };
</script>

<style scoped>

</style>