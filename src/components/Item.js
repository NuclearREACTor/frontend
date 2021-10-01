import React, { useState } from "react";
import { Modal } from "react-bootstrap";
export default function Item(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <div className="card-item p-2">
            <div onClick={handleShow}>
                <h1 className="card-item-heading">{props.item.name}</h1>
                <img src="/burito.jpeg" alt="" width="200" />
            </div>
            <p className="p-1 mb-0">Price : <b>$ {props.item.price}</b></p>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.item.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="text-center">
                        <img src="/burito.jpeg" alt="" width="300" />
                        <p className="pt-2">{props.item.description} </p>
                        <p >Price : <b>$ {props.item.price}</b></p>
                    </div>


                    <div className="d-flex justify-content-around">
                        {(props.item.rice) && <div>
                            <p>Choice for Rice </p>
                            <select className="form-control">
                                {props.item.rice.map(riceType => {
                                    return <option value={riceType}>{riceType}</option>
                                })}
                            </select> </div>}
                        {(props.item.tortilla) && <div>
                            <p>Choice for Tortilla</p>
                            <select className="form-control">
                                {props.item.tortilla.map(riceType => {
                                    return <option value="">{riceType}</option>
                                })}
                            </select> </div>}
                    </div>
                    <div className="text-center mt-3">
                        <button type="button" class="btn btn-primary">Add to Cart</button>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn" onClick={handleClose}>close</button>
                </Modal.Footer>
            </Modal>
        </div>


    )

}