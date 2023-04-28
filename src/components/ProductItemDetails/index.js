import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Similar from '../SimilarProductItem'

import './index.css'

const status = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProductItemDetail extends Component {
  state = {
    active: true,
    productNewList: {},
    similarList: [],
    apiStatus: '',
    count: 1,
  }

  componentDidMount() {
    this.findData()
  }

  findData = async () => {
    this.setState({apiStatus: status.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const jwt = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updated = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        brand: data.brand,
        rating: data.rating,
        avalability: data.availability,
        totalReviews: data.total_reviews,
        price: data.price,
        description: data.description,
      }
      const similarData = data.similar_products.map(one => ({
        id: one.id,
        imageUrl: one.image_url,
        title: one.title,
        brand: one.brand,
        rating: one.rating,
        avalability: one.availability,
        totalReviews: one.total_reviews,
        price: one.price,
        description: one.description,
      }))
      this.setState({
        productNewList: updated,
        similarList: similarData,
        apiStatus: status.success,
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  rendermethod = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.success:
        return this.successRender()
      case status.failure:
        return this.failureRender()
      case status.inProgress:
        return this.progressRender()
      default:
        return null
    }
  }

  increase = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  decrease = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  successRender = () => {
    const {productNewList, similarList, count} = this.state

    return (
      <div>
        <div className="mini">
          <div>
            <img className="icon" alt="product" src={productNewList.imageUrl} />
          </div>
          <div>
            <h1>{productNewList.title}</h1>
            <p>Rs {productNewList.price}/-</p>
            <div>
              <p>{productNewList.rating}</p>
              <img
                className="ic"
                alt="star"
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              />
            </div>
            <p>{productNewList.totalReviews} Reviews</p>
            <p>{productNewList.description}</p>
            <p>Available: {productNewList.avalability}</p>
            <p>Brand: {productNewList.brand}</p>
            <div className="count">
              <button data-testid="plus" onClick={this.increase} type="button">
                <BsPlusSquare />
              </button>
              <p>{count}</p>
              <button data-testid="minus" onClick={this.decrease} type="button">
                <BsDashSquare />
              </button>
            </div>
          </div>
          <button type="button">ADD TO CART</button>
        </div>
        <ul className="ul">
          {similarList.map(way => (
            <Similar send={way} key={way.id} />
          ))}
        </ul>
      </div>
    )
  }

  progressRender = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={180} width={180} />
    </div>
  )

  failureRender = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button>Continue Shopping</button>
      </Link>
    </div>
  )

  render() {
    const {active, apiStatus} = this.state
    return (
      <div>
        <Header />
        <div>{this.rendermethod()}</div>
      </div>
    )
  }
}

export default ProductItemDetail
