import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      loaded: false,
      currentPage: 1,
      totalPages: 1,
    }
  }

  componentDidMount(){
    this.getData(1);
  }

  getData=page=>{
    fetch("https://swapi.co/api/starships/?page="+page).then(r=>r.json()).then(data=>{
      this.setState({
        items: data.results,
        loaded: true,
        currentPage: page,
        totalPages: Math.ceil(data.count/10),
      })
    })
  }

  renderHyperdriveBar=value=>{
    const isUnknown = value==="unknown";
    const w = isUnknown ? 0 : parseFloat(value)*100/5; //I used 5 as 100% as required, but there are at least one ship with Hyperdrive rating bigger than 5
    return (
      <span className={"progress-bar"+(isUnknown?" disabled":"")}>
        <span style={{width:w+"%"}}/>
      </span>
    )
  }

  render(){
    if(!this.state.loaded){ return <div>loading...</div>; }

    const { currentPage } = this.state;

    return (
      <div className="App">
        <div className="content">
          {
            this.state.items.map( (item, i) => (
              <div className="item" key={i}>
                <p>Name: <span className="capitalized">{ item.name }</span></p>
                <p>Crew: { parseInt(item.crew) === 0 ? "None" : item.crew }</p>
                <p>Passengers: { parseInt(item.passengers) === 0 ? "None" : item.passengers }</p>
                <p>Hyperdrive Class: { this.renderHyperdriveBar(item.hyperdrive_rating)}</p>
              </div>
            ))
          }
        </div>
        <div className="footer">
          <div className="pagination">
            <button className="btn prv" disabled={currentPage===1} onClick={()=>this.getData(currentPage-1)}>Previous</button>
            <button className="btn nxt" disabled={currentPage===this.state.totalPages} onClick={()=>this.getData(currentPage+1)}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
