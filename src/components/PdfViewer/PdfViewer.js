import React, { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const onNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, numPages));
  };

  const onPrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <button
          disabled={currentPage === 1}
          onClick={onPrevPage}>
          &lt;
        </button>
        <div style={{ width: "500px" }}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={currentPage} />
          </Document>
        </div>
        <button
          disabled={currentPage === numPages}
          onClick={onNextPage}>
          &gt;
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        Page {currentPage} of {numPages}
      </div>
    </div>
  );
}

export default PdfViewer;
