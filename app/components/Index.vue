<template id="index">
<div id="frame">
    <div class="jumbotron">
        <h1>NBA Manager</h1>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <player-list-component v-bind:players="team_players" v:bind:more=false></player-list-component>
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
                                <tr>
                                    <th>Arena</th>
                                    <td>{{team.arena.name}}</td>
                                </tr>
                                <tr>
                                    <th>Capacity</th>
                                    <td>{{team.arena.cap}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="market">
                        <div class="row search">
                            <div class="col-lg-12">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search for...">
                                    <span class="input-group-btn">
                                      <button class="btn btn-primary" type="button">Go!</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group">
                            <player-list-component v-bind:players="market_players"></player-list-component>
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

export default {
    data: function() {
        return {
            team_players: [],
            market_players: [],
            team: {
                name: '',
                money: '',
                arena: {}
            }
        }
    },
    methods: {

    },
    created: function() {

    },
    mounted: function() {

        Team.getTeamInfo((res) => {
            if (res.type !== 'danger') {
                this.team = res.data;
                this.team_players = res.data.playerList;
            }
        });

        $.goup({
            trigger: 100,
            bottomOffset: 150,
            locationOffset: 100,
            title: '',
            titleAsText: true
        });

        let indexComponent = this;

        $('#infos a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });

        $(".get-more").on('click', function(e) {
            var $btn = $(this).button('loading');
            setTimeout(function() {
                indexComponent.market_players = ServerMock.getMarketPlayers();
                $btn.button('reset');
            }, 1000);
        });
    },
    components: {
        PlayerListComponent
    }
}
</script>

<style scoped>
.search {
    margin: 10px;
}

.team-info {
    margin-top: 10px;
}
</style>
