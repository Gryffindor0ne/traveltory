import { useAppSelector } from "../hooks";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storyData, StoryInfo } from "../storySlice";
import { koreanDateFormatter } from "@utils/dateUtils";
import { selectList } from "./NewStory";
import Tags from "@components/Tags";
import EditStory from "@components/EditStory";
import { doc, deleteDoc } from "firebase/firestore";
import { dbService, storage } from "@apis/f-base";
import { userState } from "../userSlice";
import { deleteObject, ref } from "firebase/storage";

const Story = () => {
  const params = useParams();
  const currentId = params.id;
  const navigate = useNavigate();
  const { stories } = useAppSelector(storyData);
  const { id } = useAppSelector(userState);

  const [currentStory, setCurrentStory] = useState<StoryInfo | undefined>();
  const [isEdit, setIsEdit] = useState(false);

  console.log(id);
  console.log(currentStory?.writerId);

  useEffect(() => {
    if (currentId) {
      setCurrentStory(stories.find((el) => el.id === currentId));
    }
  }, [stories, currentId]);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 이 스토리 삭제를 원합니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "stories", `${currentStory?.id}`));
      if (currentStory?.image) {
        const urlRef = ref(storage, currentStory?.image);
        await deleteObject(urlRef);
      }
      navigate("/");
    }
  };

  const toggleEdit = () => setIsEdit((prev) => !prev);

  return (
    <>
      {isEdit ? (
        <EditStory stories={currentStory} setIsEdit={setIsEdit} />
      ) : (
        <>
          <div>
            {currentStory?.writerId === id && (
              <>
                <button onClick={onDeleteClick}>Delete Story</button>
                <button onClick={toggleEdit}>Edit Story</button>
              </>
            )}
            <img
              src={currentStory?.writer_profile_image}
              alt={currentStory?.writerNickName}
              width="50px"
              height="50px"
            />
            <div>
              <div>{currentStory?.writerNickName}</div>
              <span>
                <span>
                  {
                    selectList.find(
                      (option) => currentStory?.category === option.value
                    )?.name
                  }
                </span>
                <span>{koreanDateFormatter(currentStory?.writtenAt)}</span>
              </span>
            </div>
          </div>
          <div>
            <Tags tags={currentStory?.tags} />
          </div>
          {currentStory?.image && (
            <img
              src={currentStory.image}
              alt={currentStory.writerNickName}
              width="150px"
              height="120px"
            />
          )}
          <div>{currentStory?.title}</div>
          <div>{currentStory?.content}</div>
        </>
      )}
    </>
  );
};

export default Story;
