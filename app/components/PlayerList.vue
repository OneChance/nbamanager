<template id="player_list">
<transition-group name="li-list" tag="ul" class="list-group">
    <player-component class="li-list-item" v-on:signed="signed" v-on:breaked="breaked" v-on:poschanged="poschanged" v-bind:teamSize="teamSize" v-for="(player,index) in players" v-bind:player="player" v-bind:index="index" v-bind:key="player"></player-component>
</transition-group>
</template>
<script>
import PlayerComponent from './Player.vue'

export default {
    props: ['players', 'teamSize'],
    components: {
        PlayerComponent
    },
    methods: {
        signed: function(playerId, pos) {
            this.$emit('signed', playerId, pos)
        },
        breaked: function(playerId) {
            this.$emit('breaked', playerId)
        },
        poschanged: function() {
            this.$emit('poschanged')
        }
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
    transform: scale(0);
    opacity: 0;
}

.li-list-leave-active {
    position: absolute;
    width: 100%;
}

.li-list-move {
    transition: transform .5s;
}
</style>
