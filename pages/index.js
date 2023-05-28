import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Web3 from 'web3'
import lotteryContract from '@/blockchain/lottery'
import 'bulma/css/bulma.css'
import { useEffect, useState } from 'react'
// 0x8e540B47866D11EB268c641EC728c27BEb10AD73

export default function Home() {
  const [web3,setWeb3] = useState()
  const [address,setAddress] = useState()

  const [lcContract,setLcContract] = useState()

  const [error,setError]=useState('');
    const [success,setSuccess]=useState('');
  const [lotteryHistory,setLotteryHistory]=useState([])
  const [lotteryId,setLotteryId]=useState()
  const [lotteryPot,setLotteryPOt]=useState()
  const [lotteryPlayers,setPlayers]=useState([])


  // useEffect(()=>{
  //   if(lcContract) getPot()
  //   if(lcContract) getPlayer()
  //   if(lcContract) getLotteryId()
  // },[lcContract])

  useEffect(() => {
    updateState()
  }, [lcContract])

  const updateState = () => {
    if (lcContract) getPot()
    if (lcContract) getPlayer()
    if (lcContract) getLotteryId()
  }

    // if (typeof window !=="undefined" && typeof window.ethereum !=="undefined") {
  //   window.ethereum.on('accountsChanged',async()=>{
  //     const accounts =await web3.eth.getAccounts();
  //     console.log(accounts[0]);
  //         setAddress(accounts[0]);
  //   })
  // }

  // useEffect(()=>{
  //   if(lcContract) getLotteryId()
  // },[]);

  const getPot=async()=>{
    // console.log("getpot");
    const pot = await lcContract.methods.getBalance().call()
    setLotteryPOt(web3.utils.fromWei(pot ,'ether'))
  }

  const getPlayer=async()=>{
    // console.log("getpot");
    const players = await lcContract.methods.getPlayer().call()
    setPlayers(players)
  }

  const getHistory=async(id)=>{
    // console.log("getpot");
    setLotteryHistory([])
    for(let i = parseInt(id); i>0;i--){
      console.log("get history");
      const winnerAddress = await lcContract.methods.lotteryWinners(i).call()
      const historyObj ={}
      historyObj.id=i
      historyObj.address=winnerAddress
      setLotteryHistory(lotteryHistory=>[...lotteryHistory,historyObj])
    } //the lotteryid will be stored as a number
    // getHistory(lotteryId)
  }
  
  const getLotteryId=async()=>{
    // console.log("getpot");
    const lottId = await lcContract.methods.lotteryId().call()
    console.log(lottId);
    setLotteryId(lottId)
    await getHistory(lottId)
    console.log(JSON.stringify(lotteryHistory));
  }

  const enterLotteryHandler = async ()=>{
    setError(' ');

    try {
      
      await lcContract.methods.enter().send({
        from: address,
        value: '15000000000000000',
        gas:300000,
        gasPrice: null
  
      })
    updateState()

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  const pickWinnerHandler=async()=>{
    setError(' ');

    try {
      
      await lcContract.methods.pickWinner().send({
        from: address,
        // value: '15000000000000000',
        gas:300000,
        gasPrice: null
  
      })
      const winnerAddress  = await lcContract.methods.lotteryWinners(lotteryId).call()
      setSuccess(`The winner is ${winnerAddress}`)
      updateState()

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  const connectWalletHandler=async()=>{
    setError(' ');
    if (typeof window !=="undefined" && typeof window.ethereum !=="undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // window.web3 = new Web3(window.ethereum);
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts =await web3.eth.getAccounts();
        setAddress(accounts[0]);

        // create local contract copy
        const lc = lotteryContract(web3)
        setLcContract(lc)

            window.ethereum.on('accountsChanged',async()=>{
      const accounts =await web3.eth.getAccounts();
      console.log(accounts[0]);
          setAddress(accounts[0]);
    })

      } catch (error) {
        console.log(error.message);
      setError(error.message)

      }
     } else {
      console.log("No wallet");
      setError(error.message)

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
                  <button className='button is-link is-large mt-3' onClick={enterLotteryHandler}>Play Now</button>
                </section>
                <section className='mt-6'>
                  <p><b>Admin Only:</b> Pick Winner</p>
                  <button className='button is-primary is-large mt-3' onClick={pickWinnerHandler}>Pick Winner</button>
                </section>
                <section className='mt-6'>
                  <p><b>Current Lottery ID:</b> {lotteryId}</p>
                </section>
                <section>
                  <div className="container has-text-danger mt-6">
                      <p>{error}</p>
                  </div>
                </section>
                <section>
                  <div className="container has-text-success">
                      <p>{success}</p>
                  </div>
                </section>
              </div>
              <div className="column is-one-third">
                <section className='mt-5'>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2>Lottery History</h2>
                      {
                        (lotteryHistory && lotteryHistory.length>0) &&
                        lotteryHistory.map(item=>{
                          if(lotteryId != item.id) return <div className="history-entry mt-3" key={item.id}>
                                  <div>Lottery #{item.id} Winner</div>
                                  <div className={styles.accounts}>
                                    <a href={`https://etherscan.io/address/${item.address}`} target='_blank'>{item.address}</a>
                                  </div>
                                </div>
                        })
                      }
                    </div>
                  </div>
                </div>
                </section>
                <section className='mt-5'>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2>Players {lotteryPlayers.length}</h2>
                        <ul className={`${styles.accounts} ml-0`}>
                          {
                            (lotteryPlayers && lotteryPlayers.length>0) &&
                            lotteryPlayers.map((player,index)=>{
                              return<li key={`${player}-${index}`}><a href={`https://etherscan.io/${player}`} target='_blank'>{player}</a></li>
                            })
                          }
                        </ul>
                    </div>
                  </div>
                </div>
                </section>
                <section className='mt-5'>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2>Pot</h2>
                      <p>{lotteryPot} Ether</p>
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
