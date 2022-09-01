import { Button } from '@mui/material';
import { useContext } from 'react';
import UserContext from '../../Contexts/UserContext';
import './userInfoSidebar.css';

export default function UserInfoSidebar() {
    //const { userInfo, setUserInfo } = useContext(UserContext)
    const { userInfo } = useContext(UserContext);
    return (
        <div className="userInfoSidebar">
            <div className="sidebarWrapper">
                <img src={userInfo.profile_image_url} alt="" className="profileImg" />
                <div className="sidebarInfo">
                    <div className="infoItem">
                        <p className="infoCategory">Name: </p>
                        <p className='infoAnswer'>{userInfo.first_name + ' ' + userInfo.last_name}</p>
                    </div>
                    <div className="infoItem">
                        <p className="infoCategory">City: </p>
                        <p className='infoAnswer'>{userInfo.city}</p>
                    </div>
                    <div className="infoItem">
                        <p className="infoCategory">About Me: </p>
                        <p className='infoAnswer'>{userInfo.info}</p>
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
