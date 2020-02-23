import $ from 'cash-dom';

export default class UserProfileModal {
    fetchDataLoader(){
        $('#spinner').toggleClass("is-hidden");
    }



    getUserData(userName){
        const URLuserInformations = `https://api.github.com/users/${userName}`;
        const URLuserHistory = `https://api.github.com/users/${userName}/events/public`;
    
        function checkIfFetchIsAvaible(){
            if (!window.fetch) {
               return false;
            } else return true;
        }
    
        function getDataByFetch(userName){
            let userInformations;
            let userHistory;
    
            function getUserHistory(){
                fetch(URLuserInformations)
                    .then(response => response.json())
                    .then(function (body) {
                        userHistory = body;
                });
            }
    
            function getUserInformations(){
                fetch(URLuserHistory)
                    .then(response => response.json())
                    .then(function (body) {
                        userInformations = body;
                });
            }
        }
    
        function getDataByXMLHttpRequest(userName){
            let userInformations;
            let userHistory;
    
            function getUserHistory(){
                const xhr = new XMLHttpRequest();
                xhr.addEventListener("load", function() {
                    userHistory = JSON.parse(xhr.response);
                });
                xhr.open("GET", URLuserInformations, true);
                xhr.send();
            }
    
            function getUserInformations(){
                const xhr = new XMLHttpRequest();
                xhr.addEventListener("load", function() {
                    userInformations = JSON.parse(xhr.response);
                    getUserHistory();
                });
                xhr.open("GET", URLuserInformations, true);
                xhr.send();
            }
    
            getUserInformations();
        }
    
        const isFetchAvaible = checkIfFetchIsAvaible();
        isFetchAvaible ? getDataByFetch(userName) : getDataByXMLHttpRequest(userName);
    }
}