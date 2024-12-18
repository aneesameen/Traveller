export const SelectTravelList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole traveller in exploration",
        icon: "🙋",
        people: "1"
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Adventure for two travellers",
        icon: "💑",
        people: "2 People"
    },
    {
        id: 3,
        title: "Family",
        desc: "An adventure loving fun group",
        icon: "👪",
        people: "3 to 5 People"
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill seekers",
        icon: "🏕️",
        people: "more than 5"
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of cost",
        icon: "💵",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep cost on the average side",
        icon: "💰",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Dont worry about cost",
        icon: "💸",
    }
]

export const AI_PROMPT = 'Generate Travel plan for Location : {location}, for {totalDays} Days for {traveller} with {budget} budget, give me hotels option list with HotelName, Hotel address, Price , hotel image url, geo coordinates, rating, description and suggest me an array of itenarary list with placeName, place Details, Place image url, geo coordination, ticket pricing, time to travel each of the location for {totalDays} days with each day plan with best time to visit in json format'