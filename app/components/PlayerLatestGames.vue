<template id="player_latest_games">
<canvas :id="playerImg+'games_eff'" width="400" height="200"></canvas>
</template>
<script>
export default {
    props: ['playerImg', 'latestGames'],
    mounted: function() {
        var ctx = $("#" + this.playerImg + "games_eff").get(0).getContext("2d");
        new Chart(ctx, {
            type: 'line',
            data: this.latestGames,
            options: {
                legend:{
                  display:false
                }
            }
        });
    }
}
</script>
