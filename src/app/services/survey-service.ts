import {
  makeDeleteCaller,
  makeGetCaller,
  makePatchCaller,
  makePostCaller,
  makePutCaller,
} from "../utils";

export const endpoints = () => ({
  createSurvey: (payload) => {
    return makePostCaller("/surveys", payload);
  },
  getSurvey: (surveyId: string) => makeGetCaller(`/surveys/${surveyId}`),
  getAllSurvey: (teamId: string) => makeGetCaller(`/surveys?team=${teamId}`),
  reorderSurveyQuestion: (payload) => {
    return makePutCaller(`/surveys/${payload.id}/reorder`, {
      team: payload.team,
      questionsOrder: payload.questionsOrder,
    });
  },

  addSurveyQuestion: (payload) => {
    const { id, ...rest } = payload;
    return makePostCaller(`/surveys/${payload.id}/questions`, rest);
  },
  editSurveyQuestion: (payload) => {
    const { surveyId, questionId, ...rest } = payload;
    return makePatchCaller(
      `/surveys/${surveyId}/questions/${questionId}`,
      rest
    );
  },
  editSurvey: (payload) => {
    const { id, ...rest } = payload;
    return makePatchCaller(`/surveys/${id}/`, rest);
  },
  removeSurveyQuestion: (payload) =>
    makeDeleteCaller(
      `/surveys/${payload.surveyId}/questions/${payload.questionId}?team=${payload.team}`
    ),
  publishSurvey: (payload) => {
    const { id, ...rest } = payload;
    return makePatchCaller(`/surveys/${payload.id}`, rest);
  },
  getCompany: (teamId: string) => makeGetCaller(`/teams/${teamId}`),
  getStats: (teamId: string) => makeGetCaller(`/teams/${teamId}/stats`),
});

export default (function SurveyService() {
  return endpoints();
})();
