import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FlashcardContextProvider from "./contexts/FlashcardContext";
import Home from "./components/Home";
import '../css/app.css'

class App extends Component {
    render() {
        return (

            <FlashcardContextProvider>
                <Home/>
            </FlashcardContextProvider>
            // <FlashcardContextProvider>
            //    Home
            // </FlashcardContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
