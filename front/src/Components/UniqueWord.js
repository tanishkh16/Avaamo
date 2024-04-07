import React, { useState } from 'react';
import axios from 'axios';


export default function UniqueWord() {
    const [files, setFiles] = useState([]);
    const [email, setEmail] = useState('');
    const [form,setForm]=useState({file:[]})
    const [value,setValue]=useState([])
    const formData=[];
    const handleFileChange = (e, index) => {
      const newFiles = [...files];
      newFiles[index] = e.target.files[0];
      setFiles(newFiles);

      
    };
  
  
    const handleAddMore = () => {
      setFiles([...files, null]);
    };
    
    const handleUpload = () => {
      const formData = new FormData();
  
      files.forEach((file, index) => {
          formData.append('files', file);
      });
  
      formData.append('email', email);
      console.log(formData)
  
      axios.post('http://localhost:3001/api/v1/files/get/unique-words', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }).then((res) => {
          console.log(res.data.data[0]);
          setValue(res.data.data)
          console.log(value)
      }).catch((err) => {
          console.error(err);
      });
  };
  return (
    <div>
    <input
    className='w-96 border p-2 mt-2'
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
    />
    <div>

    {files.map((file, index) => (
      <div className='border w-64 flex justify-center' key={index}>
        <input type="file" name="files" multiple onChange={(e) => handleFileChange(e, index)} />
      </div>
    ))}
    </div>
    <button className='border mr-3 p-2 mt-4' onClick={handleAddMore}>Add More</button>
    <button className='border ml-4 p-2' onClick={handleUpload}>Upload</button>
    <div class="grid grid-cols gap-2">
  {Array.isArray(value) &&
    value.map((item) => (
      <div>
        <h1 className='text-left font-bold ml-4 mt-16'> FileName: {item.fileName}</h1>
            <h1 className='text-left mt-4 ml-2 -mb-4'>WordCount:</h1><br></br>
        <div className="flex flex-wrap gap-4">
          {Object.entries(item.wordCount).map(([word, count], index) => (
            <div  className='flex pl-2' key={word}>
              <h1 className='font-medium'>{word}:</h1>
               {count} 
            </div>
          ))}
        </div>
      </div>
    ))}
</div>


  </div>
  )
}
