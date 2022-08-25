import Request from '../request/Request';
import './requests.css';

export default function Requests() {
    return (
        <div className='requestsContainer'>
            <div className="requestsWrapper">
                <p className='requestsTitle'>Requests</p>
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
            </div>
        </div>
    )
}
