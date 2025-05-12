import './index.css';
import golangLogo from './assets/img/gologo.svg';
import uploadIcon from './assets/img/upload.svg';
export function App() {
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
        <h1 className='text-sky-900 font-bold md:text-xl'>Upload an image or drag it</h1>
        <button className='size-16 md:size-20'>
          <img
            src={uploadIcon}
            alt='Upload icon. square with horizontal line inside and an arrow up.'
          />
        </button>
        <p className='md:text-lg text-sky-900'>Valid images types: PNG, JPG, JPEG</p>
      </div>
      <footer className='pb-5'>
        <p className='text-base text-sky-900'>Gonverter was created by Alastair7</p>
      </footer>
    </div>
  );
}

export default App;
