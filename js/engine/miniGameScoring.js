// Shared reward math for the 5 mini-games so each screen doesn't invent its
// own formula. Deliberately modest and kept independent of
// progressStore.recordDialogueCompletion()'s XP formula, which rewards full
// conversations more heavily than a short mini-game round.

export function computeStars(accuracyPercent) {
  if (accuracyPercent >= 90) return 3;
  if (accuracyPercent >= 70) return 2;
  if (accuracyPercent >= 40) return 1;
  return 0;
}

export function computeMiniGameReward(accuracyPercent, itemCount) {
  const stars = computeStars(accuracyPercent);
  const xp = Math.max(5, Math.round(itemCount * 2 * (accuracyPercent / 100)) + stars * 2);
  const coins = Math.max(2, Math.round(itemCount * (accuracyPercent / 100)) + stars);
  return { stars, xp, coins };
}
