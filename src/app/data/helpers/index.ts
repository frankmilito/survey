export const questionOptions = [
  {
    value: "SINGLE_CHOICE",
    label: "Single Choice",
    description: "Users select one answer from multiple options.",
    icon: "/singleChoice",
  },
  {
    value: "MULTIPLE_CHOICE",
    label: "Multiple Choice",
    description: "Users can select more than one answer.",
    icon: "/multiChoice",
  },
  {
    value: "TEXTINPUT_CHOICE",
    label: "Text Input",
    description: "Users provide a free-form text response.",
    icon: "/textInput",
  },
  {
    value: "TEXTAREA_CHOICE",
    label: "Text Area",
    description: "User provides a longer, multi-line response.",
    icon: "/textArea",
  },
  {
    value: "MOOD_CHOICE",
    label: "Mood Scale",
    description: "User chooses a mood or emotion from a range",
    icon: "/moodScale",
  },
  {
    value: "STAR",
    label: "Star Rating",
    description: "Refine your target audience based on specific attributes.",
    icon: "/star",
  },
  {
    value: "PROMOTER_CHOICE",
    label: "Net Promoter Scale",
    description: "User rates likelihood to recommend on a scale of 0-10.",
    icon: "/netPromoter",
  },
];

export const audienceOptions = [
  {
    value: "All Customers",
    label: "All Customers",
    description: "Survey will be shown to every customer.",
    icon: "/allcustomers",
  },
  {
    value: "Returning Customers",
    label: "Returning Customers",
    description:
      "Survey is shown only to customers who have made previous purchases.",
    icon: "/returningCustomer",
  },
  {
    value: "New Customers",
    label: "New Customers",
    description:
      "Survey targets only customers who are making their first purchase.",
    icon: "/newCustomer",
  },
  {
    value: "Segment",
    label: "Specific Customer Segment",
    description: "Refine your target audience based on specific attributes.",
    icon: "/specificCustomer",
  },
];
