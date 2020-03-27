import React, {Component, createContext} from 'react';

export const FlashcardContext = createContext();

class FlashcardContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                {id:1, english: 'hello', converted: 'Hola', language: 'spanish'},
                {id:2, english: 'how are you doing? ', converted: 'Como Estas!', language: 'spanish'},
                {id:3, english: 'How are you?', converted: 'Kamusta ka?', language: 'tagalog'},
                {id:4, english: 'hello', converted: 'Hola', language: 'spanish'},
                {id:5, english: 'hello', converted: 'Hola', language: 'spanish'},
                {id:6, english: 'hello', converted: 'Hola', language: 'spanish'}

            ]
        }
    }

    //create
    createFlash() {

    }

    //Read
    readFlash() {

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
                readFlash: this.readFlash.bind(this),
                updateFlash: this.updateFlash.bind(this),
                deleteFlash: this.deleteFlash.bind(this)
            }}>
                {this.props.children}
            </FlashcardContext.Provider>
        );
    }
}

export default FlashcardContextProvider;