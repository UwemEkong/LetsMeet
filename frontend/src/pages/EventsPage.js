import Event from '../components/Event';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const EventsPage = ({ results, setResults, formParams }) => {

    const history = useHistory();

    const getGroups = () => {
        axios.get(
            '/api/groups',
            {
                params: formParams
            }
        ).then((resp) => {
            setResults(resp.data); // list of results
            history.push("/groups")
        })
    }

    return (<div className="container">
        <Button onClick={getGroups}>groups</Button>
        {results.map((event) => {
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