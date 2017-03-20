<template id="player_list">
<transition-group name="li-list" tag="ul" class="list-group">
    <player-component class="li-list-item" v-for="(player,index) in players" v-bind:player="player" v-bind:index="index" v-bind:key="player"></player-component>
</transition-group>
</template>
<script>
import PlayerComponent from './Player.vue'

export default {
    props: ['players'],
    components: {
        PlayerComponent
    }
}
</script>
<style scoped>
.li-list-enter-active {
    transition: all .5s ease;
}

.li-list-leave-active {
    transition: all .5s ease;
}

.li-list-enter,
.li-list-leave-active {
    transform: translateX(500px);
    opacity: 0;
}

.li-list-leave-active {
    position: absolute;
}

.li-list-item {
    transition: all 1s;
}
</style>
