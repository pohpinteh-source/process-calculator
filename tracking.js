const API_URL =
"https://script.google.com/macros/s/AKfycbyX8XQZ924Ut6OSBfCDOsoQ_X_9-DNqjhg7_5H6wKlVjRvZPC8mwucyA-mfmxOuXzwG/exec";

(function(){

    const page =
        window.location.pathname
        .split("/")
        .pop()
        .replace(".html","");

    if(
        page === "" ||
        page === "index" ||
        page === "admin"
    ){
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const user =
        params.get("user") ||
        sessionStorage.getItem(
            "userEmail"
        );

    if(!user){
        return;
    }

    fetch(
        `${API_URL}?action=trackUsage&user=${encodeURIComponent(user)}&calculator=${encodeURIComponent(page)}`
    );

})();