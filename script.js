let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCc1vWocCyY921yDvAQBiTwhDx5uKTskFU&type=video&part=snippet&maxResults=100&q=";
let VIDEOS = {};
let pageNo = 0;
let maxPages = 0;

(function onload(){
    let nav = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
            <a class="navbar-brand" href="#"><img class="img-fluid" src="./assets/youtube (3).png"></a>
            <form class="d-flex">
                <input class="form-control py-0" id="search-box" type="search" placeholder="Search" required>
                <button class="btn btn-danger btn-search px-1" type="button" onclick="getData()"><img src="./assets/magnifying-glass.png" style="width: 20px;"></button>
            </form>
            </div>
        </nav>
    `
    document.getElementById('nav').innerHTML = nav;
    getData();
    render();
})();

async function getData(){
    
    pageNo = 0;
    var keyword = document.getElementById('search-box').value;
  
    if(keyword=="") {
        keyword='covid';
    }
    await fetch(url+keyword)
    .then(res=> res.json()).
    then(data=>{
        VIDEOS = data.items;
        renderThumbnails();
    });
    document.getElementById('result').innerText = "Showing result for: "+ keyword;
}


function render(){
    let html = ``;
            html += `
                <div class="container" id="my-video">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="video-tile">${VIDEOS[3*pageNo+0].snippet.title.slice(0,80)}</div>
                            <div class="my-1"><img class="img-fluid" src=${VIDEOS[3*pageNo+0].snippet.thumbnails.medium.url}></div>
                            <div class="row my-1">
                                <div class="col-6 font-italic">${VIDEOS[3*pageNo+0].snippet.channelTitle}</div>
                                <div class="col-6 font-italic date">${VIDEOS[3*pageNo+0].snippet.publishedAt.slice(0,10)}</div>
                            </div>
                            <div class="my-3 desc">${VIDEOS[3*pageNo+0].snippet.description}</div>
                        </div>
                        
                        <div class="col-sm-4 video-card">
                            <div class="video-tile">${VIDEOS[3*pageNo+1].snippet.title.slice(0,80)}</div>
                            <div class="my-1"><img class="img-fluid" src=${VIDEOS[3*pageNo+1].snippet.thumbnails.medium.url}></div>
                            <div class="row my-1">
                                <div class="col-6 font-italic">${VIDEOS[3*pageNo+1].snippet.channelTitle}</div>
                                <div class="col-6 font-italic date">${VIDEOS[3*pageNo+1].snippet.publishedAt.slice(0,10)}</div>
                            </div>
                            <div class="my-3 desc">${VIDEOS[3*pageNo+1].snippet.description}</div>
                        </div>
                        <div class="col-sm-4 video-card">
                            <div class="video-tile">${VIDEOS[3*pageNo+2].snippet.title.slice(0,80)}</div>
                            <div class="my-1"><img class="img-fluid" src=${VIDEOS[3*pageNo+2].snippet.thumbnails.medium.url}></div>
                            <div class="row my-1">
                                <div class="col-6 font-italic">${VIDEOS[3*pageNo+2].snippet.channelTitle}</div>
                                <div class="col-6 font-italic date">${VIDEOS[3*pageNo+2].snippet.publishedAt.slice(0,10)}</div>
                            </div>
                            <div class="my-3 desc">${VIDEOS[3*pageNo+2].snippet.description}</div>
                        </div>
                    </div>
                </div>
                <div class="counter-section mt-3">
                    <div class="row"> 
                        <button class="btn btn-danger col-5 btn-1 " onclick="getPreviousPage()"> Previous</button>
                        <div class="col-3 mt-2">${pageNo+1}/${maxPages}</div>
                        <button class="btn btn-danger col-4 btn-1" onclick="getNextPage()">Next</button>
                    <div>
                </div>
            `
    document.getElementById('root').innerHTML = html;
}
function getNextPage(){
    if(pageNo!=maxPages-1){
        pageNo += 1;
        console.log(pageNo);
    } 
    render();
}

function getPreviousPage(){
    if(pageNo!=0){
        pageNo -= 1;
    }
    render();
}

function renderThumbnails(){
    var size = VIDEOS.length;
    console.log(size);
    maxPages = parseInt(size/3); 
    render();
}
