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

    // Block direct access

    if(!user || !key){

        document.body.innerHTML =
        `
        <div style="
            text-align:center;
            margin-top:80px;
            font-family:Arial;
        ">
            <h1 style="color:red;">
                Access Denied
            </h1>

            <p>
                This Process Calculator is restricted to authorized users.
            </p>

            <p>
                Please contact TEH POH PIN for access.
            </p>
        </div>
        `;

        return;
    }

    try{

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

            const welcome =
                document.getElementById(
                    "welcome"
                );

            if(welcome){

                welcome.innerHTML =
                `
                <span style="
                    font-size:20px;
                    font-weight:bold;
                    color:#1f4e79;
                ">
                    Welcome, ${displayName}
                </span>
                `;
            }

        }else{

            document.body.innerHTML =
            `
            <div style="
                text-align:center;
                margin-top:80px;
                font-family:Arial;
            ">
                <h1 style="color:red;">
                    Access Denied
                </h1>

                <p>
                    Invalid User Link
                </p>

                <p>
                    Please contact TEH POH PIN.
                </p>
            </div>
            `;
        }

    }catch(error){

        document.body.innerHTML =
        `
        <div style="
            text-align:center;
            margin-top:80px;
            font-family:Arial;
        ">
            <h1 style="color:red;">
                System Error
            </h1>

            <p>
                Unable to connect to User Database.
            </p>
        </div>
        `;

        console.error(error);
    }
}

validateUser();