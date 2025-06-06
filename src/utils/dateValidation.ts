export const validateDate = (dateStr: string): string | null => {
  if (!dateStr) {
    return "Date field cannot be empty.";
  }

  const [year, month, day] = dateStr.split('-').map(Number);
  const currentYear = new Date().getFullYear();

  // Check year range (1000 to current year)
  if (year < 1000 || year > currentYear) {
    return `Year must be between 1000 and ${currentYear}.`;
  }

  // Check month range
  if (month < 1 || month > 12) {
    return "Invalid month.";
  }

  // Calculate days in month (accounting for leap years)
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const daysInMonth = [
    31, // January
    isLeapYear ? 29 : 28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31  // December
  ];

  // Check day range
  if (day < 1 || day > daysInMonth[month - 1]) {
    return "Invalid day for the selected month.";
  }

  return null;
};
