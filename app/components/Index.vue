<template id="index">
<div id="frame">
    <div class="jumbotron">
        <h1><b>{{ 'title' | msg }}</b></h1>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 team-player-list">
                <player-list-component v-on:breaked="breaked" v-on:poschanged="poschanged" v-bind:players="team_players" v-bind:tradeOpen="tradeOpen"></player-list-component>
                <div v-if="team_players.length<5" class="alert alert-warning" role="alert">{{ "team_not_full" | msg }}</div>
                <div v-if="somePosEmpty" class="alert alert-warning" role="alert">{{ "some_pos_empty" | msg }}</div>
            </div>
            <div class="col-md-6">
                <ul class="nav nav-pills" id="infos">
                    <li role="presentation" class="active"><a href="#team">{{ 'team_info' | msg }}</a></li>
                    <li role="presentation"><a href="#market">{{ 'player_market' | msg }}</a></li>
                    <li role="presentation"><a href="#contract_log">{{ 'sign_log' | msg }}</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="team">
                        <table class="table table-bordered table-striped table-hover team-info">
                            <tbody>
                                <tr>
                                    <th>{{ 'team_name' | msg }}</th>
                                    <td>{{team.name}}</td>
                                </tr>
                                <tr>
                                    <th>{{ 'team_money' | msg }}</th>
                                    <td>{{team.money}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button v-if="moreData" type="button" class="btn btn-inverse btn-lg btn-block log-out">{{'log_out'|msg}}</button>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="market">
                        <div v-if="tradeOpen">
                            <div class="row search">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <input type="text" class="form-control search-input" v-model="searchName" :placeholder=" 'search_player' | msg ">
                                        <span class="input-group-btn">
                                      <button class="btn" type="button" id="goSearch"><span class="fui-search"></span></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
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
                                <player-list-component v-on:signed="signed" v-bind:players="market_players" v-bind:teamSize="team_players.length"></player-list-component>
                                <button v-if="moreData" type="button" class="btn btn-success btn-lg btn-block get-more">{{'more_player'|msg}}</button>
                            </ul>
                        </div>
                        <div v-if="!tradeOpen">
                            <div class="alert alert-warning trade_wait" role="alert">{{ "trade_wait" | msg }}
                                <div class="timer">
                                    <span class="hours"></span>:<span class="minutes"></span>:<span class="seconds"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="contract_log">
                        <div class="row search">
                            <div class="col-lg-12">
                                <div class="input-group">
                                    <input type="text" class="form-control search-input" v-model="searchNameContract" :placeholder=" 'search_player' | msg ">
                                    <span class="input-group-btn">
                                    <button class="btn" type="button" id="goSearchContract"><span class="fui-search"></span></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="log in contract_logs">{{log.date}}&nbsp;<b>${{log.money}}</b>&nbsp;{{(log.type==='sign'?'sign_player':'break_player')|msg}}&nbsp;<b>{{log.playerName}}</b></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import PlayerListComponent from './PlayerList.vue'
import Team from '../script/server/team.js'
import Market from '../script/server/market.js'
import Message from '../script/message.js'

export default {
    data: function() {
        return {
            team_players: [],
            market_players: [],
            contract_logs: [],
            team: {
                name: '',
                money: '',
                arena: {}
            },
            page: 0,
            searchName: '',
            searchPos: [Message.filters('pos_c'), Message.filters('pos_f'), Message.filters('pos_g')],
            searchNameContract: '',
            somePosEmpty: false,
            moreData: true,
            tradeOpen: false
        }
    },
    watch: {
        searchName: (val, oldVal) => {

        }
    },
    methods: {
        signed: function(playerId, pos) {
            let signedIndex = this.market_players.findIndex(p => p.playerId === playerId);
            let signedPlayer = this.market_players[signedIndex];
            signedPlayer.inTeam = true;
            signedPlayer.ablePos = signedPlayer.pos; //先将球员的可打位置保存
            signedPlayer.pos = pos; //pos用于下拉框默认选中当前所打位置
            this.team_players.push(signedPlayer);
            this.market_players.splice(signedIndex, 1);
        },
        breaked: function(playerId) {
            let breakedIndex = this.team_players.findIndex(p => p.playerId === playerId);
            let breakedPlayer = this.team_players.splice(breakedIndex, 1)[0];
            let date = new Date();
            let now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let log = {
                date: now,
                money: breakedPlayer.sal,
                type: 'break_player',
                playerName: breakedPlayer.name
            }

            this.contract_logs.push(log)
        },
        poschanged: function() {
            this.somePosEmpty = this.team_players.some(p => {
                return p.pos === Message.filters('pos_empty')
            });
        },
        checkMore: function(queryList) {
            if (queryList.length < 10) {
                this.moreData = false
            } else {
                this.moreData = true
            }
        }
    },
    created: function() {

    },
    mounted: function() {

        Team.getTeamInfo((res) => {
            if (res.type !== 'danger') {
                this.team = res.data;
                this.team_players = res.data.players.map(player => {
                    player.inTeam = true;
                    return player;
                });
                this.poschanged();
            }
        });

        $.goup({
            trigger: 100,
            bottomOffset: 150,
            locationOffset: 100,
            title: '',
            titleAsText: true
        });

        $('#infos a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });

        $('#infos a').on('shown.bs.tab', (e) => {
            if (e.target.hash === '#market') {
                Market.getMarketPlayer(0, (res) => {
                    if (res.data) {
                        this.market_players = res.data
                        this.checkMore(res.data)
                    }
                }, this.searchName, this.searchPos.toString());
            } else {
                this.market_players = [];
            }

            if (e.target.hash === '#contract_log') {
                Team.getContractLog(0, (res) => {
                    if (res.data) {
                        this.contract_logs = res.data
                    }
                }, this.searchNameContract);
            } else {
                this.contract_logs = [];
            }
        })

        let vueComponent = this;

        $(".get-more").on('click', function(e) {
            var $btn = $(this).button('loading');
            vueComponent.page++;
            Market.getMarketPlayer(vueComponent.page, (res) => {
                if (res.data) {
                    vueComponent.market_players = [...vueComponent.market_players, ...res.data];
                    vueComponent.checkMore(res.data)
                }
                $btn.button('reset');
            }, vueComponent.searchName, vueComponent.searchPos.toString());
        });

        $("#goSearch").on('click', (e) => {
            Market.getMarketPlayer(0, (res) => {
                if (res.data) {
                    this.market_players = res.data;
                    this.checkMore(res.data)
                }
            }, this.searchName, this.searchPos.toString());
        });

        $("#goSearchContract").on('click', (e) => {
            Team.getContractLog(0, (res) => {
                if (res.data) {
                    this.contract_logs = res.data
                }
            }, this.searchNameContract);
        });

        //计时器
        var now = new Date();
        if (now.getHours() < 15) {
            var openTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0);
            var count = Math.max((openTime.getTime() - now.getTime()), 0);
            console.log(count);
            $('.timer').countdown(count + now.valueOf(), function(event) {
                var $this = $(this);
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
                        vueComponent.tradeOpen = true;
                        break;
                }
            });
        } else {
            this.tradeOpen = true;
        }
    },
    updated: function() {
        //多选框
        this.$nextTick(function() {
            $(this.$el).find('[data-toggle="checkbox"]').radiocheck();
        });
    },
    components: {
        PlayerListComponent
    },
    filters: {
        msg: Message.filters
    }
}

require('../plugin/countdown/css/style.css');
require('../plugin/countdown/js/jquery.countdown.js');
</script>

<style scoped>
.search,
#contract_log {
    margin: 10px 0;
}

.search .col-lg-12 {
    padding: 0;
}

.team-info {
    margin-top: 10px;
}

.search-input:focus+span>#goSearch {
    border-color: #1aba9c;
    color: #1aba9c
}

.search-input:focus+span>#goSearchContract {
    border-color: #1aba9c;
    color: #1aba9c
}

.checkbox {
    display: inline-block;
    margin-left: 10px;
}

.jumbotron h1 {
    display: inline-block;
}

.trade_wait {
    margin-top: 10px;
}
</style>
