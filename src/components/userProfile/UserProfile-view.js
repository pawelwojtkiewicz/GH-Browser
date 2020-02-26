import $ from 'cash-dom';
import createElement from '../../utilities/createElement.js'

export default class UserProfileView {
    renderUserProfileInormations(userInformations){
        const {login, avatar_url, html_url, bio} = userInformations.body;
        const createProfileContainer = createElement("div", [["class", "profile"]]);
        const createMediaContainer = createElement("div", [["class", "media"]]);

        const createImgContainer = avatar_url => {
            const container = createElement("div", [["class", "media-left"]]);
            const createFigure = createElement("figure", [["class", "image is-64x64"]]);
            const createImg = createElement("img", [["src", avatar_url], ["id", "profile-image"]]);
            createFigure.appendChild(createImg);
            container.appendChild(createFigure);
            return container;
        }
        const createMediaContent = (login, html_url) => {
            const container = createElement("div", [["class", "media-content"]]);
            const userNameField = createElement("p", [["class", "title is-5"], ["id", "profile-name"]], login);
            const userNameSubtitle = createElement("p", [["class", "subtitle is-6"]]);
            const userNameLink = createElement("a", [["href", html_url], ["id", "profile-name"]], login);

            userNameSubtitle.appendChild(userNameLink);
            container.appendChild(userNameField);
            container.appendChild(userNameSubtitle);
            return container;
        }
        const createMedia = bio => {
            const container = createElement("div", [["class", "content"], ["id", "profile-bio"]]);
            const description = createElement("p", [], bio || '(no information)');

            container.appendChild(description);
            return container;
        }

        const imgContainer = createImgContainer(avatar_url);
        const mediaContent = createMediaContent(login, html_url);
        const media = createMedia(bio);

        createMediaContainer.appendChild(imgContainer);
        createMediaContainer.appendChild(mediaContent);
        createProfileContainer.appendChild(createMediaContainer);
        createProfileContainer.appendChild(media);
        $('.profile').replaceWith(createProfileContainer);
    }

    // renderUserProfileTimeline(){

    // }
}