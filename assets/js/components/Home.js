import React, {Fragment, useContext, useState} from 'react';
import {FlashcardContext} from "../contexts/FlashcardContext";
import Navbar from "./Navbar";
import FlipCard from "./FlipCard";


const Home = () => {

    const context = useContext(FlashcardContext)
    const [engWord, setEngWord] = useState('');
    const [conWord, setConWord] = useState('');
    const [langSelect, setLangSelect] = useState('spanish');

    return (
        <div className="container">
            <Navbar />

            <br/>

            <div>
                <form
                    onSubmit={(e)=>{
                        {
                            engWord && conWord &&
                            context.createFlash(e, {english: engWord, converted: conWord, language: langSelect});
                        }
                        e.target.reset();
                        setEngWord('');
                        setConWord('');
                    }}>
                    <div className="row" style={{marginBottom:"10px"}}>
                        <div className="col">
                            <input onChange={(e)=> {setEngWord(e.target.value)}} type="text" placeholder="English word/sentence" className="form-control"/>
                        </div>
                        <div className="col">
                            <input onChange={(e)=> {setConWord(e.target.value)}} type="text" placeholder="Translation word/sentence" className="form-control"/>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <select onChange={(e)=> {setLangSelect(e.target.value)}} className="form-control" placeholder="Select language" id="exampleFormControlSelect1">
                                    <option value="spanish" selected>Spanish</option>
                                    <option value="tagalog">Tagalog</option>
                                    <option value="french">French</option>
                                    <option value="german">German</option>
                                    <option value="japanese">Japanese</option>
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