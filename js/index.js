let timeTrackingDashboard;
let prevTimeframeNames;
let statsData;

loadFile();

async function loadFile() {
  const response = await fetch("data.json");
  statsData = await response.json();
  init();
}

function init() {
  timeTrackingDashboard = $(".time-tracking-dashboard");
  prevTimeframeNames = {
    daily: "Day",
    weekly: "Week",
    monthly: "Month"
  }

  // Easter egg
  $(".user-card__avatar").on("click", function () {
    $(".user-card__avatar").attr("src", "images/coder-avatar.png");
    $(".user-card__user-name").text("zerescas");
  });

  // Add event listener to each timeframe radio button 
  $(".user-card__timeframe-btn input").on("click", function () {
    const timeframe = $(this).attr("value");
    createStatCards(timeframe);
  });

  // Select weekly timeframe by default
  $("#weekly-timeframe-btn").click();
}

function createStatCards(timeframe) {
  // Remove old statistic cards
  $(".stat-card").remove();

  statsData.forEach(function (statData) {
    processData(statData, timeframe);
  })
}

function processData(statData, timeframe) {
  const timeframeData = statData.timeframes[timeframe];
  const statName = toLowerCase(statData.title);
  const prevTimeframeName = getPrevTimeframeName(timeframe);

  timeTrackingDashboard.append(`
        <div class="stat-card">
          <div class="stat-card__bg stat-card__bg--${statName}">
            <img class="stat-card__icon" src="images/icon-${statName}.svg" alt="${statName}-icon">
          </div>

          <div class="stat-card__bottom-content">

            <div class="stat-card__titlebar">
              <div class="stat_card__header">${statData.title}</div>
              <div class="stat-card__action-btn">
                <img src="/images/icon-ellipsis.svg" alt="ellipsis-icon">
              </div>
            </div>

            <div class="stat-card__data-container">
              <div class="stat-card__current-data">${timeframeData.current}hrs</div>
              <div class="stat-card__prev-data">Last ${prevTimeframeName} - ${timeframeData.previous}hrs</div>
            </div>

          </div>
        </div>
`);
}

function toLowerCase(string) {
  return string.toLowerCase().replace(" ", "-");
}

function getPrevTimeframeName(timeframe) {
  return prevTimeframeNames[timeframe];
}