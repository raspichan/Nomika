import { app, database, ref_, set_, get_, update_, push_}  from "../../../../js/master.js";
const groupH3 = document.getElementById("groupH3");
const tatekaeButton = document.getElementById("tatekaeButton");
const warikanButton = document.getElementById("warikanButton");
const gameButton = document.getElementById("gameButton");
const editButton = document.getElementById("editButton");

const groupId = new URLSearchParams(window.location.search).get('id');
console.log("groupId:" + groupId);
// グループ名を表示
get_(ref_(database,'groups/' + groupId))
    .then((snapshot) => {
    const data = snapshot.val();
    const name = data["groupName"]
    console.log("groupname:" + name);
    groupH3.textContent = "This is " + name;
})
    .catch((error) => {
    console.error("データの読み取りに失敗しました", error);
});


tatekaeButton.href = `./tatekae/tatekae.html?id=${groupId}`;
warikanButton.href = `./warikan/warikan.html?id=${groupId}`;
gameButton.href = `./game/game.html?id=${groupId}`;
editButton.href = `./edit/edit.html?id=${groupId}`;