function addTask() {
    //idはここから取得した　https://developers.google.com/tasks/reference/rest
    const id =  "YOUR_ID"; //仕事リスト
    const dt_deadline = getLastWorkday();
    const task = {
        'title': 'タスクのタイトル',
        'due':  Utilities.formatDate(dt_deadline, 'JST','yyyy-MM-dd')  + "T00:00:00.000Z" //締切日。時刻は渡せない。なんで
    };
    Tasks.Tasks.insert(task, id);
    return;
}

function getLastWorkday(){
  //月末の営業日を取ってくる関数
  //参考：https://www.shanaidx.com/checkendofweekday/
    let today = new Date();
    let dt_lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0) //月末を長い日付形式で取得
    let result = checkWeekday(dt_lastDate);
    
    if(result){
      //月末が平日だったら
        return dt_lastDate;
    }else{
        for(let i=1; i<6; i ++){
        let dt_checkDate = new Date(dt_lastDate.getFullYear(), dt_lastDate.getMonth(), dt_lastDate.getDate() - i); //i分日付を遡る
        let result = checkWeekday(dt_checkDate);
        if(result){
            return dt_checkDate;
        }
    }

    }

}

function checkWeekday(date) {
  //引数dateが平日かどうかを確認する関数
  //参考：https://www.shanaidx.com/checkendofweekday/
    let week = date.getDay();
    // 曜日が土日ではないか確認
    if((week > 0) && (week < 6)){
      //祝日ではないか確認
        let events = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com').getEvents(new Date(date+' 00:00:00'),new Date(date+' 23:59:59'));
        if(events.length == 0){
            return true;
        }
    }
    return false;
}
