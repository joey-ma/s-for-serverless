export function validateForm(formData) {
  const { name, email, message } = formData;
  if (!name || name.trim() === "") {
    return "Name is required";
  }
  if (!email || email.trim() === "") {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  if (!message || message.trim() === "") {
    return "Message is required";
  }
  return null;
}
