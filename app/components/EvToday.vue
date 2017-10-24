<template>
<div role="tabpanel" class="tab-pane" id="ev_rank_today">
    <transition name="fade">
        <div v-if="!haveRes" class="alert alert-warning res_wait" role="alert">{{ "ev_rank_today_wait" | msg }}</div>
    </transition>
    <transition name="fade">
        <ul class="list-group">
            <transition-group name="li-list" tag="ul" class="list-group">
                <player-component class="li-list-item" v-on:signed="signed" v-for="(player,index) in players" v-bind:player="player" v-bind:index="index" v-bind:key="player" v-bind:tradeAble="tradeAble" v-bind:tradeOpen="tradeOpen"></player-component>
            </transition-group>
        </ul>
    </transition>
</div>
</template>
<script>
require('../plugin/countdown/css/style.css');
import PlayerComponent from './Player.vue'
import Statistic from '../script/server/statistic.js'
import Message from '../script/message.js'
import Hub from '../script/hub.js'

export default {
    data: function() {
        return {
            players: [],
            haveRes: false
        }
    },
    methods: {
        getEvRankToday: function() {
            Statistic.getEvRankToday().then((res) => {
                if (res.data) {
                    this.players = res.data
                    this.haveRes = true
                }
            });
        },
        clear: function() {
            this.players = [];
        }
    },
    mounted: function() {

    },
    components: {
        PlayerComponent
    },
    filters: {
        msg: Message.filters
    }
}
require('../plugin/countdown/js/jquery.countdown.js');
</script>
<style scoped>
.list-group {
    margin-top: 10px;
    margin-bottom: 10px;
}

.li-list-leave-active {
    position: absolute;
    width: 100%;
}

.li-list-move {
    transition: transform 0.5s;
}

.res_wait {
    margin-top: 10px;
}
</style>
