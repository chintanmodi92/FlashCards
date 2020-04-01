import React, {useContext, useState} from 'react';
import {FlashcardContext} from "../contexts/FlashcardContext";
import FlipCard from "./FlipCard";


const Home = () => {

    const context = useContext(FlashcardContext);
    const [engWord, setEngWord] = useState('');
    const [conWord, setConWord] = useState('');
    const [langSelect, setLangSelect] = useState('spanish');
    const [indexSelected, setIndexSelected] = useState(0);
    const [showLang,setShowLang] = useState('spanish');

    let current = indexSelected;
    const getClass = (classes, index) => {
        if(index === current){
            return classes + ' active';

        }
        return classes;
    };

    const handleClick = (e,index) => {
        setIndexSelected(index);
        setShowLang(e.target.value)
    };

    const handleChange = (e) => {
        setEngWord(e.target.value)
    };


    return (
        <div className="container bg-dark">
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
                        setLangSelect('spanish');
                    }}>
                    <div className="row" style={{marginBottom:"10px"}}>
                        <div className="col">
                            <input onChange={(e)=>{handleChange(e)}} type="text" placeholder="English word/sentence" className="form-control"/>
                        </div>
                        <div className="col">
                            <input onChange={(e)=> {setConWord(e.target.value)}} type="text" placeholder="Translation word/sentence" className="form-control"/>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <select onChange={(e)=> {setLangSelect(e.target.value)}} className="form-control" placeholder="Select language" id="exampleFormControlSelect1">
                                    <option value="spanish">Spanish</option>
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

                <div className="buttons d-flex justify-content-between">
                        <button onClick={(e) => handleClick(e,0)} className={getClass("btn btn-outline-info btn-lg", 0)} value="spanish">Spanish</button>
                        <button onClick={(e) => handleClick(e,1)} className={getClass("btn btn-outline-success btn-lg", 1)} value="tagalog">Tagalog</button>
                        <button onClick={(e) => handleClick(e,2)} className={getClass("btn btn-outline-danger btn-lg", 2)} value="french">French</button>
                        <button onClick={(e) => handleClick(e,3)} className={getClass("btn btn-outline-warning btn-lg", 3)} value="german">German</button>
                        <button onClick={(e) => handleClick(e,4)} className={getClass("btn btn-outline-primary btn-lg", 4)} value="japanese">Japanese</button>
                </div>

                <br/>

                {context.content.map((el, index) => {

                    if (el.language === showLang) {

                        if(engWord === '' && conWord === ''){
                            return <FlipCard key={el.id + index} english={el.english} converted={el.converted} id={el.id} />
                        } else if( engWord !== '' && (el.english.toLowerCase().includes(engWord))) {
                         //   console.log(el.english);
                            return <FlipCard key={el.id + index} english={el.english} converted={el.converted} id={el.id} />
                        } else if(conWord !== '' && (el.converted.toLowerCase().includes(conWord))) {
                          //  console.log(el.converted);
                            return <FlipCard key={el.id + index} english={el.english} converted={el.converted} id={el.id} />
                        }
                    }
                })}
            </div>
        </div>
    );
};

export default Home;