import toastr from '../plugin/toastr/toastr.min'

export default {
    team_players: [],
    market_players: [],
    onepage: 3,
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
