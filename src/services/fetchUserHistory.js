export default fetchUserHistory = userName => {
    return fetch(`https://api.github.com/users/${userName}/events/public`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status >= 100 && response.status <= 199){
                return {status: "error", textResponse: "Connection timed out or server refused connection."};
            } else if (response.status >= 400 && response.status <= 499){
                return {status: "error", textResponse: "Not found"};
            } else if (response.status >= 500 && response.status <= 599){
                return {status: "error", textResponse: "Server error. Data has not been downloaded."};
            } else {
                return {status: "error", textResponse: "Another response from the server. Try again."};
            }
        })
        .then(response => {
            return {
                dataType: "userHistory",
                body: response,
            };
    });
}