function sortArrayBySearchStringMatch(arr, searchStr) {
  if (!arr.length) return []
  // Create a new array of objects with the original strings and their match scores
  const matchScores = arr.map(obj => {
    // Calculate the match score by counting the number of characters that match the search string
    const matchCount = Array.from(obj.title.toLowerCase()).reduce((count, char) => {
      return count + (searchStr.toLowerCase().includes(char) ? 1 : 0);
    }, 0);
    return { obj, matchScore: matchCount };
  });

  // Sort the array of objects by match score in descending order
  matchScores.sort((a, b) => b.matchScore - a.matchScore);

  // Extract the sorted strings from the array of objects
  const sortedStrings = matchScores.map(obj => obj.obj);

  return sortedStrings;
}

function sortArrayBySearchStringMatchUsers(arr, searchStr) {
  // Create a new array of objects with the original strings and their match scores
  if (!arr.length) return []
  const matchScores = arr.map(obj => {
    // Calculate the match score by counting the number of characters that match the search string
    const matchCount = Array.from(obj.username.toLowerCase()).reduce((count, char) => {
      console.log(obj, searchStr, 'BANANA')
      return count + (searchStr.toLowerCase().includes(char) ? 1 : 0);
    }, 0);
    return { obj, matchScore: matchCount };
  });

  // Sort the array of objects by match score in descending order
  matchScores.sort((a, b) => b.matchScore - a.matchScore);

  // Extract the sorted strings from the array of objects
  const sortedStrings = matchScores.map(obj => obj.obj);

  return sortedStrings;
}


module.exports = {
  sortArrayBySearchStringMatch,
  sortArrayBySearchStringMatchUsers,

};
