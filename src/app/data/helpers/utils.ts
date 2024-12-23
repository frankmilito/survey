import { Question } from "@/app/components/survey/questions";

export const formatType = (type: Question["type"]) => {
  switch (type) {
    case "SINGLE_CHOICE":
      return "Single Choice";
    case "MULTIPLE_CHOICE":
      return "Multiple Choice";
    default:
      return "Unkown Type";
  }
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
};
