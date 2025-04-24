export const validateDob = (inputValue: string) => {
  console.log({ inputValue });
  // If the field is blank, require it
  if (!inputValue) {
    return "Please enter your date of birth.";
  }

  const birthDate = new Date(inputValue);

  // Check if the input is a valid date
  if (isNaN(birthDate.getTime())) {
    return "Please enter a valid date.";
  }

  const today = new Date();
  const ageInMs = today.getTime() - birthDate.getTime();
  const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);

  if (ageInYears < 22) {
    return "You must be at least 22 years old.";
  }

  if (ageInYears > 65) {
    return "You must be at most 65 years old.";
  }

  return "";
};
export const banks = [
  "Standard Chartered",
  "The City Bank",
  "Eastern Bank LTD",
  "Brac Bank",
  "Islami Bank Bangladesh",
  "Lanka Bangla Finance bank",
  "IDLC Finance bank",
  "Al Arafah Islamic Bank",
];


