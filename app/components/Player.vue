<template id="player">
<li class="list-group-item player-card">
    <div class="player_info">
        <img :src="img" class="clickImg" data-toggle="collapse" :href="'#collapse'+player.id" />
        <div class="info">
            <h4 class="player-name">{{player.name}}</h4>
            <select class="form-control select select-primary mrs mbm" v-if="player.inTeam" :id="player.playerId+'-pos'" v-model="player.pos">
              <option :text="'pos_empty' | msg">{{ 'pos_empty' | msg }}</option>
              <option v-for="pos in multiPos" :text="pos">{{pos}}</option>
            </select>
            <h2 v-if="!player.inTeam" class="player-pos"><b>{{player.pos}}</b></h2>
        </div>

        <div class="contract">
            <div>
                <h3><b>${{player.sal}}</b></h3>
            </div>
            <div>
                <div class="btn-group btn-group-sm" role="group" aria-label="...">
                    <button v-if="player.inTeam && tradeOpen" type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#'+player.playerId+'-break-modal'">{{ 'break_player' | msg }}</button>
                    <button v-if="!player.inTeam" type="button" class="btn btn-success" data-toggle="modal" :data-target="'#'+player.playerId+'-sign-modal'">{{ 'sign_player' | msg }}</button>
                </div>
            </div>
        </div>

        <div class="collapse statistic" :id="'collapse'+player.id">
            <ul class="nav nav-pills" id="statistic">
                <li role="presentation" class="active"><a :href="'#'+player.id+'-today'">{{'today'|msg}}</a></li>
                <li role="presentation"><a :href="'#'+player.id+'-latest-games'">{{'latest'|msg}}</a></li>
            </ul>
            <div class="tab-content player-statistic">
                <div role="tabpanel" class="tab-pane active" :id="player.id+'-today'">
                    <table class="table table-bordered table-striped table-hover today-info">
                        <tbody>
                            <tr>
                                <th>{{'min'|msg}}</th>
                                <th>{{'fg'|msg}}</th>
                                <th>{{'p3'|msg}}</th>
                                <th>{{'ft'|msg}}</th>
                                <th>{{'oreb'|msg}}</th>
                                <th>{{'dreb'|msg}}</th>
                                <th>{{'reb'|msg}}</th>
                            </tr>
                            <tr>
                                <td>{{today.min}}</td>
                                <td>{{today.fg}}</td>
                                <td>{{today.p3}}</td>
                                <td>{{today.ft}}</td>
                                <td>{{today.oreb}}</td>
                                <td>{{today.dreb}}</td>
                                <td>{{today.reb}}</td>
                            </tr>
                            <tr>
                                <th>{{'ast'|msg}}</th>
                                <th>{{'stl'|msg}}</th>
                                <th>{{'blk'|msg}}</th>
                                <th>{{'fa'|msg}}</th>
                                <th>{{'fo'|msg}}</th>
                                <th>{{'pts'|msg}} </th>
                                <th>{{'eff'|msg}}</th>
                            </tr>
                            <tr>
                                <td>{{today.ast}}</td>
                                <td>{{today.stl}}</td>
                                <td>{{today.blk}}</td>
                                <td>{{today.fa}}</td>
                                <td>{{today.fo}}</td>
                                <td>{{today.pts}}</td>
                                <td><b>{{today.ev}}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div role="tabpanel" class="tab-pane" :id="player.id+'-latest-games'">
                    <player-latest-games v-bind:playerId="player.id" v-bind:latest="latest"></player-latest-games>
                </div>
            </div>
        </div>
    </div>

    <!--sign modal-->
    <div class="modal" :id="player.playerId+'-sign-modal'" tabindex="-1" role="dialog" aria-labelledby="signModal">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="mySmallModalLabel">{{this.player.name}}</h4>
                </div>
                <div class="modal-body">
                    <select class="form-control select select-primary mrs mbm" :id="player.playerId+'-team-pos'">
                      <option v-for="pos in multiPos" :text="pos">{{pos}}</option>
                    </select>
                    <h4><b>${{player.sal}}</b>{{ 'confirm_sign' | msg }}？</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">&nbsp;{{ 'confirm_no' | msg }}&nbsp;</button>
                    <button type="button" class="btn btn-success btn-sm" @click="signPlayer">&nbsp;{{ 'confirm_yes' | msg }}&nbsp;</button>
                </div>
            </div>
        </div>
    </div>

    <!--break modal-->
    <div class="modal" :id="player.playerId+'-break-modal'" tabindex="-1" role="dialog" aria-labelledby="breakModal">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="mySmallModalLabel">{{this.player.name}}</h4>
                </div>
                <div class="modal-body">
                    <h4>{{ 'confirm_break' | msg }}？</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">&nbsp;否&nbsp;</button>
                    <button type="button" class="btn btn-success btn-sm" @click="breakPlayer">&nbsp;是&nbsp;</button>
                </div>
            </div>
        </div>
    </div>
