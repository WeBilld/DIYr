import { Button } from '@mui/material';
import './request.css';

export default function Request({ data, updateRequestsState }) {
    const handleAccept = () => {
        console.log(data._id);
        fetch('http://localhost:5500/rest/request/', {
            method: 'PUT',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "requestId": data._id,
                "status": "approved"
            })
        })
            .then(res => updateRequestsState(data._id, 'approved'))
            .catch(error => console.log(error));
        console.log("approved");
    };
    const handleReject = () => {
        console.log("denied");
        fetch('http://localhost:5500/rest/request/', {
            method: 'PUT',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "requestId": data._id,
                "status": "denied"
            })
        })
            .then(res => updateRequestsState(data._id, 'denied'))
            .catch(error => console.log(error));
    }
    return (
        <div className="requestContainer">
            <div className="toolImageWrapper">
                <img src={data.image_url} alt="" className="toolImage" />
                <div className="statusWrapper">
                    <p>Status:</p>
                    <p className="statusValue">{data.status}</p>
                </div>
            </div>
            <div className="requestInfoWrapper">
                <div className="requesterInfoItem">
                    <p className="requesterInfoType">Tool:</p>
                    <p className="requesterInfoAnswer">{data.tool_name}</p>
                </div>
                <div className="requesterInfoItem">
                    <p className="requesterInfoType">From:</p>
                    <p className="requesterInfoAnswer requesterName">{data.first_name} {data.last_name}</p>
                </div>
                <div className="requesterInfoItem">
                    <p className="requesterInfoType">City:</p>
                    <p className="requesterInfoAnswer">{data.city}</p>
                </div>
            </div>
            <div className="postedWrapper">
                <p className="postedText">53 minutes ago</p>
            </div>
            <div className="requestButtons">
                {data.status === 'pending' && (
                    <>
                        <Button className='acceptButton' variant='contained' onClick={handleAccept}>Accept</Button>
                        <Button className='rejectButton' variant='outlined' onClick={handleReject}>Reject</Button>
                    </>
                )}
            </div>
        </div>
    )
}
