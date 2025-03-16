document.getElementById('risk-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Collect data from the form
  const age = parseInt(document.getElementById('age').value);
  const bmi = parseFloat(document.getElementById('bmi').value);
  const systolic = parseInt(document.getElementById('systolic').value);
  const diastolic = parseInt(document.getElementById('diastolic').value);
  const familyDiseases = Array.from(document.querySelectorAll('input[name="family-disease"]:checked')).map(el => el.value);

  // Send data to the backend API
  const response = await fetch('https://Calculate-risk-functions.azurewebsites.net/api/calculate-risk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      age, bmi, systolic, diastolic, familyDiseases
    })
  });

  const data = await response.json();
  document.getElementById('result').innerHTML = `Risk Score: ${data.riskScore} - Risk Category: ${data.riskCategory}`;
});
