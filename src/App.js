import React from 'react';
import './demo.scss';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoading:true,
    }
    this.printData = this.printData.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidMount(){
    fetch('https://cors-anywhere.herokuapp.com/http://cat-fact.herokuapp.com/facts')
  .then(response => response.json())
  .then(json => this.printData(json))    
  }
  printData(data){
    const allFacts = data.all;
    const visibalFacts = allFacts.concat().sort(() => 0.5 - Math.random()).slice(0,5);
    this.setState({
      isLoading:false,
      allFacts,
      visibalFacts
    })
    window.$(function(){
      window.sr = window.ScrollReveal();
    
      if (window.$(window).width() < 768) {
    
        if (window.$('.timeline-content').hasClass('js--fadeInLeft')) {
          window.$('.timeline-content').removeClass('js--fadeInLeft').addClass('js--fadeInRight');
        }
    
        window.sr.reveal('.js--fadeInRight', {
          origin: 'right',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800,
        });
    
      } else {
        
        window.sr.reveal('.js--fadeInLeft', {
          origin: 'left',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800,
        });
    
        window.sr.reveal('.js--fadeInRight', {
          origin: 'right',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800,
        });
    
      }
      
      window.sr.reveal('.js--fadeInLeft', {
          origin: 'left',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800,
        });
    
        window.sr.reveal('.js--fadeInRight', {
          origin: 'right',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800,
        });
    });
   
  }
  delete(id){
    const {allFacts, visibalFacts} = this.state;
    const reShuffle = allFacts.concat().sort(() => 0.5 - Math.random()).slice(0,1);
    for(let i=0; i<visibalFacts.length;i++){
      if(visibalFacts[i]._id === id){
        visibalFacts[i] = reShuffle[0]
      }
    }
    this.setState({
      visibalFacts
    })
  }
  render(){
    if(this.state.isLoading){
      return(<p style={{textAlign:'center'}}>Loading...</p>)
    }else{
      const {visibalFacts} = this.state;
      const pringFacts = visibalFacts.map((data)=>
      <div className="timeline-item" key={data._id}>
        <div className="timeline-img"></div>

        <div className="timeline-content js--fadeInLeft">
        <h2>{data.user.name.first} {data.user.name.last}</h2>
          <div className="date">Votes:{data.upvotes}</div>
          <p>{data.text}</p>
          <button className="bnt-more" onClick={()=>this.delete(data._id)}>Replace</button>
        </div>
      </div>
      )
    return(
      <div>
        <header>
          <div className="container text-center">
            <h1>Facts</h1>
          </div>
        </header>
        <section className="timeline">
          <div className="container">
            {pringFacts}
          </div>
        </section>

      </div>
    )
    }
  }
  
}

export default App;
