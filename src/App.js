import React, { Component } from 'react';

import './App.css';
import './stylesheets/mycss.css'
import GameField from './GameField';


class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                </header>
                <GameField />
                
            </div>
        );
    }
}

export default App;
