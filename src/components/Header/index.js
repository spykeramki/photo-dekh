import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import UserAddPostModal from '../UserAddPostModal'
import ProfileIconStrap from '../ProfileIconStrap'
import './index.css'

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="header-navbar">
          <Link to="/">
            <img src="./img/photoDekhLogo.svg" alt="website logo" />
            <p>Photo Dekho</p>
          </Link>
          <input type="search" className="search" placeholder="Search" />
          <BsSearch data-testid="searchIcon" />
          <Link to="/">
            <button type="button" className="transparent-button">
              <AiFillHome data-testid="homeFilled" />
            </button>
          </Link>
          <ProfileIconStrap data-testid="popover" />
          <UserAddPostModal />
        </nav>
      </div>
    )
  }
}

export default Header
