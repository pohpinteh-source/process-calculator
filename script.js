const params = new URLSearchParams(window.location.search);

const user = params.get("user");
const key = params.get("key");

if (
    !allowedUsers[user] ||
    allowedUsers[user].key !== key
) {
    document.body.innerHTML =
        "<h1>Access Denied</h1>";
    throw new Error("Unauthorized");
}


const displayName = user.split("@")[0];

document.getElementById("welcome").innerHTML =
`<strong>Welcome, ${displayName}</strong>`;


document.getElementById("adminBtn").onclick =
function(){

    const password =
        prompt("Enter Admin Password");

    if(password === "tehpohpin"){

        window.location.href =
            "admin.html";
    }
    else{

        alert("Wrong Password");
    }
};