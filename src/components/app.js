import ReactDOM from 'react-dom'
import React from 'react'
import Signer from '@waves/signer'
import Provider from '@waves.exchange/provider-web'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setupWaves();
    this.authWithKeeper = this.authWithKeeper.bind(this);
  }

  setupWaves = () => {
    this.wavesSigner = new Signer({
      NODE_URL: 'https://nodes-testnet.wavesnodes.com',
    })
    this.wavesProvider = new Provider('https://testnet.waves.exchange/signer/')
    this.wavesSigner.setProvider(this.wavesProvider)
  }

  authWithKeeper() {
    const authData = { data: 'Auth on my site' }
    if (WavesKeeper) {
      WavesKeeper.auth(authData)
        .then((auth) => {
          console.log(JSON.stringify(auth))
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert('To Auth WavesKeeper should be installed.')
    }
  }

  getUserAddress = () => this.state.userData ? this.state.userData.address : '<user not authorisated>';

  authWithSigner = async () => {
    console.log('authUser() called ....')
    try {
      const userData = await this.wavesSigner.login()
      console.log('User data: ', userData)
      this.setState({userData});
    } catch (err) {
      console.error('login rejected')
    }
  }

  render() {
    return (
        <>
            <p>Address: {this.getUserAddress()}</p>
            <button
              className="btn btn-default"
              type="submit"
              onClick={this.authWithKeeper}
            >Auth with WavesKeeper</button>
            <button
              className="btn btn-default"
              type="submit"
              onClick={this.authWithSigner}
            >Auth with Signer</button>
        </>
    )
  }
}

const app = document.getElementById('app')
if (app) {
  ReactDOM.render(<App />, app)
}
