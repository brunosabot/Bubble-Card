import { createElement, forwardHaptic, getIcon, getImage, getName, getState, tapFeedback } from '../tools/utils.ts';
import { addActions } from '../tools/tap-actions.ts';

function createStructure(context) {
    context.elements = {};
    context.elements.stateCardContainer = createElement('div', 'state-card-container');
    context.elements.stateCard = createElement('div', 'state-card');
    context.elements.nameContainer = createElement('div', 'name-container');
    context.elements.iconContainer = createElement('div', 'icon-container');
    context.elements.name = createElement('p', 'name');
    context.elements.state = createElement('p', 'state');
    context.elements.feedback = createElement('div', 'feedback-element');
    context.elements.icon = createElement('ha-icon', 'icon');
    context.elements.image = createElement('div', 'entity-picture');
    context.elements.style = createElement('style');

    context.elements.feedback.style.display = 'none';
    context.elements.style.innerText = stateCardStyles;
    context.elements.stateCard.addEventListener('click', () => tapFeedback(context), { passive: true });

    addActions(context.elements.stateCard, context.config, context._hass, forwardHaptic);

    context.elements.iconContainer.appendChild(context.elements.icon);
    context.elements.iconContainer.appendChild(context.elements.image);

    context.elements.nameContainer.appendChild(context.elements.name);
    context.elements.nameContainer.appendChild(context.elements.state);
    context.elements.stateCard.appendChild(context.elements.iconContainer);
    context.elements.stateCard.appendChild(context.elements.nameContainer);
    context.elements.stateCard.appendChild(context.elements.feedback);

    if (!context.editor) {
        context.elements.stateCardContainer.appendChild(context.elements.stateCard);
    }

    context.content.innerHTML = '';
    context.content.appendChild(context.elements.stateCardContainer);
    context.content.appendChild(context.elements.style);

    context.cardType = 'state';
}

function updateValues(context) {
    const name = getName(context);
    const state = getState(context);
    const showState = context.config.show_state !== false;
    const formattedState = context._hass.formatEntityState(context._hass.states[context.config.entity]);

    if (state === 'unavailable') {
        context.card.style.opacity = '0.5';
    } else {
        context.card.style.opacity = '1';
    }

    if (name !== context.elements.name.innerText) {
        context.elements.name.innerText = name;
    }

    if (showState && formattedState !== context.elements.state.innerText) {
        context.elements.state.style.display = '';
        context.elements.state.innerText = formattedState;
        context.elements.nameContainer.style.display = 'block';
        context.elements.nameContainer.style.lineHeight = '4px';
    }
    if (showState === false) {
        context.elements.state.style.display = 'none';
        context.elements.nameContainer.style.display = 'inline-flex';
        context.elements.nameContainer.style.lineHeight = '16px';
    }

    const icon = getIcon(context);
    const image = getImage(context);
    if (icon !== '') {
        context.elements.icon.icon = icon;
        context.elements.icon.style.display = '';
        context.elements.image.style.display = 'none';
    } else if (image !== '') {
        context.elements.image.style.backgroundImage = 'url(' + image + ')';
        context.elements.icon.style.display = 'none';
        context.elements.image.style.display = '';
    } else {
        context.elements.icon.style.display = 'none';
        context.elements.image.style.display = 'none';
    }
}

export function handleState(context) {
  if (context.cardType !== 'state') {
    createStructure(context)
  }

  updateValues(context);
}

const stateCardStyles = `
    ha-card {
        margin-top: 0 !important;
        background: none !important;
    }

    .state-card-container {
        width: 100%;
        height: 50px;
        z-index: 0;
        background-color: var(--background-color-2, var(--secondary-background-color));
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
        background-color: rgba(0, 0, 0, 0);
        cursor: pointer !important;
    }

    .state-card .icon-container {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        z-index: 1;
        min-width: 38px;
        min-height: 38px;
        margin: 6px;
        border-radius: 50%;
        background-color: var(--card-background-color, var(--ha-card-background));
        overflow: hidden;
    }

    .state-card ha-icon {
        display: flex;
        width: 22px; 
    }

    .state-card .entity-picture {
        background-size: cover;
        background-position: center;
        height: 100%;
        width: 100%;
    }

    .state-card .name-container {
        position: relative;
        margin-left: 4px;
        z-index: 1;
        font-weight: 600;
        align-items: center;
        padding-right: 16px;
    }

    .state-card .state {
        font-size: 12px;
        opacity: 0.7;
    }

    .state-card .feedback-element {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0);
    }

    @keyframes tap-feedback {
        0% { transform: translateX(-100%); opacity: 0; }
        64% { transform: translateX(0); opacity: 0.1; }
        100% { transform: translateX(100%); opacity: 0; }
    }
`;
