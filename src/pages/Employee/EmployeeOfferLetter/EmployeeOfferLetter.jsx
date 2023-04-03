import React, { useEffect, useRef, useState } from "react";
import "./EmployeeOfferLetter.css";
import PdfViewer from "../../../components/PdfViewer/PdfViewer";

const EmployeeOfferLetter = () => {
    let pdfUrl = "https://firebasestorage.googleapis.com/v0/b/clearhire-d91d9.appspot.com/o/profileImages%2FTeambo%20changes%20(1).pdf?alt=media&token=8d8d7c79-683f-4156-8815-e5f1dec5e5d9";
    const [currentPage, setCurrentPage] = useState(1);
    let totalPages = 2;
    const iframeRef = useRef(null);


    useEffect(() => {
        const iframe = iframeRef.current;
        const url = `${pdfUrl}#toolbar=0&page=${currentPage}`;
        // iframe.onload = () => {
        //     const win = iframe.contentWindow || iframe.contentDocument.defaultView;
        //     win.scrollTo(0, 0);
        // };
        iframe.src = url;
    }, [currentPage, pdfUrl]);

    const prevPage = async () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    };

    const nextPage = async () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    };

    return (
        <div className="container" id="offerletter">
            <div className="row align-items-center d-flex">
                <div className="col-md-4">
                    <h1 className="offerletter-heading">
                        Offer Letter
                        {/*  */}
                    </h1>
                    <p className="offerletter-text mt-5">
                        <span className="text-color-green">Company</span>
                    </p>
                    <p className="offerletter-text">
                        Nemo enim.
                    </p>
                    <p className="offerletter-text mt-5">
                        <span className="text-color-green">Name</span>
                    </p>
                    <p className="offerletter-text">
                        Nemo enim.
                    </p>
                    <p className="offerletter-text mt-5">
                        <span className="text-color-green">Job Role</span>
                    </p>
                    <p className="offerletter-text">
                        Nemo enim.
                    </p>
                    <p className="offerletter-text mt-5">
                        <span className="text-color-green">Date Of Joining</span>
                    </p>
                    <p className="offerletter-text">
                        Nemo enim.
                    </p>
                    <p className="offerletter-text mt-5">
                        <span className="text-color-green">Salary</span>
                    </p>
                    <p className="offerletter-text">
                        Nemo enim.
                    </p><br />
                    <div
                        className="row justify-content-start align-items-start mt-3"
                        id="offerletter-btn"
                    >
                        <a
                            href="/#login"
                            className="btn"
                            id="login-btn"
                            type="submit"
                        >
                            Verify & Accept
                        </a>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="offerletter-pdf">
                        <PdfViewer pdfUrl={pdfUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeOfferLetter;
