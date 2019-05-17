<template>
	<div>
		<md-table v-model="users" :table-header-color="tableHeaderColor">
			<md-table-row slot="md-table-row" slot-scope="{ item }">
				<md-table-cell md-label="产品">{{ item.app_name }}</md-table-cell>
				<md-table-cell md-label="ID">{{ item.app_id }}</md-table-cell>
				<md-table-cell md-label="APPID">{{ item.app_appid }}</md-table-cell>
				<md-table-cell md-label="路径">{{ item.app_path }}</md-table-cell>
				<md-table-cell md-label="CPA单价">{{ item.app_price }}</md-table-cell>
				<md-table-cell md-label="每日量级">{{ item.app_quantity }}</md-table-cell>
				<md-table-cell md-label="后台">{{ item.gm}}</md-table-cell>
				<md-table-cell md-label="图标">{{ item.app_icon }}</md-table-cell>
				<md-table-cell md-label="其他信息">{{ item.others }}</md-table-cell>
				<md-table-cell md-label="修改"><md-button v-on:click="test" class="md-dense md-primary">修改</md-button></md-table-cell>
				<!-- gm_url，gm_account，gm_secret
        app_description，app_type，app_owner -->
			</md-table-row>
		</md-table>
	</div>
</template>

<script>
	// import { constants } from 'crypto';
	export default {
		name: "simple-table",
		props: {
			tableHeaderColor: {
				type: String,
				default: ""
			}
		},
		methods:{
			test:function(){
				console.log(1)
			}
		},
		data() {
			return {
				selected: [],
				users: [{
					app_name: "城市霸主",
					app_id: "10041",
					app_appid: "wx1c876c035ead4bc5",
					app_path: "channel=1013",
					app_price: "0.7",
					app_quantity: "",
					gm: "有后台",
					app_icon: "doudizhu.png",
					others: ""
				}, {
					app_name: "城市霸主",
					app_id: "10042",
					app_appid: "wx1c876c035ead4bc5",
					app_path: "channel=1013",
					app_price: "0.7",
					app_quantity: "50",
					gm: "有后台",
					app_icon: "doudizhu.png",
					others: ""
				}]
			};
		}
	};
</script>
