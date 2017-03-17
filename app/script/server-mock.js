export default {
    team_players: [],
    market_players: [],

    init: function() {
        this.team_players = players.splice(0, 4);
        this.team_players.map(player => player.inTeam = true);
        this.market_players = players;
        this.market_players.map(player => player.inTeam = false);
    },
    breakContract: function(player) {

        let index = this.team_players.findIndex(function(value, index, arr) {
            return value.img === player.img;
        });
        
        this.team_players.splice(index,1);

        //  this.market_players.push(this.team_players.splice(index,1));
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
