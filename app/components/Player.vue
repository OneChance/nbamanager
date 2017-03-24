<template id="player">
<li class="list-group-item player-card">
    <div class="player_info">
        <img :src="img" class="clickImg" />
        <div class="info">
            <h4 class="player-name">{{player.name}}</h4>
            <select class="form-control" v-if="player.inTeam" :id="player.playerId+'-pos'">
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
                    <button v-if="player.inTeam" type="button" class="btn btn-danger" @click="breakPlayer" data-toggle="modal" :data-target="'#'+player.playerId+'-sign-modal'">Break</button>
                    <button v-if="!player.inTeam&&teamSize<5" type="button" class="btn btn-success" data-toggle="modal" :data-target="'#'+player.playerId+'-sign-modal'">Sign</button>
                </div>
            </div>
        </div>

        <div class="collapse statistic" id="collapseExample">
            <ul class="nav nav-pills" id="statistic">
                <li role="presentation" class="active"><a :href="'#'+player.id+'-today'">Today</a></li>
                <li role="presentation"><a :href="'#'+player.id+'-latest-games'">Latest Games</a></li>
            </ul>
            <div class="tab-content player-statistic">
                <div role="tabpanel" class="tab-pane active" :id="player.id+'-today'">
                    <table class="table table-bordered table-striped table-hover today-info">
                        <tbody>
                            <tr>
                                <th>MIN</th>
                                <th>FG%</th>
                                <th>3P%</th>
                                <th>FT%</th>
                                <th>O-REB</th>
                                <th>D-REB</th>
                                <th>REB</th>
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
                                <th>AST</th>
                                <th>STL</th>
                                <th>BLK</th>
                                <th>TO</th>
                                <th>PF</th>
                                <th>PTS </th>
                                <th>EFF</th>
                            </tr>
                            <tr>
                                <td>{{today.ast}}</td>
                                <td>{{today.stl}}</td>
                                <td>{{today.blk}}</td>
                                <td>{{today.to}}</td>
                                <td>{{today.pf}}</td>
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

    <div class="modal fade" :id="player.playerId+'-sign-modal'" tabindex="-1" role="dialog" aria-labelledby="signModal">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="mySmallModalLabel">{{this.player.name}}</h4>
                </div>
                <div class="modal-body">
                    <select class="form-control" :id="player.playerId+'-team-pos'">
                      <option v-for="pos in multiPos" :text="pos">{{pos}}</option>
                    </select>
                    <h4>以<b>${{player.sal}}</b>签约此球员？</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">&nbsp;否&nbsp;</button>
                    <button type="button" class="btn btn-success btn-sm" @click="signPlayer">&nbsp;是&nbsp;</button>
                </div>
            </div>
        </div>
    </div>
</li>
</template>
<script>
import ServerMock from '../script/server-mock.js'
import PlayerLatestGames from './PlayerLatestGames.vue'
import Statistic from '../script/server/statistic.js'
import Team from '../script/server/team.js'
import Toastr from '../plugin/toastr/toastr.min'

export default {
    props: ['player', 'index', 'teamSize'],
    data: function() {
        return {
            img: require("../style/images/player/" + this.player.playerId + ".jpg"),
            today: {},
            latest: {}
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

        },
        signPlayer: function() {
            $("#" + this.player.playerId + "-sign-modal").modal('hide');
            this.$emit('signed', this.player.id);

            /*Team.signPlayer({
                id: this.player.playerId,
                pos: $("#" + this.player.playerId + "-team-pos").val()
            }, (res) => {
                if (res.type === 'danger') {
                    Toastr.error(res.content)
                } else if (res.type === 'success') {
                    this.$emit('signed',this.playerId)
                }
            })*/
        }
    },
    updated: function() {
        this.$nextTick(function() {
            this.img = require("../style/images/player/" + this.player.playerId + ".jpg")
        });
    },
    mounted: function() {
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

        $(this.$el).find("img").on('click', (e) => {
            $('.collapse').collapse('hide');
            $(this.$el).find('.collapse').collapse('toggle');
        })

        $('#statistic a').click(function(e) {
            $(this).tab('show');
            return false;
        });

        if (this.multiPos.length > 1) {
            $("#" + this.player.playerId + "-pos").find("option[text=" + this.player.pos + "]").attr("selected", true);
        }
    },
    components: {
        PlayerLatestGames
    }
}
</script>
<style scoped>
.player_info>.clickImg {
    width: 100px;
    height: 100px;
    border: 5px solid #2c3e50;
    border-radius: 100px;
    cursor: pointer;
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
</style>
