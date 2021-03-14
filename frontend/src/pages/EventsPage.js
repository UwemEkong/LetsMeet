import Event from '../components/Event';

const EventsPage = (eventResults) => {

    return (<div className="container">
        {eventResults.eventResults.map((event) => {
            return (
                <Event
                    name={event.name}
                    time={event.time}
                    description={event.description}
                    group_url={event.group_url}
                    url={event.url}
                    location={event.location}
                    attendees={event.attendees}
                    image={event.image} />
            )
        })}
    </div>)
}

export default EventsPage;