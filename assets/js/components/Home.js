import React, {Fragment, useContext} from 'react';
import {FlashcardContext} from "../contexts/FlashcardContext";
import Navbar from "./Navbar";
import FlipCard from "./FlipCard";


const Home = () => {

    const context = useContext(FlashcardContext)
    const language = 'spanish'

    return (
        <div className="container">
            <Navbar />

            <br/>

            <div>
                <form action="">
                    <div className="row" style={{marginBottom:"10px"}}>
                        <div className="col">
                            <input type="text" placeholder="English word/sentence" className="form-control"/>
                        </div>
                        <div className="col">
                            <input type="text" placeholder="Translation word/sentence" className="form-control"/>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <select className="form-control" placeholder="Select language" id="exampleFormControlSelect1">
                                    <option>Spanish</option>
                                    <option>Tagalog</option>
                                    <option>French</option>
                                    <option>German</option>
                                    <option>Japanese</option>
                                </select>
                            </div>

                        </div>

                    </div>

                    <button className="btn btn-primary" style={{width:"160px", marginBottom:"10px"}}>Add</button>
                </form>

                <br/>

                {context.content.map((el, index) => (
                    <FlipCard key={el.id + index} english={el.english} converted={el.converted} />
                ))}
            </div>

        </div>


    );
};

export default Home;