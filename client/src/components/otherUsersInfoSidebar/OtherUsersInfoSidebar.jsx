import './otherUsersInfoSidebar.css';
import { Button } from '@mui/material';

export default function OtherUsersInfoSidebar() {
    return (
        <div className="userInfoSidebar">
            <div className="sidebarWrapper">
                <img src="https://images.unsplash.com/photo-1650819521147-04bb5e05d5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="profileImg" />
                <div className="sidebarInfo">
                    <div className="infoItem">
                        <p className="infoCategory">Name: </p>
                        <p className='infoAnswer'>David Stevens</p>
                    </div>
                    <div className="infoItem">
                        <p className="infoCategory">City: </p>
                        <p className='infoAnswer'>Los Angeles</p>
                    </div>
                    <div className="infoItem">
                        <p className="infoCategory">About Me: </p>
                        <p className='infoAnswer'>I'm a climber and a builder. Come follow me.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
