export const showOverlayMessage = (message, buttonText) => {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
      overlay.style.backdropFilter = 'blur(5px)'; 
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '1000'; 
  
      const messageBox = document.createElement('div');
      messageBox.style.backgroundColor = 'white';
      messageBox.style.padding = '20px';
      messageBox.style.borderRadius = '10px';
      messageBox.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
      messageBox.style.textAlign = 'center';
  
      // Add message
      const messageText = document.createElement('p');
      messageText.innerText = message;
      messageText.style.marginBottom = '20px';
      messageText.style.fontSize = '18px';
      messageText.style.color = '#333';
  
      // Add button
      const button = document.createElement('button');
      button.innerText = buttonText;
      button.style.padding = '10px 20px';
      button.style.backgroundColor = '#0B57D0';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '100';
      button.style.cursor = 'pointer';
      button.addEventListener('click', () => {
        // Disable the button to prevent double-clicking
        button.disabled = true;
        document.body.removeChild(overlay);
        resolve(); // Resolve the promise when the button is clicked
      });
  
      // Append message and button to messageBox
      messageBox.appendChild(messageText);
      messageBox.appendChild(button);
  
      // Append messageBox to the overlay
      overlay.appendChild(messageBox);
  
      // Append the overlay to the document body
      document.body.appendChild(overlay);
    });
  };
  

  export const buildUrlWithParams = (baseUrl, params) => {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return `${baseUrl}?${queryString}`;
  };
  

  