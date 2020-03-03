import UserProfileModal from './UserProfileModal.js';
import UserProfileView from './UserProfileMiew.js';

export default class UserProfile {
    constructor(){
        this.modal = new UserProfileModal();
        this.view = new UserProfileView();
        this.userHistoryEventTypes = ["PullRequestEvent", "PullRequestReviewCommentEvent"];
    }

    render = userName => {
        this.modal.fetchDataLoader(true);
        this.modal.removeOldUserInformationsAndHistory();
        const requests = [
            this.modal.getUserInformations(userName),
            this.modal.getUserHistory(userName, this.userHistoryEventTypes)
        ];
        Promise.all(requests)
            .then(data => {
                const userInformations = data.filter(function (element) {
                    return element.dataType === "userInformations"
                })[0];
           
                const userHistory= data.filter(function (element) {
                    return element.dataType === "userHistory"
                })[0];
                this.view.renderUserProfileInormations(userInformations);
                this.view.renderUserProfileTimeline(userHistory);
                this.modal.fetchDataLoader(false);  
            });
    }
}