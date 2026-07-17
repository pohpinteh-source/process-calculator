let users = [];

let currentLink = "";

const API_URL =
"https://script.google.com/macros/s/AKfycbyX8XQZ924Ut6OSBfCDOsoQ_X_9-DNqjhg7_5H6wKlVjRvZPC8mwucyA-mfmxOuXzwG/exec";

async function loadUsers(){

document.getElementById("userList").innerHTML =
"<p>Loading users...</p>";

    const response =
        await fetch(`${API_URL}?action=getUsers`);

    const data =
        await response.json();

    users = [];

    data.slice(1).forEach(row => {

        users.push({
            email: row[0],
            token: row[1],
            role: row[2],
            link: row[4]
        });

    });

    renderUsers();
}

loadUsers();

async function addUser() {

    const email =
        document.getElementById("email")
        .value
        .trim();

    if(!email.includes("@")){

        alert("Please enter valid email.");
        return;
    }

    const pwd =
        prompt("Enter Admin Password");

    if(pwd !== "tehpohpin"){

        alert("Wrong Password");
        return;
    }

    const token =
        Math.random()
        .toString(36)
        .substring(2,12);

    currentLink =
`https://pohpinteh-source.github.io/process-calculator/?user=${email}&key=${token}`;

    document.getElementById("linkBox").value =
        currentLink;

    await fetch(
`${API_URL}?action=addUser&email=${encodeURIComponent(email)}&key=${token}&link=${encodeURIComponent(currentLink)}`
    );

    await loadUsers();

    alert("User Added Successfully");
}

function renderUsers(){

    let html = "";
document.getElementById("userCount").innerHTML =
`👥 Total Users: ${users.length}`;


    users.forEach((u,index)=>{

        const isAdmin =
            u.email.toLowerCase() ===
            "pohpin_85@yahoo.com";

        let buttons =
            `<button onclick="copyUserLink(${index})">
                📋 Copy Link
            </button>`;

        if(!isAdmin){

            buttons +=
            `<button onclick="removeUser(${index})">
                Remove
            </button>`;
        }

        html += `

<div style="
    background:white;
    border:1px solid #ccc;
    border-radius:12px;
    padding:12px;
    margin-bottom:10px;
    word-break:break-word;
">

📧 <b>${u.email}</b>

<span style="
font-weight:bold;
color:${isAdmin ? 'red' : '#1f4e79'};
">
[${u.role}]
</span>

            <br><br>

<div style="
display:flex;
gap:8px;
flex-wrap:wrap;
margin-top:10px;
">
${buttons}
</div>
        </div>
        `;
    });

    document.getElementById("userList").innerHTML =
        html;

}

function removeUser(index){

    if(
        users[index].email.toLowerCase() ===
        "pohpin_85@yahoo.com"
    ){

        alert(
            "Admin account cannot be removed."
        );

        return;
    }

    alert(
        "Next step: connect remove user to Google Sheet."
    );
}

function copyLink(){

    if(!currentLink){

        alert("Please add user first.");
        return;
    }

    navigator.clipboard.writeText(currentLink);

    alert("Link Copied");
}

function copyUserLink(index){

    const link =
`https://pohpinteh-source.github.io/process-calculator/?user=${users[index].email}&key=${users[index].token}`;

    navigator.clipboard.writeText(link);

    alert("User link copied!");
}


function goBack(){

    window.location.href = "index.html";
}