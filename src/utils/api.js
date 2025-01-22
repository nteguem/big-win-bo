import store from '../redux/setup/store';
import { showOverlayMessage } from './helpers'

const remoteUrl = process.env.REACT_APP_API_URL;

export const request = async (method, url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;
    const response = await fetch(remoteUrl + url, {
      method, 
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json; charset=utf-8' }),
        ...headers,
      },
      body: isFormData ? data : JSON.stringify(data),
      timeout: 15000,
    });

    if (!response.ok) {
      if ((response.status === 401 || response.status === 403) && !response.url.includes("login")) {
        await localStorage.removeItem('token');
        await localStorage.removeItem('userData');
        await showOverlayMessage("Votre connexion a expiré. Cliquez sur le bouton 'Se reconnecter' ci-dessous.", "Se reconnecter");
        window.location.href = "/login";
        store.dispatch({ type: 'LOGOUT' });
      }
    }

    return await response.json();
  } catch (error) {
    console.log("error", error)
    if (error.message.includes("Network request failed") || error.message.includes('Failed to fetch')) {
      await showOverlayMessage("Impossible de se connecter. Veuillez vérifier votre connexion internet.", "Réessayer");
      console.error('Erreur réseau :', error);
    } else {
      console.error('Erreur lors de la requête :', error);
    }
  }
};

export const sendRequest = async (method, url, data, headers = {}, authenticated = true) => {
  try {
    if (authenticated) {
      const userData = localStorage.getItem('user');
      const userDataJson = JSON.parse(userData)
      if (userDataJson.token) {
        headers['Authorization'] = `Bearer ${userDataJson.token}`;
      }
    }
    return await request(method, url, data, headers);
  } catch (error) {
    throw error;
  }
};
