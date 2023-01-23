import "./Search.css"
import {Component} from "react"
import { RiSearch2Line } from "react-icons/ri";
import Modal from "../Modal/Modal";

class Search extends Component{
    state = {isSearchWrapperClicked : false, isClickedOuSide : false, token:false, chain:false, amount:false, tokenValue:'Choose token', chainValue:'Select chain'}
    
    onSearchWrapperClick=()=>{
        const searchWrapperElement = document.getElementById("search-wrapper")
        const items = searchWrapperElement.childNodes
        const activeItem = document.activeElement
        if(activeItem===searchWrapperElement){
            items[0].focus()
        }
        this.setState({isSearchWrapperClicked:true})
    }

    moveFocusLeft=()=>{
        const searchWrapperElement = document.getElementById("search-wrapper")
        const items = searchWrapperElement.childNodes
        const activeItem = document.activeElement
        if(activeItem===items[0]){
            searchWrapperElement.focus()
            this.setState({isSearchWrapperClicked:false,token:false,chain:false,amount:false})
        }
        const itemsCount = items.length
        for(let i=0;i<itemsCount;i++){
            if(activeItem===items[i] && activeItem!==items[0]){
                items[i-1].focus()
            }
        }
    }

    moveFocusRight=()=>{
        const searchWrapperElement = document.getElementById("search-wrapper")
        const items = searchWrapperElement.childNodes
        const activeItem = document.activeElement
        if(activeItem===searchWrapperElement){
            items[0].focus()
            this.setState({isSearchWrapperClicked:true})
        }
        const itemsCount = items.length
        for(let i=0;i<itemsCount;i++){
            if(activeItem===items[i] && activeItem!==items[itemsCount-1]){
                items[i+1].focus()
            }
        }
    }

    onArrowKey=(event)=>{
        const {token,chain,amount}=this.state
        if(event.key==='ArrowRight'){
            this.moveFocusRight()
        }
        if(event.key==='ArrowLeft'){
            this.moveFocusLeft()
        }
        if(event.key==="Enter"){
            if(token){
                document.getElementById("chain").focus()
            }
            if(chain){
                document.getElementById("amount").focus()
            }
            if(amount){
                this.setFocus()
            }
        }
    }
    
    componentDidMount(){
        this.setFocus()
        const searchWrapperElement = document.getElementById("search-wrapper")
        
        document.body.addEventListener("click", (event) => {
            console.log("isClickedOuSide")
            if (!(searchWrapperElement.contains(event.target))) {
                this.setState({isClickedOuSide:true})
            } 
        });

    }

    componentDidUpdate(){
        const {isClickedOuSide,isSearchWrapperClicked,token,chain,amount} = this.state
        if(isClickedOuSide){
            if(!isSearchWrapperClicked){
                document.getElementById("search-wrapper").focus()
                this.setState({isClickedOuSide:false})
            }
            else if(token){
                document.getElementById("token").focus()
                this.setState({isClickedOuSide:false})
            }
            else if(chain){
                document.getElementById("chain").focus()
                this.setState({isClickedOuSide:false})
            }
            else if(amount){
                document.getElementById("amount").focus()
                this.setState({isClickedOuSide:false})
            }
        }
    }
    
    
    setFocus(){
        document.getElementById('search-wrapper').focus()
        this.setState({token:false,chain:false,amount:false,isSearchWrapperClicked:false})
    }

    onTokenFocus=(event)=>{
        this.setState({token:true,chain:false,amount:false})
    }

    onChainFocus=(event)=>{
        event.target.focus()
        this.setState({token:false,chain:true,amount:false})
    }

    onAmountFocus=(event)=>{
        this.setState({token:false,chain:false,amount:true})
    }


    getSearchItemDetails=(isSearchWrapperClicked,item,itemValue,id)=>{
        if(isSearchWrapperClicked){
            if(item){
                if(id==="token"){
                    return <span>Choose {id}</span>
                }
                return <span>Select {id}</span>
            }
            return <span id={`button-${id}`} className="item-button" tabIndex={1}>{itemValue}</span>
        }
    }

    getSearchItemDetailsAmount=(isSearchWrapperClicked,item,itemValue)=>{
        if(isSearchWrapperClicked){
            if(item){
                return <span>{itemValue}</span>
            }
            return <span id='button-amount' className="item-button" tabIndex={1}>{itemValue}</span>
        }
    }

    onTokenChange=(value)=>{
        this.setState({tokenValue:value})
        document.getElementById("chain").focus()
    }
    
    onChainChange=(value)=>{
        this.setState({chainValue:value})
        document.getElementById("amount").focus()
    }

    onSearchClick=()=>{
        
        this.setState({isSearchWrapperClicked:false,token:false,chain:false,amount:false})
        this.setFocus()
    }

    onSubmitForm=(event)=>{
        console.log("kkkkkkkkkkkkkkk")
        event.preventDefault()
        this.setFocus()
    }

    render(){
        const {isSearchWrapperClicked,token,chain,amount,tokenValue,chainValue} = this.state

        return(
            <div className="search-page">

                <div className="modal-wrapper">
                    <Modal id="token-modal" title='Choose token' className={token ? "modal-display token-modal" : " "} onTokenChange={this.onTokenChange}/>
                    <Modal id="chain-modal" title='Select chain' className={chain ? "modal-display chain-modal" : " "} onChainChange={this.onChainChange} chainActive={chain}/>
                    <Modal id="amount-modal" title='Filter by amount' className={amount ? "modal-display amount-modal" : " "}/>
                </div>
                
                <form className="search-wrapper" id="search-wrapper" onClick={this.onSearchWrapperClick} onKeyDown={this.onArrowKey} onSubmit={this.onSubmitForm} tabIndex={1}>
                
                    <div id="token" className={isSearchWrapperClicked ?"search-item-wrapper search-item-wrapper-active" : "search-item-wrapper token"} tabIndex={1} onFocus={this.onTokenFocus}>
                        <span>Any token</span>
                        {this.getSearchItemDetails(isSearchWrapperClicked,token,tokenValue,'token')}
                    </div>
                    <div id="chain" className={isSearchWrapperClicked ?"search-item-wrapper search-item-wrapper-active" : "search-item-wrapper chain"} tabIndex={isSearchWrapperClicked ? 1 : ' '} onFocus={this.onChainFocus}>
                        <span>Any chain</span>    
                        {this.getSearchItemDetails(isSearchWrapperClicked,chain,chainValue,'chain')}
                    </div>
                    <div id="amount" className="search-item-wrapper amount" tabIndex={isSearchWrapperClicked ? 1 : ' '} onFocus={this.onAmountFocus}>
                        <div className={isSearchWrapperClicked ? "amount-active" : ""}>
                            <span>Any amount</span>
                            <br/>
                            {this.getSearchItemDetailsAmount(isSearchWrapperClicked,amount,'Filter by amount')}
                        </div>
                        
                        <button className={isSearchWrapperClicked ? "search-icon-wrapper search-icon-wrapper-active" : "search-icon-wrapper"} type="submit" style={{pointerEvents : amount ? 'visible' : 'none'}}>
                            <RiSearch2Line/>
                            {isSearchWrapperClicked && <span className="search-btn-text">Search</span>}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Search