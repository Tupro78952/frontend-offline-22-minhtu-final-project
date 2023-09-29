const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale("vi");

const elMenu = document.getElementById("mainMenu");
const elArticlesTopStory = document.getElementById("articlesTopStory");
const elEchoHeroBaner = document.getElementById("EchoHeroBaner");
const elLatestNews = document.getElementById("LatestNews");
const elArticlesTrending = document.getElementById("articlesTrending");
const elArticlesTrendingLarge = document.getElementById("articlesTrendingLarge");
const elDiscoverCategories = document.getElementById("discoverCategories");
const elFeaturedPost = document.getElementById("featuredPost");
const elPopularOfTheWeeks = document.getElementById("popularOfTheWeeks");
const elVideoLeft = document.getElementById("videoLeft");
const elVideoRight = document.getElementById("videoRight");

//RENDER MENUS

API.get(`categories_news`).then((response) => {
  const data = response.data;
  const categories = data.data;

  let htmlMenu = "";
  let htmlMenuOther = "";
  categories.forEach((item, index) => {
    if (index < 3) {
      htmlMenu += `<li class="menu-item"><a href="index.html" class="echo-dropdown-main-element active">${item.name}</a></li>`;
    } else {
      htmlMenuOther += `<li class="nav-item"><a href="index.html">${item.name}</a></li>`;
    }
  });
  elMenu.innerHTML =
    htmlMenu +
    `<li class="menu-item echo-has-dropdown">
    <a href="#" class="echo-dropdown-main-element">Danh mục khác </a>
    <ul class="echo-submenu list-unstyled menu-pages">
        ${htmlMenuOther}
    </ul>
</li>`;
});
//story + baner
API.get(`articles?limit=6&page=1`).then((response) => {
  const articles = response.data.data;
 console.log(articles);
  let htmlBaner = '';
  let htmlTopStory = '';
  let htmlTopic = '';

  articles.forEach((item, index) => {
   if(index === 0) {
    htmlBaner += `
    <div class="echo-hero-banner-main-img img-transition-scale">
            <a href="post-details.html"><img class="banner-image-one img-hover"
                src="${item.thumb}"
                alt="${item.title}"/></a>
          </div>
          <h1 class="echo-hero-title text-capitalize font-weight-bold">
            <a href="post-details.html" class="title-hover">${item.title}</a>
          </h1>
          <hr />
          <p class="echo-hero-discription">
            ${item.description}
          </p>
          <div class="echo-hero-area-titlepost-post-like-comment-share">
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-eye"></i> 3.5k Views</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-comment-dots"></i> 05 Comment</a>
</div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k Share</a>
            </div>
          </div>`;
   }else if (index === 1) {
    htmlTopStory += `
    <div class="echo-top-story first" id="articlesTopStory">
      <div class="echo-story-picture img-transition-scale">
        <a href="post-details.html"><img src="${item.thumb}" alt="Echo" class="img-hover"></a>
      </div>
      <div class="echo-story-text">
        <h4>
          <a href="#" class="title-hover">${item.title}</a>
         </h4>
        <div class="echo-trending-post-bottom-icons">
          <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
      </div>
    </div>`;
   }else{
    htmlTopic += `
    <div class="echo-top-story">
      <div class="echo-story-picture img-transition-scale">
      <a href="post-details.html"><img src="${item.thumb}" alt="Echo" class="img-hover"></a>
    </div>
      <div class="echo-story-text">
        <h4>
          <a href="#" class="title-hover"><p class="edit ">${item.title}</p></a>
        </h4>
        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
      </div>
    </div>`;
   }
  });
  elEchoHeroBaner.innerHTML = htmlBaner;
  elArticlesTopStory.innerHTML = htmlTopStory + htmlTopic;
});
// LATEST NEWS

API.get(`categories_news/2/articles?limit=8&page=8`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <div class="swiper-slide">
      <div class="echo-latest-news-main-content">
        <div class="echo-latest-news-img img-transition-scale">
          <a href="#">
          <img src="${item.thumb}" alt="Echo" class="img-hover">
          </a>
        </div>
        <div class="echo-latest-news-single-title">
          <h5><a href="#" class="text-capitalize title-hover"><p class="edit1 ">${item.title}</p></a></h5>
        </div>
        <div class="echo-latest-news-time-views">
          <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
      </div>
    </div>`;
    
  });
  elLatestNews.innerHTML = html;
});


//TRENDING

API.get(`articles/popular?limit=4`).then((response) => {
  const articles = response.data.data;
  

  let html = '';
  articles.forEach(item => {
    html += `
    <div class="echo-trending-left-site-post">
      <div class="echo-trending-left-site-post-img img-transition-scale">
        <a href="#">
          <img src="${item.thumb}" alt="Echo" class="img-hover">
        </a>
     </div>
     <div class="echo-trending-right-site-post-title">
<h5><a href="#" class="text-capitalize title-hover">${item.title}</a></h5>
        <div class="echo-trending-post-bottom-icons">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
        </div>
    </div>
</div>`;
  });
  elArticlesTrending.innerHTML = html;
});

API.get(`articles/popular?limit=2`).then((response) => {
  const articles = response.data.data;

  let html = '';
  articles.forEach(item => {
    html += `<div class="echo-trending-right-site-post">
    <div class="echo-trending-right-site-post-img img-transition-scale">
        <a href="#">
            <img src="${item.thumb}" alt="Echo" class="img-hover">
        </a>
    </div>
    <div class="echo-trending-right-site-post-title">
        <h4 class="text-capitalize"><a href="#" class="title-hover">${item.title}</a></h4>
    </div>
    <div class="echo-trending-right-site-like-comment-share-icons">
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
        </div>
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
        </div>
        
    </div>
</div>`;
  });
  elArticlesTrendingLarge.innerHTML = html;
});

API.get(`articles/popular?limit=3`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
      <div class="echo-popular-area-single-item">
          <div class="echo-popular-area-img img-transition-scale">
              <a href="#"><img src="${item.thumb}" alt="Echo" class="img-hover"></a>
          </div>
          <div class="echo-popular-area-item-title">
              <h5 class="text-capitalize"><a href="#" class="title-hover">${item.title}</a></h5>
          </div>
          <div class="echo-popular-area-read-view">
              <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
              <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
          </div>
      </div>
  </div>`;
    
  });
  elPopularOfTheWeeks.innerHTML = html;
});

