let users = [];

let pendingUser = null;

let currentLink = "";

for(const username in allowedUsers){

    users.push({
        username: username,
        displayName:
            allowedUsers[username].displayName,
        token:
            allowedUsers[username].key
    });
}

renderUsers();

function generateUser(){


const email =
document.getElementById("email")
.value
.trim();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {

    alert("Please enter a valid email address.");

    return;

}
    if(!displayName || !username){

        alert("Please fill all fields");
        return;
    }

const duplicate =
users.some(
    x =>
    x.email.toLowerCase()
    ===
    email.toLowerCase()
);

    if(duplicate){

        const proceed =
            confirm(
            "Username already exists.\n\nContinue?"
            );

        if(!proceed){
            return;
        }
    }

    const token =
        Math.random()
        .toString(36)
        .substring(2,12);

pendingUser = {
    email,
    token
};
currentLink =
`https://pohpinteh-source.github.io/process-calculator/?user=${email}&key=${token}`;


    document.getElementById("linkBox").value =
        currentLink;
}

function confirmAddUser(){

    if(!pendingUser){

        alert("Generate User First");
        return;
    }

    const pwd =
        prompt(
        "Enter Admin Password"
        );

    if(pwd !== "tehpohpin"){

        alert("Wrong Password");

        return;
    }

    users.push(pendingUser);

    renderUsers();

    alert(
        "User Added Successfully"
    );

    pendingUser = null;
}

function renderUsers(){

    let html = "";

    users.forEach((u,index)=>{

        html += `
        <div style="
            border:1px solid gray;
            padding:10px;
            margin-bottom:5px;
        ">

📧 <b>${u.email}</b>
        <br>

        ${u.displayName}

        <br><br>

        <button
        onclick="removeUser(${index})">

        Remove

        </button>

        </div>
        `;
    });

    document.getElementById(
        "userList"
    ).innerHTML = html;
}

function removeUser(index){

    const pwd =
        prompt(
        "Enter Admin Password"
        );

    if(pwd !== "tehpohpin"){

        alert("Wrong Password");

        return;
    }

    const confirmRemove =
        confirm(
        "Remove this user?"
        );

    if(!confirmRemove){
        return;
    }

    users.splice(index,1);

    renderUsers();
}

function copyLink(){

    navigator.clipboard.writeText(
        currentLink
    );

    alert(
        "Link Copied"
    );
}

function goBack() {

    window.location.href = "index.html";

}