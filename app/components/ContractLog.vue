<template id="contracts">
<div role="tabpanel" class="tab-pane" id="contract_log">
    <div class="row search">
        <div class="col-lg-12">
            <div class="input-group">
                <input type="text" class="form-control search-input" v-model="searchNameContract" :placeholder=" 'search_player' | msg ">
                <span class="input-group-btn">
                  <button class="btn" type="button" id="goSearchContract" @click="searchContract"><span class="fui-search"></span></button>
                </span>
            </div>
        </div>
    </div>
    <transition-group name="li-list" tag="ul" class="list-group">
        <li class="list-group-item" v-bind:key="log" v-for="log in contractLogs">{{log.date}}&nbsp;<b>${{log.money}}</b>&nbsp;{{(log.type==='sign'?'sign_player':'break_player')|msg}}&nbsp;<b>{{log.playerName}}</b></li>
    </transition-group>
</div>
</template>
<script>
import Team from '../script/server/team.js'
import Message from '../script/message.js'

export default {
    data: function() {
        return {
            contractLogs: [],
            searchNameContract: ''
        }
    },
    methods: {
        searchContract: function() {
            Team.getContractLog(0, this.searchNameContract).then((res) => {
                if (res.data) {
                    this.contractLogs = res.data
                }
            });
        },
        clear: function() {
            this.contractLogs = [];
        }
    },
    mounted: function() {

    },
    filters: {
        msg: Message.filters
    }
}
</script>
<style scoped>
.search {
    margin-top: 10px;
    margin-bottom: 10px;
}

.search-input:focus+span>#goSearchContract {
    border-color: #1aba9c;
    color: #1aba9c
}

b {
    color: #1aba9c;
}
</style>
