const API_URL =
"https://script.google.com/macros/s/AKfycbyX8XQZ924Ut6OSBfCDOsoQ_X_9-DNqjhg7_5H6wKlVjRvZPC8mwucyA-mfmxOuXzwG/exec";

async function validateUser(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const user =
        params.get("user");

    const key =
        params.get("key");

    if(!user || !key){
        return;
    }

    const response =
        await fetch(
            `${API_URL}?action=getUsers`
        );

    const data =
        await response.json();

    let validUser = false;

    data.slice(1).forEach(row => {

        if(
            row[0] === user &&
            row[1] === key
        ){
            validUser = true;
        }

    });

    if(validUser){

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

    }else{

        document.body.innerHTML =
        `
        <h1>Access Denied</h1>
        <p>Please contact TEH POH PIN</p>
        `;
    }

}

validateUser();

const adminBtn =
    document.getElementById("adminBtn");

if(adminBtn){

    adminBtn.onclick = function(){

        const password =
            prompt(
                "Enter Admin Password"
            );

        if(password === "tehpohpin"){

            window.location.href =
                "admin.html";

        }else{

            alert("Wrong Password");

        }

    };
}