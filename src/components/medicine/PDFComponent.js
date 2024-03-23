// PDFComponent.js
import { pdfjs, Document, Page } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set the workerSrc once.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDFComponent = ({ PDFURL }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); 
    const [scale, setScale] = useState(1.0);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
  
    const changePage = (offset) => {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    };
  
    const previousPage = () => {
        if (pageNumber > 1) changePage(-1);
    };
  
    const nextPage = () => {
        if (pageNumber < numPages) changePage(1);
    };

    const zoomIn = () => {
        setScale(scale + 0.2);
    };
    
    const zoomOut = () => {
        if (scale > 0.2) setScale(scale - 0.2);
    };
  
    return (
        <>
          <Document
            className='pdf'
            file={PDFURL}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error('Error while loading document!', error.message)}
          >
            <Page pageNumber={pageNumber}  scale={scale}/>
          </Document>
           
        <div className="pdf_btn_navigation flex items-center justify-between mb-4">
                <button 
                    onClick={zoomOut} 
                    className="left w-24"
                    disabled={scale <= 0.2}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                </button>

                <button 
                    onClick={zoomIn}
                    className="mid w-24">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                <p className=" mid_text">
                    {pageNumber} / {numPages}
                </p>
            
                <button 
                    onClick={previousPage} 
                    disabled={pageNumber <= 1} 
                    className="mid w-24">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button 
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                    className="right w-24">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </>
      );
};
  