import Ajax from './ajax.js'
import Common from '../common.js'

export default {
    getMarketPlayer: function(page, searchName, searchPos) {
        return Ajax.getData('/getMarketPlayer/' + page + '/', {
            'searchName': searchName,
            'searchPos': searchPos
        });
    },
    getNextTradeableDate: function() {
        let now2 = new Date()
        let nextTradeableDate = new Date(now2)
        nextTradeableDate.setDate(now2.getDate() + 7)
        return Common.getFormattedDate(nextTradeableDate)
    }
}
