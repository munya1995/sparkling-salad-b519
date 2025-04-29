const handleRegistration = async (fullname: string, email: string) => {
  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullname, email }),
  });

  const data = await response.json();
  console.log('Registration response:', data);
};
