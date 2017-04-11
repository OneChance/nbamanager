export default {
    filters: (value) => {
        return msgs[value];
    }
}

let msgs = {
    title: "NBA经理",
    team_name: "球队名称",
    team_money: "资金",
    player_market: "球员市场",
    team_info: "球队信息",
    team_players: "球员列表",
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
    g_full: "后卫名额已满",
    team_not_full: "球队不满5人,将无法参加比赛,快去球员市场签约吧!",
    some_pos_empty: "有球员未分配位置,将无法参加比赛!",
    pos_empty: "未分配",
    sign_in: "进入",
    your_name: "账户",
    password: "密码",
    pos_c: "中锋",
    pos_f: "前锋",
    pos_g: "后卫",
    sign_out: "离开",
    more_player: "更多球员",
    min: "时间",
    fg: "投篮",
    p3: "三分",
    ft: "罚球",
    oreb: "前篮板",
    dreb: "后篮板",
    reb: "篮板",
    ast: "助攻",
    stl: "抢断",
    blk: "盖帽",
    fa: "失误",
    fo: "犯规",
    pts: "分数",
    eff: "效率",
    trade_wait: "本日交易即将开放",
    today: "今日",
    latest: "最近7场",
    server_error: "服务器通讯异常",
    login_status_error: "未登陆",
    sign_in_switch: "登陆",
    sign_up_switch: "注册",
    login_account_error: "账户信息错误",
    account_invalid: "无效的账户",
    team_name_changed: "球队名称已变更",
    not_enough_money: "球队资金不足",
    signing: "进入中...",
    loading: "加载中..."
}
