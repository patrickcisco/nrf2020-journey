const EVENTS = {
    QA: "event/qa",
    MAP: "event/map",
    PICKLIST: "event/picklist"
}

const LOCATIONS = {
    Home: "Home",
    Production: "Production",
    Distribution: "Distribution",
    Retail: "Retial",
}

const CASES = {
    Good: "KnownGoodCase", 
    Bad: "KnownBadCase",
}

const DB = {
    Host: "mongodb",
    Port: "27017"
}

module.exports = {
    LOCATIONS: LOCATIONS,
    CASES: CASES,
    EVENTS: EVENTS,
    DB: DB,
 };


