import { addStyles, createIcon } from '../tools/style.ts';
import { forwardHaptic } from '../tools/utils.ts';
import { addActions } from '../tools/tap-actions.ts';
import { getVariables } from '../var/cards.ts';

export function handleState(context) {
  const hass = context._hass;
  const editor = context.editor;

  let {
  customStyles,
  entityId,
  icon,
  name,
  state,
  stateChanged,
  formatedState,
  } = getVariables(context, context.config, hass, editor);

  formatedState = entityId && (stateChanged || editor) ? hass.formatEntityState(hass.states[entityId]) : '';
  let showState = context.config.show_state === false ? false : context.config.show_state;

  if (!context.buttonAdded) {
      const buttonContainer = document.createElement("div");
      buttonContainer.setAttribute("class", "button-container");
      context.content.appendChild(buttonContainer);
  }

  const iconContainer = document.createElement('div');
  iconContainer.setAttribute('class', 'icon-container');
  context.iconContainer = iconContainer;

  const nameContainer = document.createElement('div');
  nameContainer.setAttribute('class', 'name-container');

  const stateCard = document.createElement('div');
  stateCard.setAttribute('class', 'state-card');

  if (!context.buttonContainer || editor) {
      // Fix for editor mode
      if (editor && context.buttonContainer) { 
          while (context.buttonContainer.firstChild) {
              context.buttonContainer.removeChild(context.buttonContainer.firstChild);
          }
          context.eventAdded = false;
          context.wasEditing = true;
      }
      // End of fix
  
      context.buttonContainer = context.content.querySelector(".button-container");
  
      context.buttonContainer.appendChild(stateCard);
      stateCard.appendChild(iconContainer);
      stateCard.appendChild(nameContainer);
      context.stateCard = context.content.querySelector(".state-card");
      
      createIcon(context, entityId, icon, iconContainer, editor);
      nameContainer.innerHTML = `
          <p class="name">${name}</p>
          ${!showState ? '' : `<p class="state">${formatedState}</p>`}
      `; 
  
      context.buttonAdded = true;
  }

  if (showState && formatedState) {
      context.content.querySelector(".state").textContent = formatedState;
  }

  function tapFeedback(content) {
      forwardHaptic("success");
      let feedbackElement = content.querySelector('.feedback-element');
      if (!feedbackElement) {
          feedbackElement = document.createElement('div');
          feedbackElement.setAttribute('class', 'feedback-element');
          content.appendChild(feedbackElement);
      }

      feedbackElement.style.animation = 'tap-feedback .5s';
      setTimeout(() => {
          feedbackElement.style.animation = 'none';
          content.removeChild(feedbackElement);
      }, 500);
  }

  if (!context.eventAdded) {
      stateCard.addEventListener('click', () => tapFeedback(context.stateCard), { passive: true });
      addActions(stateCard, context.config, hass, forwardHaptic);
      context.eventAdded = true;
  }

  const buttonStyles = `
  ha-card {
      margin-top: 0 !important;
      background: none !important;
      opacity: ${state !== 'unavailable' ? '1' : '0.5'};
  }
  
  .button-container {
      width: 100%;
      height: 50px;
      z-index: 0;
      background-color: var(--background-color-2,var(--secondary-background-color));
      border-radius: 25px;
      mask-image: radial-gradient(white, black);
      -webkit-transform: translateZ(0);
      overflow: hidden;
  }
  
  .state-card {
      display: inline-flex;
      position: absolute;
      height: 100%;
      width: 100%;
      transition: background-color 1.5s;
      background-color: rgba(0,0,0,0);
      cursor: pointer !important;
  }

  .icon-container {
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-content: center;
      z-index: 1;
      min-width: 38px;
      min-height: 38px;
      margin: 6px;
      border-radius: 50%;
      background-color: var(--card-background-color,var(--ha-card-background));
  }

  .state-card ha-icon {
      display: flex;
      width: 22px; 
  }

  .name-container {
      position: relative;
      display: ${!showState ? 'inline-flex' : 'block'};
      margin-left: 4px;
      z-index: 1;
      font-weight: 600;
      align-items: center;
      line-height: ${!showState ? '16px' : '4px'};
      padding-right: 16px;
  }
  
  .state {
      font-size: 12px;
      opacity: 0.7;
  }
  
  .feedback-element {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(0,0,0);
  }
  
  @keyframes tap-feedback {
      0% {transform: translateX(-100%); opacity: 0;}
      64% {transform: translateX(0); opacity: 0.1;}
      100% {transform: translateX(100%); opacity: 0;}
  }
`;

  addStyles(hass, context, buttonStyles, customStyles, state, entityId, stateChanged);
}