API.get(`articles/popular?limit=1`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <a href="#"><img src="${item.thumb}" alt="Echo"></a>
    <div class="vedio-icone">
        <a class="play-video popup-youtube video-play-button" href="https://www.youtube.com/watch?v=sfmaJTwFP24">
            <span></span>
        </a>
        <div class="video-overlay">
            <a class="video-overlay-close">×</a>
        </div>
    </div>
<div class="echo-video-left-site-text-box">
        <h5><a href="post-details.html" class="title-hover">${item.title}</a></h5>
        <hr>
        <div class="echo-video-left-site-read-views">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
    </div>
`;
    
  });
  elVideoLeft.innerHTML = html;
});

API.get(`articles/popular?limit=3`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <div class="echo-video-right-site-content">
      <div class="echo-video-right-site-content-text">
          <h5 class="text-capitalize"><a href="#" class="title-hover text-white"><p class="edit edit2">${item.title}</p></a>
          </h5>
          <hr>
          <a href="#" class="pe-none text-white"><i class="fa-light fa-clock"></i> 06 minute
              read</a>
      </div>
      <div class="echo-video-right-site-content-video">
          <a href="#"><img src="${item.thumb}" alt="Echo"></a>
          <div class="vedio-icone">
              <a class="play-video popup-youtube video-play-button" href="https://www.youtube.com/watch?v=Jf1BB4EN36g">
                  <span></span>
              </a>
              <div class="video-overlay">
                  <a class="video-overlay-close">×</a>
              </div>
          </div>
      </div>
    </div>
  
`;
    
  });
  elVideoRight.innerHTML = html;
});


//RENDER MENUS

API.get(`categories_news`).then((response) => {
  const data = response.data;
  const categories = data.data;

  let htmlMenu = "";
  let htmlMenuOther = "";
  categories.forEach((item, index) => {
    if (index < 3) {
      htmlMenu += `<li class="menu-item"><a href="index.html" class="echo-dropdown-main-element active">${item.name}</a></li>`;
    } else {
      htmlMenuOther += `<li class="nav-item"><a href="index.html">${item.name}</a></li>`;
    }
  });
  elMenu.innerHTML =
    htmlMenu +
    `<li class="menu-item echo-has-dropdown">
    <a href="#" class="echo-dropdown-main-element">Danh mục khác </a>
    <ul class="echo-submenu list-unstyled menu-pages">
        ${htmlMenuOther}
    </ul>
</li>`;
});
//story + baner
API.get(`articles?limit=6&page=1`).then((response) => {
  const articles = response.data.data;
 console.log(articles);
  let htmlBaner = '';
  let htmlTopStory = '';
  let htmlTopic = '';

  articles.forEach((item, index) => {
   if(index === 0) {
    htmlBaner += `
    <div class="echo-hero-banner-main-img img-transition-scale">
            <a href="post-details.html"><img class="banner-image-one img-hover"
                src="${item.thumb}"
                alt="${item.title}"/></a>
          </div>
          <h1 class="echo-hero-title text-capitalize font-weight-bold">
            <a href="post-details.html" class="title-hover">${item.title}</a>
          </h1>
          <hr />
          <p class="echo-hero-discription">
            ${item.description}
          </p>
          <div class="echo-hero-area-titlepost-post-like-comment-share">
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-eye"></i> 3.5k Views</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-comment-dots"></i> 05 Comment</a>
</div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k Share</a>
            </div>
          </div>`;
   }else if (index === 1) {
    htmlTopStory += `
    <div class="echo-top-story first" id="articlesTopStory">
      <div class="echo-story-picture img-transition-scale">
        <a href="post-details.html"><img src="${item.thumb}" alt="Echo" class="img-hover"></a>
      </div>
      <div class="echo-story-text">
        <h4>
          <a href="#" class="title-hover">${item.title}</a>
         </h4>
        <div class="echo-trending-post-bottom-icons">
          <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
      </div>
    </div>`;
   }else{
    htmlTopic += `
    <div class="echo-top-story">
      <div class="echo-story-picture img-transition-scale">
      <a href="post-details.html"><img src="${item.thumb}" alt="Echo" class="img-hover"></a>
    </div>
      <div class="echo-story-text">
        <h4>
          <a href="#" class="title-hover"><p class="edit ">${item.title}</p></a>
        </h4>
        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
      </div>
    </div>`;
   }
  });
  elEchoHeroBaner.innerHTML = htmlBaner;
  elArticlesTopStory.innerHTML = htmlTopStory + htmlTopic;
});
// LATEST NEWS

