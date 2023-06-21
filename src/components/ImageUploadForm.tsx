import React, { useState, useRef, useCallback } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { styled as styledM } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import { storage } from "@apis/f-base";

const BorderLinearProgress = styledM(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#ffab91" : "#ff8f00",
  },
}));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border: solid 1px #ff8f00;
  border-radius: 1rem;
  margin: 2rem 0;
  padding: 0.5rem;
`;

const FileInput = styled.input`
  display: none;
`;

const ImageBox = styled.div`
  width: 100%;

  > svg {
    width: 100%;
    margin: 2rem 0;
    color: #ff8f00;
  }
  > img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.7rem;
`;

const ImageBtns = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-top: 1rem;
`;

const ImageUploadBtn = styled.button`
  cursor: pointer;

  background-color: transparent;
  border: 1px solid #ff8f00;
  border-radius: 10px;
  color: #ff8f00;
  font-weight: bold;
  font-size: 0.7rem;
  width: 5rem;
  padding: 0.4rem 0.1rem;
  margin: 0.2rem 0.5rem;

  :hover {
    border: none;
    background: #ff8f00;
    color: white;
    font-weight: bold;
  }
`;

export const defaultImageURL =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80";

const UploadImageForm = ({
  imageURL,
  setImageURL,
}: {
  imageURL: string;
  setImageURL: (p: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [progressPercent, setProgressPercent] = useState<number>(0);

  const onImageChange = (
    e: React.ChangeEvent<EventTarget & HTMLInputElement>
  ) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file) return null;

    const storageRef = ref(storage, `images/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        switch (error.code) {
          case "storage/canceled":
            alert("Upload has been canceled");
            break;
        }
      },
      () => {
        e.target.value = "";
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageURL(downloadURL);
        });
      }
    );
  };

  const onDefaultImageButtonClick = () => {
    setImageURL(defaultImageURL);
  };

  const onUploadImageButtonClick = useCallback(() => {
    setImageURL("");
    inputRef.current?.click();
  }, [setImageURL]);

  return (
    <Container>
      <FileInput
        type="file"
        ref={inputRef}
        name="images"
        onChange={onImageChange}
        accept="image/*"
      />
      <ImageUploadContainer>
        <ImageBox>
          {!imageURL && <FontAwesomeIcon icon={faImage} size="4x" />}
          {imageURL &&
            (imageURL.includes("firebasestorage") ? (
              <img src={imageURL} alt={imageURL.split("/")[7].split("?")[0]} />
            ) : (
              <img src={imageURL} alt="default" />
            ))}
        </ImageBox>
        <ImageBtns>
          <ImageUploadBtn onClick={onDefaultImageButtonClick}>
            기본 이미지
          </ImageUploadBtn>
          <ImageUploadBtn onClick={onUploadImageButtonClick}>
            이미지 업로드
          </ImageUploadBtn>
        </ImageBtns>
      </ImageUploadContainer>
      {progressPercent > 0 && progressPercent < 100 && (
        <Box sx={{ width: "100%" }}>
          <BorderLinearProgress variant="determinate" value={progressPercent} />
        </Box>
      )}
    </Container>
  );
};

export default UploadImageForm;
