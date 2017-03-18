export default {
    team_players: [],
    market_players: [],

    getTeamPlayers: function() {
        return this.team_players = players.splice(0, 4).map(player => {
            player.inTeam = true;
            return player;
        });
    },
    getMarketPlayers: function() {
        return this.market_players = players.map(player => {
            player.inTeam = false;
            return player
        });
    },
    breakContract: function(index) {
        let breakPlayer = this.team_players.splice(index, 1)[0];
        breakPlayer.inTeam = false;
        this.market_players.push(breakPlayer);
    }
}

var players = [{
        img: '5007',
        name: 'Anthony Davis',
        pos: 'C/PF',
        money: 3000
    },
    {
        img: '4614',
        name: 'DeMar DeRozan',
        pos: 'SF',
        money: 2900
    },
    {
        img: '4612',
        name: 'Stephen Curry',
        pos: 'PG',
        money: 4000
    }, {
        img: '3704',
        name: 'LeBron James',
        pos: 'SF',
        money: 4200
    },
    {
        img: '4244',
        name: 'Kevin Durant',
        pos: 'SF',
        money: 4100
    },
    {
        img: '4390',
        name: 'Russell Westbrook',
        pos: 'PG',
        money: 4000
    },
    {
        img: '4840',
        name: 'Kyrie Irving',
        pos: 'PG',
        money: 3800
    },
    {
        img: '4896',
        name: 'Kawhi Leonard',
        pos: 'SF',
        money: 3900
    },
    {
        img: '5012',
        name: 'Damian Lillard',
        pos: 'PG',
        money: 3500
    },
    {
        img: '4720',
        name: 'DeMarcus Cousins',
        pos: 'C',
        money: 3300
    },
    {
        img: '4563',
        name: 'James Harden',
        pos: 'SG',
        money: 4000
    },
    {
        img: '4942',
        name: 'Isaiah Thomas',
        pos: 'PG',
        money: 2200
    }
]
