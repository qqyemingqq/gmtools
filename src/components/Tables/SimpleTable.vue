<template>
    <div>
        <md-dialog  :md-active.sync="addBoxActive" :md-click-outside-to-close="false">
            <div style="padding: 20px" @change="checkField">
                <div class="md-layout">
                    <div class="md-layout-item">
                        <md-field :class="{'md-invalid':checkData.app_name}">
                            <label>产品名称</label>
                            <md-input v-model="addData.app_name" required ></md-input>
                            <span class="md-error">此项必填</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field :class="{'md-invalid':checkData.app_id}">
                            <label>ID</label>
                            <md-input v-model="addData.app_id" required></md-input>
                            <span class="md-error">此项必填</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field :class="{'md-invalid':checkData.app_appid}">
                            <label>APPID</label>
                            <md-input v-model="addData.app_appid" required></md-input>
                            <span class="md-error">此项必填</span>
                        </md-field>
                    </div>
                </div>
                <md-field>
                    <label>路径</label>
                    <md-input v-model="addData.app_path"></md-input>
                </md-field>
                <div class="md-layout">
                    <div class="md-layout-item">
                        <md-field :class="{'md-invalid':checkData.app_price}">
                            <label>CPA单价</label>
                            <md-input v-model="addData.app_price" required></md-input>
                            <span class="md-error">此项必填</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label>每日量级</label>
                            <md-input v-model="addData.app_quantity"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                    <md-field :class="{'md-invalid':checkData.app_type}">
                        <label>类型</label>
                        <md-input v-model="addData.app_type" required></md-input>
                        <span class="md-error">此项必填</span>
                    </md-field>
                    </div>
                </div>
                <div class="md-layout">
                    <div class="md-layout-item">
                        <md-field>
                            <label>后台地址</label>
                            <md-input v-model="addData.gm_url"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label>账号</label>
                            <md-input v-model="addData.gm_account"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label>密码</label>
                            <md-input v-model="addData.gm_secret"></md-input>
                        </md-field>
                    </div>
                </div>

                <div class="md-layout" >
                    <div class="md-layout-item">
                        <md-field :class="{'md-invalid':checkData.app_icon}">
                            <label>图标</label>
                            <md-input v-model="addData.app_icon" required></md-input>
                            <span class="md-error">此项必填</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label>动图</label>
                            <md-input v-model="addData.app_animation"></md-input>
                        </md-field>
                    </div>
                </div>

                <md-field>
                    <label :class="{'md-invalid':checkData.app_description}">描述</label>
                    <md-input v-model="addData.app_description" required></md-input>
                    <span class="md-error">此项必填</span>
                </md-field>



            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="clearAddData">清空</md-button>
                <md-button class="md-primary" @click="addBoxActive = false">关闭</md-button>
                <md-button class="md-primary" @click="addAppInfo()">保存</md-button>
            </md-dialog-actions>
        </md-dialog>

        <div class="md-layout">
            <div class="md-layout-item">
                <md-button class="md-primary md-raised" @click="addBoxActive = true">添加</md-button>
            </div>
            <div class="md-layout-item md-alignment-right">
                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="输入产品名称查找..." v-model="search" @input="searchOnTable"/>
                </md-field>
            </div>
        </div>
        <md-table md-sort="id" md-numeric :table-header-color="tableHeaderColor">
            <md-table-row>
                <md-table-head md-label="">产品</md-table-head>
                <md-table-head md-label="">ID</md-table-head>
                <md-table-head md-label="">APPID</md-table-head>
                <md-table-head md-label="" class="app-path">路径</md-table-head>
                <md-table-head md-label="">CPA单价</md-table-head>
                <md-table-head md-label="">每日量级</md-table-head>
                <md-table-head md-label="">后台</md-table-head>
                <md-table-head md-label="">图标</md-table-head>
                <md-table-head md-label="">操作</md-table-head>
                <!-- gm_url，gm_account，gm_secret
                app_description，app_type，app_owner -->
            </md-table-row>
            <md-table-row v-for="(item, index) in searched" :key="index">
                <md-table-cell>{{ item.app_name }}</md-table-cell>
                <md-table-cell md-sort="index" md-numeric md-sort-order="asc">{{ item.app_id }}</md-table-cell>
                <md-table-cell>{{ item.app_appid }}</md-table-cell>
                <md-table-cell class="app-path">
                    {{ item.app_path }}
                    <md-tooltip class="tooltip" md-direction="top">{{ item.app_path }}</md-tooltip>
                </md-table-cell>
                <md-table-cell>{{ item.app_price }}</md-table-cell>
                <md-table-cell>{{ item.app_quantity }}</md-table-cell>
                <md-table-cell>
                    <a v-if="item.gm_url" target="_blank" :href="item.gm_url.indexOf('?')>-1 ?
                    item.gm_url+'&account='+item.gm_account +'&password='+item.gm_secret :
                    item.gm_url+'?&account='+item.gm_account +'&password='+item.gm_secret"
                    >前往</a>
                </md-table-cell>
                <md-table-cell>
                    <img v-if="item.app_icon" style="max-width: 50px" :src="cdnUrl+item.app_icon"/>
                    <md-tooltip class="tooltip" md-direction="top">{{ item.app_icon }}</md-tooltip>
                </md-table-cell>
                <md-table-cell>
                    <md-button v-on:click="addData = JSON.parse(JSON.stringify(item));addBoxActive=true"
                               class="md-primary md-raised">查看
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    // import { constants } from 'crypto';
    // import {cpaData} from "Data";
    const toLower = text => {
        return text.toString().toLowerCase()
    };
    const searchByName = (items, term) => {
        if (term) {
            return items.filter(item => toLower(item.app_name).includes(toLower(term)))
        }
        return items
    };
    export default {

        name: "simple-table",
        props: {
            tableHeaderColor: {
                type: String,
                default: ""
            }
        },
        created() {
            this.cpaData = this.$cpaData.cpaData;
            this.$cpaData.getCPAData((res)=>{
                this.searched=res.reverse();
                console.log(res)
            });
        },
        methods: {
            checkOneInfo: (e) => {
                console.log(e);
                let appid = e.path[2].getAttribute('myAppId');
                for (let key in this.cpaData) {
                    if(this.cpaData[key]['app_id'].toString() === appid.toString()){
                        this.addBoxActive = true;
                        this.addData = this.cpaData[key];
                        break
                    }

                }
                console.log();
            },
            searchOnTable() {
                this.searched = searchByName(this.cpaData, this.search).reverse();
            },
            addAppInfo:function(){
                if(this.checkField()){

                }
                console.log(this.addData)
            },
            checkField:function(){
                for (let key in this.checkData) {
                    this.checkData[key] = this.addData[key] === "";
                }
                for (let key in this.checkData) {
                    if(this.checkData[key] === false){
                        return false;
                    }
                }
                return true;
            },
            clearAddData:function () {
                for (let key in this.addData) {
                    this.addData[key] = "";
                }
                this.checkField();
            }
        },
        computed: {

        },
        data() {
            return {
                required: true,
                refreshCPAData:null,
                addData: {
                    app_name: "",
                    app_id: "",
                    app_appid: "",
                    app_path: "",
                    app_price: "",
                    app_quantity: "",
                    gm_url: "",
                    gm_account: "",
                    gm_secret: "",
                    app_description: "",
                    app_type: "",
                    app_icon: "",
                    app_owner: "",
                    app_animation: ""
                },
                checkData: {
                    app_name: false,
                    app_id: false,
                    app_appid: false,
                    app_price: false,
                    app_description: false,
                    app_type: false,
                    app_icon: false,
                    app_owner: false,
                },
                addBoxActive: false,
                cdnUrl: 'https://onimg.leshu.com/wxgame/Princess_coming/moreGameIcons/',
                search: null,
                searched: [],
                cpaData: [],
                selected: [],
                users: [
                    {
                    }
                ]
            };
        }
    };
</script>
<style>
    .app-path {
        max-width: 110px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .tooltip {
        background: #0C9A9A;
        max-width: none !important;
        width: fit-content;
    }
</style>