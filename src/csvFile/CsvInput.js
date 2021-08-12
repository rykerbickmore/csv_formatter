import React from 'react';

import { CSVReader } from 'react-papaparse';


export  function CsvInput({
  handleFileUpload,
}) {


  


  return (
    <div>
      <CSVReader
        onDrop={handleFileUpload}>Click or drag a file here to begin!</CSVReader>
    </div>
  )
}
