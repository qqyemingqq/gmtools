<template>
    <div class="content">
        <md-dialog-alert
                :md-active.sync="UpdateSusseccBox"
                md-content="更新成功！"
                md-confirm-text="好的" />
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">

                <div class="md-layout">
                    <div class="md-layout-item" style="display: inline-block">
                    <md-datepicker style="width: 200px;" v-model="selectedDate" :md-immediately="true" >
                        <label>选择时间</label>
                    </md-datepicker>
                    </div>
                    <div class="md-layout-item" style="width: 200px;display: inline-block;margin-left: 20px;">
                        <md-field md-layout>
                            <label >选择游戏</label>
                            <md-select style="align-content: center" v-model="selectedAppId" name="app_id" id="app_id">
                                <md-option value="54" >心动练习生</md-option>
                                <md-option value="26" >赛道大亨</md-option>
                                <md-option value="23" >王者泡泡龙</md-option>
                                <md-option value="83" >垃圾分类</md-option>

                            </md-select>
                        </md-field>
                    </div>
                </div>
                <md-card >
                    <md-card-header data-background-color="green">
                        <h4 class="title">CPA状态列表</h4>
                    </md-card-header>
                    <md-card-content>
                        <cpa-stat-table :selectedDate="selectedDate" :selectedAppId="selectedAppId" :current="current" table-header-color="green"></cpa-stat-table>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {CpaStatTable} from "@/components";
    export default {
        created(){

        },
        data(){
            return {
                UpdateSusseccBox:false,
                non_current:false,
                current:true,
                selectedDate: new Date(),
                selectedAppId:'54',
                cpaRecord:{},
                gameList:{
                    '54':'心动练习生',
                    '26':'赛道大亨',
                    '23':'王者泡泡龙',
                    '83':'垃圾分类'
                }
            };
        },
        watch:{
        },
        components: {
            CpaStatTable
        }
    };
</script>
