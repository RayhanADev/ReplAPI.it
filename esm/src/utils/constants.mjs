import fs from 'fs';
import path from 'path';

let initVariables;
if (fs.existsSync(path.join(process.cwd(), '.replapirc.json'))) {
  initVariables = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.replapirc.json')));
} else {
  initVariables = {
    username: undefined,
    captcha: {
      token: undefined,
    },
    endpoints: {
      gql: undefined,
      restful: undefined,
      login: undefined,
    },
    markdown: {
      length: undefined,
      removeMarkdown: undefined,
    },
    previewCount: {
      comments: undefined,
    },
  };
}

export default {
  initVariables,
  roleAttributes: 'id, name, key, tagline',
  languageAttributes: 'id, displayName, key, category, tagline, icon, isNew',
  organizationAttributes: 'id, name, country, postalCode, state, city, googlePlaceId, timeCreated, timeUpdated, timeDeleted, time_created',
  subscriptionAttributes: 'id, userId, customerId, planId, timeUpdated, timeCreated, timeDeleted',
  userAttributes: 'id, username, firstName, lastName, bio, isVerified, displayName, fullName, url, isLoggedIn, isSubscribed, timeCreated, isBannedFromBoards, karma, isHacker, image',
  boardAttributes: 'id, name, description, slug, cta, titleCta, bodyCta, template, buttonCta, color, replRequired, isLocked, isAnswerable, isPrivate, timeCreated, timeUpdated, url, canPost',
  replAttributes: 'id, language, isProject, isPrivate, isStarred, title, slug, description, folderId, isRenamed, url, timeCreated, timeUpdated, isOwner, tags { id }, pinnedToProfile, files, hostedUrl, terminalUrl, reactions { id, count }',
  commentAttributes: `id, body, voteCount, timeCreated, timeUpdated, url, isAuthor, canEdit, canVote, canComment, hasVoted, canReport, hasReported, isAnswer, canSelectAsAnswer, canUnselectAsAnswer, preview(length: ${initVariables.markdown.length || 150}, removeMarkdown: ${initVariables.markdown.removeMarkdown || true})`,
  postAttributes: `id, title, body, showHosted, voteCount, commentCount, isPinned, isLocked, timeCreated, timeUpdated, url, isAnnouncement, isAuthor, canEdit, canComment, canVote, canPin, canSetType, canChangeBoard, canLock, hasVoted, canReport, hasReported, isAnswerable, tutorialPages, preview(length: ${initVariables.markdown.length || 150}, removeMarkdown: ${initVariables.markdown.removeMarkdown || true})`,
  graphql: `${initVariables.endpoints.gql || 'https://staging.replit.com/graphql'}`,
  login: `${initVariables.endpoints.login || 'https://staging.replit.com/login'}`,
  restful: `${initVariables.endpoints.restful || 'https://staging.replit.com'}`,
};