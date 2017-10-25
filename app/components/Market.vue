<template>
<div role="tabpanel" class="tab-pane" id="market">
    <transition name="fade">
        <div v-if="!tradeOpen" class="alert alert-warning trade_wait" role="alert">{{ "trade_wait" | msg }}
            <div class="timer">
                <span class="hours"></span>:<span class="minutes"></span>:<span class="seconds"></span>
            </div>
        </div>
    </transition>
    <div class="row search">
        <div class="col-lg-12">
            <div class="input-group">
                <input type="text" class="form-control search-input" v-model="searchName" :placeholder=" 'search_player' | msg ">
                <span class="input-group-btn">
                        <button class="btn" type="button" id="goSearch" @click="searchPlayer"><span class="fui-search"></span></button>
                </span>
            </div>
        </div>
    </div>
    <div class="form-group pos-filter">
        <label class="checkbox primary" for="checkboxC">
            <input type="checkbox" name="searchPos" data-toggle="checkbox" checked="checked" :value="'pos_c'|msg" id="checkboxC" v-model="searchPos">
            <b>{{ 'pos_c' | msg }}</b>
        </label>
        <label class="checkbox primary" for="checkboxF">
            <input type="checkbox" name="searchPos" data-toggle="checkbox" checked="checked" :value="'pos_f'|msg" id="checkboxF" v-model="searchPos">
            <b>{{ 'pos_f' | msg }}</b>
        </label>
        <label class="checkbox primary" for="checkboxG">
            <input type="checkbox" name="searchPos" data-toggle="checkbox" checked="checked" :value="'pos_g'|msg" id="checkboxG" v-model="searchPos">
            <b>{{ 'pos_g' | msg }}</b>
        </label>
    </div>
    <ul class="list-group">
        <transition-group name="li-list" tag="ul" class="list-group">
            <player-component class="li-list-item" v-on:signed="signed" v-for="(player,index) in marketPlayers" v-bind:player="player" v-bind:index="index" v-bind:key="player" v-bind:tradeAble="tradeAble" v-bind:tradeOpen="tradeOpen"></player-component>
        </transition-group>
        <button v-if="moreData" type="button" class="btn btn-success btn-lg btn-block more-player" :data-loading-text=" 'loading' | msg " @click="morePlayer">{{'more_player'|msg}}</button>
    </ul>
</div>
</template>
<script>
require('../plugin/countdown/css/style.css');
import PlayerComponent from './Player.vue'
import Market from '../script/server/market.js'
import Message from '../script/message.js'
import Hub from '../script/hub.js'

export default {
    data: function() {
        return {
            marketPlayers: [],
            page: 0,
            searchName: '',
            searchPos: [Message.filters('pos_c'), Message.filters('pos_f'), Message.filters('pos_g')],
            moreData: true,
            tradeOpen: false,
            tradeAble: true
        }
    },
    methods: {
        searchPlayer: function() {
            Market.getMarketPlayer(0, this.searchName, this.searchPos.toString()).then((res) => {
                if (res.data) {
                    this.marketPlayers = res.data;
                    this.checkMore(res.data)
                }
            });
        },
        clear: function() {
            this.page = 0;
            this.marketPlayers = [];
        },
        signed: function(playerId, pos) {
            let signedIndex = this.marketPlayers.findIndex(p => p.playerId === playerId);
            let signedPlayer = this.marketPlayers[signedIndex];
            signedPlayer.inTeam = true;
            signedPlayer.ablePos = signedPlayer.pos; //先将球员的可打位置保存
            signedPlayer.pos = pos; //pos用于下拉框默认选中当前所打位置
            signedPlayer.nextTradeableDate = Market.getNextTradeableDate()
            this.marketPlayers.splice(signedIndex, 1)
            Hub.eventHub.$emit('player-signed', signedPlayer)
        },
        checkMore: function(queryList) {
            if (queryList.length < 10) {
                this.moreData = false
            } else {
                this.moreData = true
            }
        },
        morePlayer: function() {
            let $btn = $(this.$el).find(".more-player").button('loading');
            this.page++;
            Market.getMarketPlayer(this.page, this.searchName, this.searchPos.toString()).then((res) => {
                if (res.data) {
                    this.marketPlayers = [...this.marketPlayers, ...res.data];
                    this.checkMore(res.data)
                }
                $btn.button('reset');
            });
        }
    },
    mounted: function() {

        Hub.eventHub.$on('team_players_size_change', (teamPlayersSize) => {
            if (teamPlayersSize >= 5) {
                this.tradeAble = false;
            } else {
                this.tradeAble = true;
            }
        })

        Market.getNextTradeableDate()

        //计时器
        let now = new Date();
        if (now.getHours() < 15) {
            Hub.eventHub.$emit('trade-open', this.tradeOpen)
            let openTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 5, 0);
            let count = Math.max((openTime.getTime() - now.getTime()), 0);
            $('.timer').countdown(count + now.valueOf(), (event) => {
                let $this = $(this.$el);
                switch (event.type) {
                    case "seconds":
                    case "minutes":
                    case "hours":
                    case "days":
                    case "weeks":
                    case "daysLeft":
                        $this.find('span.' + event.type).html(event.value);
                        break;
                    case "finished":
                        this.tradeOpen = true;
                        Hub.eventHub.$emit('trade-open', this.tradeOpen)
                        break;
                }
            });
        } else {
            this.tradeOpen = true;
            Hub.eventHub.$emit('trade-open', this.tradeOpen)
        }

        this.searchPlayer();
    },
    updated: function() {
        //多选框
        this.$nextTick(function() {
            $(this.$el).find('[data-toggle="checkbox"]').radiocheck();
        });
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
.search {
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

.pos-filter {
    margin-bottom: 10px;
}

.search-input:focus+span>#goSearch {
    border-color: #1aba9c;
    color: #1aba9c
}

.checkbox {
    display: inline-block;
    margin-left: 10px;
}

.trade_wait {
    margin-top: 10px;
}
</style>
