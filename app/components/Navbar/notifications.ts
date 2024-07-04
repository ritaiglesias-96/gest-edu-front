import useFcmToken from '@/utils/hooks/useFMCToken';
import {
  MessagePayload,
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from 'firebase/messaging';

const messaging = getMessaging();

// IDs of divs that display registration token UI or request permission UI.
const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Update the UI to include the received message.
  appendMessage(payload);
});

function ResetUI() {
  clearMessages();
  showToken('loading...');
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  const { fcmToken } = useFcmToken();
  if (fcmToken) {
    updateUIForPushEnabled(fcmToken);
  } else {
    // Show permission request.
    console.log(
      'No registration token available. Request permission to generate one.'
    );
    // Show permission UI.
    updateUIForPushPermissionRequired();
  }
}

function showToken(currentToken: string) {
  // Show token in console and UI.
  const tokenElement = document.querySelector('#token')!;
  tokenElement.textContent = currentToken;
}

function showHideDiv(divId: string, show: boolean) {
  const div = document.querySelector('#' + divId)! as HTMLDivElement;
  if (show) {
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
}

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      ResetUI();
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

function deleteTokenFromFirebase() {
  // Delete registration token.
  getToken(messaging)
    .then((currentToken) => {
      deleteToken(messaging)
        .then(() => {
          console.log('Token deleted.', currentToken);
          // Once token is deleted update UI.
          ResetUI();
        })
        .catch((err) => {
          console.log('Unable to delete token. ', err);
        });
    })
    .catch((err) => {
      console.log('Error retrieving registration token. ', err);
      showToken('Error retrieving registration token.');
    });
}

// Add a message to the messages element.
function appendMessage(payload: MessagePayload) {
  const messagesElement = document.querySelector('#messages')!;
  const dataHeaderElement = document.createElement('h5');
  const dataElement = document.createElement('pre');
  dataElement.style.overflowX = 'hidden;';
  dataHeaderElement.textContent = 'Received message:';
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderElement);
  messagesElement.appendChild(dataElement);
}

// Clear the messages element of all children.
function clearMessages() {
  const messagesElement = document.querySelector('#messages')!;
  while (messagesElement.hasChildNodes()) {
    messagesElement.removeChild(messagesElement.lastChild!);
  }
}

function updateUIForPushEnabled(currentToken: string) {
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}

function updateUIForPushPermissionRequired() {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
}

document
  .getElementById('request-permission-button')!
  .addEventListener('click', requestPermission);
document
  .getElementById('delete-token-button')!
  .addEventListener('click', deleteTokenFromFirebase);

ResetUI();
