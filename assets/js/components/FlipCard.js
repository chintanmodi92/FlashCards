import React, {useState} from 'react';
import ReactCardFlip from "react-card-flip";


function FlipCard(props) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <ReactCardFlip isFlipped = {isFlipped} flipDirection="horizontal" containerStyle={{minWidth: "15rem", margin:"1em", display:"inline-block"}}>
            <div className="card">
                <div className="card-body text-center" onClick={()=>{setIsFlipped(!isFlipped)}}>
                    <h5>{props.english}</h5>
                </div>
            </div>

            <div className="card">
                <div className="card-body text-center" onClick={()=>{setIsFlipped(!isFlipped)}}>
                    <h5>{props.converted}</h5>
                </div>
            </div>

        </ReactCardFlip>
    );
}

export default FlipCard;