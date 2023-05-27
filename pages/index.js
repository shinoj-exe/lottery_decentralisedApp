import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Web3 from 'web3'
import 'bulma/css/bulma.css'
import { useState } from 'react'
// 0x8e540B47866D11EB268c641EC728c27BEb10AD73

export default function Home() {
  const [web3,setWeb3] = useState()
  const [address,setAddress] = useState()


  const connectWalletHandler=async()=>{
    if (typeof window !=="undefined" && typeof window.ethereum !=="undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // window.web3 = new Web3(window.ethereum);
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts =await web3.eth.getAccounts();
        setAddress(accounts[0]);
      } catch (error) {
        console.log(error.message);
      }
     } else {
      console.log("No wallet");
      alert("No wallet Please install Metamask")
     }
  }
  return (
    <div>
      <Head>
        <title>Ether Lottery</title>
        <meta name="description" content="Ethereum Lottery dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <nav className='navbar mt-4 mb-4'>
          <div className="container">
            <div className="navbar-brand">
              <h1>Ether Lottery</h1>
            </div>
            <div className="navbar-end">
              <button className='button is-link' onClick={connectWalletHandler}>Connect wallet</button>
            </div>
          </div>
        </nav>
        <div className="container">
          <section className='mt-5'>
            <div className="columns">
              <div className="column is-two-third">
                <section className='mt-5'>
                  <p>Enter the lottery by sending atleast 0.01 ether</p>
                  <button className='button is-link is-large mt-3'>Play Now</button>
                </section>
                <section className='mt-6'>
                  <p><b>Admin Only:</b> Pick Winner</p>
                  <button className='button is-primary is-large mt-3'>Pick Winner</button>
                </section>
              </div>
              <div className="column is-one-third">
                <section className='mt-5'>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2>Lottery History</h2>
                      <div className="history-entry">
                        <div>Lottery 1 Winner</div>
                        <div className={styles.accounts}>
                          <a href="#" target='_blank'>0Xudujygy</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </section>
                <section className='mt-5'>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2>Players(1)</h2>
                        <div className={styles.accounts}>
                          <a href="#" target='_blank'>0Xudujygy</a>
                        </div>
                    </div>
                  </div>
                </div>
                </section>
                <section className='mt-5'>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2>Pot</h2>
                      <p>10 ether</p>
                    </div>
                  </div>
                </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
