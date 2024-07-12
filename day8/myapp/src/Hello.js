import axios from 'axios';
import config from './config';
import { useState } from 'react';

function Hello() {
  const [fileSeleted, setFileSelected] = useState({});

  const seletedFile = (fileInput) => {
    if (fileInput !== undefined) {
      if (fileInput.length > 0) {
        setFileSelected(fileInput[0]);
      }
    }
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('myFile', fileSeleted);

      await axios.post(config.apiPath + '/book/testUpload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <input type="file" onChange={(e) => seletedFile(e.target.files)} />{' '}
        <button className="btn btn-primary" onClick={uploadFile}>
          Upload Now{' '}
        </button>{' '}
      </div>{' '}
    </>
  );
}

export default Hello;
