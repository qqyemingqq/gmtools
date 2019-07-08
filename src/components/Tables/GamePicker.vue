<template>
    <md-field md-layout>
        <label >选择游戏</label>
        <md-select style="align-content: center" v-model="selectedAppId" name="app_id" id="app_id">
            <md-option value="54" >心动练习生</md-option>
            <md-option value="26" >赛道大亨</md-option>
            <md-option value="23" >王者泡泡龙</md-option>
            <md-option value="83" >垃圾分类</md-option>
        </md-select>
    </md-field>
</template>

<script>
    export default {
        name: "game-picker"
    }
</script>

<style scoped>

</style>