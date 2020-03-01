import $ from 'cash-dom';

export default class UserProfileView {
    renderUserProfileInormations(userInformations){
        const createUserProfileInormationsContainer = children => {
            const container = document.createElement("div");
            container.className = "profile";
            container.innerHTML = children;
            return container;
        }

        const createContent = elementData => {
            const {login, avatar_url, html_url, bio} = elementData;
            return  (`
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="${avatar_url}" id="profile-image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5" id="profile-name">
                            ${login}
                        </p>
                        <p class="subtitle is-6">
                            <a href="${html_url}" id="profile-name">
                                @${login}
                            </a>
                        </p>
                    </div>
                    </div>
                        <div class="content" id="profile-bio">
                            <p>
                               ${bio}
                            </p>
                        </div>
                    </div>
                </div>
            `);
        }

        const elementContent = createContent(userInformations.body);
        const elementContainer = createUserProfileInormationsContainer(elementContent);
        $('.profile').replaceWith(elementContainer);
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
            const checkIfIsHistory = userHistory => userHistory.body.length !== 0 ? true : false;
            const createHistory = userHistory => {
                const PullRequestEvent = "PullRequestEvent";
                const PullRequestReviewCommentEvent = "PullRequestReviewCommentEvent";

                const fragment = document.createDocumentFragment();
                userHistory.body.forEach(elementData => {
                    switch(elementData.type){
                        case PullRequestEvent: return fragment.appendChild(createPullRequestEvent(elementData));
                        case PullRequestReviewCommentEvent: return fragment.appendChild(createPullRequestReviewCommentEvent(elementData));
                        default: return console.log("error");
                    }
                });
                return fragment;
            }
            const createNoHistoryInformation = () => {
                const container = document.createElement("p");
                container.innerText = "No history";
                return container;
            }
            
            const container = document.createElement("div");
            container.className = "timeline";
            container.id="user-timeline";

            const isHistory = checkIfIsHistory(userHistory);
            const elementContainer = isHistory ? createHistory(userHistory) : createNoHistoryInformation();
            container.appendChild(elementContainer);

            return container;
        }
        
        const elementsToCreate = createHistoryElements(userHistory);
        $('#user-timeline').replaceWith(elementsToCreate);
    }
}