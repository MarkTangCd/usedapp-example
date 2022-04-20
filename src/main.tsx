import ReactDOM from 'react-dom/client'
import './index.css'
import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Config,
} from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
)

function App() {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <div>
      {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}