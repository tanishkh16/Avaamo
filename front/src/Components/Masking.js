import React, { useState } from 'react';
import axios from 'axios';

export default function Masking() {
    const [file, setFile] = useState([]);
    const [email, setEmail] = useState('');
    const [form,setForm]=useState({file:[]})
    const [value,setValue]=useState([])
    const [words,setWords]=useState('')

    const handleFileChange = (e, index) => {
        const newFiles = [...file];
        newFiles[index] = e.target.files[0];
        setFile(newFiles);
      }
      const handleAddMore = () => {
        setFile([...file, null]);
      };
      const handleUpload = () => {
        const formData = new FormData();
    
        file.forEach((file, index) => {
            formData.append('file', file);
        });
    
        formData.append('email', email);
        formData.append('words', words);
        console.log(formData)
    
        axios.post('http://localhost:3001/api/v1/files/mask-words', formData, {
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
    <input
    className='w-96 border p-2 mt-2'
    type="text"
    value={words}
    onChange={(e) => setWords(e.target.value)}
    placeholder="Enter the word"
    />
    <div>

    {file.map((file, index) => (
      <div className='border w-64 flex justify-center' key={index}>
        <input type="file" name="files" multiple onChange={(e) => handleFileChange(e, index)} />
      </div>
    ))}
    </div>
    <button className='border mr-3 p-2 mt-4' onClick={handleAddMore}>Add More</button>
    <button className='border ml-4 p-2' onClick={handleUpload}>Upload</button>
    <div class="grid grid-cols gap-2">
 
</div>


  </div>
  )
}