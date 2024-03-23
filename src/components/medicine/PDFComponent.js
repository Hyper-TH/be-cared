// PDFComponent.js
import { pdfjs, Document, Page } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set the workerSrc once.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDFComponent = ({ PDFURL }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Start with the first page
  
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
  
    return (
        <>
          <Document
            className='pdf'
            file={PDFURL}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error('Error while loading document!', error.message)}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        

            <p className="text-lg">
              Page {pageNumber} of {numPages}
            </p>

            <div className="pdf_btn_navigation" role="group">
                <button 
                    onClick={nextPage}
                    disabled={pageNumber >= numPages} 
                    className="prev_btn">
                    Prev
                </button>

                <button 
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                    className="next_btn">
                    Next
                </button>
            </div>
        </>
      );
};
  