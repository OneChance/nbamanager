<template id="player_latest_games">
<canvas :id="playerId+'games_eff'" width="400" height="200"></canvas>
</template>
<script>
export default {
    props: ['playerId', 'latest'],
    data: function() {
        return {
            ctx: null
        }
    },
    mounted: function() {
        this.ctx = $("#" + this.playerId + "games_eff").get(0).getContext("2d");
    },
    watch: {
        latest: function() {
            new Chart(this.ctx, {
                type: 'line',
                data: {
                    labels: this.latest.labels,
                    datasets: [
                        Object.assign({}, chartCommon, {
                            data: this.latest.evs,
                        })
                    ]
                },
                options: {
                    legend: {
                        display: false
                    }
                }
            });
        }
    }
}

let chartCommon = {
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
</script>
