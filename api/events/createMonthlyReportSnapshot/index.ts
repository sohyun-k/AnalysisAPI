import { randomUUID } from "crypto";
import { client } from "../../datasource/connection";
import {
  getAllEmotionCountsInMonth,
  getAllMoryCountsInMonth,
  getAllUserCountsInMonth,
  getAllUserRanksInMonth,
  getUserEmotionCountsInMonth,
  getUserMorysInMonth,
} from "../../datasource/mory"

export const createMonthlyReportSnapshot = async (event, context, callback) => {
  var result;

  //TODO:
  // 현재 year, month 구하기
  // ! 월말이 끝난 시점에 실행되는 쿼리이기 때문에 현재 시간으로 구하면 다음달이 됩니다.

  // const moment = require('moment');
  // const today = moment().format('YYYY-MM-DD');
  // var splitDay = today.split("-");
  // var year = Number(splitDay[0]);
  // var month = Number(splitDay[1]);
  // if(splitDay[1] == 1){
  //   year = year-1;
  //   month = 12;
  // }

  //test
  var month = 11;
  var year = 2021;

  //TODO: 사용자 전체에 대한 데이터 구하고 저장하기
  // monthly_all 테이블에 저장하는 데이터를 구하기 

  const allThisMonthEmotionCount = await getAllEmotionCountsInMonth(Number(year), Number(month));
  const total_count = await getAllMoryCountsInMonth(Number(year), Number(month));
  const emotion_count_id = 'monthly-'+String(year)+'-'+String(month);
  var emotion_sql_str = "(id";
  var emotion_sql_val_str = "($1, ";
  var emotion_sql_values = [];
  emotion_sql_values.push(emotion_count_id);
  for(var idx=0; idx<allThisMonthEmotionCount.length; idx++){
    emotion_sql_str += ", "+allThisMonthEmotionCount[idx].emotion;
    emotion_sql_values.push(allThisMonthEmotionCount[idx].count);
    emotion_sql_val_str += "$"+String(idx+2);
    if(idx < allThisMonthEmotionCount.length-1){
      emotion_sql_val_str += ", ";
    }
  }
  emotion_sql_str += ')';
  emotion_sql_val_str += ')';
  const emotion_count_sql = 'INSERT INTO emotion_count '+emotion_sql_str+" VALUES "+emotion_sql_val_str+" RETURNING *";

  client.query(emotion_count_sql, emotion_sql_values, (err, res) =>{
    if(err) {
      console.log(err.stack);
    }
    else{
      console.log(res.rows[0]);
    }
  });


  const num_user = await getAllUserCountsInMonth(year,month);
  
  // monthly_all의 id는? ///////////
  const monthly_all_sql = "INSERT INTO monthly_all (id, year, month, total_count, num_user, emotion_count_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const monthly_all_values = [randomUUID().toString(), year, month, total_count, num_user, emotion_count_id];

  client.query(monthly_all_sql, monthly_all_values, (err,res) => {
    if(err){
      console.log(err.stack);
    }
    else{
      console.log(res.rows[0]);
    }
  });  

  const userRank = await getAllUserRanksInMonth(year, month);

  const users = Object.keys(userRank);
  for(var idx=0; idx<users.length; idx++){
    const userMorys = await getUserMorysInMonth(year, month, users[idx]);
    const userMoryCounts = userMorys.length;
    if(userMoryCounts == 0)
      continue;
    const user_emotion_count_id = users[idx]+'-'+String(year)+'-'+String(month);
    const user_emotion_count = await getUserEmotionCountsInMonth(year, month, users[idx]);

    var user_emotion_sql_str = "(id";
    var user_emotion_sql_val_str = "($1, ";
    var user_emotion_sql_values = [];
    user_emotion_sql_values.push(user_emotion_count_id);
    for(var emotion_idx=0; emotion_idx<user_emotion_count.length; emotion_idx++){
      user_emotion_sql_str += ", "+user_emotion_count[emotion_idx].emotion;
      user_emotion_sql_values.push(user_emotion_count[emotion_idx].num);
      user_emotion_sql_val_str += "$"+String(emotion_idx+2);
      if(emotion_idx < user_emotion_count.length-1){
        user_emotion_sql_val_str += ", ";
      }
    }
    user_emotion_sql_str += ')';
    user_emotion_sql_val_str += ')';

    const user_emotion_count_sql = 'INSERT INTO emotion_count '+user_emotion_sql_str+" VALUES "+user_emotion_sql_val_str+" RETURNING *";

    client.query(user_emotion_count_sql, user_emotion_sql_values, (err, res) =>{
      if(err) {
        console.log(err.stack);
      }
      else{
        console.log(res.rows[0]);
      }
    });

    // // //2번 무슨소리지 ///////////
    // // // 2. 이번주에 momory 만든 개수 / 일 => weekly_report에 grid_heatmap_source
    // const grid_heatmap_source = userMoryCounts/7;
    // const rank = userRank[users[idx]]; //4
    // //GeoCluster???
    // //const geo_cluster = createGeoClusterCenterInfo;
    // const weekly_report_sql = "INSERT INTO monthly_report (id, year, month, total_count, rank, grid_hitmap_source, geo_cluster, mories, emotion_count_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    // const weekly_report_values = [users[idx], year, month, userMoryCounts, rank, grid_heatmap_source, geo_cluster, userMorys, user_emotion_count_id];
    
    // client.query(weekly_report_sql, weekly_report_values, (err,res) => {
    //   if(err) {
    //     console.log(err.stack);
    //   }
    //   else{
    //     console.log(res.rows[0]);
    //   }
    // });




  }



  callback(null, result);
};
