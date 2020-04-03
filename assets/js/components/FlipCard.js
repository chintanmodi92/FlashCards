import React, {useContext, useState} from 'react';
import ReactCardFlip from "react-card-flip";
import {FlashcardContext} from "../contexts/FlashcardContext";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css"

function FlipCard(props) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [engWord, setEngWord] = useState(props.english);
    const [conWord, setConWord] = useState(props.converted);

    const [isOpen,setIsOpen] = useState(false);
    const cardStyleFront = {
        color: "black",
        background: "lavender"
    };
    const cardStyleBack = {
        color: "white",
        background: "blue"
    };


const context = useContext(FlashcardContext);

const handleDelete = (e) => {
    //console.log(e.target, props.english);
    e.stopPropagation();
    setDeleteClicked(true);
    setIsOpen(true);
};

if(deleteClicked){
    return (
        <Modal show={isOpen} onHide={()=>{setDeleteClicked(false);setIsOpen(false)}}>
            <Modal.Header>Are you sure you want to delete?</Modal.Header>
            <Modal.Body>{props.english} -> {props.converted}</Modal.Body>
            <Modal.Footer>
                <button onClick={()=>{setDeleteClicked(false);setIsOpen(false)}} className="btn btn-secondary">Cancel</button>
                <button onClick={()=>{context.deleteFlash(props.id);setDeleteClicked(false);setIsOpen(false)}} className="btn btn-danger">Delete</button>
            </Modal.Footer>
        </Modal>
    )
}


    const handleEdit = (e) => {
        //console.log(e.target, props.english);
        e.stopPropagation();
        setEditClicked(true);
        setIsOpen(true);
    };

    if(editClicked){
        return (
            <Modal show={isOpen} onHide={()=>{setEditClicked(false);setIsOpen(false)}}>
                <Modal.Header>Edit this Word:</Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <input onChange={(e)=>{setEngWord(e.target.value)}} type="text" className="form-control" placeholder="English word" value={engWord} />
                            </div>
                            <div className="col">
                                <input onChange={(e)=>{setConWord(e.target.value)}} type="text" className="form-control" placeholder="Translation word" value={conWord} />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={()=>{setEditClicked(false);setIsOpen(false)}} className="btn btn-secondary">Cancel</button>
                    <button onClick={()=>{context.updateFlash({id: props.id, eng: engWord, con: conWord});setEditClicked(false);setIsOpen(false)}} className="btn btn-danger">Update</button>
                </Modal.Footer>
            </Modal>
        )
    }



    const buttons = (
            <div className="" >
                <i onClick={(e)=>{handleDelete(e)}} className="fas fa-trash-alt text-danger" />
                <i onClick={(e)=>{handleEdit(e)}} className="fas fa-edit text-secondary"/>
            </div>
    );


    return (
        <ReactCardFlip isFlipped = {isFlipped} flipDirection="horizontal" containerStyle={{minWidth: "15rem", margin:"1em", display:"inline-block"}}>
            <div className="card" style={cardStyleFront}>
                <div className="card-body text-center row" onClick={()=>{setIsFlipped(!isFlipped)}}>
                        <h5 className="col pt-2">{engWord}</h5>
                    <div className="col-2">
                        {buttons}
                    </div>
                </div>
            </div>

            <div className="card" style={cardStyleBack}>
                <div className="card-body text-center row" onClick={()=>{setIsFlipped(!isFlipped)}}>
                    <h5 className="col pt-2">{conWord}</h5>
                    <div className="col-2">
                        {buttons}
                    </div>
                </div>
            </div>

        </ReactCardFlip>
    );
}

export default FlipCard;