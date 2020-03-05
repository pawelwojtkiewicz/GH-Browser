import $ from 'cash-dom';

export default class UserProfileView {
    checkStatus(status){return status === "error"};
    createErrorInformation(textResponse){
        const container = document.createElement('p');
        container.innerText = textResponse;
        return container;
    }
      
    createUserProfileInormationsContainer(children){
        const container = document.createElement("div");
        container.className = "profile";
        container.innerHTML = children;
        return container;
    }

    createUserProfileContent(elementData){
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
                            ${bio || "(no information)"}
                        </p>
                    </div>
                </div>
            </div>
        `);
    }

    renderUserProfileInormations(userInformations){
        const {body} = userInformations;
        
        let elementContent;
        const isError = this.checkStatus(body.status);

        if(isError){
            elementContent = this.createErrorInformation(body.textResponse);
        } else {
            elementContent = createContent(body);
        }

        const elementContainer = this.createUserProfileInormationsContainer(elementContent);
        $('.profile').replaceWith(elementContainer);
    }




    createHistoryElementContainer(children, created_at){
        const container = document.createElement("div");
        container.className = "timeline-item";
        container.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                <p class="heading">${convertPullRequestDate(created_at)}</p>
                    ${children}
                </div>
        `;
        return container;
    };

    createPullRequestEvent(elementData){
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

    createPullRequestReviewCommentEvent = elementData => {
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

    createHistoryElements(body){
        const checkIfIsHistory = body => body.length !== 0 ? true : false;
        const createHistory = body => {
            const PullRequestEvent = "PullRequestEvent";
            const PullRequestReviewCommentEvent = "PullRequestReviewCommentEvent";

            const fragment = document.createDocumentFragment();
            body.forEach(elementData => {
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

        const isError = this.checkStatus(body.status);
        const isHistory = checkIfIsHistory(body);
        let elementContent;
        if(isError){
            elementContent = this.createErrorInformation(body.textResponse);
        } else if (isHistory) {
            elementContent = createHistory(body)
        } else if (!isHistory){
            elementContent = createNoHistoryInformation()
        }
        
        container.appendChild(elementContent);
        return container;
    }





    renderUserProfileTimeline(userHistory, convertPullRequestDate){
        const {body} = userHistory;

        const elementsToCreate = createHistoryElements(body);
        $('#user-timeline').replaceWith(elementsToCreate);
    }
}