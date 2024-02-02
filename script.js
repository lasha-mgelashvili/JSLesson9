// fetch

let currentPage = 1;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseData) {
      if (responseData.status !== 200) {
        throw "error";
      }
      return responseData.json();
    })
    .then(function (responseInfoJs) {
      console.log(responseInfoJs);

      const fragment = document.createDocumentFragment();

      responseInfoJs.data.forEach(function (item) {
        let li = document.createElement("li");
        li.classList.add("image-size");

        let pUserInfo = document.createElement("p");
        pUserInfo.textContent = `${item.first_name} ${item.last_name}`;
        let imgElement = document.createElement("img");
        imgElement.src = item.avatar;
        li.appendChild(pUserInfo);
        li.appendChild(imgElement);
        fragment.appendChild(li);
      });
      document.getElementById("list-users").innerHTML = " ";
      document.getElementById("list-users").appendChild(fragment);

      totalPages = responseInfoJs.total_pages;
    })
    .catch(function (error) {
      if (error === 404) {
        let pError = document.createElement("p");
        pError.textContent = "server error";
        document.getElementById("server-info").appendChild(pError);
      } else {
        console.log("error text");
      }
    });
}
document.getElementById("loadless").addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  currentPage = currentPage - 1;
  getUsers(currentPage);
});

document.getElementById("loadmore").addEventListener("click", function () {
  if (currentPage === totalPages) {
    return;
  }
  currentPage += 1;
  getUsers(currentPage);
});

getUsers(currentPage);
