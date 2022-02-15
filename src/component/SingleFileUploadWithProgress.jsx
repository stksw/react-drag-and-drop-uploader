import { Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FileHeader } from './FileHeader';

export const SingleFileUploadWithProgress = ({ file, onDelete, onUpload }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = async () => {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url)
    }
    upload();
  }, [])

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant='determinate' value={progress} />
    </Grid>
  )
}

const uploadFile = (file, onProgress) => {
  const url = 'http://192.168.56.10:3000/images';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText)
      resolve(response.secure_url)
    }

    xhr.onerror = (event) => reject(event);

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage))
      }
    }

    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData)
  })

}