import { StoryInfo } from "@redux/slices/storySlice";

export const updateTags = (
  method: string,
  story: StoryInfo,
  setStory: React.Dispatch<React.SetStateAction<StoryInfo>>,
  value?: string | undefined,
  clickedIndex?: number | undefined
) => {
  switch (method) {
    case "ADD":
      const filtered = story.tags.filter((el) => el === value);

      if (value !== undefined && value !== "" && filtered.length === 0) {
        setStory({
          ...story,
          tags: [...story.tags, value],
        });
      }

      break;

    case "REMOVE":
      setStory(() => {
        return {
          ...story,
          tags: story.tags.filter((_, index) => {
            return index !== clickedIndex;
          }),
        };
      });

      break;
  }
};
