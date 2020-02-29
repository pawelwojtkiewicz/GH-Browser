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

    renderUserProfileTimeline(userHistory){
        const createHistoryElementContainer = (children, created_at) => {
            const container = document.createElement("div");
            container.className = "timeline-item";
            container.innerHTML = `
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                    <p class="heading">${created_at}</p>
                        ${children}
                    </div>
            `;
            return container;
        };

        const createPullRequestEvent = elementData => {
            const {payload, created_at} = elementData.userEvent;
            const createContent = () => (`
                <div class="content">
                    <span class="gh-username">
                        <img src="${payload.pull_request.user.avatar_url}"/>
                        <a href="${payload.pull_request.user.html_url}">
                            ${payload.pull_request.user.login}
                        </a>
                        </span>
                    ${payload.action}
                    <a href="${payload.pull_request.html_url}">
                        pull request
                    </a>
                    <p class="repo-name">
                        <a href="${payload.pull_request.base.repo.html_url}">
                            ${payload.pull_request.base.repo.full_name}
                        </a>
                    </p>
                </div>
            `);
  
            const elementContent = createContent();
            const elementContainer = createHistoryElementContainer(elementContent, created_at);

            return elementContainer;
        }

        const createPullRequestReviewCommentEvent = elementData => {
            const {payload, created_at} = elementData.userEvent;
            const createContent = () => (`
                <div class="content">
                    <span class="gh-username">
                        <img src="${payload.pull_request.user.avatar_url}"/>
                        <a href="${payload.pull_request.user.html_url}">
                            ${payload.pull_request.user.login}
                        </a>
                    </span>
                    created
                    <a href="${payload.comment.html_url}">
                        comment
                    </a>
                    to
                    <a href="${payload.pull_request.html_url}">
                        pull request
                    </a>
                    <p class="repo-name">
                        <a href="${payload.pull_request.base.repo.html_url}">
                            ${payload.pull_request.base.repo.full_name}
                        </a>
                    </p>
                </div>
            `);

            const elementContent = createContent();
            const elementContainer = createHistoryElementContainer(elementContent, created_at);

            return elementContainer;
        }

        const createHistoryElements = userHistory => {
            console.log(userHistory);
            const container = document.createElement("div");
            container.className = "timeline";
            container.id="user-timeline";

            const PullRequestEvent = "PullRequestEvent";
            const PullRequestReviewCommentEvent = "PullRequestReviewCommentEvent";
            userHistory.body.forEach(elementData => {
                switch(elementData.type){
                    case PullRequestEvent: return container.appendChild(createPullRequestEvent(elementData));
                    case PullRequestReviewCommentEvent: return container.appendChild(createPullRequestReviewCommentEvent(elementData));
                    default: return console.log("error");
                }
            });

            return container;
        }
        
        const elementsToCreate = createHistoryElements(userHistory);
        $('#user-timeline').replaceWith(elementsToCreate);
    }
}