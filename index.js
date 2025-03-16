module.exports = async function (context, req) {
  const { age, bmi, systolic, diastolic, familyDiseases } = req.body;

  let riskScore = 0;
  let riskCategory = '';

  // Age risk points
  if (age < 30) riskScore += 0;
  else if (age < 45) riskScore += 10;
  else if (age < 60) riskScore += 20;
  else riskScore += 30;

  // BMI risk points
  if (bmi < 25) riskScore += 0; // normal
  else if (bmi < 30) riskScore += 30; // overweight
  else riskScore += 75; // obese

  // Blood pressure risk points
  if (systolic < 120 && diastolic < 80) riskScore += 0; // normal
  else if (systolic < 130 && diastolic < 80) riskScore += 15; // elevated
  else if (systolic < 140 || diastolic < 90) riskScore += 30; // stage 1
  else if (systolic < 180 || diastolic < 120) riskScore += 75; // stage 2
  else riskScore += 100; // crisis

  // Family disease risk points
  if (familyDiseases.includes('diabetes')) riskScore += 10;
  if (familyDiseases.includes('cancer')) riskScore += 10;
  if (familyDiseases.includes('alzheimers')) riskScore += 10;

  // Determine risk category
  if (riskScore <= 20) riskCategory = 'low risk';
  else if (riskScore <= 50) riskCategory = 'moderate risk';
  else if (riskScore <= 75) riskCategory = 'high risk';
  else riskCategory = 'uninsurable';

  // Return the result
  context.res = {
    status: 200,
    body: { riskScore, riskCategory }
  };
};
