import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUploader() {
  const [fileUrl, setFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {fileUrl ? (
        <div className=''>file url</div>
      ) : (
        <div className='file_uploader-box'>
          <img src='/assets/icons/file-upload.svg' width={96} height={77} alt='file upload' />
        </div>
      )}
    </div>
  );
}
