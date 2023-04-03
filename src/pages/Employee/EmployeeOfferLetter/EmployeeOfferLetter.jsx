import React from "react";
import "./EmployeeOfferLetter.css";

const EmployeeOfferLetter = () => {
    let { pdfUrl } = "https://firebasestorage.googleapis.com/v0/b/clearhire-d91d9.appspot.com/o/profileImages%2FTeambo%20changes%20(1).pdf?alt=media&token=8d8d7c79-683f-4156-8815-e5f1dec5e5d9";
    let currentPage = 1;
    let totalPages = 6;
    const prevPage = async () => {
        if (this.state.currentPage > 1) {
            const pageNumber = currentPage - 1;
            const currentPage = await pdfUrl.getPage(pageNumber);
            const viewport = currentPage.getViewport({ scale: 1.5 });
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;
            const renderContext = {
                canvasContext: this.canvas.getContext("2d"),
                viewport: viewport,
            };
            await currentPage.render(renderContext);
            this.setState({ currentPage: pageNumber });
        }
    };

    const nextPage = async () => {
        if (this.state.currentPage < this.state.numPages) {
            const pageNumber = this.state.currentPage + 1;
            const currentPage = await this.state.pdf.getPage(pageNumber);
            const viewport = currentPage.getViewport({ scale: 1.5 });
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;
            const renderContext = {
                canvasContext: this.canvas.getContext("2d"),
                viewport: viewport,
            };
            await currentPage.render(renderContext);
            this.setState({ currentPage: pageNumber });
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
                        <iframe title=""
                            src={"https://firebasestorage.googleapis.com/v0/b/clearhire-d91d9.appspot.com/o/profileImages%2FTeambo%20changes%20(1).pdf?alt=media&token=8d8d7c79-683f-4156-8815-e5f1dec5e5d9"}
                        ></iframe>
                    </div>

                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <button onClick={() => { prevPage() }}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>{" "}
                        Page {currentPage} of {totalPages}{" "}
                        <button onClick={() => { nextPage() }}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeOfferLetter;
