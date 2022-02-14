import React from 'react'
import MultipleFileUploadField from '../component/MultipleFileUploadField'
import { Form, Formik } from 'formik';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { array, object, string } from 'yup'

const UploadPage = () => {
  return (
    <div>
      <Formik
        initialValues={{ files: [] }}
        validationSchema={object({
          files: array(
            object({
              url: string().required()
            })
          )
        })}
        onSubmit={(values) => {
          console.log('values', values);
          return new Promise(res => setTimeout(res, 2000))
        }}
      >
        {({ values, errors, isValid, isSubmitting }) => {
          return (
            <Form>
              <Grid container spacing={2} direction='column'>
                <MultipleFileUploadField name='files' />

                <Grid item>
                  <Button variant='contained' color='primary' disabled={!isValid || isSubmitting}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default UploadPage