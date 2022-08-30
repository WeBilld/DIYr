import { Button } from '@mui/material';
import './request.css';

export default function Request({ data }) {
    const handleAccept = () => {
        console.log(data._id);
        fetch('http://localhost:5500/rest/request/', {
            method: 'PUT',
            body: JSON.stringify({
                "requestId": data._id,
                "status": "approved"
            })
        })
        .then()
        console.log("approved");
    };
    const handleReject = () => {
        console.log("denied");
        fetch('http://localhost:5500/rest/request/', {
            method: 'PUT',
            body: JSON.stringify({
                "requestId": data._id,
                "status": "denied"
            })
        })
        .then()
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
                <Button className='acceptButton' variant='contained' onClick={handleAccept}>Accept</Button>
                <Button className='rejectButton' variant='outlined' onClick={handleReject}>Reject</Button>
            </div>
        </div>
    )
}
