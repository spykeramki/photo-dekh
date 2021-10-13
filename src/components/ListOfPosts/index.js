const ListOfPosts = props => {
  const {postsList} = props

  const renderPostsList = () =>
    postsList.map(post => (
      <li key={post.id}>
        <img src={post.image} alt="profile route post pic" />
      </li>
    ))

  return <ul>{renderPostsList()}</ul>
}

export default ListOfPosts
