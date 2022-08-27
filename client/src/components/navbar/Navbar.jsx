import './navbar.css';
import { Link } from 'react-router-dom';
import Home from '../../pages/home/Home';

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to='/' style={{ textDecoration: 'none' }}><span className="logo">DIYr</span></Link>
      </div>
      <div className="navbarCenter">
        <Link to='/' style={{ textDecoration: 'none' }}><span className="navbarLink">Posts</span></Link>
        <span className="navbarLink">Tools</span>
      </div>
      <div className="navbarRight">
        <p className="navbarGreeting">Hello, Lauren!</p>
        <div className="navbarIcons">
          <Link to='/profile'><img src="https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" className="navbarImg" /></Link>
          <span className="navbarImageBadge">1</span>
        </div>
      </div>
    </div>
  )
}
