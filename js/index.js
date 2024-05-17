const searchForm = document.getElementById('searchForm');
const searchText = document.getElementById('searchText');



searchForm.addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止默认的提交行为
    if(searchText.value == ''){
        alert('还没有输入内容呢~');
        return;
    }
    document.location.href = '/search.html?searchText='+searchText.value;
  });