API.get(`categories_news/2/articles?limit=8&page=8`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <div class="swiper-slide">
      <div class="echo-latest-news-main-content">
        <div class="echo-latest-news-img img-transition-scale">
          <a href="#">
          <img src="${item.thumb}" alt="Echo" class="img-hover">
          </a>
        </div>
        <div class="echo-latest-news-single-title">
          <h5><a href="#" class="text-capitalize title-hover"><p class="edit1 ">${item.title}</p></a></h5>
        </div>
        <div class="echo-latest-news-time-views">
          <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
      </div>
    </div>`;
    
  });
  elLatestNews.innerHTML = html;
});


//TRENDING

API.get(`articles/popular?limit=4`).then((response) => {
  const articles = response.data.data;
  

  let html = '';
  articles.forEach(item => {
    html += `
    <div class="echo-trending-left-site-post">
      <div class="echo-trending-left-site-post-img img-transition-scale">
        <a href="#">
          <img src="${item.thumb}" alt="Echo" class="img-hover">
        </a>
     </div>
     <div class="echo-trending-right-site-post-title">
<h5><a href="#" class="text-capitalize title-hover">${item.title}</a></h5>
        <div class="echo-trending-post-bottom-icons">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
        </div>
    </div>
</div>`;
  });
  elArticlesTrending.innerHTML = html;
});

API.get(`articles/popular?limit=2`).then((response) => {
  const articles = response.data.data;

  let html = '';
  articles.forEach(item => {
    html += `<div class="echo-trending-right-site-post">
    <div class="echo-trending-right-site-post-img img-transition-scale">
        <a href="#">
            <img src="${item.thumb}" alt="Echo" class="img-hover">
        </a>
    </div>
    <div class="echo-trending-right-site-post-title">
        <h4 class="text-capitalize"><a href="#" class="title-hover">${item.title}</a></h4>
    </div>
    <div class="echo-trending-right-site-like-comment-share-icons">
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
        </div>
        <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> ${item.views} Views</a>
        </div>
        
    </div>
</div>`;
  });
  elArticlesTrendingLarge.innerHTML = html;
});

API.get(`articles/popular?limit=3`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
      <div class="echo-popular-area-single-item">
          <div class="echo-popular-area-img img-transition-scale">
              <a href="#"><img src="${item.thumb}" alt="Echo" class="img-hover"></a>
          </div>
          <div class="echo-popular-area-item-title">
              <h5 class="text-capitalize"><a href="#" class="title-hover">${item.title}</a></h5>
          </div>
          <div class="echo-popular-area-read-view">
              <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
              <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
          </div>
      </div>
  </div>`;
    
  });
  elPopularOfTheWeeks.innerHTML = html;
});

API.get(`articles/popular?limit=1`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <a href="#"><img src="${item.thumb}" alt="Echo"></a>
    <div class="vedio-icone">
        <a class="play-video popup-youtube video-play-button" href="https://www.youtube.com/watch?v=sfmaJTwFP24">
            <span></span>
        </a>
        <div class="video-overlay">
            <a class="video-overlay-close">×</a>
        </div>
    </div>
<div class="echo-video-left-site-text-box">
        <h5><a href="post-details.html" class="title-hover">${item.title}</a></h5>
        <hr>
        <div class="echo-video-left-site-read-views">
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> 06 minute read</a>
            <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
    </div>
`;
    
  });
  elVideoLeft.innerHTML = html;
});

API.get(`articles/popular?limit=3`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  let html = '';
  articles.forEach((item) => {
    html += `
    <div class="echo-video-right-site-content">
      <div class="echo-video-right-site-content-text">
          <h5 class="text-capitalize"><a href="#" class="title-hover text-white"><p class="edit edit2">${item.title}</p></a>
          </h5>
          <hr>
          <a href="#" class="pe-none text-white"><i class="fa-light fa-clock"></i> 06 minute
              read</a>
      </div>
      <div class="echo-video-right-site-content-video">
          <a href="#"><img src="${item.thumb}" alt="Echo"></a>
          <div class="vedio-icone">
              <a class="play-video popup-youtube video-play-button" href="https://www.youtube.com/watch?v=Jf1BB4EN36g">
                  <span></span>
              </a>
              <div class="video-overlay">
                  <a class="video-overlay-close">×</a>
              </div>
          </div>
      </div>
    </div>
  
`;
    
  });
  elVideoRight.innerHTML = html;
});