
const API = axios.create({
    baseURL: "https://apiforlearning.zendvn.com/api/v2/",
  });
  
  dayjs.extend(window.dayjs_plugin_relativeTime);
  dayjs.locale("vi");

  const elMenu = document.getElementById("Menu");
  


  API.get(`categories_news`).then((response) => {
    const data = response.data;
    const categories = data.data;
  
    let htmlMenu = "";
    let htmlMenuOther = "";
    categories.forEach((item, index) => {
      if (index < 3) {
        htmlMenu += `<li><a href="index.html">${item.name}</a></li>`;
      } else {
        htmlMenuOther += `<li><a href="index.html">${item.name}</a></li>`;
      }
    });
    elMenu.innerHTML =
      htmlMenu +
      `<li class="menu-item echo-has-dropdown">
      <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
      <ul class="echo-submenu list-unstyled menu-pages">
          ${htmlMenuOther}
      </ul>
  </li>`;
  });