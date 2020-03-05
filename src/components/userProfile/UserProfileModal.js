import $ from 'cash-dom';
import fetchUserInformations from '../../services/fetchUserInformations.js';
import fetchUserHistory from '../../services/fetchUserHistory.js';

export default class UserProfileModal {
    fetchDataLoader(status){
        if(status) $('#spinner').removeClass("is-hidden");
        else $('#spinner').addClass("is-hidden");
    }

    removeOldUserInformationsAndHistory() {
        $('#user-timeline').empty();
        $('.profile').empty();
    }

    getUserInformations(userName){
        return fetchUserInformations(userName);
    }

    convertPullRequestDate(receivedDate){
        const date = new Date(receivedDate)
        const getDay = date => date.getDate();
        const getMonth = date => date.getMonth();
        const getYear = date => date.getFullYear();
        const convertNumberMonthOnShortString = numberMonth => {
            const getStringMonth = (months, numberMonth) => months[numberMonth];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthInString = getStringMonth(months, numberMonth);
            return monthInString;
        }

        const day = getDay(date);
        const month = getMonth(date);
        const monthInString = convertNumberMonthOnShortString(month);
        const year = getYear(date);
        return `${monthInString} ${day}, ${year}`;
    }

    _extractUserEventTypes(userEventHistory, userHistoryEventTypes){
        const userHistory = [];
        userHistoryEventTypes.forEach(eventType => {
            userEventHistory.forEach(userEvent => {
                if(userEvent.type === eventType){
                    const historyElement = {
                        type: eventType,
                        userEvent,
                    }
                    userHistory.push(historyElement);
                }
            });
        });
        return userHistory;
    }

    _filterPullRequestEventbyActionType(response){
        const pullRequestEvent = "PullRequestEvent";
        const actionTypesOfPullRequestEvent = ["opened", "closed"];

        const checkIfPullRequestEvent = (elementData, pullRequestEvent) => elementData.type === pullRequestEvent;
        const getWithRequiredActionTypes = (elementData, actionTypesOfPullRequestEvent) => actionTypesOfPullRequestEvent.some(actionType => actionType === elementData.userEvent.payload.action);

        const filteredUserHistory = response.map(elementData => {
            const isPullRequestEvent = checkIfPullRequestEvent(elementData, pullRequestEvent);
            if(isPullRequestEvent){
                const result = getWithRequiredActionTypes(elementData, actionTypesOfPullRequestEvent);
                if(result) return elementData;
            } else {
                return elementData;
            }
        });
    
        return filteredUserHistory;
    }

    _filterData(body, userHistoryEventTypes){
        const extractedByUserType = this._extractUserEventTypes(body, userHistoryEventTypes)
        const filteredByActionType = this._filterPullRequestEventbyActionType(extractedByUserType)

        return filteredByActionType;
    }

    getUserHistory(userName, userHistoryEventTypes){
        return fetchUserHistory(userName, userHistoryEventTypes).then(response => {
            const { body } = response;
            if(body.status === "error"){
                return {...response, body};
            } else {
                
                const filteredData = this._filterData(body, userHistoryEventTypes);
                return {...response, body: filteredData};
            }
        });
    }
}