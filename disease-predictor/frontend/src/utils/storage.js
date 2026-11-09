// Prediction history is stored per user, so people sharing a browser never see each other's health data.
export const resultsKey = (user) => `mdp_results_${user?.uid || 'guest'}`

export const loadResults = (user) => {
  try { return JSON.parse(localStorage.getItem(resultsKey(user)) || '[]') }
  catch { return [] }
}

export const saveResults = (user, results) =>
  localStorage.setItem(resultsKey(user), JSON.stringify(results))

export const clearResults = (user) => localStorage.removeItem(resultsKey(user))
