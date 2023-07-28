import React, { useCallback, useState, memo } from "react";
import { Box, Grid, Typography, FormHelperText, CardContent } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import Alert from "@mui/material/Alert";

interface IDropzoneProps {
  onFileUploaded?: (file: File) => void;
  className?: string;
  ImgClassName?: string;
  selectedFile?: File;
  fileValidate: any;
  name?: string;
  setFieldValue: (name: any, file: File) => void;
  setFieldError: (name: any, message: string) => void;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  value?: any;
  errorMsg: string;
  error: boolean;
  setFieldTouched: (name: any, status: boolean) => void;
  touched: any;
}

const CustomFileUpload: React.FC<IDropzoneProps> = (props) => {
  const [fileData, setFileData] = useState<any | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [file, setFile] = useState(null);
  const {
    className,
    fileValidate,
    name,
    setFieldValue,
    setFieldError,
    value,
    errorMsg,
    error,
    setFieldTouched,
    touched,
  } = props;

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      const acceptedFileData = acceptedFiles.map((selectedfile: any) => {
        const data = {
          file: selectedfile,
          errors: [],
          previousFile: URL.createObjectURL(selectedfile),
        };

        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;

          setFileData({
            ...data,
            fileContent: fileContent
          });
          console.log(fileContent,"askdjflasldfjlasdkjf;lasjfllas")
        };
        reader.readAsText(data.file);
        
        return data;
      });

      // Use forEach for rejected files since it doesn't return a new array
      rejectedFiles.forEach((selectedfile: any): any => {
        setFieldError(name, errorMsg);
      });

      const fileUrl = acceptedFileData[0].previousFile;
      setSelectedFileUrl(fileUrl);
      setFieldValue(name, acceptedFileData[0]?.file);
    },
    [setFieldValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 1024 * 1024 * fileValidate.maxSize,
    accept: fileValidate.fileExtension,
  });

  return (
    <>
      <div {...getRootProps()} className="borders">
        <input {...getInputProps()} name={name} />
        <Box className="file-upload-card" onClick={() => setFieldTouched(name, true)}>
          <div className="details">
            <CardContent className="drop-content">
              <Box className="dropzone-icon">
                <CloudUploadIcon />
              </Box>
              <Typography variant="subtitle1" className="dropzone-text">
                Click here to upload attachment or <a href="#">Browse</a>
              </Typography>
            </CardContent>
          </div>
        </Box>
      </div>
      <Grid container marginTop={selectedFileUrl?.length > 0 ? 2 : 0}>
        <Grid item xs={6}>
          {selectedFileUrl?.length > 0 ? (
            <Alert>
              <Box className="file-name">
                <Typography>{value?.name}</Typography>
              </Box>
            </Alert>
          ) : null}
        </Grid>
      </Grid>
      {error && touched.file && <FormHelperText error>{errorMsg}</FormHelperText>}
      {fileData && (
        <Box mt={3} sx={{ width: "50%" }}>
          <h2>Uploaded File:</h2>

          <textarea
            style={{ width: "100%", height: "150px" }}
            value={fileData.fileContent}

            readOnly
          />
        </Box>
      )}
    </>
  );
};

export default memo(CustomFileUpload);


