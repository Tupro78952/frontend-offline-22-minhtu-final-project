const elMainMenu = document.getElementById('mainMenu');

// RENDER MENUS
API.get('categories_news').then((response) => {
  const data = response.data;
  const categories = data.data;

  let htmlMenu = '';
  let htmlMenuOther = '';
  categories.forEach((item, index) => {
    if (index < 3) {
      htmlMenu += `<li><a href="category.html?id=${item.id}">${item.name}</a></li>`;
    } else {
      htmlMenuOther += `<li><a href="category.html?id=${item.id}">${item.name}</a></li>`;
    }
  });

  elMainMenu.innerHTML =
    htmlMenu +
    /* html */
    `<li class="dropdown">
      <a href="#">
        <span>Danh mục khác</span> <i class="bi bi-chevron-down dropdown-indicator"></i>
      </a>
      <ul>${htmlMenuOther}</ul>
    </li>`;

    const token = localStorage.getItem('ACCESS_TOKEN');

  API.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((resMe) => {
    const name = resMe.data.data.name;
    elMainMenu.innerHTML += /*html */`
    <li class="dropdown">
      <a href="#">
        <span>${name}</span> <i class="bi bi-chevron-down dropdown-indicator"></i> 
      </a>
      <ul>
      <li><a href="profile.html">Thông tin tài khoản</a></li>
      <li><a href="change-password.html">Thay đổi mật khẩu</a></li>
      <li><a href="#" id="btnLogout">Đăng xuất</a></li>
      </ul>  
    </li>`;
  })
  .catch ((err)=> {
    elMainMenu.innerHTML +=
    `<li class="dropdown">
    <a href="#">
      <span>Tài khoản</span> <i class="bi bi-chevron-down dropdown-indicator"></i> 
    </a>
    <ul>
    <li><a href="login.html">Đăng nhập</a></li>
    <li><a href="register.html">Đăng kí</a></li>
    </ul>
    </li>`;
  });
});

elMainMenu.addEventListener('click', function (e) {

  const el = e.target;

  if (el.id === 'btnLogout') {
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = 'index.html';
  }
})