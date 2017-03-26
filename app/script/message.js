export default {
    filters: (value) => {
        return msgs[value];
    }
}

let msgs = {
    title: "NBA篮球经理",
    team_info: "球队信息",
    team_name: "名称",
    team_money: "资金",
    player_market: "球员市场",
    sign_log: "合约日志",
    search: "搜索",
    search_player: "搜索球员",
    sign_player: "签约",
    break_player: "解约",
    confirm_sign: "签约此球员",
    confirm_break: "与此球员解约",
    confirm_no: "否",
    confirm_yes: "是",
    change_player_pos_success: "位置已分配",
    change_player_pos_error: "分配未成功",
    c_full: "中锋名额已满",
    f_full: "前锋名额已满",
    team_not_full: "球队不满5人,将无法参加比赛!",
    some_pos_empty: "有球员未分配位置,将无法参加比赛!",
    pos_empty: "未分配",
    login: "进入",
    your_name: "身份",
    password: "口令"
}
