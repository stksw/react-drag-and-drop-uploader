import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';

let currentId = 0;
const getNewId = () => {
  return ++currentId;
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
}));

const MultipleFileUploadField = ({ name }) => {
  const [_, __, helpers] = useField(name);
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((accFiles, rejFiles) => {
    console.log('onDrop', accFiles, rejFiles)
    const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((prev) => [...prev, ...mappedAcc, ...mappedRej]);
  }, [])

  const onUpload = (file, url) => {
    console.log('onUpload files', files)
    setFiles((current) => (
      current.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url }
        }
        return fw;
      })
    ))
  }

  const onDelete = (file) => {
    setFiles((current) => current.filter((fw) => fw.file !== file))
  }

  useEffect(() => {
    helpers.setValue(files);
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*', 'text/*', 'application/pdf'],
    maxSize: 300 * 1024
  })


  return (
    <>
      <Grid item>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <p>Drag n' drop some files here</p>
        </div>
      </Grid>

      {files && files.map((fileWrapper) => {
        return (
          <div key={fileWrapper.id}>
            {fileWrapper.errors.length ? (
              <UploadError
                file={fileWrapper.file}
                errors={fileWrapper.errors}
                onDelete={onDelete}
              />
            ) : (
              <SingleFileUploadWithProgress
                file={fileWrapper.file}
                onUpload={onUpload}
                onDelete={onDelete}
              />
            )}
          </div>
        )
      })}
    </>
  )
}

export default MultipleFileUploadField