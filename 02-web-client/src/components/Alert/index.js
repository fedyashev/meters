import React from 'react';

const Alert = props => {
    const { type, message } = props;
    const { handlerCloseAlert } = props;
    const onClickCloseAlert = e => {
        e.preventDefault();
        handlerCloseAlert();
    }
    switch (type) {
        
        case "warnig" : return (
            <div className="container">
                <div className="alert alert-warning fade show mt-3" role="alert" style={{zIndex: '1000'}}>
                    <span>{message}</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onClickCloseAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );

        case "success" : return (
            <div className="container">
                <div className="alert alert-success fade show mt-3" role="alert" style={{zIndex: '1000'}}>
                    <span>{message}</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onClickCloseAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );

        default: return (
            <div className="container">
                <div className="alert alert-warning fade show mt-3" role="alert" style={{zIndex: '1000'}}>
                    <span>{message}</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onClickCloseAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );
    }
};

export default Alert;

