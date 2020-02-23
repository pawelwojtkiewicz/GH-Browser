import fetchUserInfo from '../../services/fetchUserInfo.js'

export default class UserProfileModal {
    getUserData(userName){
        const userInfo = fetchUserInfo(userName);
        return userInfo;
    }
}