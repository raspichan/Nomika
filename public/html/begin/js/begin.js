import { app, database, ref_, set_, get_, update_, push_}  from "../../../js/master.js";
const createButton = document.getElementById("createButton");
// const inputName = document.getElementById("inputName");
const inputGroup = document.getElementById("groupNameInput");
const inputMember = document.getElementById("inputMember");
// const labelName = document.getElementById("labelName");
const labelGroup = document.getElementById("labelGroup");
const labelMember = document.getElementById("labelMember");
const addButton = document.getElementById("addButton");
let memberDiv = document.getElementById('memberList');
let member;
let memberList = [];

// inputName.addEventListener("input", function() {
//     if (inputName.value !== "") {
//         labelName.innerHTML = "";
//     } else {
//         labelName.innerHTML = "<h5>お名前</h5>";
//     }
// });
inputGroup.addEventListener("input", function() {
    if (inputGroup.value !== "") {
        labelGroup.innerHTML = "";
    } else {
        labelGroup.innerHTML = "<h5>グループ名</h5>";
    }
});
inputMember.addEventListener("input", function() {
    if (inputMember.value !== "") {
        labelMember.innerHTML = "";
    } else {
        labelMember.innerHTML = "<h5>メンバー名</h5>";
    }
});

// member
addButton.addEventListener("click", function() {
    if (inputMember.value != "") {
        member = inputMember.value;
        memberList.push(member);
        let memberSpan = document.createElement("span");
        memberSpan.type = 'text';
        memberSpan.textContent =  '' + member + '' ;
        memberSpan.style = 'font-size: 25px; height: 50px; background-color:white; margin-right:10px; border: solid 1px black; border-width: 2px; border-radius: 10px; padding: 7px;';
        memberSpan.id = member + "Span";

        let cancelButton = document.createElement('button');
        cancelButton.textContent = "×";
        cancelButton.id = member + 'Cancel';
        cancelButton.style = 'font-size: 15px; position: relative; top: -3px; width: 35px; background-color:white; border: solid 1px black; border-width: 2px; border-radius: 10px; padding: 5px; margin-left: 10px;';
        // cancelButton.style.height = '15px';
        // cancelButton.style.width = '15px';
        // cancelButton.style.offset

        cancelButton.onclick = function(){
            cancelMember(member);
        };

        memberSpan.appendChild(cancelButton)
        memberDiv.appendChild(memberSpan); 
    } else {
        alert('メンバー名を入力してください');
    }
});

function cancelMember(member) {
    console.log(memberList);
    let colIndex = memberList.indexOf(member);
    memberList.splice(colIndex, 1);
    console.log(memberList);
    let target = document.getElementById(member + "Span");
    target.remove();
}

function createGroup() {
    if (memberList.length != 0) {
        const groupName = document.getElementById('groupNameInput').value;
        const newGroupRef = push_(ref_(database, 'groups'));
        const groupId = newGroupRef.key;
        set_(newGroupRef, {
            groupName: groupName,
            groupMember: memberList
        })
        .then(()=>{
            console.log("データが正常に書き込まれました");
            console.log(memberList);
            const groupURL = window.location.href + 'group.html?id=' + groupId;
            alert('グループが作成されました。\nURL: ' + groupURL);
            // createButton.href = `./group/group.html?id=${newGroupRef.key}`;
            // 新しいURLに遷移する
            window.location.href = `./group/group.html?id=${newGroupRef.key}`;

        })
        .catch((error)=>{
            console.error("データの書き込みに失敗しました", error);
        })
    } else {
        alert('メンバーを追加してください');
    }
}

createButton.onclick = createGroup;

