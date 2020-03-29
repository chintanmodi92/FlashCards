import React, {Component, createContext} from 'react';
import axios from "axios";


export const FlashcardContext = createContext();

class FlashcardContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
        this.readFlash();
    }

    //create
    createFlash(e,cont) {
        e.preventDefault();
        let data = [...this.state.content];
        data.push(cont);
        this.setState({
            content: data
        })

    }

    //Read
    readFlash() {
        axios.get('/api/flashcard/read')
            .then(response => {
                console.log(response);
                this.setState({
                    content: response.data
                })

            }).catch(err => console.log(err))

    }


    //Update
    updateFlash() {

    }


    //Delete
    deleteFlash() {

    }

    render() {
        return (
            <FlashcardContext.Provider value={{
                ...this.state,
                createFlash: this.createFlash.bind(this),
                updateFlash: this.updateFlash.bind(this),
                deleteFlash: this.deleteFlash.bind(this)
            }}>
                {this.props.children}
            </FlashcardContext.Provider>
        );
    }
}

export default FlashcardContextProvider;