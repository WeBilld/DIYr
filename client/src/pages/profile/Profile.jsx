import './profile.css';
import UserInfoSidebar from "../../components/userInfoSidebar/UserInfoSidebar";
import Requests from '../../components/requestsSidebar/Requests';
import ProfileContents from '../../components/profileContents/ProfileContents';
import UserContext from '../../Contexts/UserContext';
import { useContext } from 'react';

export default function Profile() {
    const {userInfo} = useContext(UserContext)
    console.log('profile page', userInfo)
    return (
        <div className="profileContainer">
            <UserInfoSidebar />
            <ProfileContents />
            <Requests />
        </div>
    )
}
