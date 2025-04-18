"use strict";
const getUserName = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
// let display the card UI
const showResultUI = (singleUser) => {
    const { avatar_url, login, id, location, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class=card>
    <img src=${avatar_url} alt=${login}/>
    <hr/>
    <div class="card-footer">
    <img src=${avatar_url} alt=${login}/>
    <span class=user_name>${login}</span>
    <a href=${url}>Github</a>
    </div>
    </div>`);
};
// custom reusable function
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network was not ok - status : ${response.status} `);
    }
    const data = await response.json();
    return data;
}
// default function call
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
}
fetchUserData("https://api.github.com/users");
// let perform search functionality
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUserName.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = "";
        if (matchingUsers.length === 0) {
            main_container.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching users found.</p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log("get specific search error ---> ", error);
    }
});
