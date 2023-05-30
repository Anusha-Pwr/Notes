import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "./ModalBox.css";
import { Plus } from 'react-feather';


function ModalBox(props) {
    const [title, setTitle] = new useState("");
    const [content, setContent] = useState("");
    const [titleColor, setTitleColor] = useState("#F9F5EB");
    const [contentColor, setContentColor] = useState("#fff");
    const [priority, setPriority] = useState("normal");

    function handleTitle(event) {
        setTitle(event.target.value);
    } 

    function handlePriority(event) {
        setPriority(event.target.value);
    }

    function handleContent(event) {
        setContent(event.target.value);
    }

    function handleAdd() {
        const savedData = JSON.parse(localStorage.getItem("myNotes")) || [];

        if(!title || !content) {
            return alert("Both title and content are required!");
        }
        
        let newData = {
            id : Date.now(),
            title,
            content,
            priority,
            titleColor,
            contentColor,
            date : new Date().toLocaleDateString()
        }

        savedData.push(newData);
        localStorage.setItem("myNotes", JSON.stringify(savedData));
        props.setShowModal(false);
        setContent("");
        setTitle("");
        setPriority("normal");

        // window.location.reload();
        props.refresh();
    }

    function handleClose() {
        props.setShowModal(false);
        setContent("");
        setTitle("");
        setPriority("normal");
    }

    function handleColor(tColor, cColor) {
        setTitleColor(tColor);
        setContentColor(cColor);
    }

    return (
        <>

            <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Note</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input className='form-control mb-3' placeholder='Enter Title' value={title} onChange={handleTitle} />
                    <label>Priority</label>
                    <select className='form-control mb-3' value={priority} onChange={handlePriority}>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                    </select>
                    <textarea className='form-control' style={{ height: "180px" }} placeholder='Enter notes....' value={content} onChange={handleContent}></textarea>

                    {/* Selecting theme */}
                    <DropdownButton className='mt-3' id="dropdown-basic-button" title="Dropdown button">
                        <Dropdown.Item href="#/action-1">
                            <div className='d-flex' onClick={() => handleColor("#54BAB9", "#9ED2C6")}>
                                <div className='circle' style={{ backgroundColor: "#54BAB9" }}></div>
                                <div className='circle mx-3' style={{ backgroundColor: "#9ED2C6" }}></div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            <div className='d-flex' onClick={() => handleColor("#FFE898", "#FFF8BC")}>
                                <div className='circle' style={{ backgroundColor: "#FFE898" }}></div>
                                <div className='circle mx-3' style={{ backgroundColor: "#FFF8BC" }}></div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            <div className='d-flex' onClick={() => handleColor("#AfB4FF", "#B1E1FF")}>
                                <div className='circle' style={{ backgroundColor: "#AfB4FF" }}></div>
                                <div className='circle mx-3' style={{ backgroundColor: "#B1E1FF" }}></div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-4">
                            <div className='d-flex' onClick={() => handleColor("#F9F5EB", "#fff")}>
                                <div className='circle shadow' style={{ backgroundColor: "#F9F5EB" }}></div>
                                <div className='circle mx-3 shadow' style={{ backgroundColor: "#fff" }}></div>
                            </div>
                        </Dropdown.Item>
                    </DropdownButton>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        <Plus /> Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBox;