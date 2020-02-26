import $ from 'cash-dom';
import fetchUserInformations from '../../services/fetchUserInformations.js';
import fetchUserHistory from '../../services/fetchUserHistory.js';

export default class UserProfileModal {
    fetchDataLoader(status){
        if(status) $('#spinner').removeClass("is-hidden");
        else $('#spinner').addClass("is-hidden");
    }

    getUserInformations(userName){
        return fetchUserInformations(userName);
    }

    getUserHistory(userName){
        return fetchUserHistory(userName);
    }
}