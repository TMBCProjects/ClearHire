import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import Sample from "../../assets/pdf/sample.pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ offerLetterUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    console.log(offerLetterUrl)
  }, [])
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
        }}
      >
        <div>
          <Document file={offerLetterUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={currentPage} />
          </Document>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LeftCircleOutlined style={{ fontSize: "30px", margin: "10px", color: "#00823b" }} onClick={() => { currentPage !== 1 && onPrevPage() }} />
        <div style={{ fontSize: "20px", fontWeight: "900", textAlign: "center", margin: "10px" }}>
          {currentPage}/{numPages}
        </div>
        <RightCircleOutlined style={{ fontSize: "30px", margin: "10px", color: "#00823b" }} onClick={() => { currentPage !== numPages && onNextPage() }} />
      </div>
    </div>
  );
};

export default PdfViewer;
