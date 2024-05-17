const searchContainer = document.getElementById('searchContainer');
const searchTitle = document.getElementById('searchTitle');
const randomList = document.getElementById('randomList');

let allCards = []
var url = "../data/simpleData.json"
// 申明一个XMLHttpRequest
var request = new XMLHttpRequest();
// 设置请求方法与路径
request.open("get", url);
// 不发送数据到服务器
request.send(null);
//XHR对象获取到返回信息后执行
request.onload = function () {
    

    // 解析获取到的数据
    var cards = JSON.parse(request.responseText);

    allCards = cards

    // 判断该展示的内容
    // 解析 URL 中的参数
    var urlParams = new URLSearchParams(window.location.search);

    // 搜索内容
    var searchText = urlParams.get('searchText');
    if(searchText!=null){
        searchTitle.innerHTML = `搜索&nbsp;"${searchText}"`
        // 随机推荐
        randomPush();
        searchCardAndShow(searchText)
    }

    
}

const searchCardAndShow = (searchText) => {
    let searchC = []
    allCards.forEach(item => {
        if(item.name.includes(searchText)){
            searchC.push(item);
        }
    });
    if(searchC.length == 0){
        searchContainer.innerHTML = `<div style="text-align: center;"><img style="width: 60px;" src="./宝藏短剧-无删减热门原版短剧/no_search.png" alt=""><p style="font-size: 16px;margin-top: 10px;">暂未找到 <span style="color: #0c83e8;"></span>相关内容...</p></div>`
    }else{
        let searchContain = ''
        searchC.forEach(item => {
            searchContain += `<li><span>${item.id}</span><a href="/articles/${item.id}.html" title="${item.name}">${item.name}</a></li>`
        });
        searchContainer.innerHTML = searchContain;
    }
}

const randomPush = () => {
    let randomContain = ''
    let hasLink = []
    let num = 0;
    for (let i = 0; i < 8; i++) {
        do{
            num = Math.floor(Math.random()*allCards.length);
        }while(hasLink.includes(num));
        hasLink.push(num);
        randomContain +=   `<li class="fireLi"><span class="fireIcon"></span><a  class="fireLink" target="_blank" href="/articles/${allCards[num].id}.html">${allCards[num].name}</a></li>`
    }
    randomList.innerHTML = randomContain
}