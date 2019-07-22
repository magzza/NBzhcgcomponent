// ==UserScript==
// @name         NBzhcgNotify
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  nbzhcg 案件提醒 v0.2.2修改日期+1
// @author       Qi
// @match        http://10.19.179.6/eUrbanMIS/main.htm*
// @require      https://cdn.bootcss.com/jquery/2.2.3/jquery.js
// @grant        GM_xmlhttpRequest
// @grant   　　 GM_notification
// ==/UserScript==

(function() {
    'use strict';
    function mytest(){
       GM_xmlhttpRequest ( {
    method:     'GET',
    dataType: "json",
    url:        'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=29&currentPage=1&numPerPage=20&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1525998694102',
    onload:     function (responseDetails) {
                    // DO ALL RESPONSE PROCESSING HERE...
                    var jsonstr = JSON.parse(responseDetails.responseText);
                   return1(jsonstr);
                    //console.log (
                    //    "GM_xmlhttpRequest() response is:\n",
                    //    responseDetails.responseText
                    //);
                }
    } );
    }
    function return1(str){
        GM_xmlhttpRequest ( {
            method:     'GET',
            dataType: "json",
            url:        'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=2&currentPage=1&numPerPage=10&sortFieldID=-1&sortType=&_=1526021177139',
            onload:     function (responseDetails) {
                // DO ALL RESPONSE PROCESSING HERE...
                var jsonstr = JSON.parse(responseDetails.responseText);
                return22(str,jsonstr);
                //console.log (
                //    "GM_xmlhttpRequest() response is:\n",
                //    responseDetails.responseText
                //);
            }
        } );
    }


     function return22(str1,str2){
         var date = new Date();
         date.setDate(date.getDate()+1);
         var year = date.getFullYear();
         var month = date.getMonth()+1;
         var day = date.getDate();
         var creatTime = year+'-'+month+'-'+day;
         var deadTime = year+'-'+month+'-'+day;
         var url = "http://10.68.128.8:5080/eUrbanMIS/home/stat/stat/antiquery?queryID=2&condparams=%7B%22queryConds%22%3A+%255B%257B%2522condId%2522%3A%25221%2522%2C%2522fieldName%2522%3A%2522create_time%2522%2C%2522compType%2522%3A%2522%25E5%25B0%258F%25E4%25BA%258E%2522%2C%2522dataTypeID%2522%3A%252211%2522%2C%2522values%2522%3A%255B%2522" + creatTime + "%252000%3A00%3A00%2522%255D%2C%2522condProperty%2522%3A%25220%2522%2C%2522condType%2522%3A%25220%2522%2C%2522outParams%2522%3A%2522%2522%257D%2C%257B%2522condId%2522%3A%25228%2522%2C%2522fieldName%2522%3A%2522district_name%2522%2C%2522compType%2522%3A%2522%25E7%25AD%2589%25E4%25BA%258E%2522%2C%2522dataTypeID%2522%3A%2522126%2522%2C%2522fieldTypeInfo%2522%3A%2522(district_id%2520in%2520(%257B1%257D)%2520or%2520street_id%2520in%2520(%257B2%257D)%2520or%2520community_id%2520in%2520(%257B3%257D))%2522%2C%2522values%2522%3A%255B%25221%3A14%2522%255D%2C%2522condProperty%2522%3A%25220%2522%2C%2522condType%2522%3A%25220%2522%2C%2522outParams%2522%3A%2522%2522%257D%2C%257B%2522condId%2522%3A%252214%2522%2C%2522fieldName%2522%3A%2522dispose_deadline%2522%2C%2522compType%2522%3A%2522%25E5%25B0%258F%25E4%25BA%258E%2522%2C%2522dataTypeID%2522%3A%252211%2522%2C%2522values%2522%3A%255B%2522"+ deadTime +"%252009%3A00%3A00%2522%255D%2C%2522condProperty%2522%3A%25220%2522%2C%2522condType%2522%3A%25220%2522%2C%2522outParams%2522%3A%2522%2522%257D%2C%257B%2522condId%2522%3A%252216%2522%2C%2522fieldName%2522%3A%2522cur_act_def_id%2522%2C%2522compType%2522%3A%2522%25E7%25AD%2589%25E4%25BA%258E%2522%2C%2522dataTypeID%2522%3A%2522126%2522%2C%2522fieldTypeInfo%2522%3A%2522(cur_act_def_id%2520in%2520(%257B0%257D))%2522%2C%2522values%2522%3A%255B%25220%3A307%2522%255D%2C%2522condProperty%2522%3A%25220%2522%2C%2522condType%2522%3A%25220%2522%2C%2522outParams%2522%3A%2522%2522%257D%255D%7D&antiParam=&hidenCondSql=&page=1&rows=500";

        GM_xmlhttpRequest ( {
            method:     'GET',
            dataType: "json",
            url:        url,
            onload:     function (responseDetails) {
                // DO ALL RESPONSE PROCESSING HERE...
               if(responseDetails.responseText.indexOf("登录")>-1)
               {
                    //  alert("请点击综合查询后关闭");
                   // return2(str1,str2,[]);
                   chaoqiLogin();
               }else{
                   var overDue = JSON.parse(responseDetails.responseText);
                   console.log("overDue");
                   console.log(overDue.rows);
                   getHeChaInfo(str1,str2,overDue.rows);
               }
                //console.log (
                //    "GM_xmlhttpRequest() response is:\n",
                //    responseDetails.responseText
                //);
            }
        } );
    }

    function getHeChaInfo(str,str1,str2){
        GM_xmlhttpRequest ( {
            method:     'GET',
            dataType: "json",
            url: 'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=30&currentPage=1&numPerPage=200&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1563525601113',
            onload:     function (responseDetails) {
                // DO ALL RESPONSE PROCESSING HERE...
                var jsonstr = JSON.parse(responseDetails.responseText);
                return2(str,str1,str2,jsonstr);
                //console.log (
                //    "GM_xmlhttpRequest() response is:\n",
                //    responseDetails.responseText
                //);
            }
        } );
    }

    function chaoqiLogin()
    {
        GM_xmlhttpRequest ( {
            method:     'GET',
            dataType: "json",
            url:        "http://10.19.179.6/eUrbanMIS/home/gettoken",
            onload:     function (responseDetails) {
                // DO ALL RESPONSE PROCESSING HERE...
                var jsonstr = JSON.parse(responseDetails.responseText);
                var token = jsonstr.resultInfo.data.token;
                GM_xmlhttpRequest ( {
                    method:     'GET',
                    dataType: "json",
                    url:        'http://10.68.128.8:5080/eUrbanMIS/openwindow.html?params={"params":{},"settings":{"fullScreen":true,"max":true,"title":"综合查询"},"viewUrl":"view/stat/query/desktop"}&paramType=json&token='+token,
                    onload:     function (responseDetails) {
                        // DO ALL RESPONSE PROCESSING HERE...
                        console.log(responseDetails.responseText);
                        http://10.68.128.8:5080/eUrbanMIS/login/validsession?token=18008665558D9C33A0867ED2F7EEF0EBEBAFE0A3A845244F5F6A2757371BF3743B796E66473C3F9C&_=1527584622900
                        GM_xmlhttpRequest ( {
                    method:     'GET',
                    dataType: "json",
                    url:        'http://10.68.128.8:5080/eUrbanMIS/login/validsession?token='+token,
                    onload:     function (responseDetails) {
                        // DO ALL RESPONSE PROCESSING HERE...
                        console.log(responseDetails.responseText);
                       //
                    }
                    } );
                    }
                } );
             }
             });

        }
   function return2(str1,str2,overDue,hechaInfo){
       GM_xmlhttpRequest ( {
    method:     'GET',
    dataType: "json",
    url:        'http://10.19.179.6/eUrbanMIS/home/bizbase/tasklist/gethumantasklistdata?taskListID=46&currentPage=1&numPerPage=20&sortFieldID=-1&sortType=&onlyDataFlag=false&_=1526021999246',
    onload:     function (responseDetails) {
                    // DO ALL RESPONSE PROCESSING HERE...
                    var jsonstr = JSON.parse(responseDetails.responseText);
                    var len1 = str1.resultInfo.data.listDataSet.listData.length;
                    var len2 = str2.resultInfo.data.listDataSet.listData.length;
                    var len3 = overDue.length;
                    var hecha_Length = hechaInfo.resultInfo.data.listDataSet.listData.length;

                    var currentDate = new Date();
                    var overDueCases=[];

                    var hecha_nohecha_count = 0;
                    var hecha_daijiean_count = 0; 
                    for(let j=0;j<hecha_Length;j++){
                        if(hechaInfo.resultInfo.data.listDataSet.listData[j].check_msg_state_id==1)
                        {
                            hecha_nohecha_count = hecha_nohecha_count + 1;
                        }else if(hechaInfo.resultInfo.data.listDataSet.listData[j].check_msg_state_id==5)
                        {
                            hecha_daijiean_count = hecha_daijiean_count + 1;
                        }
                    }
                    var hecha_count = hecha_nohecha_count + hecha_daijiean_count;


                    for(let i=0;i<len3;i++)
                    {
                        let caseDate = new Date(overDue[i].DISPOSE_DEADLINE);
                        let differ = caseDate.getTime()-currentDate.getTime();
                        let minu = 0;
                        let sec = 0;
                        if( differ > 0 )
                        {
                            minu = Math.round(differ/(1000*60));
                            sec = Math.round(differ/1000%60);
                            if( minu < 30 )
                            {
                                console.log(overDue[i].TASK_NUM+"案件截至时间少于30分钟，向"+overDue[i].DISPOSE_UNIT_NAME+"-发送短信!");
                                overDueCases.push(overDue[i]);
                             }
                         }
                     }
                    if(jsonstr.resultInfo.success)
                    {
                        if(jsonstr.resultInfo.data.listDataSet.listData.length>0 || len1>0 || len2>0 || overDueCases.length>0 || hecha_count>0 ){
                            var len = jsonstr.resultInfo.data.listDataSet.listData.length;
                            var overContent="";
                            for(var j=0;j<overDueCases.length;j++){
                                if(j==0){
                                   overContent="";
                                }
                                overContent += overDueCases[j].TASK_NUM+"；";
                            }
                           //GM_notification("立案提醒", "有"+len+"新案件达到！");
                            notifiy("提醒","立案案件"+"( "+len1+" )！  "+"待办案件"+"( "+len2+" )！\n"+"市级案件"+"( "+len+" )！  "+"将超期案件( "+overDueCases.length+" )："+overContent+"\n核查待处理："+hecha_count,".desktop-nav-item-icon-0102");
                            console.log( "----立案案件("+len1+")---");
                            console.log( str1.resultInfo.data.listDataSet.listData);
                            console.log( "----待办案件("+len2+")---");
                            console.log( str2.resultInfo.data.listDataSet.listData);
                             console.log( "---市级转发("+len+")---");
                            console.log(jsonstr.resultInfo.data.listDataSet.listData);
                            console.log( "---超期案件("+overDueCases.length+")---");
                            console.log(overDueCases);
                        }else{
                                 console.log("没消息");
                            　　　//notifiy("没消息","没有案件到达",'','')
                        }
                    }
                    //console.log (
                    //    "GM_xmlhttpRequest() response is:\n",
                    //    responseDetails.responseText
                    //);
                }
    } );
    }

    function notifiy(title, body, click_url){
      var notificationDetails = {
          text: body,
          title: title,
          timeout: 10000,
          onclick: function() {
              $(click_url).click();
          }
      };
      GM_notification(notificationDetails);
　　}
    setInterval(mytest,30000);
    //setInterval(mydaiban,25000);
    //setInterval(myshiji,25000);
    // Your code here...
})();
