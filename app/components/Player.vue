<template id="player">
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
</div>
</template>
<script>
import ServerMock from '../script/server-mock.js'
export default {
    props: ['player','index'],
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
    updated:function(){
      this.$nextTick(function () {
        this.img = require("../style/images/player/" + this.player.img + ".jpg")
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
</style>