</li>
</template>
<script>
import PlayerLatestGames from './PlayerLatestGames.vue'
import Statistic from '../script/server/statistic.js'
import Team from '../script/server/team.js'
import Toastr from '../plugin/toastr/toastr.min'
import Message from '../script/message.js'

export default {
    props: ['player', 'index', 'teamSize', 'tradeOpen'],
    data: function() {
        return {
            img: require("../style/images/player/" + this.player.playerId + ".jpg"),
            today: {},
            latest: {},
            prePos: this.player.pos //记录改变之前的位置,用于改变位置操作失败后的恢复
        }
    },
    computed: {
        multiPos: function() {
            let pos = this.player.ablePos || this.player.pos;
            return pos.split("/");
        }
    },
    methods: {
        breakPlayer: function() {
            Team.breakPlayer({
                id: this.player.playerId
            }, (res) => {
                if (res.type === 'danger') {
                    Toastr.error(Message.filters(res.content))
                } else if (res.type === 'success') {
                    $("#" + this.player.playerId + "-break-modal").modal('hide');
                    this.$emit('breaked', this.player.playerId);
                }
            })
        },
        signPlayer: function() {
            Team.signPlayer({
                id: this.player.playerId,
                pos: $("#" + this.player.playerId + "-team-pos").val()
            }, (res) => {
                if (res.type === 'danger') {
                    Toastr.error(Message.filters(res.content))
                } else if (res.type === 'success') {
                    $("#" + this.player.playerId + "-sign-modal").modal('hide');
                    this.$emit('signed', this.player.playerId, $("#" + this.player.playerId + "-team-pos").val());
                }
            })
        }
    },
    updated: function() {
        this.$nextTick(function() {
            this.img = require("../style/images/player/" + this.player.playerId + ".jpg")
        });
    },
    mounted: function() {

        let vueComponent = this;

        $(this.$el).find('.collapse').on('shown.bs.collapse', () => {
            Statistic.getStatistic(this.player.playerId, (res) => {
                if (res.data) {
                    if (res.data.today) {
                        this.today = res.data.today;
                    }
                    if (res.data.latest) {
                        let latestChartData = {
                            labels: [],
                            evs: []
                        }
                        let latest = res.data.latest;
                        for (let key in latest) {
                            latestChartData.labels.push(key);
                            latestChartData.evs.push(latest[key]);
                        }
                        this.latest = latestChartData;
                    }
                }
            });
        });

        $('#statistic a').click(function(e) {
            $(this).tab('show');
            return false;
        });

        $("#" + this.player.playerId + "-pos").on("change", function() {
            Team.changePlayerPos({
                id: vueComponent.player.playerId,
                pos: $(this).val()
            }, (res) => {
                if (res.type === 'danger') {
                    $(this).val(vueComponent.prePos)
                    Toastr.error(Message.filters("change_player_pos_error") + ":" + Message.filters(res.content));
                } else {
                    vueComponent.prePos = $(this).val()
                    Toastr.success(Message.filters("change_player_pos_success"));
                    vueComponent.$emit('poschanged');
                }
            })
        })

        $(this.$el).find(".select").select2({
            dropdownCssClass: 'select-inverse-dropdown'
        });
    },
    components: {
        PlayerLatestGames
    },
    filters: {
        msg: Message.filters
    }
}
</script>
<style scoped>
.table {
    margin-bottom: 0px;
}

.player_info>.clickImg {
    width: 100px;
    height: 100px;
    border: 5px solid #2c3e50;
    border-radius: 100px;
    cursor: pointer;
}

@media ( max-width :320px) {
    .player_info>.clickImg {
        width: 60px;
        height: 60px;
    }
}

.player_info .info {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
}

.player_info .contract {
    text-align: center;
    display: inline-block;
    float: right;
}

.statistic {
    margin-top: 10px;
    padding: 10px;
}

.player-statistic {
    margin-top: 10px;
}

.today-info th,
td {
    text-align: center;
}

.contract h3 {
    margin-top: 10px;
}
</style>
