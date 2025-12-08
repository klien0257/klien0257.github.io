async function Login(BASE_URL, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const userData = await response.json();

    // Use email for verification, but store full name for UI display
    const fullName = `${userData.firstName} ${userData.lastName}`;

    const expiryTime = new Date();
    expiryTime.setTime(expiryTime.getTime() + 5 * 60 * 1000);

    document.cookie = `userName=${fullName}; 
    expires=${expiryTime.toUTCString()}; 
    path=/; 
    SameSite=None; 
    Secure`;

    return userData;
  } catch (error) {
    console.error(error);
  }
}

export default Login;
