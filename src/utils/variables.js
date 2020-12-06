module.exports = {
  fetch: require('node-fetch'),
  roleAttributes: `id, name, key, tagline`,
  languageAttributes: `id, displayName, key, category, tagline, icon, isNew`,
  userAttributes: `id, username, url, image, karma, firstName, lastName, fullName, displayName, isLoggedIn, bio, timeCreated, organization { name }, subscription { planId }, languages { id, displayName, key, category, tagline, icon, isNew }, roles { id, name, key, tagline }`,
  boardAttributes: `id, url, slug, cta, titleCta, bodyCta, buttonCta, description, name, replRequired, isLocked, isPrivate`,
  replAttributes: `id, hostedUrl, title, lang { id, displayName, key, category, tagline, icon, isNew }, language, timeCreated`,
  commentAttributes: `id, body, voteCount, timeCreated, timeUpdated, user { id, username, url, image, karma, firstName, lastName, fullName, displayName, isLoggedIn, bio, timeCreated, organization { name }, subscription { planId }, languages { id, displayName, key, category, tagline, icon, isNew }, roles { id, name, key, tagline } }, url, post { id }, parentComment { id }, comments { id }, isAuthor, canEdit, canVote, canComment, hasVoted, canReport, hasReported, isAnswer, canSelectAsAnswer, canUnselectAsAnswer, preview(removeMarkdown: true, length: 150)`,
  postAttributes: `id, title, body, showHosted, voteCount, commentCount, isPinned, isLocked, timeCreated, timeUpdated, url, user { id, username, url, image, karma, firstName, lastName, fullName, displayName, isLoggedIn, bio, timeCreated, organization { name }, subscription { planId }, languages { id, displayName, key, category, tagline, icon, isNew }, roles { id, name, key, tagline } }, board { id, url, slug, cta, titleCta, bodyCta, buttonCta, description, name, replRequired, isLocked, isPrivate }, repl { id, hostedUrl, title, lang { id, displayName, key, category, tagline, icon, isNew }, language, timeCreated }, isAnnouncement, isAuthor, canEdit, canComment, canVote, canPin, canSetType, canChangeBoard, canLock, hasVoted, canReport, hasReported, isAnswered, isAnswerable, answeredBy { id, username, url, image, karma, firstName, lastName, fullName, displayName, isLoggedIn, bio, timeCreated, organization { name }, subscription { planId }, languages { id, displayName, key, category, tagline, icon, isNew }, roles { id, name, key, tagline } }, answer { id, body, voteCount, timeCreated, timeUpdated, user { id, username, url, image, karma, firstName, lastName, fullName, displayName, isLoggedIn, bio, timeCreated, organization { name }, subscription { planId }, languages { id, displayName, key, category, tagline, icon, isNew }, roles { id, name, key, tagline } }, url, post { id }, parentComment { id }, comments { id }, isAuthor, canEdit, canVote, canComment, hasVoted, canReport, hasReported, isAnswer, canSelectAsAnswer, canUnselectAsAnswer, preview(removeMarkdown: true, length: 150) }, tutorialPages, preview(removeMarkdown: true, length: 150)`
}