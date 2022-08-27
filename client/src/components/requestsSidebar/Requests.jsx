import Request from '../request/Request';
import './requests.css';

export default function Requests() {
    return (
        <div className='requestsContainer'>
            <center><p className="requestTitle">Requests</p></center>
            <div className="requestsOptionsWrapper">
                <p className='requestsOption'>Sent</p>
                <p className='requestsOption'>Received</p>
            </div>
            <div className="requestsWrapper">
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
