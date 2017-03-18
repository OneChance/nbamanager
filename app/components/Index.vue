<template id="index">
<div id="frame">
    <div class="jumbotron">
        <h1>Hello, world!</h1>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <ul class="list-group" role="team-players">
                    <li class="list-group-item" v-for="(player,index) in team_players">
                        <player-component :player='player' :index='index'></player-component>
                    </li>
                </ul>
            </div>
            <div class="col-md-6">
                <ul class="nav nav-pills" id="myTabs">
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
                                    <td>rfasdfasdf</td>
                                </tr>
                                <tr>
                                    <th>Capital</th>
                                    <td>$30000</td>
                                </tr>
                                <tr>
                                    <th>Venue scale</th>
                                    <td>40000</td>
                                </tr>
                                <tr>
                                    <th>Fans</th>
                                    <td>1000000000</td>
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
                            <li class="list-group-item" v-for="(player,index) in market_players">
                                <player-component :player='player' :index='index'></player-component>
                            </li>
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
</template>

<script>
import PlayerComponent from './Player.vue'
import ServerMock from '../script/server-mock.js'

export default {
    data: function() {
        return {
            team_players: ServerMock.getTeamPlayers(),
            market_players: ServerMock.getMarketPlayers()
        }
    },
    methods: {

    },
    created: function() {

    },
    mounted: function() {
        $('#myTabs a').click(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });
    },
    components: {
        PlayerComponent
    }
}
</script>

<style>
.search {
    margin: 10px;
}

.team-info {
    margin-top: 10px;
}
</style>
