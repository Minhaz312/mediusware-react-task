import { Button, FormCheck, Modal, Spinner } from "react-bootstrap";
import React, { useRef, useState } from "react";
import axios from "axios";
import DataTable from "./DataTable";

import contactData from "./../data/contactData.json";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://contact.mediusware.com/api/contacts";
const Problem2 = () => {
    const scrollParentRef = useRef(null);
    const navigate = useNavigate();
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);

    const [allContacts, setAllContacts] = useState(null);
    const [loadingAllContacts, setLoadingAllContacts] = useState(false);
    const [usContacts, setUsContacts] = useState(null);
    const [loadingUsContacts, setLoadingUsContacts] = useState(false);

    const [loadMoreErrorMessage, setLoadMoreErrorMessage] = useState("loading");

    const getAllContacts = () => {
        setLoadingAllContacts(true);
        axios
            .get(`${baseUrl}?format=api&page=0`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => {
                console.log("res", res);
                setAllContacts(res.data);
                setLoadingAllContacts(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingAllContacts(false);
            });
        setLoadingAllContacts(false);
        setAllContacts(contactData);
    };

    const handleCloseModalA = () => {
        if (showModalA) {
            setShowModalA(false);
            navigate("/problem-2");
        } else {
            setShowModalA(true);
            navigate("/problem-2/modal-a");
            if (usContacts === null) {
                getAllContacts();
            }
        }
    };
    const handleCloseModalB = () => {
        if (showModalB) {
            setShowModalB(false);
            navigate("/problem-2");
        } else {
            setShowModalB(true);
            navigate("/problem-2/modal-b");
        }
    };

    return (
        <div>
            {scrollParentRef !== null && (
                <>
                    <Modal
                        show={showModalA}
                        size="lg"
                        onHide={handleCloseModalA}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal A</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {loadingAllContacts === true && (
                                <Spinner animation="border" size="sm" />
                            )}
                            {loadingAllContacts === false &&
                                allContacts !== null && (
                                    <div
                                        style={{
                                            maxHeight: "70vh",
                                            overflowX: "hidden",
                                            overflowY: "auto",
                                        }}
                                        ref={scrollParentRef}
                                    >
                                        <InfiniteScroll
                                            pageStart={0}
                                            loadMore={() => {
                                                console.log(
                                                    "called to fetch more"
                                                );
                                                setTimeout(() => {
                                                    setLoadMoreErrorMessage(
                                                        "Failed load more due to API CORS error"
                                                    );
                                                }, 3000);
                                            }}
                                            useWindow={false}
                                            getScrollParent={() =>
                                                scrollParentRef.current
                                            }
                                            hasMore={true}
                                            loader={
                                                <div
                                                    className="w-100 mt-3 text-center"
                                                    key={0}
                                                >
                                                    {loadMoreErrorMessage ===
                                                    "loading" ? (
                                                        <Spinner
                                                            animation="border"
                                                            size="sm"
                                                        />
                                                    ) : (
                                                        loadMoreErrorMessage
                                                    )}
                                                </div>
                                            }
                                        >
                                            <DataTable
                                                columns={[
                                                    "Id",
                                                    "Phone",
                                                    "Country",
                                                ]}
                                                data={allContacts.results}
                                            />
                                        </InfiniteScroll>
                                    </div>
                                )}
                        </Modal.Body>
                        <Modal.Footer className="justify-content-between">
                            <FormCheck label="Only Even" />
                            <div className="d-flex gap-2">
                                <Button variant="primary" onClick={() => {}}>
                                    All Contacts
                                </Button>
                                <Button variant="warning" onClick={() => {}}>
                                    US Contacts
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseModalA}
                                >
                                    Close
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        show={showModalB}
                        size="lg"
                        onHide={handleCloseModalB}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal B</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {loadingAllContacts === true && (
                                <h3 className="text-center mt-5">
                                    {loadMoreErrorMessage === "loading" ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        loadMoreErrorMessage
                                    )}
                                </h3>
                            )}
                            {loadingAllContacts === false &&
                                allContacts !== null && (
                                    <div
                                        style={{
                                            maxHeight: "70vh",
                                            overflowX: "hidden",
                                            overflowY: "auto",
                                        }}
                                    >
                                        <InfiniteScroll
                                            pageStart={0}
                                            loadMore={() => {
                                                console.log(
                                                    "called to fetch more"
                                                );
                                                setTimeout(() => {
                                                    setLoadMoreErrorMessage(
                                                        "Failed load more due to API CORS error"
                                                    );
                                                }, 3000);
                                            }}
                                            useWindow={false}
                                            getScrollParent={() =>
                                                scrollParentRef.current
                                            }
                                            hasMore={true}
                                            loader={
                                                <div
                                                    className="w-100 mt-3 text-center"
                                                    key={0}
                                                >
                                                    {loadMoreErrorMessage ===
                                                    "loading" ? (
                                                        <Spinner
                                                            animation="border"
                                                            size="sm"
                                                        />
                                                    ) : (
                                                        loadMoreErrorMessage
                                                    )}
                                                </div>
                                            }
                                        >
                                            <DataTable
                                                columns={[
                                                    "Id",
                                                    "Phone",
                                                    "Country",
                                                ]}
                                                data={allContacts.results}
                                            />
                                        </InfiniteScroll>
                                    </div>
                                )}
                        </Modal.Body>
                        <Modal.Footer className="justify-content-between">
                            <FormCheck label="Only Even" />
                            <div className="d-flex gap-2">
                                <Button variant="primary" onClick={() => {}}>
                                    All Contacts
                                </Button>
                                <Button variant="warning" onClick={() => {}}>
                                    US Contacts
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseModalB}
                                >
                                    Close
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <h4 className="text-center text-uppercase mb-5">
                        Problem-2
                    </h4>

                    <div className="d-flex justify-content-center gap-3">
                        <button
                            className="btn btn-lg btn-outline-primary"
                            type="button"
                            onClick={handleCloseModalA}
                        >
                            All Contacts
                        </button>
                        <button
                            className="btn btn-lg btn-outline-warning"
                            type="button"
                            onClick={handleCloseModalB}
                        >
                            US Contacts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problem2;
