let globalContext = null;
function initializeFront() {
  Front.contextUpdates.subscribe(async (context) => {
    globalContext = context;
    console.log('Context:', context);

    // Update the DOM with the current teammate
    document.getElementById('currentTeammate').textContent = `${globalContext.teammate.username} (${globalContext.teammate.id})`; currentTeammate
  });
}

function checkFrontSDK() {
  console.log('Checking for Front SDK...');
  if (typeof Front !== 'undefined') {
    console.log('Front SDK found, initializing...');
    initializeFront();
  } else {
    console.error('Front SDK not loaded. Retrying in 1 second...');
    setTimeout(checkFrontSDK, 1000);
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');
  // Check if Front SDK is loaded
  checkFrontSDK();

  const selfAssign = document.getElementById('selfAssign');
  selfAssign.addEventListener('click', () => {
    Front.assign(globalContext.teammate.id);
    console.log(`Assigned to @${globalContext.teammate.username} (${globalContext.teammate.id})`);
  });
});

