let flowData = [];
let timeLabels = [];
let chart;

// Initialize Chart.js
window.onload = function() {
  const ctx = document.getElementById('flowChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [{
        label: 'Flow Rate (L/min)',
        data: flowData,
        borderColor: '#00e6ff',
        backgroundColor: 'rgba(0,230,255,0.3)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#fff' } }
      },
      scales: {
        x: { ticks: { color: '#fff' } },
        y: { ticks: { color: '#fff' }, beginAtZero: true }
      }
    }
  });
};

function simulateFlow() {
  let flowRate = Math.floor(Math.random() * 20); // random flow 0-20 L/min
  document.getElementById("flowRate").textContent = flowRate;
  let leakStatus = document.getElementById("leakStatus");
  let statusBox = document.getElementById("statusBox");

  if (flowRate > 10) {
    leakStatus.textContent = "Leak Detected 🚨";
    leakStatus.style.color = "red";
    statusBox.classList.add("leak");
    alert("⚠️ Water leakage detected! Please check your pipeline.");
  } else {
    leakStatus.textContent = "Normal ✅";
    leakStatus.style.color = "lime";
    statusBox.classList.remove("leak");
  }

  // Add data to chart
  const currentTime = new Date().toLocaleTimeString();
  timeLabels.push(currentTime);
  flowData.push(flowRate);

  if (timeLabels.length > 10) {  // Keep last 10 readings
    timeLabels.shift();
    flowData.shift();
  }

  chart.update();
}
