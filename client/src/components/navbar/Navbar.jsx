import './navbar.css';
import { Person, Chat } from '@mui/icons-material';

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <span className="logo">DIYr</span>
      </div>
      <div className="navbarCenter">
        <span className="navbarLink">Posts</span>
        <span className="navbarLink">Tools</span>
      </div>
      <div className="navbarRight">
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <Chat className="chatIcon" />
            <span className="navbarIconBadge">1</span>
          </div>
          <img src="https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" className="navbarImg" />
        </div>
      </div>
    </div>
  )
}
