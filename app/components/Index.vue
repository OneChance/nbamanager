<template id="index">
<div id="frame">
    <div class="jumbotron">
        <h1>NBA Manager</h1>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 team-player-list">
                <player-list-component v-on:breaked="breaked" v-on:poschanged="poschanged" v-bind:players="team_players" v:bind:more=false></player-list-component>
                <div v-if="team_players.length<5" class="alert alert-warning" role="alert">{{ "team_not_full" | msg }}</div>
                <div v-if="somePosEmpty" class="alert alert-warning" role="alert">{{ "some_pos_empty" | msg }}</div>
            </div>
            <div class="col-md-6">
                <ul class="nav nav-pills" id="infos">
                    <li role="presentation" class="active"><a href="#team">Team</a></li>
                    <li role="presentation"><a href="#market">Market</a></li>
                    <li role="presentation"><a href="#sign_log">Sign Log</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="team">
                        <table class="table table-bordered table-striped table-hover team-info">
                            <tbody>
                                <tr>
                                    <th>TeamName</th>
                                    <td>{{team.name}}</td>
                                </tr>
                                <tr>
                                    <th>Money</th>
                                    <td>{{team.money}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="market">
                        <div class="row search">
                            <div class="col-lg-12">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="searchName" placeholder="Search for...">
                                    <span class="input-group-btn">
                                      <button class="btn btn-primary" type="button" id="goSearch">Go!</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group">
                            <player-list-component v-on:signed="signed" v-bind:players="market_players" v-bind:teamSize="team_players.length"></player-list-component>
                            <button type="button" class="btn btn-success btn-lg btn-block get-more">More</button>
                        </ul>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="sign_log">
                        <ul class="list-group">
                            <li class="list-group-item">asdfasdfasdf</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
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
import ServerMock from '../script/server-mock.js'
import Team from '../script/server/team.js'
import Market from '../script/server/market.js'
import Message from '../script/message.js'

export default {
    data: function() {
        return {
            team_players: [],
            market_players: [],
            team: {
                name: '',
                money: '',
                arena: {}
            },
            page: 0,
            searchName: '',
            somePosEmpty: false
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
            this.team_players.splice(breakedIndex, 1);
        },
        poschanged: function() {
            this.somePosEmpty = this.team_players.some(p => {
                return p.pos === Message.filters('pos_empty')
            });
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
                        this.market_players = res.data;
                    }
                }, this.searchName);
            } else {
                this.market_players = [];
            }
        })

        let vueComponent = this;

        $(".get-more").on('click', function(e) {
            var $btn = $(this).button('loading');
            vueComponent.page++;
            Market.getMarketPlayer(vueComponent.page, (res) => {
                if (res.data) {
                    vueComponent.market_players = [...vueComponent.market_players, ...res.data];
                }
                $btn.button('reset');
            }, vueComponent.searchName);
        });

        $("#goSearch").on('click', (e) => {
            Market.getMarketPlayer(0, (res) => {
                if (res.data) {
                    this.market_players = res.data;
                }
            }, this.searchName);
        });
    },
    components: {
        PlayerListComponent
    },
    filters: {
        msg: Message.filters
    }
}
</script>

<style scoped>
.search {
    margin: 10px 0;
}

.search .col-lg-12 {
    padding: 0;
}

.team-info {
    margin-top: 10px;
}
</style>
