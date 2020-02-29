export default function fetchUserInformations(userName){
    return fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json())
        .then(function (body) {
            const {login, avatar_url, html_url, bio} = body;
            return {
                dataType: "userInformations",
                body: {
                    login,
                    avatar_url,
                    html_url,
                    bio,
                }
            };
    });
}