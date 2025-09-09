const prompt = require("prompt-sync")();

function calculatePAYE(taxableIncome) {
  let tax = 0;

  if (taxableIncome <= 24000) {
    tax = taxableIncome * 0.1;
  } else if (taxableIncome <= 32333) {
    tax = (24000 * 0.1) + ((taxableIncome - 24000) * 0.25);
  } else if (taxableIncome <= 500000) {
    tax = (24000 * 0.1) + (8333 * 0.25) + ((taxableIncome - 32333) * 0.3);
  } else if (taxableIncome <= 800000) {
    tax = (24000 * 0.1) + (8333 * 0.25) + (467667 * 0.3) + ((taxableIncome - 500000) * 0.325);
  } else {
    tax = (24000 * 0.1) + (8333 * 0.25) + (467667 * 0.3) + (300000 * 0.325) + ((taxableIncome - 800000) * 0.35);
  }

  // Personal relief
  return Math.max(0, tax - 2400);
}

function calculateNSSF(basicSalary) {
  // Tier I (up to 8000)
  const tier1 = Math.min(basicSalary, 8000) * 0.06;

  // Tier II (from 8001 to 72000)
  const tier2 = Math.min(Math.max(basicSalary - 8000, 0), 64000) * 0.06;

  return tier1 + tier2;
}

function calculateNetSalary(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;

  // Deductions
  const nssf = calculateNSSF(basicSalary);
  const shif = grossSalary * 0.0275; // 2.75%
  const housingLevy = grossSalary * 0.015; // 1.5%

  // Taxable income
  const taxableIncome = grossSalary - nssf - shif - housingLevy;
  const paye = calculatePAYE(taxableIncome);

  const totalDeductions = nssf + shif + housingLevy + paye;
  const netSalary = grossSalary - totalDeductions;

  return {
    grossSalary,
    nssf,
    shif,
    housingLevy,
    paye,
    netSalary
  };
}

// --- User Input ---
const basicSalaryInput = prompt("Enter basic salary: ");
const benefitsInput = prompt("Enter benefits: ");

const basicSalary = Number(basicSalaryInput);
const benefits = Number(benefitsInput);

if (isNaN(basicSalary) || isNaN(benefits)) {
  console.log("Invalid input. Please enter numbers only.");
} else {
  console.log(calculateNetSalary(basicSalary, benefits));
}
