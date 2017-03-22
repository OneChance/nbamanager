<template id="player">
<li class="list-group-item player-card">
    <div class="player_info">
        <img :src="img" />
        <div class="info">
            <h4 class="player-name">{{player.name}}</h4>
            <h2 class="player-pos"><b>{{player.pos}}</b></h2>
        </div>

        <div class="contract">
            <div>
                <h3><b>${{player.sal}}</b></h3>
            </div>
            <div>
                <div class="btn-group btn-group-sm" role="group" aria-label="...">
                    <button v-if="player.inTeam" type="button" class="btn btn-danger" @click="breakContract">Break</button>
                    <button v-if="!player.inTeam" type="button" class="btn btn-success" @click="signContract">Sign</button>
                </div>
            </div>
        </div>

        <div class="collapse statistic" id="collapseExample">
            <ul class="nav nav-pills" id="statistic">
                <li role="presentation" class="active"><a :href="'#'+player.img+'-today'">Today</a></li>
                <li role="presentation"><a :href="'#'+player.img+'-latest-games'">Latest Games</a></li>
            </ul>
            <div class="tab-content player-statistic">
                <div role="tabpanel" class="tab-pane active" :id="player.img+'-today'">
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
                <div role="tabpanel" class="tab-pane" :id="player.img+'-latest-games'">
                    <player-latest-games v-bind:playerImg="player.img" v-bind:latestGames="player.latestGames"></player-latest-games>
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

export default {
    props: ['player', 'index'],
    data: function() {
        return {
            img: require("../style/images/player/" + this.player.id + ".jpg"),
            today: {}
        }
    },
    methods: {
        breakContract: function() {
            ServerMock.breakContract(this.index);
        },
        signContract: function() {
            ServerMock.signContract(this.index);
        }
    },
    updated: function() {
        this.$nextTick(function() {
            this.img = require("../style/images/player/" + this.player.id + ".jpg")
        });
    },
    mounted: function() {

        $(this.$el).find('.collapse').on('shown.bs.collapse', () => {
            Statistic.getGameToday(this.player.id, (res) => {
                if (res.data) {
                    this.today = res.data;
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
    },
    components: {
        PlayerLatestGames
    }
}
</script>
<style scoped>
.player_info>img {
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

.player-card {
    z-index: 100;
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
