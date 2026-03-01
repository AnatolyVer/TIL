type EventList = {
    image: string;
    name: string;
    duration: string;
    link: string;
}

const EVENTS: Array<EventList> = [
    {
        image: "/xmas.png",
        name: "Новогоднее чудо",
        duration: "01.12.2025 - 31.12.2025",
        link: "/events/new_year_miracle"
    },
    {
        image: "/love_is/img.png",
        name: "День св. Валентина",
        duration: "14.02.2026",
        link: "/events/valentines_day"
    },
]
export default EVENTS;