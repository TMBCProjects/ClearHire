import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Sample from "../../assets/pdf/sample.pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
          <Document file={Sample} onLoadSuccess={onDocumentLoadSuccess}>
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
        <LeftCircleOutlined onClick={() => { currentPage !== 1 && onPrevPage() }} />
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {currentPage} / {numPages}
        </div>
        <RightCircleOutlined onClick={() => { currentPage !== numPages && onNextPage() }} />
      </div>
    </div>
  );
};

export default PdfViewer;
