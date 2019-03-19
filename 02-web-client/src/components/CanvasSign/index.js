import React, { Component } from 'react';

class CanvasSign extends Component {

    constructor(props) {
        super(props);

        this.touches = { x: [], y: [] };
        this.brush = { color: 'black', size: 3 };
        this.snapshot = null;
        this.canvas = {
            width: 300,
            height: 300,
            ref: React.createRef(),
            refHidden: React.createRef()
        };

        this.ongoingTouches = [];
    }

    dX = () => this.canvas.ref.current.getBoundingClientRect().left + window.scrollX;

    dY = () => this.canvas.ref.current.getBoundingClientRect().top + window.scrollY;

    handlerTouchStart = e => {
        e.preventDefault();
        let signCanvas = document.getElementById("signCanvas");
        let ctx = signCanvas.getContext("2d");
        let touches = e.changedTouches;

        for (let i = 0; i < touches.length; i++) {
            this.ongoingTouches.push(this.copyTouch(touches[i]));
            ctx.beginPath();
            ctx.arc(touches[i].pageX - this.dX(), touches[i].pageY - this.dY(), this.brush.size / 2, 0, 2 * Math.PI, false);  // a circle at the start
            ctx.fillStyle = this.brush.color;
            ctx.fill();
        }
    };

    handlerTouchMove = e => {
        e.preventDefault();
        let signCanvas = document.getElementById("signCanvas");
        let ctx = signCanvas.getContext("2d");
        let touches = e.changedTouches;

        for (let i = 0; i < touches.length; i++) {
            let idx = this.ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
                ctx.beginPath();
                ctx.moveTo(this.ongoingTouches[idx].pageX - this.dX(), this.ongoingTouches[idx].pageY - this.dY());
                ctx.lineTo(touches[i].pageX - this.dX(), touches[i].pageY - this.dY());
                ctx.lineWidth = this.brush.size;
                ctx.strokeStyle = this.brush.color;
                ctx.stroke();
                this.ongoingTouches.splice(idx, 1, this.copyTouch(touches[i]));  // swap in the new touch record
            } else {
            }
        }
    };

    handlerTouchEnd = e => {
        e.preventDefault();
        let signCanvas = document.getElementById("signCanvas");
        let ctx = signCanvas.getContext("2d");
        let touches = e.changedTouches;

        for (let i = 0; i < touches.length; i++) {
            let idx = this.ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
                ctx.lineWidth = this.brush.size;
                ctx.fillStyle = this.brush.color;
                ctx.beginPath();
                ctx.moveTo(this.ongoingTouches[idx].pageX - this.dX(), this.ongoingTouches[idx].pageY - this.dY());
                ctx.lineTo(touches[i].pageX - this.dX(), touches[i].pageY - this.dY());
                //ctx.fillRect(touches[i].pageX - this.dX() - 4, touches[i].pageY - this.dY() - 4, 8, 8);  // and a square at the end
                this.ongoingTouches.splice(idx, 1);  // remove it; we're done
            } else {
            }
        }
    };

    handleCancel = e => {
        e.preventDefault();
        let touches = e.changedTouches;

        for (let i = 0; i < touches.length; i++) {
            const idx = this.ongoingTouchIndexById(touches[i].identifier);
            this.ongoingTouches.splice(idx, 1);  // remove it; we're done
        }
    }

    // colorForTouch = touch => {
    //     let r = touch.identifier % 16;
    //     let g = Math.floor(touch.identifier / 3) % 16;
    //     let b = Math.floor(touch.identifier / 7) % 16;
    //     r = r.toString(16); // make it a hex digit
    //     g = g.toString(16); // make it a hex digit
    //     b = b.toString(16); // make it a hex digit
    //     const color = "#" + r + g + b;
    //     return color;
    // }

    copyTouch = touch => {
        return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
    }

    ongoingTouchIndexById = idToFind => {
        for (let i = 0; i < this.ongoingTouches.length; i++) {
            const id = this.ongoingTouches[i].identifier;

            if (id === idToFind) {
                return i;
            }
        }
        return -1;    // not found
    }

    componentDidMount() {
        const canvas = this.canvas.ref.current;
        canvas.addEventListener('touchstart', this.handlerTouchStart, false);
        canvas.addEventListener('touchmove', this.handlerTouchMove, false);
        canvas.addEventListener('touchcancel', this.handleCancel, false);
        canvas.addEventListener('touchend', this.handlerTouchEnd, false);
    }

    componentWillUnmount() {
        const canvas = this.canvas.ref.current;
        canvas.removeEventListener('touchstart', this.handlerTouchStart);
        canvas.removeEventListener('touchmove', this.handlerTouchMove);
        canvas.removeEventListener('touchcancel', this.handleCancel);
        canvas.removeEventListener('touchend', this.handlerTouchEnd);
    }

    handleClear = e => {
        e.preventDefault();
        const ctx = this.canvas.ref.current.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        return (
            <div className="container justify-content-center">
                <div className="border text-center mx-auto">
                    <canvas id="signCanvas" width={this.canvas.width} height={this.canvas.height} ref={this.canvas.ref} />
                    <canvas id="signCanvas" width={this.canvas.width} height={this.canvas.height} ref={this.canvas.refHidden} style={{display: 'none'}} />
                </div>
                <button className="btn btn-warning btn-block" onClick={this.handleClear}>Очистить</button>
            </div>
        );
    }
};

export default CanvasSign;