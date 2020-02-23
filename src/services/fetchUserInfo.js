export default function fetchUserInfo(userName){
    const URL = 'https://api.github.com/users/';

    function checkIfFetchIsAvaible(){
        if (!window.fetch) {
           return false;
        } else return true;
    }
    
    function getDataByFetch(userName){
        fetch(URL + userName)
            .then((response)=> response.json())
            .then(function (body) {
                console.log(body)
                return body;
          self.profile = body;
          self.update_profile();
        })
    }


    function getDataByXMLHttpRequest(userName){
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function() {
            return JSON.parse(xhr.response);
              self.profile = JSON.parse(xhr.response);
              self.update_profile();
        });
        xhr.open("GET", URL + userName, true);
        xhr.send();   
    }

    const isFetchAvaible = checkIfFetchIsAvaible();
    isFetchAvaible ? getDataByFetch(userName) : getDataByXMLHttpRequest(userName); 
}