import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, Image } from "react-bootstrap";

const ImageDropzoneComponent = ({ onSubmit }) => {
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
    accept: "image/*",
    multiple: false,
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
        <p>Drag Or Select Image</p>
      )}
    </Card>
  );
};

export default ImageDropzoneComponent;
