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

    getUserHistory(userName, userHistoryEventTypes){
        const extractUserEventTypes = (userEventHistory, userHistoryEventTypes) => {
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

        const filterPullRequestEventbyActionType = response => {
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

        const filterData = (body, userHistoryEventTypes) => {
            const extractedByUserType = extractUserEventTypes(body, userHistoryEventTypes)
            const filteredByActionType = filterPullRequestEventbyActionType(extractedByUserType)

            return filteredByActionType;
        }

        return fetchUserHistory(userName, userHistoryEventTypes).then(response => {
            const { body } = response;
            if(body.status === "error"){
                return {...response, body};
            } else {
                const filteredData = filterData(body, userHistoryEventTypes);
                return {...response, body: filteredData};
            }
        });
    }
}