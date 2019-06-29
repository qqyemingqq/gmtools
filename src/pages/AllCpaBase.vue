<template>
    <div class="content">
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
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
        }
    };
</script>

<style scoped>

</style>