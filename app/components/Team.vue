<template>
<div id="team">
    <ul class="nav nav-pills" id="team_infos">
        <li role="presentation"><a href="#team_players">{{ 'team_players' | msg }}</a></li>
        <li role="presentation"><a href="#team_info">{{ 'team_info' | msg }}</a></li>
        <li role="presentation"><a href="#contract_log">{{ 'sign_log' | msg }}</a></li>
    </ul>
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane" id="team_players">
            <transition-group name="li-list" tag="ul" class="list-group">
                <player-component class="li-list-item" v-on:poschanged="poschanged" v-on:breaked="breaked" v-for="(player,index) in teamPlayers" v-bind:player="player" v-bind:index="index" v-bind:key="player" v-bind:tradeAble="player.tradeAble" v-bind:tradeOpen="tradeOpen"></player-component>
            </transition-group>
            <div v-if="teamPlayers.length<5" class="alert alert-warning" role="alert">{{ "team_not_full" | msg }}</div>
            <div v-if="somePosEmpty" class="alert alert-warning" role="alert">{{ "some_pos_empty" | msg }}</div>
        </div>
        <div role="tabpanel" class="tab-pane" id="team_info">
            <table class="table table-bordered table-striped table-hover team-info">
                <tbody>
                    <tr>
                        <th>{{ 'team_name' | msg }}</th>
                        <td>
                            <div class="control-group icon-wrapper">
                                <input type="text" class="form-control" v-model="team.name" :placeholder=" 'team_name' | msg ">
                                <label v-if="teamNameChangeable" class="fui-new field-icon click-icon" @click="changeTeamName"></label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>{{ 'team_money' | msg }}</th>
                        <td><b>${{team.money}}</b></td>
                    </tr>
                    <tr>
                        <th>{{ 'earn_today' | msg }}</th>
                        <td><b class="earn">${{team.earnToday}}</b></td>
                    </tr>
                    <tr>
                        <th>{{ 'cost_today' | msg }}</th>
                        <td><b class="cost">${{team.costToday}}</b></td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="btn btn-primary btn-lg btn-block sign-out-btn" @click="signOut">{{'sign_out'|msg}}</button>
        </div>
        <div role="tabpanel" class="tab-pane" id="contract_log">
            <contract-log-component ref="contracts"></contract-log-component>
        </div>
    </div>
</div>
</template>
<script>
import PlayerComponent from './Player.vue'
import Account from '../script/server/account.js'
import ContractLogComponent from './ContractLog.vue'
import Team from '../script/server/team.js'
import Message from '../script/message.js'
import Hub from '../script/hub.js'
import GlobalVue from '../script/globalVue.js'
import Toastr from '../plugin/toastr/toastr.min'

export default {
    data: function() {
        return {
            teamPlayers: [],
            team: {},
            tradeOpen: false,
            somePosEmpty: false,
            teamNameChangeable: true
        }
    },
    watch: {
        "team.name": function(val, oldVal) {
            if (val === '') {
                this.teamNameChangeable = false
            } else {
                this.teamNameChangeable = true
            }
        }
    },
    methods: {
        breaked: function(playerId) {
            let breakedIndex = this.teamPlayers.findIndex(p => p.uuid === playerId);
            let breakedPlayer = this.teamPlayers.splice(breakedIndex, 1)[0];
            let date = new Date();
            let now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let log = {
                date: now,
                money: breakedPlayer.sal,
                type: 'break_player',
                playerName: breakedPlayer.name
            }
            this.team.money = (this.team.money - 0) + (breakedPlayer.sal - 0)
            Hub.eventHub.$emit('team_players_size_change', this.teamPlayers.length)
        },
        poschanged: function() {
            this.somePosEmpty = this.teamPlayers.some(p => {
                return p.pos === Message.filters('pos_empty')
            });
        },
        signOut: function() {
            Account.signOut().then((res) => {
                GlobalVue.instance.$router.push('sign');
            })
        },
        changeTeamName: function() {
            Team.changeTeamName({
                name: this.team.name
            }).then((res) => {
                if (res.type === 'success') {
                    Toastr.success(Message.filters('team_name_changed'))
                }
            });
        }
    },
    mounted: function() {

        $('#team_infos a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });

        $('#team_infos a').on('shown.bs.tab', (e) => {
            if (e.target.hash === '#contract_log') {
                this.$refs.contracts.searchContract();
            } else {
                this.$refs.contracts.clear();
            }
        })

        $("a[href='#team_players']").trigger('click');

        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        Team.getTeamInfo().then((res) => {
            if (res.type !== 'danger') {
                this.team = res.data;
                this.teamPlayers = res.data.players.map(player => {
                    player.inTeam = true;

                    let dateArray = player.nextTradeableDate.split("-")
                    let nextTradeableDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])

                    if (today < nextTradeableDate) {
                        player.tradeAble = false
                    } else {
                        player.tradeAble = true
                    }

                    return player;
                });
                Hub.eventHub.$emit('team_players_size_change', this.teamPlayers.length)
                this.poschanged();
            }
        });

        Hub.eventHub.$on('player-signed', (signedPlayer) => {
            this.teamPlayers.push(signedPlayer)
            this.team.money = this.team.money - signedPlayer.sal
            Hub.eventHub.$emit('team_players_size_change', this.teamPlayers.length)
        })

        Hub.eventHub.$on('trade-open', (tradeOpen) => {
            this.tradeOpen = tradeOpen
        })
    },
    components: {
        ContractLogComponent,
        PlayerComponent
    },
    filters: {
        msg: Message.filters
    }
}
</script>
<style scoped>
#team_players,
#team_info {
    margin-top: 10px;
}

.list-group-item {
    padding: 15px 15px;
}

.li-list-leave-active {
    position: absolute;
    width: 100%;
}

.li-list-move {
    transition: transform 0.5s;
}

.sign-out-btn {
    margin-top: 10px;
    margin-bottom: 10px;
}

#team_players .alert {
    margin-top: -10px
}

.earn {
    color: #e51c23;
}

.cost {
    color: #8bc34a;
}
</style>
</style>
