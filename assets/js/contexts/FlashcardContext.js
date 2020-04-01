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
        axios.post('/api/flashcard/create', cont)
            .then(response => {
                let data = [...this.state.content];
                data.push(response.data);
                this.setState({
                    content: data
                });
              this.readFlash();
            }).catch(err=>console.log(err));

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
    updateFlash(data) {
        axios.put('/api/flashcard/update/' + data.id, data)
            .then(
                response => {
                    let content = [...this.state.content];
                    let findContent = content.find(con => con.id === data.id);

                    findContent.english = data.eng;
                    findContent.converted = data.con;

                    this.setState =({
                        content: content
                    })
                }
            ).catch(
                err=>console.log(err)
        );

        this.readFlash();
    }

    //Delete
    deleteFlash(data) {
        axios.delete('/api/flashcard/delete/' + data)
            .then(
                response=>{
                    let content = [...this.state.content];
                    let findContent = content.find(con => con.id === data);
                    content.splice(content.indexOf(findContent),1);
                    this.setState({
                        content: content
                    })
                }
            ).catch(
                err=>console.log(err)
        )

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