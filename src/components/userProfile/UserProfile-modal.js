import $ from 'cash-dom';

export default class UserProfileModal {
    fetchDataLoader(status){
        if(status) $('#spinner').removeClass("is-hidden");
        else $('#spinner').addClass("is-hidden");
    }

    getUserData(userName){
        const URLuserInformations = `https://api.github.com/users/${userName}`;
        const URLuserHistory = `https://api.github.com/users/${userName}/events/public`;
    
        function checkIfFetchIsAvaible(){
            if (!window.fetch) {
               return false;
            } else return true;
        }
    
        function getDataByFetch(){
            const that = this;
            let userInformations;
            let userHistory;
    
            function getUserHistory(){
                fetch(URLuserInformations)
                    .then(response => response.json())
                    .then(function (body) {
                        userHistory = body;
                        that.fetchDataLoader(false);
                        console.log(userInformations, userHistory);
                });
            }
    
            function getUserInformations(){
                fetch(URLuserHistory)
                    .then(response => response.json())
                    .then(function (body) {
                        userInformations = body;
                        getUserHistory();
                });
            }

            getUserInformations();
        }
    
        function getDataByXMLHttpRequest(){
            let userInformations;
            let userHistory;
    
            function getUserHistory(){
                const xhr = new XMLHttpRequest();
                xhr.addEventListener("load", function() {
                    userHistory = JSON.parse(xhr.response);
                    that.fetchDataLoader(false);
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
        isFetchAvaible ? getDataByFetch.call(this) : getDataByXMLHttpRequest(userName);
    }
}