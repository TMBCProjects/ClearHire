import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};
const PdfViewer = ({ pdfUrl }) => {
  const [file, setFile] = useState('');
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFile('' + pdfUrl)
  }, [pdfUrl])

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
        <div style={{ width: "500px" }}>
          <Document
            file={file}
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={currentPage} />
          </Document>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <button
          disabled={currentPage === 1}
          onClick={onPrevPage}>
          Prev
        </button>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {currentPage} / {numPages}
        </div>
        <button
          disabled={currentPage === numPages}
          onClick={onNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PdfViewer;
