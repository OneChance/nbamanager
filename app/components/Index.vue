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
                        <button type="button" class="btn btn-inverse btn-lg btn-block log-out">{{'log_out'|msg}}</button>
                    </div>
                    <market ref="market" v-on:signed="signed"></market>
                    <contract-log ref="contracts"></contract-log>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import PlayerListComponent from './PlayerList.vue'
import Market from './Market.vue'
import ContractLog from './ContractLog.vue'
import Team from '../script/server/team.js'
import Message from '../script/message.js'

export default {
    data: function() {
        return {
            team_players: [],
            team: {
                name: '',
                money: '',
                arena: {}
            },
            tradeOpen: true,
            somePosEmpty: false,
        }
    },
    watch: {
        searchName: (val, oldVal) => {

        }
    },
    methods: {
        signed: function(signedPlayer) {
            this.team_players.push(signedPlayer);
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
                this.$refs.market.searchPlayer();
            } else {
                this.$refs.market.clear();
            }

            if (e.target.hash === '#contract_log') {
                this.$refs.contracts.searchContract();
            } else {
                this.$refs.contracts.clear();
            }
        })
    },
    components: {
        PlayerListComponent,
        ContractLog,
        Market
    },
    filters: {
        msg: Message.filters
    }
}
</script>

<style scoped>
.team-info {
    margin-top: 10px;
}

.jumbotron h1 {
    display: inline-block;
}
</style>
