import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, Image } from "react-bootstrap";

const DropzoneComponent = ({ onSubmit }) => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    if (onSubmit) {
      onSubmit(selectedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: [
      "image/*",
      "text/plain",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    multiple: true,
  });

  return (
    <Card
      {...getRootProps()}
      style={{
        border: "1px dashed #05B05B",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        fontSize: "10px",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {file ? (
        file.type.startsWith("image/") ? (
          <Image src={URL.createObjectURL(file)} fluid rounded />
        ) : (
          <p>{file.name}</p>
        )
      ) : (
        <p>Drag 'n' drop a file here, or click to select a file</p>
      )}
    </Card>
  );
};

export default DropzoneComponent;
