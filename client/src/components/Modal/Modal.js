import React from 'react';
import "./Modal.css";

// const backDropStyle = {
//     position: 'fixed',
//     top: 0,
//     bottom: 0,
//     left: 0, 
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     padding: 50
// }

// const modalStyle = {
//     backgroundColor: '#fff',
//     borderradius: 5,
//     maxWidth: 500,
//     minHeight: 300,
//     margin: '0 auto',
//     padding: 30,
//     position: "relative"
// }

// const footerSytle = {
//     position: "absolute",
//     bottom: 20
// }

class Modal extends React.Component {
   
    render() {
        console.log(this.props)
        if (!this.props.show){
            return null;
        }
        return (
            <div className="backDrop">
                <div className="modal">
                {this.props.children}
                <br/>
                <br/>
                
                <div className="footer">
                <button onClick={(e) => { this.preventDefault(e)}} >I'll clean this up!</button>
                <button onClick={() => { this.props.onClose()}}>Close</button>
                </div>
                </div>
            </div>
        )
    }
};

export default Modal;