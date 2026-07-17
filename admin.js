let users = [];

let currentLink = "";

// Admin account

users.push({
    email: "pohpin_85@yahoo.com",
    token: "admin123",
    role: "ADMIN"
});

renderUsers();

function addUser() {

    const email =
        document.getElementById("email")
        .value
        .trim();

    if (!email.includes("@")) {

        alert("Please enter valid email.");

        return;
    }

    const duplicate =
        users.some(
            x =>
            x.email.toLowerCase()
            ===
            email.toLowerCase()
        );

    if (duplicate) {

        alert("User already exists.");

        return;
    }

    const pwd =
        prompt("Enter Admin Password");

    if (pwd !== "tehpohpin") {

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

    users.push({
        email: email,
        token: token,
        role: "USER"
    });

    renderUsers();

    alert("User Added Successfully");
}

function renderUsers(){

    let html = "";

    users.forEach((u,index)=>{

        let removeButton = "";

        if(u.role !== "ADMIN"){

            removeButton =
            `<button onclick="removeUser(${index})">
                Remove
            </button>`;
        }

        html += `
        <div style="
            border:1px solid #ccc;
            padding:10px;
            margin-bottom:10px;
            background:white;
            border-radius:10px;
        ">

            📧 <b>${u.email}</b>

            ${
                u.role === "ADMIN"
                ? '<span style="color:red;font-weight:bold;"> (ADMIN)</span>'
                : ''
            }

            <br><br>

            ${removeButton}

        </div>
        `;
    });

    document.getElementById("userList").innerHTML =
        html;
}

function removeUser(index){

    if(users[index].role === "ADMIN"){

        alert("Admin account cannot be removed.");

        return;
    }

    const pwd =
        prompt("Enter Admin Password");

    if(pwd !== "tehpohpin"){

        alert("Wrong Password");

        return;
    }

    users.splice(index,1);

    renderUsers();
}

function copyLink(){

    if(!currentLink){

        alert("Please add user first.");

        return;
    }

    navigator.clipboard.writeText(currentLink);

    alert("Link Copied");
}

function goBack(){

    window.location.href = "index.html";

}