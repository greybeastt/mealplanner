// Data for the pie chart (replace these values with your data)
const data = {
  labels: ['Calories', 'Fat', 'Carbs'],
  datasets: [{
    label: 'Nutritional Information',
    data: [300, 100, 200], // Example data for calories, fat, and carbs
    backgroundColor: [
      'rgba(255, 99, 132, 0.7)', // Red for calories
      'rgba(54, 162, 235, 0.7)', // Blue for fat
      'rgba(255, 206, 86, 0.7)'  // Yellow for carbs
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)'
    ],
    borderWidth: 1
  }]
};

// Configuration options for the chart
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false // Hide the legend
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        }
      }
    }
  }
};

// Get the context of the canvas element we want to select
const ctx = document.getElementById('myPieChart').getContext('2d');

// Create the pie chart
const myPieChart = new Chart(ctx, {
  type: 'pie',
  data: data,
  options: options
});
