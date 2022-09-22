import React, { useState, useRef, useCallback } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "../apis/f-base";

const UploadImageForm = ({ setImage }: { setImage: (p: string) => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const defaultImageURL =
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1830&q=80";

  const onImageChange = (
    e: React.ChangeEvent<EventTarget & HTMLInputElement>
  ) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file) return null;

    const storageRef = ref(storage, `images/${file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
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
          setImage(downloadURL);
        });
      }
    );
  };

  const onDefaultImageButtonClick = () => {
    setImageURL(defaultImageURL);
    setImage(defaultImageURL);
  };

  const onUploadImageButtonClick = useCallback(() => {
    setImageURL("");
    inputRef.current?.click();
  }, []);

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        name="images"
        onChange={onImageChange}
        accept="image/*"
      />

      <section>
        <div>
          {imageURL &&
            (imageURL.includes("firebasestorage") ? (
              <img
                src={imageURL}
                alt={imageURL.split("/")[7].split("?")[0]}
                width="70px"
                height="70px"
              />
            ) : (
              <img
                src={imageURL}
                alt="default-Image"
                width="70px"
                height="70px"
              />
            ))}
        </div>
        <div>
          <button onClick={onDefaultImageButtonClick}>기본 이미지 사용</button>
          <button onClick={onUploadImageButtonClick}>이미지 업로드</button>
        </div>
      </section>
    </div>
  );
};

export default UploadImageForm;
