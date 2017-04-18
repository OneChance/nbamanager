<template id="index">
<div id="frame">
    <div class="jumbotron">
        <h1><b>{{ 'title' | msg }}</b></h1>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 team">
                <team-component ref="team"></team-component>
            </div>
            <div class="col-md-6">
                <ul class="nav nav-pills" id="common">
                    <li role="presentation"><a href="#market">{{ 'player_market' | msg }}</a></li>
                </ul>
                <div class="tab-content">
                    <market-component ref="market"></market-component>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
require('../plugin/goup/jquery.goup.min.js')
import MarketComponent from './Market.vue'
import TeamComponent from './Team.vue'
import Message from '../script/message.js'
import Account from '../script/server/account.js'

export default {
    created: function() {

    },
    mounted: function() {
        Account.isLogin().then((res) => {
            if (res.type === 'success') {
                $.goup({
                    trigger: 100,
                    bottomOffset: 50,
                    locationOffset: 50,
                    title: '',
                    titleAsText: true
                });

                $('#common a').click(function(e) {
                    e.preventDefault();
                    $(this).tab('show');
                });

                $("a[href='#market']").trigger('click');

                $('#common a').on('shown.bs.tab', (e) => {
                    if (e.target.hash === '#market') {

                    } else {
                        this.$refs.market.clear();
                    }
                })
            } else {
                GlobalVue.instance.$router.push('sign');
            }
        });
    },
    components: {
        MarketComponent,
        TeamComponent
    },
    filters: {
        msg: Message.filters
    }
}
</script>

<style scoped>
.jumbotron h1 {
    display: inline-block;
}
</style>
