import { Form, Formik } from "formik";
import * as React from "react";
import { createRef, memo, useState } from "react";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
// import { Grid, MUITypography, Button, MUISpinner} from '@/components/MUI-Components';
// import FormControlType from "@/components/Common";
import * as Yup from "yup";
// import regex from '@/regex';
import { Divider, FormHelperText, IconButton } from "@mui/material";
// import * as Icons from "@/components/Icons";
// import dynamic from "next/dynamic";
// const TextError = dynamic(() => import("@/components/Common/TextError"));
// const Captcha = dynamic(() => import("@/components/Google-recaptcha"));
// const FormikPhoneInput = dynamic(
//   () => import("@/components/MUI-Components/Flag-input-number")
// );
// import {toast} from 'react-toastify'
// import { postRequest } from "@/Services/ApiService";
// import Router from "next/router";
// import Script from "next/script";
// import CustomFileUpload from "@/components/Dropzone";
import DropZone from "./DropZone";
// import APIURL from "@/api-url";
// import MUISelect from "@/components/MUI-Components/MUI-Select";

const validationSchema = Yup.object({
  file: Yup.string().required("Please select position "),
});

const options = [
  { key: "", label: "Select Position Apply For" },
  { key: "fullstack developer", label: "Full stack developer" },
  { key: "frontend developer", label: "Frontend developer" },
  { key: "blockchain developer", label: "Blockchain developer" },
  { key: "Nodejs", label: "Node js developer" },
  { key: "Ui/Ux designer", label: "Ui/Ux designer" },
];

const CareerForm = (props: any) => {
  const { closeModal, type } = props;
  const ref = createRef();

  interface LoginForm {
    // firstName: string;
    // lastName: string;
    // email: string;
    // position: string;
    // phone_number: number | string;
    file: File | string;
    // captcha: boolean;
  }
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [verified, setVerified] = useState(false);
  const [initialValues] = useState<LoginForm>({
    file: ""
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const onChange = (value: any): any => {
    setVerified(true);
  };
  const onExpired = (value: any): any => {
    setVerified(false);
  };

  return (
    <>
      <Box className="form-outer">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          // eslint-disable-next-line consistent-return
          onSubmit={async (values: any, { resetForm }) => {
            console.log(
              "🚀 ~ file: index.tsx:99 ~ onSubmit={ ~ values:",
              values
            );
            if (!verified) {
              return false;
            }

            const data: any = {
            //   name: values.fullName,
            //   email: values.email,
            //   phone_no: values.phone_number,
            //   message: values.about,
              // project_budget: '',
            //   domain: process.env.NEXT_PUBLIC_DOMAIN,
            //   is_react: 1,
            //   "g-recaptcha-response": true,
            };
            // setLoading(true);
            // try {
            //     await postRequest(`${APIURL.EXPERT_TALK}`, data).then((res: any) => {
            //         Router.push('thank-you');
            //         resetForm();
            //         notify(res.success);
            //         setLoading(false);
            //         closeModal();
            //         // scrollToTop();
            //     });
            // } catch (error: any) {
            //     setLoading(false);
            // }
          }}
        >
          {(props: any) => {
            const {
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              setFieldError,
              setFieldValue,
              setFieldTouched,
            } = props;

            return (
              <Form autoComplete="off" className="login-form">
                <Grid container spacing={2} paddingTop={1}>
                  <Grid item xs={12}>
                    <DropZone
                      name="file"
                      onFileUploaded={setSelectedFile}
                      className="institute-upload-file"
                      ImgClassName="drop-zone-img"
                      selectedFile={selectedFile}
                      value={values.file}
                      fileValidate={{
                        maxSize: 1,
                        fileExtension: {
                          "text/pdf": [".pdf", ".doc", ".docx"],
                        },
                      }}
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      setFieldTouched={setFieldTouched}
                      touched={touched}
                      error={errors.file !== undefined ? true : false}
                      errorMsg={"Please select only pdf, doc, docx file"}
                    />
                  </Grid>
                </Grid>
                <Box className="form-button">
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    className="submit-btn"
                    // label="Submit"
                    sx={{marginTop:'10px'}}
                  > Submit</Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
       
      </Box>
    </>
  );
};
export default memo(CareerForm);
