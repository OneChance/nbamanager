export default {
    filters: (value) => {
        return msgs[value];
    }
}

let msgs = {
    change_player_pos_success: "位置已分配",
    change_player_pos_error: "分配未成功",
    c_full: "中锋名额已满",
    f_full: "前锋名额已满",
    team_not_full: "球队不满5人,将无法参加比赛!",
    some_pos_empty: "有球员未分配位置,将无法参加比赛!",
    pos_empty: "未分配"
}
