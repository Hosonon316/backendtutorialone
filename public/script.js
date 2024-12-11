document.getElementById('apiForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputField = document.getElementById('inputField');
    const resultText = document.getElementById('resultText');
  
    if (!inputField.value.trim()) {
      alert('Please enter some text!');
      return;
    }
  
    resultText.textContent = 'Loading...';
  
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputField.value }),
      });
  
      const data = await response.json();
      if (response.ok) {
        resultText.textContent = data.candidates[0]?.content?.parts[0]?.text || 'No result';
      } else {
        resultText.textContent = `Error: ${data.error}`;
      }
    } catch (error) {
      resultText.textContent = 'An error occurred while sending your request.';
    }
  });
  