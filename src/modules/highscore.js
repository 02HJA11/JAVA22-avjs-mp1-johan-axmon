const scoreDiv = document.getElementById("score-list");
export async function getHighscore() {
  const url ="https://highscore-a9526-default-rtdb.europe-west1.firebasedatabase.app/highscore.json";
  const response = await fetch(url);
  const data = await response.json();
  const highScore = Object.entries(data);
  highScore.sort((a, b) => b[1].score - a[1].score);
  for (const [key, userObj] of highScore) {
    const name = userObj.name;
    const score = userObj.score;
    const ol = document.createElement("ul");
    const nameP = document.createElement("li");
    const scoreP = document.createElement("li");
    nameP.innerText = "Name: " + name;
    scoreP.innerText = "Score: " + score;
    scoreDiv.append(ol);
    ol.append(nameP, scoreP);
  }
}
export async function addHighscore(name, score) {
  const url = "https://highscore-a9526-default-rtdb.europe-west1.firebasedatabase.app/highscore.json";
  const response = await fetch(url);
  const data = await response.json();
  const highScore = Object.entries(data);
  let lowestScore = Infinity;
  let lowestScoreKey = null;
 for (const [key, userObj] of highScore) {
    if (userObj.score < lowestScore) {
      lowestScore = userObj.score;
      lowestScoreKey = key;
    }
  }
  if (score > lowestScore) {
    patchFunction(name, score, lowestScoreKey);
  }
  await getHighscore();
}
export async function patchFunction(inputName, inputScore, key) {
  const newURL = `https://highscore-a9526-default-rtdb.europe-west1.firebasedatabase.app/highscore/${key}.json`;
  const newHighscore = {
    name: inputName,
    score: inputScore,
  };
  const options = {
    method: "PATCH",
    body: JSON.stringify(newHighscore),
    headers: {
      "Content-type": "application/json",
    },
  };
  const newResponse = await fetch(newURL, options);
  await newResponse.json();
}