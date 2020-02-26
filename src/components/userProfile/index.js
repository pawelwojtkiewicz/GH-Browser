import UserProfileModal from './UserProfile-modal.js';
import UserProfileView from './UserProfile-view.js';

export default class UserProfile {
    constructor(){
        this.modal = new UserProfileModal();
        this.view = new UserProfileView();
    }

    render(userName){
        this.modal.fetchDataLoader(true);
        const requests = [
            this.modal.getUserInformations(userName),
            this.modal.getUserHistory(userName)
        ];
        Promise.all(requests)
            .then(data => {
                this.modal.fetchDataLoader(false);
                
            });
    }
}