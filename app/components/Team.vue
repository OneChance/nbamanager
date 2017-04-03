<template>
<div id="team">
    <ul class="nav nav-pills" id="team_infos">
        <li role="presentation"><a href="#team_players">{{ 'team_players' | msg }}</a></li>
        <li role="presentation"><a href="#team_info">{{ 'team_info' | msg }}</a></li>
        <li role="presentation"><a href="#contract_log">{{ 'sign_log' | msg }}</a></li>
    </ul>
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane" id="team_players">
            <ul class="list-group">
                <transition-group name="li-list" tag="ul" class="list-group">
                    <player-component class="li-list-item" v-on:poschanged="poschanged" v-on:breaked="breaked" v-for="(player,index) in teamPlayers" v-bind:player="player" v-bind:index="index" v-bind:key="player" v-bind:tradeAble="tradeAble"></player-component>
                </transition-group>
            </ul>
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
                        <td>{{team.money}}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="btn btn-inverse btn-lg btn-block sign-out-btn" @click="signOut">{{'sign_out'|msg}}</button>
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
            tradeAble: true,
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
            let breakedIndex = this.teamPlayers.findIndex(p => p.playerId === playerId);
            let breakedPlayer = this.teamPlayers.splice(breakedIndex, 1)[0];
            let date = new Date();
            let now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let log = {
                date: now,
                money: breakedPlayer.sal,
                type: 'break_player',
                playerName: breakedPlayer.name
            }
            Hub.eventHub.$emit('team_players_size_change', this.teamPlayers.length)
        },
        poschanged: function() {
            this.somePosEmpty = this.teamPlayers.some(p => {
                return p.pos === Message.filters('pos_empty')
            });
        },
        signOut: function() {
            Account.signOut((res) => {
                GlobalVue.instance.$router.push('sign');
            })
        },
        changeTeamName: function() {
            Team.changeTeamName({
                name: this.team.name
            }, (res) => {
                if (res.type === 'success') {
                    Toastr.success(Message.filters('team_name_changed'))
                }
            })
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

        Team.getTeamInfo((res) => {
            if (res.type !== 'danger') {
                this.team = res.data;
                this.teamPlayers = res.data.players.map(player => {
                    player.inTeam = true;
                    return player;
                });
                Hub.eventHub.$emit('team_players_size_change', this.teamPlayers.length)
                this.poschanged();
            }
        });

        Hub.eventHub.$on('player-signed', (signedPlayer) => {
            this.teamPlayers.push(signedPlayer)
            Hub.eventHub.$emit('team_players_size_change', this.teamPlayers.length)
        })

        Hub.eventHub.$on('trade-open', (tradeOpen) => {
            this.tradeAble = tradeOpen
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

.sign-out-btn {
    maring-top: 10px
}
</style>
</style>
