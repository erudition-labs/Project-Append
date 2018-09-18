const usersUtils = require('../../users/util');

const unescapeEvent = (event) => {
    if(event.OIC)       event.OIC       = usersUtils.unescapeUserArray(event.OIC);
    if(event.signedUp)  event.signedUp  = usersUtils.unescapeUserArray(event.signedUp);
    if(event.pending)   event.pending   = usersUtils.unescapeUserArray(event.pending);
    if(event.author)    event.author    = usersUtils.unescapeUser(event.author);
    return event;
};

const unescapeEventArray = (events) => {
    for(let i=0; i<events.length; i++) {
        events[i] = unescapeEvent(events[i]);
    }
    
    return events;
};

module.exports = { unescapeEvent, unescapeEventArray };