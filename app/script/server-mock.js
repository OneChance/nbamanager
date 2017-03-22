import toastr from '../plugin/toastr/toastr.min'

export default {
    team_players: [],
    market_players: [],
    onepage: 3,

    getTeamPlayers: function() {

    },
    getMarketPlayers: function() {
        var toAdd = players.splice(0, this.onepage).map(player => {
            player.inTeam = false;
            return player;
        });
        return this.market_players = [...this.market_players, ...toAdd];;
    },
    breakContract: function(index) {
        let breakPlayer = this.team_players.splice(index, 1)[0];
        breakPlayer.inTeam = false;
        players.push(breakPlayer);
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

var chartCommon = {
    fillColor: "rgba(151,187,205,0.5)",
    strokeColor: "rgba(151,187,205,1)",
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#fff",
    fill: false,
    borderColor: "rgba(75,192,192,1)",
    borderCapStyle: 'butt',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHitRadius: 10,
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [
                Object.assign({}, chartCommon, {
                    data: [28, 22, 18, 30, 17, 9, 25],
                })
            ]
        }
    },
    {
        img: '4614',
        name: 'DeMar DeRozan',
        pos: 'SF',
        money: 2900,
        today: {
            min: '30',
            fg: '8/13',
            p3: '2/4',
            ft: '4/5',
            oreb: '1',
            dreb: '2',
            reb: '3',
            ast: '6',
            st: '1',
            blk: '1',
            to: '2',
            pf: '1',
            pts: '22',
            eff: '15'
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [
                Object.assign({}, chartCommon, {
                    data: [1, 2, 3, 4, 5, 6, 7],
                })
            ]
        }
    },
    {
        img: '4612',
        name: 'Stephen Curry',
        pos: 'PG',
        money: 4000,
        today: {
            min: '32',
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 22, 18, 30, 17, 9, 25]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [30, 28, 27, 31, 35, 30, 26]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 22, 18, 30, 17, 9, 25]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 22, 18, 30, 17, 9, 25]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 22, 18, 30, 17, 9, 25]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 22, 18, 30, 17, 9, 25]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 22, 18, 30, 17, 9, 25]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [15, 20, 13, 22, 11, 7, 18]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 22, 18, 30, 17, 9, 25]
            }]
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
        },
        latestGames: {
            labels: ["17/01/23", "17/01/24", "17/01/28", "17/02/03", "17/02/05", "17/02/06", "17/02/08"],
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [28, 22, 18, 30, 17, 9, 25]
            }]
        }
    }
]
