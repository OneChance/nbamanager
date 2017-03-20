import toastr from '../plugin/toastr/toastr.min'

export default {
    team_players: [],
    market_players: [],
    onepage: 3,

    getTeamPlayers: function() {
        return this.team_players = players.splice(0, 4).map(player => {
            player.inTeam = true;
            return player;
        });
    },
    getMarketPlayers: function() {
        var toAdd = players.splice(0, this.onepage).map(player => {
            player.inTeam = false;
            return player;
        });

        return [...this.market_players, ...toAdd];
    },
    breakContract: function(index) {
        let breakPlayer = this.team_players.splice(index, 1)[0];
        breakPlayer.inTeam = false;
        this.market_players.push(breakPlayer);
    },
    signContract: function(index) {
        if (this.team_players.length === 5) {
            toastr.error('Team is full')
            return;
        }
        let signPlayer = this.market_players.splice(index, 1)[0];
        signPlayer.inTeam = true;
        this.team_players.push(signPlayer);
    }
}

var players = [{
        img: '5007',
        name: 'Anthony Davis',
        pos: 'C/PF',
        money: 3000,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4614',
        name: 'DeMar DeRozan',
        pos: 'SF',
        money: 2900,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4612',
        name: 'Stephen Curry',
        pos: 'PG',
        money: 4000,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    }, {
        img: '3704',
        name: 'LeBron James',
        pos: 'SF',
        money: 4200,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4244',
        name: 'Kevin Durant',
        pos: 'SF',
        money: 4100,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4390',
        name: 'Russell Westbrook',
        pos: 'PG',
        money: 4000,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4840',
        name: 'Kyrie Irving',
        pos: 'PG',
        money: 3800,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4896',
        name: 'Kawhi Leonard',
        pos: 'SF',
        money: 3900,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '5012',
        name: 'Damian Lillard',
        pos: 'PG',
        money: 3500,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4720',
        name: 'DeMarcus Cousins',
        pos: 'C',
        money: 3300,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4563',
        name: 'James Harden',
        pos: 'SG',
        money: 4000,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    },
    {
        img: '4942',
        name: 'Isaiah Thomas',
        pos: 'PG',
        money: 2200,
        today: {
            min: '36',
            fg: '12/17',
            p3: '0/0',
            ft: '7/8',
            oreb: '4',
            dreb: '15',
            reb: '19',
            ast: '2',
            st: '0',
            blk: '3',
            to: '1',
            pf: '3',
            pts: '31',
            eff: '22'
        }
    }
]
