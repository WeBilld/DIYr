import { Button } from '@mui/material';
import './userInfoSidebar.css';

export default function UserInfoSidebar() {
    return (
        <div className="userInfoSidebar">
            <div className="sidebarWrapper">
                <img src="https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="profileImg" />
                <div className="sidebarInfo">
                    <div className="infoItem">
                        <p className="infoCategory">Name: </p>
                        <p className='infoAnswer'>Lesley Pierce</p>
                    </div>
                    <div className="infoItem">
                        <p className="infoCategory">City: </p>
                        <p className='infoAnswer'>Chicago</p>
                    </div>
                    <div className="infoItem">
                        <p className="infoCategory">About Me: </p>
                        <p className='infoAnswer'>I love building and restoring furniture! Feel free to follow me and see what I'm up to.</p>
                    </div>
                    <div className="buttonWrapper">
                        <Button variant="text" id="signoutButton">Signout</Button>
                        <Button variant="text" id="editButton">Edit Profile</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
