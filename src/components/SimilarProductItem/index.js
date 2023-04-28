import './index.css'

const Similar = props => {
  const {send} = props
  return (
    <li className="list">
      <img className="similar-icon" alt="similar product" src={send.imageUrl} />
      <p>{send.title}</p>
      <p>{send.brand}</p>
      <p>Rs {send.price}</p>
      <p>{send.rating}</p>
      <img
        className="ic"
        alt="star"
        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
      />
    </li>
  )
}

export default Similar
