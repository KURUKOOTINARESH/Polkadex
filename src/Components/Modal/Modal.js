import "./Modal.css"
import {FaEthereum,FaMinus,FaPlus} from "react-icons/fa"
import cardano from "../../images/cardano.png"
import React, { useState,useEffect, useRef } from 'react';

const Modal = (props) =>{
    const [minCount, setMinCount] = useState(1);
    const [maxCount, setMaxCount] = useState(10);
    const [activeToken, setToken] = useState('Ethereum');
    const [activeChain, setChain] = useState('Ethereum Mainnet');
    const {title,className,id,onTokenChange,onChainChange} = props


    const ethereumCard = useRef(null)
    const ethereumSelect = useRef(null)

    useEffect(() => {
        if (ethereumCard.current) {
            ethereumCard.current.click();
        }
        if (ethereumSelect.current) {
            console.log(document.activeElement)
            ethereumSelect.current.click();
        }
      }, []);
    
    const onSelectChain=(event)=>{
        onChainChange(event.target.value)
        setChain(event.target.value)
    }

    const onTokenCardFocus=(event)=>{
        onTokenChange(event.target.id)
        setToken(event.target.id)
    }

    const getDetails=()=>{
        switch(id){
            case 'token-modal':
                return (
                    <div className="token-cards-wrapper">
                        <div id="Ethereum" className={activeToken==='Ethereum' ?"token-card token-card-active" : "token-card"} onClick={onTokenCardFocus} ref={ethereumCard}>
                            <FaEthereum className="token-icon"/>
                            <span>Ethereum</span>
                            <span>ETH</span>
                        </div>
                        <div id="Cardano" className={activeToken==='Cardano' ?"token-card token-card-active" : "token-card"} onClick={onTokenCardFocus}>
                            <img src={cardano} alt="cardano" className="token-icon"/>
                            <span>Cardano</span>
                            <span>ADA</span>
                        </div>
                    </div>
                )
            case 'chain-modal':
                return (
                    <div className="chain-select-items-wrapper">
                        <div id="Ethereum Mainnet" className={activeChain==='Ethereum Mainnet' ? "chain-select-item chain-select-item-active" : "chain-select-item"}>
                            <span className={activeChain==='Ethereum Mainnet' ? "chain-dot chain-dot-active" : "chain-dot"}></span>
                            <span>Ethereum Mainnet</span>
                            <button value='Ethereum Mainnet' className={activeChain==='Ethereum Mainnet' ? "select-button select-button-active" : "select-button"} onClick={onSelectChain} ref={ethereumSelect}>Select</button>
                        </div>
                        <div id="Ropsten" className={activeChain==='Ropsten' ? "chain-select-item chain-select-item-active" : "chain-select-item"}>
                            <span className={activeChain==='Ropsten' ? "chain-dot chain-dot-active" : "chain-dot"}></span>
                            <span>Ropsten</span>
                            <button value="Ropsten" className={activeChain==='Ropsten' ? "select-button select-button-active" : "select-button"} onClick={onSelectChain}>Select</button>
                        </div>
                    </div>
                )
            case 'amount-modal':
                return (
                    <div className="amount-count-items-wrapper">
                        <div className="amount-count-item">
                            <span>Max amount</span>
                            <div className="counter">
                                <FaMinus className="counter-icon" onClick={()=>{if(maxCount!==0){setMaxCount(maxCount-1)}}}/>
                                <span className="amount-text">{maxCount}</span>
                                <FaPlus className="counter-icon" onClick={()=>setMaxCount(maxCount+1)}/>
                            </div>
                        </div>
                        <hr className="hr-line"/>
                        <div className="amount-count-item">
                            <span>Min amount</span>
                            <div className="counter">
                                <FaMinus className="counter-icon" onClick={()=>{if(minCount!==0){setMinCount(minCount-1)}}}/>
                                <span className="amount-text">{minCount}</span>
                                <FaPlus className="counter-icon" onClick={()=>setMinCount(minCount+1)}/>
                            </div>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return(
        <div className={`modal ${className}`}>
            <span>{title}</span>
            {getDetails()}
        </div>
    )
}

export default Modal