import React, { useState } from "react";
import { Check, PenTool, Trash } from "react-feather";
import { Rating, ratingValue } from "react-simple-star-rating";
import "./SingleNote.css";

function SingleNote(props) {
    let savedData = JSON.parse(localStorage.getItem("myNotes")) || [];

    const [rating, setRating] = useState(props.item.priority === "high" ? 100 : 0);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(props.item.content);

    function handleDelete() {

        const pass = window.confirm("Are you sure you want to delete this note?");
        if (!pass) {
            return;
        }

        if (savedData.length) {
            let newData = savedData.filter((data) => data.id !== props.item.id);
            localStorage.setItem("myNotes", JSON.stringify(newData));
            // window.location.reload();
            props.refresh();
        }
    }

    function handleEdit() {
        let index = savedData.findIndex((data) => data.id===props.item.id);
        savedData[index].content = content;
        localStorage.setItem("myNotes", JSON.stringify(savedData));
        setEdit(false);

        // window.location.reload();
        props.refresh();
    }

    return (
        <div className="px-2 col-lg-3 col-md-4 col-sm-2 h-100 mb-5">

            {/* card div */}
            <div className="card shadow px-2 CardPos" style={{ backgroundColor: `${props.item.titleColor}` }}>

                {/* title div */}
                <div className="title-div w-100 text-center">

                    {/* priority div */}
                    <div className="priority shadow text-center text-light">
                        <p className="text-light fw-light mb-0">Priority</p>
                        <Rating ratingValue={rating} iconsCount={1} transition={true} className="star" />
                        {rating === 100
                            ?
                            <p className="fw-bold text-warning">High</p>
                            :
                            <p className="text-light">Normal</p>
                        }
                    </div>
                    <h1 className="fw-light">{props.item.title}</h1>
                </div>

                {/* content div */}
                <div className="content">
                    <textarea className="form-control" disabled={!edit} value={content} onChange={(event) => setContent(event.target.value)} style={{ backgroundColor: `${props.item.contentColor}` }}>

                    </textarea>
                </div>

                {/* footer div: buttons to edit and delete the note */}
                <section className="d-flex justify-content-between my-2">
                    {
                        !edit
                            ?
                            <button className="btn btn-outline-warning btn-sm shadow" onClick={() => setEdit(true)}><PenTool /></button>
                            :
                            <button className="btn btn-outline-primary btn-sm shadow" onClick={handleEdit}><Check /></button>
                    }

                    <button className="btn btn-outline-danger btn-sm shadow" onClick={handleDelete}><Trash /></button>

                </section>
            </div>
        </div>
    )
}

export default SingleNote;