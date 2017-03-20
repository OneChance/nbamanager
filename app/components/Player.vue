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
                <h3><b>${{player.money}}</b></h3>
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
                <li role="presentation" class="active"><a href="#today">Today</a></li>
                <li role="presentation"><a href="#game7">Latest 7 Games</a></li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="today">
                    <table class="table table-bordered table-striped table-hover team-info">
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
                                <td>{{player.today.min}}</td>
                                <td>{{player.today.fg}}</td>
                                <td>{{player.today.p3}}</td>
                                <td>{{player.today.ft}}</td>
                                <td>{{player.today.oreb}}</td>
                                <td>{{player.today.dreb}}</td>
                                <td>{{player.today.reb}}</td>
                            </tr>
                            <tr>
                                <th>AST</th>
                                <th>ST</th>
                                <th>BLK</th>
                                <th>TO</th>
                                <th>PF</th>
                                <th>PTS </th>
                                <th>EFF</th>
                            </tr>
                            <tr>
                                <td>{{player.today.ast}}</td>
                                <td>{{player.today.st}}</td>
                                <td>{{player.today.blk}}</td>
                                <td>{{player.today.to}}</td>
                                <td>{{player.today.pf}}</td>
                                <td>{{player.today.pts}}</td>
                                <td><b>{{player.today.eff}}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div role="tabpanel" class="tab-pane active" id="game7">
                </div>
            </div>
        </div>
    </div>
</li>
</template>
<script>
import ServerMock from '../script/server-mock.js'

export default {
    props: ['player', 'index'],
    data: function() {
        return {
            img: require("../style/images/player/" + this.player.img + ".jpg")
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
            this.img = require("../style/images/player/" + this.player.img + ".jpg")
        });
    },
    mounted: function() {
        $(this.$el).find("img").on('click', (e) => {
            $('.collapse').collapse('hide');
            $(this.$el).find('.collapse').collapse('toggle');
        })

        $('#statistic a').click(function(e) {
            $(this).tab('show');
            return false;
        });
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

#today table th,
td {
    text-align: center;
}
</style>
