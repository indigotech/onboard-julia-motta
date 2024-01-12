export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com.br$/;
  return email.trim() !== '' && emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
  return passwordRegex.test(password);
};

export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;
  return nameRegex.test(name);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRgex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
  return phoneRgex.test(phone);
};

export const isValidBirthdate = (birthdate: string): boolean => {
  const birthdateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!birthdateRegex.test(birthdate)) {
    return false;
  }

  const today = new Date();
  const dateBirthdate = new Date(birthdate);

  if (dateBirthdate > today) {
    return false;
  }

  return true;
};

export const isValidRole = (role: string): boolean => {
  const roleRegex = /^(admin|user)$/;
  return roleRegex.test(role);
};
