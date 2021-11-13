import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import UserAddPostModal from '../UserAddPostModal'
import ProfileIconStrap from '../ProfileIconStrap'
import './index.css'

class Header extends Component {
  state = {searchInput: ''}

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <nav className="header-navbar">
        <Link to="/">
          <img src="./img/photoDekhLogo.svg" alt="website logo" />
          <p>Photo Dekho</p>
        </Link>
        <input
          type="search"
          className="search"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearch}
        />
        <button type="button" testid="searchIcon">
          <FaSearch />
        </button>
        <Link to="/">
          <button
            type="button"
            className="transparent-button"
            testid="homeFilled"
          >
            <AiFillHome />
          </button>
        </Link>
        <ProfileIconStrap />
        <UserAddPostModal />
      </nav>
    )
  }
}

export default Header
