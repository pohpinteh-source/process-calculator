const params = new URLSearchParams(window.location.search);

const user = params.get("user");
const key = params.get("key");

if (user && key) {

    if (
        allowedUsers[user] &&
        allowedUsers[user].key === key
    ) {

        const displayName =
            user.split("@")[0];

        document.getElementById("welcome").innerHTML =
        `
        <span style="
        font-size:20px;
        font-weight:bold;
        color:#1f4e79;
        ">
        Welcome, ${displayName}
        </span>
        `;

    } else {

        document.body.innerHTML =
        `
        <h1>Access Denied</h1>
        <p>Please contact TEH POH PIN</p>
        `;

    }

}

const adminBtn =
    document.getElementById("adminBtn");

if (adminBtn) {

    adminBtn.onclick = function(){

        const password =
            prompt("Enter Admin Password");

        if(password === "tehpohpin"){

            window.location.href =
                "admin.html";

        } else {

            alert("Wrong Password");

        }

    };

}