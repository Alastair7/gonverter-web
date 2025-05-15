import './index.css';
import golangLogo from './assets/img/gologo.svg';
import uploadIcon from './assets/img/upload.svg';
import { useRef, useState } from 'react';

const removeExtension = (filename: string) => filename.substring(0, filename.lastIndexOf('.'));

export function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<string>();
  const [filename, setFilename] = useState<string>();

  const UploadClick = () => inputRef.current?.click();
  const imgUpload = () => {
    if (!inputRef.current?.files) return;

    setFile(URL.createObjectURL(inputRef.current.files[0]));
    setFilename(inputRef.current.files[0].name);
  };

  const DownloadClick = async () => {
    const formData = new FormData();
    formData.append('file', inputRef.current!.files![0]);

    const res = await fetch('http://localhost:8080/api/file', { method: 'POST', body: formData });

    if (!res.ok) {
      alert('Error uploading the file');
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = removeExtension(filename ?? '');
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className='flex flex-col h-screen justify-between items-center'>
      <header className='flex self-center justify-center items-center p-2'>
        <div className='logo-wrapper size-24 md:size-26 lg:size-32'>
          <img src={golangLogo} alt='golang logo' />
        </div>
        <div className='title-wrapper text-4xl md:text-5xl lg:text-6xl text-center'>
          <h1 className='text-sky-900 font-semibold'>GONVERTER</h1>
          <h2 className='text-sky-700 text-sm md:text-xl lg:text-2xl font-medium text-pretty'>
            Convert images to PDF
          </h2>
        </div>
      </header>

      <div className='flex flex-col items-center justify-around w-8/10 max-w-2xl min-h-56 text-white bg-slate-100 drop-shadow-md'>
        <h1 className='text-sky-900 font-bold md:text-xl'>Upload an image</h1>
        {file ? (
          <button
            className='bg-blue-400 p-4 font-semibold'
            onClick={DownloadClick}
            name='Download File'
          >
            Download
          </button>
        ) : (
          <button onClick={UploadClick} className='size-16 md:size-20' type='submit'>
            <img
              src={uploadIcon}
              alt='Upload icon. square with horizontal line inside and an arrow up.'
            />
          </button>
        )}
        <p className='text-black text-beauty'>{filename}</p>
        <input
          className='text-black'
          onChange={imgUpload}
          type='file'
          accept='image/png,image/jpg,image/jpeg'
          id='user-image'
          ref={inputRef}
          hidden
        />
        <p className='md:text-lg text-sky-900'>Valid images types: PNG, JPG, JPEG</p>
      </div>
      <footer className='pb-5'>
        <p className='text-base text-sky-900'>Gonverter was created by Alastair7</p>
      </footer>
    </div>
  );
}

export default App;
