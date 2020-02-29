export default function fetchUserHistory(userName, userHistoryEventTypes){
    function extractUserEventTypes(userEventHistory, userHistoryEventTypes){
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

    return fetch(`https://api.github.com/users/${userName}/events/public`)
        .then(response => response.json())
        .then(function (body) {
            const userHistory = extractUserEventTypes(body, userHistoryEventTypes);
            return {
                dataType: "userHistory",
                body: userHistory,
            };
    });
}