import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import 'reactjs-popup/dist/index.css'

const UserAddPostModal = () => {
  const addYourPost = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-posts'
    const postDetails = {
      post_image:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png',
      caption: 'test post',
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(postDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data.post)
    }
  }
  return (
    <Popup trigger={<button type="button">Add Post</button>} modal>
      <div>
        <button type="button" onClick={addYourPost}>
          Add Post
        </button>
      </div>
    </Popup>
  )
}

export default UserAddPostModal
