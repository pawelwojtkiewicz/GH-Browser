import UserProfileModal from './UserProfile-modal.js';
import UserProfileView from './UserProfile-view.js';

export default class UserProfile {
    constructor(){
        this.modal = new UserProfileModal();
        this.view = new UserProfileView();
    }

    render(userName){
        this.modal.fetchDataLoader();
        this.modal.getUserData(userName);
        //this.activateLoader();
        //this.getUserInfo
    }
}