// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import CryptocurrencyItem from '../CryptocurrencyItem'
import './index.css'

class CryptocurrenciesList extends Component {
  state = {list: [], isLoading: true}

  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()

    const updatedData = data.map(eachObj => ({
      id: eachObj.id,
      currencyLogo: eachObj.currency_logo,
      currencyName: eachObj.currency_name,
      usdValue: eachObj.usd_value,
      euroValue: eachObj.euro_value,
    }))

    this.setState({list: updatedData, isLoading: false})
  }

  renderList = () => {
    const {list} = this.state

    return (
      <div className="m-cont">
        <h1 className="head">Cryptocurrency Tracker</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
          className="cc-img"
        />
        <ul className="list-items">
          <li className="item-head">
            <p>Coin Type</p>
            <div className="rhs-head">
              <p>USD</p>
              <p>EURO</p>
            </div>
          </li>
          {list.map(eachObj => (
            <CryptocurrencyItem key={eachObj.id} details={eachObj} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return isLoading ? (
      <div data-testid="loader">
        <Loader type="Rings" color="#ffffff" height={80} width={80} />
      </div>
    ) : (
      this.renderList()
    )
  }
}

export default CryptocurrenciesList
