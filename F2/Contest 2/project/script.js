function OpeningCeremony(score, callback) {
    console.log("Let the games begin!");
    document.getElementById("start").innerHTML = "Let the games begin!";
    return callback(score, false);
  }
  
  function Race100M(score, callback) {
    console.log("Race100M started!");
    document.getElementById("Race").innerHTML = "Race100M started!";
    let times = {
      red: getRandomInt(10, 15),
      blue: getRandomInt(10, 15),
      green: getRandomInt(10, 15),
      yellow: getRandomInt(10, 15),
    };
    document.getElementById("table").style.display = "block";
  
    console.table("Race100M times: ", times);
    let sortedTimes = Object.entries(times).sort((a, b) => a[1] - b[1]);
    document.getElementById("redtime").innerHTML = times["red"];
    document.getElementById("bluetime").innerHTML = times["blue"];
    document.getElementById("greentime").innerHTML = times["green"];
    document.getElementById("yellowtiime").innerHTML = times["yellow"];
    let firstColor = sortedTimes[0][0];
    let secondColor = sortedTimes[1][0];
    score[firstColor] += 50;
    score[secondColor] += 25;
    console.log("Race100M scores: ", score);
    document.getElementById("racescore").innerHTML = "Race100M scores: ";
    document.getElementById("table2").style.display = "block";
    document.getElementById("redscore").innerHTML = score["red"];
    document.getElementById("bluescore").innerHTML = score["blue"];
    document.getElementById("greenscore").innerHTML = score["green"];
    document.getElementById("yellowscore").innerHTML = score["yellow"];
    return callback(score, false);
  }
  
  function LongJump(score, callback) {
    console.log("LongJump started!");
    document.getElementById("longjump").innerHTML = "LongJump started!";
    let color = getRandomColor();
    console.log(`LongJump winner: ${color}`);
    score[color] += 150;
    console.log("LongJump scores: ", score);
    document.getElementById("longscore").innerHTML = "LongJump scores: ";
    document.getElementById("table3").style.display = "block";
    document.getElementById("redlong").innerHTML = score["red"];
    document.getElementById("bluelong").innerHTML = score["blue"];
    document.getElementById("greenlong").innerHTML = score["green"];
    document.getElementById("yellowlong").innerHTML = score["yellow"];
  
    return callback(score, false);
  }
  
  function HighJump(score, callback) {
    console.log("HighJump started!");
    // let color = prompt("What colour secured the highest jump?");
    let color = "red";
    if (color === null || color === "") {
      console.log("Event was cancelled");
      // callback(score, AwardCeremony);
    } else if (Object.keys(score).includes(color)) {
      score[color] += 100;
      console.log(`HighJump winner: ${color}`);
      console.log("HighJump scores: ", score);
      // AwardCeremony(score);
    } else {
      console.log("Invalid color entered!");
      // AwardCeremony(score);
    }
    document.getElementById("highjump").innerHTML = "HighJump Start: ";
    document.getElementById("highscore").innerHTML = "HighJump scores: ";
    document.getElementById("table4").style.display = "block";
    document.getElementById("redhigh").innerHTML = score["red"];
    document.getElementById("bluehigh").innerHTML = score["blue"];
    document.getElementById("greenhigh").innerHTML = score["green"];
    document.getElementById("yellowhigh").innerHTML = score["yellow"];
  
    return callback(score, false);
  }
  function AwardCeremony(score) {
    console.log("Award Ceremony started!");
    document.getElementById("Award").innerHTML = "Award Ceremony started!";
  
    let sortedScores = Object.entries(score).sort((a, b) => b[1] - a[1]);
    console.log(
      `${sortedScores[0][0]} came first with ${sortedScores[0][1]} points`
    );
    console.log(
      `${sortedScores[1][0]} came second with ${sortedScores[1][1]} points`
    );
    console.log(
      `${sortedScores[2][0]} came third with ${sortedScores[2][1]} points`
    );
    let str = "";
    str += `<li> ${sortedScores[0][0]} came first with ${sortedScores[0][1]} points</li>`;
    str += `<li> ${sortedScores[1][0]} came second with ${sortedScores[1][1]} points</li>`;
    str += `<li>${sortedScores[2][0]} came third with ${sortedScores[2][1]} points</li>`;
    document.getElementById("division").innerHTML = str;
    document.querySelector("body").style.backgroundColor = sortedScores[0][0];
  }
  
  function getRandomInt(min, max) {
    return Math.trunc(Math.random() * (max - min) + min) + 1;
  }
  
  function getRandomColor() {
    let colors = ["red", "yellow", "blue", "green"];
    return colors[getRandomInt(0, 3)];
  }
  // Starting the SportsDay
  let score = { red: 0, blue: 0, green: 0, yellow: 0 };
  OpeningCeremony(score, (startingans, err) => {
    if (!err) {
      setTimeout(() => {
        Race100M(
          startingans,
          (raceans, err) => {
            if (!err) {
              setTimeout(() => {
                LongJump(raceans, (longans, err) => {
                  if (!err) {
                    HighJump(longans, (highans, err) => {
                      if (!err) {
                        AwardCeremony(highans);
                      }
                    });
                  }
                });
              }, 2000);
            }
          },
          3000
        );
      }, 1000);
    }
  });