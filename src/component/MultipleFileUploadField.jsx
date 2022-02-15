import React, { useCallback, useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';

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

const MultipleFileUploadField = (props) => {
  const [files, setFiles] = useState([]);

  const onUpload = (file, url) => {
    setFiles((current) => (
      current.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url }
        }
        return fw;
      })
    ))
    props.setValue('files', files)
  }

  const onDelete = (file) => {
    setFiles((prev) => prev.filter((fileList) => fileList.file !== file))
  }

  const handleChange = (e, fn) => {
    console.log('handle change', e.target.files[0])
    fn(e.target.files[0])
  }

  return (
    <>
      <Grid item>
        <Controller
          render={({ field: { onChange } }) => (
            <DropzoneField
              onChange={(e) => onChange(e.target.files)}
              setFiles={setFiles}
              files={files}
            />
          )}
          name='files'
          control={props.control}
        />
      </Grid>

      {files && files.map((fileWrapper, idx) => {
        return (
          <div key={idx}>
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

let currentId = 0;
const getNewId = () => {
  return ++currentId;
}

const DropzoneField = ({ onChange, setFiles }) => {
  const classes = useStyles();

  const onDrop = async (acceptFiles, rejectFiles) => {
    const mappedAcc = await acceptFiles.map((file) => ({ file, errors: [], id: getNewId() }));
    const mappedRej = await rejectFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((prev) => [...prev, ...mappedAcc, ...mappedRej]);
    console.log('onDrop setFiles', mappedAcc)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: ['image/*', 'text/*', 'application/pdf'],
    maxSize: 1000 * 1024,
  })

  return (
    <div {...getRootProps({ className: classes.dropzone })}>
      <input multiple={true} {...getInputProps({ onChange })} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default MultipleFileUploadField