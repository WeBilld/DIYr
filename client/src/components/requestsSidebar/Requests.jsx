import Request from '../request/Request';
import { useEffect, useState } from 'react';
import './requests.css';

export default function Requests() {
    const [requests, setRequests] = useState({});
    useEffect(() => {
        fetch('http://localhost:5500/rest/request/owner/7')
            .then(response => response.json())
            .then(data => {
                setRequests(data);
            })
    }, [])

    const requestList = requests?.requests?.map((el,i) => <Request key={i} data={el}/>);

    return (
        <div className='requestsContainer'>
            <center><p className="requestTitle">Requests</p></center>
            <div className="requestsOptionsWrapper">
                <p className='requestsOption'>Sent</p>
                <p className='requestsOption'>Received</p>
            </div>
            <div className="requestsWrapper">
                {requestList}
            
            </div>
        </div>
    )
}
