<template id="player_list">
<transition-group :name="'li-list-'+direction" tag="ul" class="list-group">
    <player-component class="li-list-item" v-on:signed="signed" v-bind:teamSize="teamSize" v-for="(player,index) in players" v-bind:player="player" v-bind:index="index" v-bind:key="player"></player-component>
</transition-group>
</template>
<script>
import PlayerComponent from './Player.vue'

export default {
    props: ['players', 'teamSize', 'direction'],
    components: {
        PlayerComponent
    },
    methods: {
        signed: function(playerId) {
            this.$emit('signed', playerId)
        }
    }
}
</script>
<style scoped>
.li-list-left-enter-active,
.li-list-right-enter-active {
    transition: all .8s ease;
}

.li-list-left-leave-active,
.li-list-right-leave-active {
    transition: all .8s ease;
}

.li-list-left-enter,
.li-list-left-leave-active {
    transform: scale(0);
    opacity: 0;
}

.li-list-right-enter,
.li-list-right-leave-active {
    transform: scale(0);
    opacity: 0;
}

.li-list-left-item {
    transition: all 1s;
}
</style>
