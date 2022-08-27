import { Button } from '@mui/material';
import './request.css';

export default function Request() {
    return (
        <div className="requestContainer">
            <div className="toolImageWrapper">
                <img src="https://images.unsplash.com/photo-1594320990326-398050e0f31a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="toolImage" />
                <div className="statusWrapper">
                    <p>Status:</p>
                    <p className="statusValue">Pending</p>
                </div>
            </div>
            <div className="requestInfoWrapper">
                <div className="requesterInfoItem">
                    <p className="requesterInfoType">Tool:</p>
                    <p className="requesterInfoAnswer">Miter Saw</p>
                </div>
                <div className="requesterInfoItem">
                    <p className="requesterInfoType">From:</p>
                    <p className="requesterInfoAnswer requesterName">Olivia Swift</p>
                </div>
                <div className="requesterInfoItem">
                    <p className="requesterInfoType">City:</p>
                    <p className="requesterInfoAnswer">New York</p>
                </div>
            </div>
            <div className="postedWrapper">
                <p className="postedText">53 minutes ago</p>
            </div>
            <div className="requestButtons">
                <Button className='acceptButton' variant='contained'>Accept</Button>
                <Button className='rejectButton' variant='outlined'>Reject</Button>
            </div>
        </div>
    )
}
