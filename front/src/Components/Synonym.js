import React, { useState } from 'react';
import axios from 'axios';

export default function Synonym() {
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
    
        axios.post('http://localhost:3001/api/v1/files/get/synonyms', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log("hello", res.data.data[0]);
            console.log(res.data)
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
    <button className='border mr-3 p-2 mt-4 bg-black text-white rounded-xl' onClick={handleAddMore}>Add More</button>
    <button className='border ml-4 p-2 text-white bg-black rounded-xl' onClick={handleUpload}>Upload</button>
    
    {Array.isArray(value) &&
  value.map((item, index) => {
    return (
      <div className='border p-2 mt-4'>
        <div>
          <h1 className=' text-xl text-left font-bold'>Word: {item.word}</h1>
          <h1 className='text-lg text-left mt-2 mb-2 font-medium '>Synonyms:</h1>
          <div className='grid grid-cols-5 gap-2'>
            {item.synonyms.map((synonym, idx) => (
              <div key={idx} className='text-left text-sm'>{synonym}</div>
            ))}
          </div>
        </div>
      </div>
    );
  })}



  </div>
  )
}
