import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ModalBox from "../components/ModalBox";
import { Frown } from "react-feather";
import SingleNote from "../components/SingleNote";
import "./Home.css";

function Home() {

    const [data, setData] = useState([]);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("myNotes")) || []);
    }, [])

    function refresh() {
        setData(JSON.parse(localStorage.getItem("myNotes")) || []);
    }

    return (
        <div className="water">
            <NavBar setShowModal={setShowModal} data={data} setData={setData} refresh={refresh} />
            {showModal && <ModalBox showModal={showModal} setShowModal={setShowModal} refresh={refresh} />}

            {/* notes */}
            <div className="row justify-content-between mx-0 p-5">
                {
                    !data.length
                        ?
                        <h1 className="text-center display-1 fw-light text-secondary my-5">
                            <Frown size={100} /> No notes...create a new one!
                        </h1>
                        :
                        data.map((item, index) => {
                            return <SingleNote key={item.id} item={item} refresh={refresh} />
                        })
                }
            </div>

            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            <div className="wave wave4"></div>
        </div>
    );
}


export default Home;