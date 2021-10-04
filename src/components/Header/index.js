import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
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
          <Link to="/">
            <button type="button" className="transparent-button">
              <AiFillHome data-testid="homeFilled" />
            </button>
          </Link>
          <button type="button" className="transparent-button">
            <img src="./img/sampleProfileImage.svg" alt="header profile pic" />
          </button>
          <Button type="button" color="primary">
            Add Post
          </Button>
        </nav>
      </div>
    )
  }
}

export default Header
