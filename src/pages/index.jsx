import React from 'react'
import MultipleFileUploadField from '../component/MultipleFileUploadField'
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form'

const UploadPage = () => {
  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const handlePost = (data) => {
    console.log('handlePost', data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handlePost)}>
        <Grid container spacing={2} direction='column'>
          <MultipleFileUploadField
            name='files'
            control={control}
            register={register}
            errors={errors}
            setValue={setValue}
          />

          <Grid item>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default UploadPage