import './profile.css';
import UserInfoSidebar from "../../components/userInfoSidebar/UserInfoSidebar";
import Requests from '../../components/requestsSidebar/Requests';
import ProfileContents from '../../components/profileContents/ProfileContents';

export default function Profile() {
    return (
        <div className="profileContainer">
            <UserInfoSidebar />
            <ProfileContents />
            <Requests />
        </div>
    )
}
