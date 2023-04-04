import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};
const PdfViewer = ({ pdfUrl }) => {
  const [file, setFile] = useState('');
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setFile('' + pdfUrl);
    setCurrentPage(1);
    setNumPages(1);
  }, [pdfUrl])

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
            <Page size="A4" pageNumber={currentPage} />
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
