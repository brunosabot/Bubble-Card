import { version } from '../var/version.ts';
import { 
    fireEvent,
    isStateOn,
    getState,
    getAttribute,
    getIcon 
} from '../tools/utils.ts';

customElements.get("ha-switch");

const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

export default class BubbleCardEditor extends LitElement {

    setConfig(config) {
        this._config = {
            ...config
        };
    }

    static get properties() {
        return {
            hass: {},
            _config: {}
        };
    }

    get _card_type() {
        return this._config.card_type || '';
    }

    get _button_type() {
        return this._config.button_type || 'switch';
    }

    get _entity() {
        return this._config.entity || '';
    }

    get _name() {
        return this._config.name || '';
    }

    get _icon() {
        return this._config.icon || '';
    }

    get _state() {
        return this._config.state || '';
    }

    get _text() {
        return this._config.text || '';
    }

    get _hash() {
        return this._config.hash || '#pop-up-name';
    }
    
    get _trigger_entity() {
        return this._config.trigger_entity || '';
    }
    
    get _trigger_state() {
        return this._config.trigger_state || '';
    }
    
    get _trigger_close() {
        return this._config.trigger_close || false;
    }
    
    get _margin() {
        return this._config.margin || '7px';
    }

    get _margin_top_mobile() {
        return this._config.margin_top_mobile || '0px';
    }

    get _margin_top_desktop() {
        return this._config.margin_top_desktop || '0px';
    }

    get _width_desktop() {
        return this._config.width_desktop || '540px';
    }
    
    get _bg_color() {
        return this._config.bg_color ||  window.color;
    }
    
    get _bg_opacity() {
        return this._config.bg_opacity !== undefined ? this._config.bg_opacity : '88';
    }
    
    get _bg_blur() {
        return this._config.bg_blur !== undefined ? this._config.bg_blur : '14';
    }
    
    get _shadow_opacity() {
        return this._config.shadow_opacity !== undefined ? this._config.shadow_opacity : '0';
    }

    get _is_sidebar_hidden() {
        return this._config.is_sidebar_hidden || false;
    }
    
    get _rise_animation() {
        return this._config.rise_animation !== undefined ? this._config.rise_animation : true;
    }
    
    get _auto_close() {
        return this._config.auto_close || '';
    }
    
    get _close_on_click() {
        return this._config.close_on_click || false;
    }

    get _background_update() {
        return this._config.background_update || false;
    }

    get _icon_open() {
        return this._config.icon_open || '';
    }

    get _icon_close() {
        return this._config.icon_close || '';
    }

    get _open_service() {
        return this._config.open_service || 'cover.open_cover';
    }

    get _close_service() {
        return this._config.open_service || 'cover.close_cover';
    }

    get _stop_service() {
        return this._config.open_service || 'cover.stop_cover';
    }

    get _auto_order() {
        return this._config.auto_order || false;
    }

    get _highlight_current_view() {
        return this._config.highlight_current_view || false;
    }
    
    get _show_state() {
        const defaultState = this._config.card_type === 'state' ? true : false;
        return this._config.show_state || defaultState;
    }

    get _show_attribute() {
        const defaultState = this._config.card_type === 'state' ? true : false;
        return this._config.show_attribute || defaultState;
    }

    get _show_last_updated() {
        const defaultState = this._config.card_type === 'state' ? true : false;
        return this._config.show_last_updated || defaultState;
    }

    get _attribute() {
        return this._config.attribute || false;
    }

    get _hide_backdrop() {
        return this._config.hide_backdrop || false;
    }

    get _hide_gradient() {
        return this._config.hide_gradient || false;
    }

    get _hide_play_pause_button() {
        return this._config.hide?.play_pause_button || false;
    }

    get _hide_next_button() {
        return this._config.hide?.next_button || false;
    }

    get _hide_previous_button() {
        return this._config.hide?.previous_button || false;
    }

    get _hide_volume_button() {
        return this._config.hide?.volume_button || false;
    }

    get _hide_power_button() {
        return this._config.hide?.power_button || false;
    }  

    // get _sub_button() {
    //     return {
    //         action: this._config.tap_action?.action || "more-info",
    //         navigation_path: this._config.tap_action?.navigation_path || "",
    //         url_path: this._config.tap_action?.url_path || "",
    //         service: this._config.tap_action?.service || "",
    //         target_entity: this._config.tap_action?.target?.entity_id || "",
    //         data: this._config.tap_action?.data || ""
    //     };
    // }

    get _sub_button() {
        return this._config.sub_button || '';
    }

    get _tap_action() {
        return {
            action: this._config.tap_action?.action || "more-info",
            navigation_path: this._config.tap_action?.navigation_path || "",
            url_path: this._config.tap_action?.url_path || "",
            service: this._config.tap_action?.service || "",
            target_entity: this._config.tap_action?.target?.entity_id || "",
            data: this._config.tap_action?.data || ""
        };
    }

    get _double_tap_action() {
        return {
            action: this._config.double_tap_action?.action || "toggle",
            navigation_path: this._config.double_tap_action?.navigation_path || "",
            url_path: this._config.double_tap_action?.url_path || "",
            service: this._config.double_tap_action?.service || "",
            target_entity: this._config.double_tap_action?.target?.entity_id || "",
            data: this._config.double_tap_action?.data || ""
        };
    }

    get _hold_action() {
        return {
            action: this._config.hold_action?.action || "toggle",
            navigation_path: this._config.hold_action?.navigation_path || "",
            url_path: this._config.hold_action?.url_path || "",
            service: this._config.hold_action?.service || "",
            target_entity: this._config.hold_action?.target?.entity_id || "",
            data: this._config.hold_action?.data || ""
        };
    }

    render() {
        if (!this.hass) {
            return html``;
        }

        const root = document.querySelector("body > home-assistant").shadowRoot;
        const dialog = root.querySelector("hui-dialog-edit-card").shadowRoot;
        const previewElement = dialog.querySelector("ha-dialog > div.content > div.element-preview");

        // Change the default preview element to be sticky
        if (previewElement.style.position !== 'sticky') {
            previewElement.style.position = 'sticky';
            previewElement.style.top = '0';
        }

        if (!this.listsUpdated) {
            const formateList = item => ({
                label: item,
                value: item
            });

            this.allEntitiesList = Object.keys(this.hass.states).map(formateList);

            this.lightList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "light"
            ).map(formateList);

            this.sensorList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "sensor"
            ).map(formateList);
            
            this.binarySensorList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "binary_sensor"
            ).map(formateList);

            this.coverList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "cover"
            ).map(formateList);

            this.mediaPlayerList = Object.keys(this.hass.states).filter(
                (eid) => eid.substr(0, eid.indexOf(".")) === "media_player"
            ).map(formateList);

            this.attributeList = Object.keys(this.hass.states[this._entity]?.attributes || {}).map((attributeName) => {
                let entity = this.hass.states[this._entity];
                let formattedName = this.hass.formatEntityAttributeName(entity, attributeName);
                return { label: formattedName, value: attributeName };
            });

            this.cardTypeList = [{
                    'label': 'Button (Switch, slider or state)',
                    'value': 'button'
                },
                {
                    'label': 'Cover',
                    'value': 'cover'
                },
                {
                    'label': 'Empty column',
                    'value': 'empty-column'
                },
                {
                    'label': 'Horizontal buttons stack',
                    'value': 'horizontal-buttons-stack'
                },
                {
                    'label': 'Media player',
                    'value': 'media-player'
                },
                {
                    'label': 'Pop-up',
                    'value': 'pop-up'
                },
                {
                    'label': 'Separator',
                    'value': 'separator'
                }
            ];

            this.buttonTypeList = [{
                    'label': 'Switch',
                    'value': 'switch'
                },
                {
                    'label': 'Slider',
                    'value': 'slider'
                },
                {
                    'label': 'State',
                    'value': 'state'
                }
            ];

            this.tapActionTypeList = [{
                    'label': 'More info',
                    'value': 'more-info'
                },
                {
                    'label': 'Toggle',
                    'value': 'toggle'
                },
                {
                    'label': 'Navigate',
                    'value': 'navigate'
                },
                {
                    'label': 'URL',
                    'value': 'url'
                },
                {
                    'label': 'Call service',
                    'value': 'call-service'
                },
                {
                    'label': 'No action',
                    'value': 'none'
                }
            ];

            this.listsUpdated = true;
        }

        const allEntitiesList = this.allEntitiesList;
        const lightList = this.lightList;
        const sensorList = this.sensorList;
        const coverList = this.coverList;
        const cardTypeList = this.cardTypeList;
        const buttonTypeList = this.buttonTypeList;

        if (this._config.card_type === 'pop-up') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-textfield
                        label="Hash (e.g. #kitchen)"
                        .value="${this._hash}"
                        .configValue="${"hash"}"
                        @input="${this._valueChanged}"
                    ></ha-textfield>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:dock-top"></ha-icon>
                          Header settings
                        </h4>
                        <div class="content">
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Icon", "icon")}
                            ${this.makeDropdown("Optional - Entity to toggle (e.g. room light group)", "entity", allEntitiesList)}
                            ${this.makeDropdown("Optional - Entity state to display (e.g. room temperature)", "state", allEntitiesList)}
                            <ha-textfield
                                label="Optional - Additional text"
                                .value="${this._text}"
                                .configValue="${"text"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Pop-up settings
                        </h4>
                        <div class="content">
                            <ha-textfield
                                label="Optional - Auto close in milliseconds (e.g. 15000)"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                step="1000"
                                .value="${this._auto_close}"
                                .configValue="${"auto_close"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="Optional - Close the pop-up after any click or tap">
                                <ha-switch
                                    aria-label="Optional - Close the pop-up after any click or tap"
                                    .checked=${this._close_on_click}
                                    .configValue="${"close_on_click"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Close the pop-up after any click or tap</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Update cards in background (not recommended)">
                                <ha-switch
                                    aria-label="Optional - Update cards in background (not recommended)"
                                    .checked=${this._background_update}
                                    .configValue="${"background_update"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Update cards in background (not recommended)</label> 
                                </div>
                            </ha-formfield>
                            <ha-alert alert-type="info">Background updates are only recommended if you encounter issues with certain cards within your pop-up.</ha-alert>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:bell"></ha-icon>
                          Pop-up trigger
                        </h4>
                        <div class="content">
                            <ha-alert alert-type="info">This allows you to open this pop-up based on the state of any entity, for example you can open a "Security" pop-up with a camera when a person is in front of your house. You can also create a toggle helper (input_boolean) and trigger its opening/closing in an automation.</ha-alert>
                            ${this.makeDropdown("Optional - Entity to open the pop-up based on its state", "trigger_entity", allEntitiesList)}
                            <ha-textfield
                                label="Optional - State to open the pop-up"
                                .value="${this._trigger_state}"
                                .configValue="${"trigger_state"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="Optional - Close when the state is different">
                                <ha-switch
                                    aria-label="Optional - Close when the state is different"
                                    .checked=${this._trigger_close}
                                    .configValue="${"trigger_close"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Close when the state is different</label> 
                                </div>
                            </ha-formfield>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">
                            <ha-textfield
                                label="Optional - Margin (fix centering on some themes) (e.g. 13px)"
                                .value="${this._margin}"
                                .configValue="${"margin"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Top margin on mobile (e.g. -56px if your header is hidden)"
                                .value="${this._margin_top_mobile}"
                                .configValue="${"margin_top_mobile"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Top margin on desktop (e.g. 50% for an half sized pop-up)"
                                .value="${this._margin_top_desktop}"
                                .configValue="${"margin_top_desktop"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Width on desktop (100% by default on mobile)"
                                .value="${this._width_desktop}"
                                .configValue="${"width_desktop"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="Optional - Fix when the sidebar is hidden on desktop (turn this to false if your sidebar is unmodified)">
                                <ha-switch
                                    aria-label="Optional - Fix when the sidebar is hidden on desktop (turn this to false if your sidebar is unmodified)"
                                    .checked=${this._is_sidebar_hidden}
                                    .configValue="${"is_sidebar_hidden"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Fix when the sidebar is hidden on desktop (turn this to false if your sidebar is unmodified)</label> 
                                </div>
                            </ha-formfield>
                            <ha-textfield
                                label="Optional - Background color (any hex, rgb or rgba value)"
                                .value="${this._bg_color}"
                                .configValue="${"bg_color"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Background opacity (0-100 range)"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .value="${this._bg_opacity}"
                                .configValue="${"bg_opacity"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Background/Backdrop blur (0-100 range)"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .value="${this._bg_blur}"
                                .configValue="${"bg_blur"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Shadow opacity (0-100 range)"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                max="100"
                                .configValue="${"shadow_opacity"}"
                                .value="${this._shadow_opacity}""
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="Optional - Hide pop-up backdrop (a refresh is needed)">
                                <ha-switch
                                    aria-label="Optional - Hide pop-up backdrop (a refresh is needed)"
                                    .checked=${this._hide_backdrop}
                                    .configValue="${"hide_backdrop"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide pop-up backdrop (a refresh is needed)</label> 
                                </div>
                            </ha-formfield>
                            <ha-alert alert-type="info">Set this toggle to true on the first pop-up of your main dashboard to disable the backdrop on all pop-ups.</ha-alert>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeTapActionPanel("Tap action", "tap_action")}
                            ${this.makeTapActionPanel("Double tap action", "tap_action")}
                            ${this.makeTapActionPanel("Hold action", "tap_action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-alert alert-type="info">This card allows you to convert any vertical stack into a pop-up. Each pop-up can be opened by targeting its link (e.g. '#pop-up-name'), with navigation_path or with the horizontal buttons stack that is included.<br><b>It must be placed within a vertical-stack card at the top most position to function properly. The pop-up will be hidden by default until you open it.</b></ha-alert>
                    <ha-alert alert-type="warning">Since v1.7.0, the optimized mode has been removed to ensure stability and to simplify updates for everyone. However, if your pop-up content still appears on the screen during page loading, <a style="color: #fff" href="https://github.com/Clooos/Bubble-Card#pop-up-initialization-fix">you can install this similar fix.</a></ha-alert>
                    ${this.makeVersion()}
              </div>
            `;
        } else if (this._config.card_type === 'button') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    ${this.makeDropdown("Button type", "button_type", buttonTypeList)}
                    ${this.makeDropdown(this._button_type !== 'slider' ? "Entity (toggle)" : "Entity (light or media_player)", "entity", allEntitiesList)}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Button settings
                        </h4>
                        <div class="content">                   
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Icon", "icon")}
                            ${this.makeShowState()}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeTapActionPanel("Tap action", "tap_action")}
                            ${this.makeTapActionPanel("Double tap action", "tap_action")}
                            ${this.makeTapActionPanel("Hold action", "tap_action")}
                        </div>
                    </ha-expansion-panel>
                    ${this.makeSubButtonPanel()}
                    <ha-alert alert-type="info">This card can be a slider or a button, allowing you to toggle your entities, control the brightness of your lights and the volume of your media players. To access color / control of an entity, simply tap on the icon.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config.card_type === 'separator') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-textfield
                        label="Name"
                        .value="${this._name}"
                        .configValue="${"name"}"
                        @input="${this._valueChanged}"
                    ></ha-textfield>
                    ${this.makeDropdown("Icon", "icon")}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on separator
                        </h4>
                        <div class="content">
                            ${this.makeTapActionPanel("Tap action", "tap_action")}
                            ${this.makeTapActionPanel("Double tap action", "tap_action")}
                            ${this.makeTapActionPanel("Hold action", "tap_action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-alert alert-type="info">This card is a simple separator for dividing your pop-up into categories / sections. e.g. Lights, Devices, Covers, Settings, Automations...</ha-alert>
                    ${this.makeVersion()}
              </div>
            `;
        } else if (this._config.card_type === 'horizontal-buttons-stack') {
            if (!this.buttonAdded && this.shadowRoot.querySelector("#add-button")) {
                this.buttonAdded = true;
                const addButton = this.shadowRoot.querySelector("#add-button");
                this.buttonIndex = 0;

                while (this._config[(this.buttonIndex + 1) + '_link']) {
                    this.buttonIndex++;
                }
                
                addButton.addEventListener("click", () => {
                    this.buttonIndex++;
                    
                    const originalOpacity = addButton.style.opacity;
                    const originalText = addButton.innerText;
                
                    addButton.style.opacity = '0.6';
                    addButton.style.transition = 'opacity 1s';
                    addButton.innerText = "Loading...";
                
                    setTimeout(() => {
                        addButton.style.opacity = originalOpacity;
                        addButton.innerText = originalText;
                    }, 5000);
                }, { passive: true });
            }

            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <div id="buttons-container">
                        ${this.makeButton()}
                    </div>
                    <button id="add-button">Add Button</button>
                    <ha-formfield .label="Auto order">
                        <ha-switch
                            aria-label="Toggle auto order"
                            .checked=${this._auto_order}
                            .configValue="${"auto_order"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Auto order (Presence/occupancy sensors needed)</label> 
                        </div>
                    </ha-formfield>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content">  
                            <ha-textfield
                                label="Optional - Margin (fix centering on some themes) (e.g. 13px)"
                                .value="${this._margin}"
                                .configValue="${"margin"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Width on desktop (100% by default on mobile)"
                                .value="${this._width_desktop}"
                                .configValue="${"width_desktop"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-formfield .label="Optional - Fix when the sidebar hidden on desktop">
                                <ha-switch
                                    aria-label="Optional - Fix when the sidebar hidden on desktop"
                                    .checked=${this._is_sidebar_hidden}
                                    .configValue="${"is_sidebar_hidden"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Fix when the sidebar is hidden on desktop</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Rise animation (Displays an animation once the page has loaded)">
                                <ha-switch
                                    aria-label="Optional - Rise animation (Displays an animation once the page has loaded)"
                                    .checked=${this._rise_animation}
                                    .configValue="${"rise_animation"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Rise animation (Displays an animation once the page has loaded)</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Highlight current hash / view">
                                <ha-switch
                                    aria-label="Optional - Highlight current hash / view"
                                    .checked=${this._highlight_current_view}
                                    .configValue="${"highlight_current_view"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Highlight current hash / view</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide gradient">
                                <ha-switch
                                    aria-label="Optional - Hide gradient"
                                    .checked=${this._hide_gradient}
                                    .configValue="${"hide_gradient"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide gradient</label> 
                                </div>
                            </ha-formfield>
                        </div>
                    </ha-expansion-panel>
                    <ha-alert alert-type="info">This card is the companion to the pop-up card, allowing you to open the corresponding pop-ups. It also allows you to open any page of your dashboard. In addition, you can add your motion sensors so that the order of the buttons adapts according to the room you just entered. This card is scrollable, remains visible and acts as a footer.<br><br><b>Please note that this card may take some time to load in edit mode.</b></ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config.card_type === 'cover') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    ${this.makeDropdown("Entity", "entity", coverList)}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Cover settings
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name || ''}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Open icon", "icon_open")}
                            ${this.makeDropdown("Optional - Closed icon", "icon_close")}
                            ${this.makeShowState()}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:window-shutter-cog"></ha-icon>
                          Custom services
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="Optional - Open service (cover.open_cover by default)"
                                .value="${this._open_service}"
                                .configValue="${"open_service"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Stop service (cover.stop_cover by default)"
                                .value="${this._stop_service}"
                                .configValue="${"stop_service"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Close service (cover.close_cover by default)"
                                .value="${this._close_service}"
                                .configValue="${"close_service"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:palette"></ha-icon>
                          Styling options
                        </h4>
                        <div class="content"> 
                            ${this.makeDropdown("Optional - Arrow down icon", "icon_down")}
                            ${this.makeDropdown("Optional - Arrow up icon", "icon_up")}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeTapActionPanel("Tap action", "tap_action")}
                            ${this.makeTapActionPanel("Double tap action", "tap_action")}
                            ${this.makeTapActionPanel("Hold action", "tap_action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-alert alert-type="info">This card allows you to control your covers.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config.card_type === 'media-player') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    ${this.makeDropdown("Entity", "entity", this.mediaPlayerList)}
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:cog"></ha-icon>
                          Media player settings
                        </h4>
                        <div class="content"> 
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._name || ''}"
                                .configValue="${"name"}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            ${this.makeDropdown("Optional - Icon", "icon")}
                            ${this.makeShowState()}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:eye-off"></ha-icon>
                          Display/hide buttons
                        </h4>
                        <div class="content"> 
                            <ha-formfield .label="Optional - Hide play/pause button">
                                <ha-switch
                                    aria-label="Optional - Hide play/pause button"
                                    .checked=${this._hide_play_pause_button}
                                    .configValue="${"hide.play_pause_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide play/pause button</label> 
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide volume button">
                                <ha-switch
                                    aria-label="Optional - Hide volume button"
                                    .checked=${this._hide_volume_button}
                                    .configValue="${"hide.volume_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide volume button</label>
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide next button">
                                <ha-switch
                                    aria-label="Optional - Hide next button"
                                    .checked=${this._hide_next_button}
                                    .configValue="${"hide.next_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide next button</label>
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide previous button">
                                <ha-switch
                                    aria-label="Optional - Hide previous button"
                                    .checked=${this._hide_previous_button}
                                    .configValue="${"hide.previous_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide previous button</label>
                                </div>
                            </ha-formfield>
                            <ha-formfield .label="Optional - Hide power button">
                                <ha-switch
                                    aria-label="Optional - Hide power button"
                                    .checked=${this._hide_power_button}
                                    .configValue="${"hide.power_button"}"
                                    @change=${this._valueChanged}
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Hide power button</label>
                                </div>
                            </ha-formfield>
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on icon
                        </h4>
                        <div class="content">
                            ${this.makeTapActionPanel("Tap action", "tap_action")}
                            ${this.makeTapActionPanel("Double tap action", "tap_action")}
                            ${this.makeTapActionPanel("Hold action", "tap_action")}
                        </div>
                    </ha-expansion-panel>
                    <ha-alert alert-type="info">This card allows you to control a media player. You can tap on the icon to get more control.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (this._config.card_type === 'empty-column') {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <h3>Empty column</h3>
                    <ha-alert alert-type="info">Just an empty card to fill any empty column.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `;
        } else if (!this._config.card_type) {
            return html`
                <div class="card-config">
                    ${this.makeDropdown("Card type", "card_type", cardTypeList)}
                    <ha-alert alert-type="info">You need to add a card type first.</ha-alert>
                    <img style="width: 100%" src="https://user-images.githubusercontent.com/36499953/268039672-6dd13476-42c5-427c-a4d8-ad4981fc2db7.gif">
                    <p>The <b>Bubble Card ${version}</b> changelog is available <a href="https://github.com/Clooos/Bubble-Card/releases/tag/${version}"><b>here</b></a>.
                    <br/><br/><ha-alert alert-type="info"><b>Column fix</b>: If you experience some issues with your dashboard layout, such as empty columns or misaligned cards. You can apply a fix that restores the behavior of the previous versions by adding <code>column_fix: true</code> in YAML to the <b>first</b> Bubble Card on your dashboard. You can also try to add a negative value to find the one that fit your dashboard like <code>column_fix: -10</code>. Then refresh the page.</ha-alert>
                    <hr />
                    <p>Almost everything is available in the GUI editor, but in the YAML editor you can add your own <b>custom styles</b>, create <b>custom buttons</b> or modify the <b>tap actions</b> of all cards. You can find more details on my GitHub page.</p>
                    <a href="https://github.com/Clooos/Bubble-Card"><img src="https://img.shields.io/badge/GitHub-Documentation-blue?logo=github"></a>
                    <hr />
                    <p>And if you like my project and want to support me, please consider making a donation. Any amount is welcome and very much appreciated! 🍻</p>
                    <div style="display: inline-block;">
                        <a href="https://www.buymeacoffee.com/clooos"><img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20beer-yellow?logo=buy-me-a-coffee"></a> 
                        <a href="https://www.paypal.com/donate/?business=MRVBV9PLT9ZPL&no_recurring=0&item_name=Hi%2C+I%27m+Clooos+the+creator+of+Bubble+Card.+Thank+you+for+supporting+me+and+my+passion.+You+are+awesome%21+%F0%9F%8D%BB&currency_code=EUR"><img src="https://img.shields.io/badge/Donate-PayPal-blue?logo=paypal"></img></a>
                    </div>
                    ${this.makeVersion()}
                </div>
            `;
        }
    }

    makeShowState(context = this._config, config = '', subButton = false) {
        const entity = context?.entity ?? this._config.entity ?? '';
        const isDefault = context === this._config;

        const attributeList = Object.keys(this.hass.states[entity]?.attributes || {}).map((attributeName) => {
            let state = this.hass.states[entity];
            let formattedName = this.hass.formatEntityAttributeName(state, attributeName);
            return { label: formattedName, value: attributeName };
        });

        //const attributeList = isDefault ? this.attributeList : attributeList;

        return html`
            ${subButton ? html`
                <ha-formfield .label="Optional - Show background when entity is on">
                    <ha-switch
                        aria-label="Optional - Show background when entity is on"
                        .checked=${context?.show_background}
                        .configValue="${config + "show_background"}"
                        @change=${this._valueChanged}
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Show background when entity is on</label> 
                    </div>
                </ha-formfield>
            ` : ''}
            <ha-formfield .label="Optional - Show icon">
                <ha-switch
                    aria-label="Optional - Show icon"
                    .checked=${context?.show_icon ?? true}
                    .configValue="${config + "show_icon"}"
                    @change=${this._valueChanged}
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show icon</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="Optional - Show name">
                <ha-switch
                    aria-label="Optional - Show name"
                    .checked=${context?.show_name || isDefault ? 
                        true : 
                        false
                    }
                    .configValue="${config + "show_name"}"
                    @change=${this._valueChanged}
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show name</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="Optional - Show entity state">
                <ha-switch
                    aria-label="Optional - Show entity state"
                    .checked="${context?.show_state}"
                    .configValue="${config + "show_state"}"
                    @change=${this._valueChanged}
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show entity state</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="Optional - Show last updated">
                <ha-switch
                    aria-label="Optional - Show last updated"
                    .checked=${context?.show_last_updated}
                    .configValue="${config + "show_last_updated"}"
                    @change=${this._valueChanged}
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show last updated</label> 
                </div>
            </ha-formfield>
            <ha-formfield .label="Optional - Show attribute">
                <ha-switch
                    aria-label="Optional - Show attribute"
                    .checked=${context?.show_attribute}
                    .configValue="${config + "show_attribute"}"
                    @change=${this._valueChanged}
                ></ha-switch>
                <div class="mdc-form-field">
                    <label class="mdc-label">Optional - Show attribute</label> 
                </div>
            </ha-formfield>
            ${context?.show_attribute ? html`
                <div class="ha-combo-box">
                    <ha-combo-box
                        label="Optional - Attribute to show"
                        .value="${context?.attribute}"
                        .configValue="${config + "attribute"}"
                        .items="${attributeList}"
                        @value-changed="${this._valueChanged}"
                    ></ha-combo-box>
                </div>
            ` : ''}
        `;
    }

    makeDropdown(label, configValue, items) {
        if (label.includes('icon') || label.includes('Icon')) {
            return html`
                <div class="ha-icon-picker">
                    <ha-icon-picker
                        label="${label}"
                        .value="${this['_' + configValue]}"
                        .configValue="${configValue}"
                        item-label-path="label"
                        item-value-path="value"
                        @value-changed="${this._valueChanged}"
                    ></ha-icon-picker>
                </div>
            `;
        } else {
            return html`
            <div class="ha-combo-box">
                <ha-combo-box
                    label="${label}"
                    .value="${this['_' + configValue]}"
                    .configValue="${configValue}"
                    .items="${items}"
                    @value-changed="${this._valueChanged}"
                ></ha-combo-box>
            </div>
          `;
        }
    }

    makeTapActionPanel(label, configValue, context = this._config, config = '') {
        const hass = this.hass;
        const icon = label === "Tap action" 
            ? "mdi:gesture-tap" 
            : label === "Double tap action" 
            ? "mdi:gesture-double-tap"
            : "mdi:gesture-tap-hold";
        const valueType = label === "Tap action" 
            ? this._tap_action 
            : label === "Double tap action" 
            ? this._double_tap_action
            : this._hold_action;
        const configValueType = label === "Tap action" 
            ? "tap_action"
            : label === "Double tap action" 
            ? "double_tap_action"
            : "hold_action";
        const isDefault = context === this._config;
        const defaultAction = isDefault && label === "Tap action" 
            ? "more-info"
            : isDefault 
            ? "toggle"
            : '';
  
        return html`
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="${icon}"></ha-icon>
                    ${label}
                </h4>
                <div class="content"> 
                    <div class="ha-combo-box">
                        <ha-combo-box
                            label="${label}"
                            .value="${context?.valueType?.action || defaultAction}"
                            .configValue="${config + configValueType}.action"
                            .items="${this.tapActionTypeList}"
                            @value-changed="${this._valueChanged}"
                        ></ha-combo-box>
                    </div>
                    ${valueType.action === 'navigate' ? html`
                        <div class="ha-textfield">
                            <ha-textfield
                                label="Navigation path"
                                .value="${context?.valueType?.navigation_path}"
                                .configValue="${config + configValueType}.navigation_path"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                        </div>
                    ` : ''}
                    ${valueType.action === 'url' ? html`
                        <div class="ha-textfield">
                            <ha-textfield
                                label="URL path"
                                .value="${context?.valueType?.url_path}"
                                .configValue="${config + configValueType}.url_path"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                        </div>
                    ` : ''}
                    ${valueType.action === 'call-service' ? html`
                        <div class="ha-textfield">
                            <ha-textfield
                                label="Service"
                                .value="${context?.valueType?.service}"
                                .configValue="${config + configValueType}.service"
                                .items="${""}"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                        </div>
                        <div class="ha-combo-box">
                            <ha-combo-box
                                label="Entity"
                                .value="${context?.valueType?.target_entity}"
                                .configValue="${config + configValueType}.target.entity_id"
                                .items="${this.allEntitiesList}"
                                @value-changed="${this._valueChanged}"
                            ></ha-combo-box>
                        </div>
                    ` : ''}
                    ${context?.valueType?.action === 'call-service' && context?.valueType?.service ? html`
                        <ha-alert alert-type="info">For now, you still need to switch to the YAML editor if you want to add <code>data:</code> to your service.</ha-alert>
                    ` : ''}
                </div>
            </ha-expansion-panel>
        `;

        function filteredServices(localize, services, filter) {
          if (!services) {
            return [];
          }
          const processedServices = this._services(localize, services);

          if (!filter) {
            return processedServices;
          }
          const split_filter = filter.split(" ");
          return processedServices.filter((service) => {
            const lower_service_name = service.name.toLowerCase();
            const lower_service = service.service.toLowerCase();
            return split_filter.every(
              (f) => lower_service_name.includes(f) || lower_service.includes(f)
            );
          });
        }
    }

    // makeSubButtonPanel() {
    //   const subButtonElements = this._config?.sub_button?.map((subButton, index) => {
    //     if (!subButton) {
    //       return;
    //     }

    //     const subButtonIndex = 'sub_button.' + index + '.';

    //     return html`
    //         <ha-expansion-panel outlined>
    //             <h4 slot="header">
    //                 <ha-icon icon="mdi:border-radius"></ha-icon>
    //                 ${subButton.position ? "Button " + subButton.position : "New button"}
    //             </h4>
    //             <div class="content">
    //                 <div class="ha-textfield">
    //                     <ha-textfield
    //                         label="Button position"
    //                         .value="${subButton.position ?? index}"
    //                         .configValue="sub_button.${index}.position"
    //                         .items="${""}"
    //                         @input="${this._valueChanged}"
    //                     ></ha-textfield>
    //                 </div>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                         <ha-icon icon="mdi:cog"></ha-icon>
    //                         Button settings
    //                     </h4>
    //                     <div class="content"> 
    //                         <div class="ha-combo-box">
    //                             <ha-combo-box
    //                                 label="${"Optional - Entity (default to card entity)"}"
    //                                 .value="${subButton.entity ?? this._config.entity}"
    //                                 .configValue="sub_button.${index}.entity"
    //                                 .items="${this.allEntitiesList}"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-combo-box>
    //                         </div>
    //                         <div class="ha-textfield">
    //                             <ha-textfield
    //                                 label="Optional - Name"
    //                                 .value="${subButton.name ?? ''}"
    //                                 .configValue="sub_button.${index}.name"
    //                                 .items="${""}"
    //                                 @input="${this._valueChanged}"
    //                             ></ha-textfield>
    //                         </div>
    //                         <div class="ha-icon-picker">
    //                             <ha-icon-picker
    //                                 label="Optional - Icon"
    //                                 .value="${subButton.icon}"
    //                                 .configValue="sub_button.${index}.icon"
    //                                 item-label-path="label"
    //                                 item-value-path="value"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-icon-picker>
    //                         </div>
    //                         ${this.makeShowState(subButton, subButtonIndex, true, true)}
    //                     </div>
    //                 </ha-expansion-panel>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                       <ha-icon icon="mdi:gesture-tap"></ha-icon>
    //                       Tap action on button
    //                     </h4>
    //                     <div class="content">
    //                         ${this.makeTapActionPanel("Tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Double tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Hold action", "tap_action", subButton, subButtonIndex)}
    //                     </div>
    //                 </ha-expansion-panel>
    //             </div>
    //         </ha-expansion-panel>
    //     `;
    //   });

    //   // Retourne un panneau d'expansion contenant tous les sub-buttons
    //   return html`
    //     <ha-expansion-panel outlined>
    //       <h4 slot="header">
    //         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
    //         Sub buttons editor
    //       </h4>
    //       <div class="content">
    //         ${subButtonElements}
    //         <button @click="">Ajouter un sub-button</button>
    //       </div>
    //     </ha-expansion-panel>
    //   `;
    // }

    // makeSubButtonPanel() {
    //   const subButtonElements = this._config?.sub_button?.map((subButton, index) => {
    //     if (!subButton) {
    //       return;
    //     }

    //     const subButtonIndex = 'sub_button.' + index + '.';

    //     return html`
    //         <ha-expansion-panel outlined>
    //             <h4 slot="header">
    //                 <ha-icon icon="mdi:border-radius"></ha-icon>
    //                 ${subButton.position ? "Button " + subButton.position : "New button"}
    //             </h4>
    //             <div class="content">
    //                 <div class="ha-textfield">
    //                     <ha-textfield
    //                         label="Button position"
    //                         .value="${subButton.position ?? index}"
    //                         .configValue="sub_button.${index}.position"
    //                         .items="${""}"
    //                         @input="${this._valueChanged}"
    //                     ></ha-textfield>
    //                 </div>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                         <ha-icon icon="mdi:cog"></ha-icon>
    //                         Button settings
    //                     </h4>
    //                     <div class="content"> 
    //                         <div class="ha-combo-box">
    //                             <ha-combo-box
    //                                 label="${"Optional - Entity (default to card entity)"}"
    //                                 .value="${subButton.entity ?? this._config.entity}"
    //                                 .configValue="sub_button.${index}.entity"
    //                                 .items="${this.allEntitiesList}"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-combo-box>
    //                         </div>
    //                         <div class="ha-textfield">
    //                             <ha-textfield
    //                                 label="Optional - Name"
    //                                 .value="${subButton.name ?? ''}"
    //                                 .configValue="sub_button.${index}.name"
    //                                 .items="${""}"
    //                                 @input="${this._valueChanged}"
    //                             ></ha-textfield>
    //                         </div>
    //                         <div class="ha-icon-picker">
    //                             <ha-icon-picker
    //                                 label="Optional - Icon"
    //                                 .value="${subButton.icon}"
    //                                 .configValue="sub_button.${index}.icon"
    //                                 item-label-path="label"
    //                                 item-value-path="value"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-icon-picker>
    //                         </div>
    //                         ${this.makeShowState(subButton, subButtonIndex, true, true)}
    //                     </div>
    //                 </ha-expansion-panel>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                       <ha-icon icon="mdi:gesture-tap"></ha-icon>
    //                       Tap action on button
    //                     </h4>
    //                     <div class="content">
    //                         ${this.makeTapActionPanel("Tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Double tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Hold action", "tap_action", subButton, subButtonIndex)}
    //                     </div>
    //                 </ha-expansion-panel>
    //             </div>
    //         </ha-expansion-panel>
    //     `;
    //   });

    //   const addSubButton = () => {
    //     const newSubButton = {
    //       position: this._config.sub_button.length + 1,
    //       entity: this._config.entity,
    //       name: '',
    //       icon: ''
    //     };

    //     this._config.sub_button.push(newSubButton);

    //     this.requestUpdate();
    //   };

    //   // Return full panel for all sub-buttons
    //   return html`
    //     <ha-expansion-panel outlined>
    //       <h4 slot="header">
    //         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
    //         Sub buttons editor
    //       </h4>
    //       <div class="content">
    //         ${subButtonElements}
    //         <button @click="${addSubButton}">New sub button</button>
    //       </div>
    //     </ha-expansion-panel>
    //   `;
    // }

    // makeSubButtonPanel() {
    //   const subButtonElements = this._config?.sub_button?.map((subButton, index) => {
    //     if (!subButton) {
    //       return;
    //     }

    //     const subButtonIndex = 'sub_button.' + index + '.';

    //     // Function to remove this sub-button
    //     const removeSubButton = () => {
    //       // Remove the subButton from the specific index of the array
    //       this._config.sub_button.splice(index, 1);

    //       // Force the component to update to display the remaining buttons
    //       this.requestUpdate();
    //     };

    //     return html`
    //         <ha-expansion-panel outlined>
    //             <h4 slot="header">
    //                 <ha-icon icon="mdi:border-radius"></ha-icon>
    //                 ${subButton.position ? "Button " + subButton.position : "New button"}
    //                 <button class="icon-button delete" @click="${removeSubButton}">
    //                   <ha-icon icon="mdi:delete"></ha-icon>
    //                 </button>
    //             </h4>
    //             <div class="content">
    //                 <div class="ha-textfield">
    //                     <ha-textfield
    //                         label="Button position"
    //                         .value="${subButton.position ?? index}"
    //                         .configValue="sub_button.${index}.position"
    //                         .items="${""}"
    //                         @input="${this._valueChanged}"
    //                     ></ha-textfield>
    //                 </div>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                         <ha-icon icon="mdi:cog"></ha-icon>
    //                         Button settings
    //                     </h4>
    //                     <div class="content"> 
    //                         <div class="ha-combo-box">
    //                             <ha-combo-box
    //                                 label="${"Optional - Entity (default to card entity)"}"
    //                                 .value="${subButton.entity ?? this._config.entity}"
    //                                 .configValue="sub_button.${index}.entity"
    //                                 .items="${this.allEntitiesList}"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-combo-box>
    //                         </div>
    //                         <div class="ha-textfield">
    //                             <ha-textfield
    //                                 label="Optional - Name"
    //                                 .value="${subButton.name ?? ''}"
    //                                 .configValue="sub_button.${index}.name"
    //                                 .items="${""}"
    //                                 @input="${this._valueChanged}"
    //                             ></ha-textfield>
    //                         </div>
    //                         <div class="ha-icon-picker">
    //                             <ha-icon-picker
    //                                 label="Optional - Icon"
    //                                 .value="${subButton.icon}"
    //                                 .configValue="sub_button.${index}.icon"
    //                                 item-label-path="label"
    //                                 item-value-path="value"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-icon-picker>
    //                         </div>
    //                         ${this.makeShowState(subButton, subButtonIndex, true, true)}
    //                     </div>
    //                 </ha-expansion-panel>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                       <ha-icon icon="mdi:gesture-tap"></ha-icon>
    //                       Tap action on button
    //                     </h4>
    //                     <div class="content">
    //                         ${this.makeTapActionPanel("Tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Double tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Hold action", "tap_action", subButton, subButtonIndex)}
    //                     </div>
    //                 </ha-expansion-panel>
    //             </div>
    //         </ha-expansion-panel>
    //     `;
    //   });

    //   const addSubButton = () => {
    //     const newSubButton = {
    //       position: this._config.sub_button.length + 1,
    //       entity: this._config.entity,
    //       name: '',
    //       icon: ''
    //     };

    //     this._config.sub_button.push(newSubButton);

    //     this.requestUpdate();
    //   };

    //   // Return full panel for all sub-buttons
    //   return html`
    //     <ha-expansion-panel outlined>
    //       <h4 slot="header">
    //         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
    //         Sub buttons editor
    //       </h4>
    //       <div class="content">
    //         ${subButtonElements}
    //         <button class="icon-button" @click="${addSubButton}">
    //           <ha-icon icon="mdi:plus"></ha-icon>
    //           New sub button
    //         </button>
    //       </div>
    //     </ha-expansion-panel>
    //   `;
    // }

    // makeSubButtonPanel() {
    //   // Sort the sub_buttons array by the 'position' property
    //   const sortedSubButtons = this._config?.sub_button?.sort((a, b) => a.position - b.position);

    //   const subButtonElements = sortedSubButtons?.map((subButton, index) => {
    //     if (!subButton) {
    //       return;
    //     }

    //     const subButtonIndex = 'sub_button.' + index + '.';

    //     // Function to remove this sub-button
    //     const removeSubButton = () => {
    //       // Remove the subButton from the specific index of the array
    //       this._config.sub_button.splice(index, 1);

    //       // Force the component to update to display the remaining buttons
    //       this.requestUpdate();
    //     };

    //     return html`
    //         <ha-expansion-panel outlined>
    //             <h4 slot="header">
    //                 <ha-icon icon="mdi:border-radius"></ha-icon>
    //                 ${subButton.position ? "Button " + subButton.position : "New button"}
    //                 <button class="icon-button delete" @click="${removeSubButton}">
    //                   <ha-icon icon="mdi:delete"></ha-icon>
    //                 </button>
    //             </h4>
    //             <div class="content">
    //                 <ha-textfield
    //                     label="Button position"
    //                     type="number"
    //                     inputMode="numeric"
    //                     min="1"
    //                     .value="${subButton.position}"
    //                     .configValue="sub_button.${index}.position"
    //                     @input="${this._valueChanged}"
    //                 ></ha-textfield>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                         <ha-icon icon="mdi:cog"></ha-icon>
    //                         Button settings
    //                     </h4>
    //                     <div class="content"> 
    //                         <div class="ha-combo-box">
    //                             <ha-combo-box
    //                                 label="${"Optional - Entity (default to card entity)"}"
    //                                 .value="${subButton.entity ?? this._config.entity}"
    //                                 .configValue="sub_button.${index}.entity"
    //                                 .items="${this.allEntitiesList}"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-combo-box>
    //                         </div>
    //                         <div class="ha-textfield">
    //                             <ha-textfield
    //                                 label="Optional - Name"
    //                                 .value="${subButton.name ?? ''}"
    //                                 .configValue="sub_button.${index}.name"
    //                                 .items="${""}"
    //                                 @input="${this._valueChanged}"
    //                             ></ha-textfield>
    //                         </div>
    //                         <div class="ha-icon-picker">
    //                             <ha-icon-picker
    //                                 label="Optional - Icon"
    //                                 .value="${subButton.icon}"
    //                                 .configValue="sub_button.${index}.icon"
    //                                 item-label-path="label"
    //                                 item-value-path="value"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-icon-picker>
    //                         </div>
    //                         ${this.makeShowState(subButton, subButtonIndex, true, true)}
    //                     </div>
    //                 </ha-expansion-panel>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                       <ha-icon icon="mdi:gesture-tap"></ha-icon>
    //                       Tap action on button
    //                     </h4>
    //                     <div class="content">
    //                         ${this.makeTapActionPanel("Tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Double tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Hold action", "tap_action", subButton, subButtonIndex)}
    //                     </div>
    //                 </ha-expansion-panel>
    //             </div>
    //         </ha-expansion-panel>
    //     `;
    //   });

    //   const addSubButton = () => {
    //     const newSubButton = {
    //       position: this._config.sub_button.length + 1,
    //       entity: this._config.entity,
    //       name: '',
    //       icon: ''
    //     };

    //     this._config.sub_button.push(newSubButton);

    //     this.requestUpdate();
    //   };

    //   // Return full panel for all sub-buttons
    //   return html`
    //     <ha-expansion-panel outlined>
    //       <h4 slot="header">
    //         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
    //         Sub buttons editor
    //       </h4>
    //       <div class="content">
    //         ${subButtonElements}
    //         <button class="icon-button" @click="${addSubButton}">
    //           <ha-icon icon="mdi:plus"></ha-icon>
    //           New sub button
    //         </button>
    //       </div>
    //     </ha-expansion-panel>
    //   `;
    // }

    // makeSubButtonPanel() {
    //   // Sort the sub_buttons array by the 'position' property
    //   const sortedSubButtons = this._config?.sub_button?.sort((a, b) => a.position - b.position);

    //   const subButtonElements = sortedSubButtons?.map((subButton, index) => {
    //     if (!subButton) {
    //       return;
    //     }

    //     const subButtonIndex = 'sub_button.' + index + '.';

    //     // Function to remove this sub-button
    //     const removeSubButton = () => {
    //       this._config.sub_button.splice(index, 1);
    //       this.requestUpdate();
    //     };

    //     // Function to move this sub-button up
    //     const moveSubButtonUp = () => {
    //       if (index > 0) {
    //         const temp = this._config.sub_button[index - 1];
    //         this._config.sub_button[index - 1] = subButton;
    //         this._config.sub_button[index] = temp;
    //         this.requestUpdate();
    //       }
    //     };

    //     // Function to move this sub-button down
    //     const moveSubButtonDown = () => {
    //       if (index < this._config.sub_button.length - 1) {
    //         const temp = this._config.sub_button[index + 1];
    //         this._config.sub_button[index + 1] = subButton;
    //         this._config.sub_button[index] = temp;
    //         this.requestUpdate();
    //       }
    //     };

    //     return html`
    //         <ha-expansion-panel outlined>
    //             <h4 slot="header">
    //                 <ha-icon icon="mdi:border-radius"></ha-icon>
    //                 ${subButton.position ? "Button " + subButton.position : "New button"}
    //                 <button class="icon-button delete" @click="${removeSubButton}">
    //                   <ha-icon icon="mdi:delete"></ha-icon>
    //                 </button>
    //                 <button class="icon-button move-up" @click="${moveSubButtonUp}">
    //                   <ha-icon icon="mdi:arrow-up"></ha-icon>
    //                 </button>
    //                 <button class="icon-button move-down" @click="${moveSubButtonDown}">
    //                   <ha-icon icon="mdi:arrow-down"></ha-icon>
    //                 </button>
    //             </h4>
    //             <div class="content">
    //                 <ha-textfield
    //                     label="Button position"
    //                     type="number"
    //                     inputMode="numeric"
    //                     min="1"
    //                     .value="${subButton.position}"
    //                     .configValue="sub_button.${index}.position"
    //                     @input="${this._valueChanged}"
    //                 ></ha-textfield>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                         <ha-icon icon="mdi:cog"></ha-icon>
    //                         Button settings
    //                     </h4>
    //                     <div class="content"> 
    //                         <div class="ha-combo-box">
    //                             <ha-combo-box
    //                                 label="${"Optional - Entity (default to card entity)"}"
    //                                 .value="${subButton.entity ?? this._config.entity}"
    //                                 .configValue="sub_button.${index}.entity"
    //                                 .items="${this.allEntitiesList}"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-combo-box>
    //                         </div>
    //                         <div class="ha-textfield">
    //                             <ha-textfield
    //                                 label="Optional - Name"
    //                                 .value="${subButton.name ?? ''}"
    //                                 .configValue="sub_button.${index}.name"
    //                                 .items="${""}"
    //                                 @input="${this._valueChanged}"
    //                             ></ha-textfield>
    //                         </div>
    //                         <div class="ha-icon-picker">
    //                             <ha-icon-picker
    //                                 label="Optional - Icon"
    //                                 .value="${subButton.icon}"
    //                                 .configValue="sub_button.${index}.icon"
    //                                 item-label-path="label"
    //                                 item-value-path="value"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-icon-picker>
    //                         </div>
    //                         ${this.makeShowState(subButton, subButtonIndex, true, true)}
    //                     </div>
    //                 </ha-expansion-panel>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                       <ha-icon icon="mdi:gesture-tap"></ha-icon>
    //                       Tap action on button
    //                     </h4>
    //                     <div class="content">
    //                         ${this.makeTapActionPanel("Tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Double tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Hold action", "tap_action", subButton, subButtonIndex)}
    //                     </div>
    //                 </ha-expansion-panel>
    //             </div>
    //         </ha-expansion-panel>
    //     `;
    //   });

    //   const addSubButton = () => {
    //     const newSubButton = {
    //       position: this._config.sub_button.length + 1,
    //       entity: this._config.entity,
    //       name: '',
    //       icon: ''
    //     };

    //     this._config.sub_button.push(newSubButton);

    //     this.requestUpdate();
    //   };

    //   // Return full panel for all sub-buttons
    //   return html`
    //     <ha-expansion-panel outlined>
    //       <h4 slot="header">
    //         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
    //         Sub buttons editor
    //       </h4>
    //       <div class="content">
    //         ${subButtonElements}
    //         <button class="icon-button" @click="${addSubButton}">
    //           <ha-icon icon="mdi:plus"></ha-icon>
    //           New sub button
    //         </button>
    //       </div>
    //     </ha-expansion-panel>
    //   `;
    // }

    // makeSubButtonPanel() {
    //   // Sort the sub_buttons array by the 'position' property
    //   const sortedSubButtons = this._config?.sub_button?.sort((a, b) => a.position - b.position);

    //   const subButtonElements = sortedSubButtons?.map((subButton, index) => {
    //     if (!subButton) {
    //       return;
    //     }

    //     const subButtonIndex = 'sub_button.' + index + '.';

    //     // Function to remove this sub-button
    //     const removeSubButton = () => {
    //       // Remove the subButton from the specific index of the array
    //       this._config.sub_button.splice(index, 1);

    //       // Update the position property of the remaining sub-buttons
    //       this._config.sub_button.forEach((subButton, i) => {
    //         subButton.position = i + 1;
    //       });

    //       // Force the component to update to display the remaining buttons
    //       this.requestUpdate();
    //     };

    //     // Function to move this sub-button up
    //     const moveSubButtonUp = (event) => {
    //       event.stopPropagation(); // Stop event propagation
    //       console.log("Up")
    //       if (index > 0) {
    //         // Swap the position property of this sub-button and the one above it
    //         [subButton.position, this._config.sub_button[index - 1].position] = [this._config.sub_button[index - 1].position, subButton.position];

    //         // Sort the sub_buttons array by the 'position' property
    //         this._config.sub_button.sort((a, b) => a.position - b.position);

    //         // Force the component to update to display the buttons in the new order
    //         this.requestUpdate();
    //       }
    //     };

    //     // Function to move this sub-button down
    //     const moveSubButtonDown = (event) => {
    //       event.stopPropagation(); // Stop event propagation
    //       console.log("Down")
    //       if (index < this._config.sub_button.length - 1) {
    //         // Swap the position property of this sub-button and the one below it
    //         [subButton.position, this._config.sub_button[index + 1].position] = [this._config.sub_button[index + 1].position, subButton.position];

    //         // Sort the sub_buttons array by the 'position' property
    //         this._config.sub_button.sort((a, b) => a.position - b.position);

    //         // Force the component to update to display the buttons in the new order
    //         this.requestUpdate();
    //       }
    //     };

    //     return html`
    //         <ha-expansion-panel outlined>
    //             <h4 slot="header">
    //                 <ha-icon icon="mdi:border-radius"></ha-icon>
    //                 ${subButton.position ? "Button " + subButton.position : "New button"}
    //                 <button class="icon-button header" @click="${removeSubButton}">
    //                   <ha-icon icon="mdi:delete"></ha-icon>
    //                 </button>
    //                 <button class="icon-button header" @click="${moveSubButtonUp}">
    //                   <ha-icon icon="mdi:arrow-up"></ha-icon>
    //                 </button>
    //                 <button class="icon-button header" @click="${moveSubButtonDown}">
    //                   <ha-icon icon="mdi:arrow-down"></ha-icon>
    //                 </button>
    //             </h4>
    //             <!-- The rest of your code... -->
    //         </ha-expansion-panel>
    //     `;
    //   });

    //   const addSubButton = () => {
    //     const newSubButton = {
    //       position: this._config.sub_button.length + 1,
    //       entity: this._config.entity,
    //       name: '',
    //       icon: ''
    //     };

    //     this._config.sub_button.push(newSubButton);

    //     this.requestUpdate();
    //   };

    //   // Return full panel for all sub-buttons
    //   return html`
    //     <ha-expansion-panel outlined>
    //       <h4 slot="header">
    //         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
    //         Sub buttons editor
    //       </h4>
    //       <div class="content">
    //         ${subButtonElements}
    //         <button class="icon-button" @click="${addSubButton}">
    //           <ha-icon icon="mdi:plus"></ha-icon>
    //           New sub button
    //         </button>
    //       </div>
    //     </ha-expansion-panel>
    //   `;
    // }

    // makeSubButtonPanel() {
    //   // Sort the sub_buttons array by the 'position' property
    //   const sortedSubButtons = this._config?.sub_button?.sort((a, b) => a.position - b.position);

    //   const subButtonElements = sortedSubButtons?.map((subButton, index) => {
    //     if (!subButton) {
    //       return;
    //     }

    //     const subButtonIndex = 'sub_button.' + index + '.';

    //     // Function to remove this sub-button
    //     const removeSubButton = () => {
    //       // Remove the subButton from the specific index of the array
    //       this._config.sub_button.splice(index, 1);

    //       // Update the position property of the remaining sub-buttons
    //       this._config.sub_button.forEach((subButton, i) => {
    //         subButton.position = i + 1;
    //       });

    //       // Force the component to update to display the remaining buttons
    //       this.requestUpdate();
    //     };

    //     // Function to move this sub-button up
    //     const moveSubButtonUp = (event) => {
    //       event.stopPropagation(); // Stop event propagation

    //       if (index > 0) {
    //         // Swap the position property of this sub-button and the one above it
    //         [subButton.position, this._config.sub_button[index - 1].position] = [this._config.sub_button[index - 1].position, subButton.position];

    //         // Trigger the valueChanged function for both sub-buttons
    //         this._valueChanged({ target: { configValue: `sub_button.${index}.position`, value: subButton.position } });
    //         this._valueChanged({ target: { configValue: `sub_button.${index - 1}.position`, value: this._config.sub_button[index - 1].position } });
    //       }
    //     };

    //     // Function to move this sub-button down
    //     const moveSubButtonDown = (event) => {
    //       event.stopPropagation(); // Stop event propagation

    //       if (index < this._config.sub_button.length - 1) {
    //         // Swap the position property of this sub-button and the one below it
    //         [subButton.position, this._config.sub_button[index + 1].position] = [this._config.sub_button[index + 1].position, subButton.position];

    //         // Trigger the valueChanged function for both sub-buttons
    //         this._valueChanged({ target: { configValue: `sub_button.${index}.position`, value: subButton.position } });
    //         this._valueChanged({ target: { configValue: `sub_button.${index + 1}.position`, value: this._config.sub_button[index + 1].position } });
    //       }
    //     };

    //     return html`
    //         <ha-expansion-panel outlined>
    //             <h4 slot="header">
    //                 <ha-icon icon="mdi:border-radius"></ha-icon>
    //                 ${subButton.position ? "Button " + subButton.position : "New button"}
    //                 <button class="icon-button header" @click="${removeSubButton}">
    //                   <ha-icon icon="mdi:delete"></ha-icon>
    //                 </button>
    //                 <button class="icon-button header" @click="${moveSubButtonUp}">
    //                   <ha-icon icon="mdi:arrow-up"></ha-icon>
    //                 </button>
    //                 <button class="icon-button header" @click="${moveSubButtonDown}">
    //                   <ha-icon icon="mdi:arrow-down"></ha-icon>
    //                 </button>
    //             </h4>
    //             <!-- The rest of your code... -->
    //         </ha-expansion-panel>
    //     `;
    //   });

    //   const addSubButton = () => {
    //     const newSubButton = {
    //       position: this._config.sub_button.length + 1,
    //       entity: this._config.entity,
    //       name: '',
    //       icon: ''
    //     };

    //     this._config.sub_button.push(newSubButton);

    //     this.requestUpdate();
    //   };

    //   // Return full panel for all sub-buttons
    //   return html`
    //     <ha-expansion-panel outlined>
    //       <h4 slot="header">
    //         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
    //         Sub buttons editor
    //       </h4>
    //       <div class="content">
    //         ${subButtonElements}
    //         <button class="icon-button" @click="${addSubButton}">
    //           <ha-icon icon="mdi:plus"></ha-icon>
    //           New sub button
    //         </button>
    //       </div>
    //     </ha-expansion-panel>
    //   `;
    // }

// makeSubButtonPanel() {
//   // Sort the sub_buttons array by the 'position' property
//   const sortedSubButtons = this._config?.sub_button?.sort((a, b) => a.position - b.position);

//   const subButtonElements = sortedSubButtons?.map((subButton, index) => {
//     if (!subButton) {
//       return;
//     }

//     const subButtonIndex = 'sub_button.' + index + '.';

//     // Function to remove this sub-button
//     const removeSubButton = () => {
//       console.log('Removing sub-button at position', subButton.position); // Debugging line

//       // Remove the subButton from the specific index of the array
//       this._config.sub_button.splice(index, 1);

//       // Update the position property of the remaining sub-buttons
//       this._config.sub_button.forEach((subButton, i) => {
//         subButton.position = i + 1;
//       });

//       console.log('Updated sub-button positions:', this._config.sub_button.map(subButton => subButton.position)); // Debugging line

//       // Force the component to update to display the remaining buttons
//       this.requestUpdate();
//     };

//     // Function to move this sub-button up
//     const moveSubButtonUp = (event) => {
//       event.stopPropagation(); // Stop event propagation

//       if (index > 0) {
//         console.log('Moving sub-button at position', subButton.position, 'up'); // Debugging line

//         // Swap the position property of this sub-button and the one above it
//         [subButton.position, this._config.sub_button[index - 1].position] = [this._config.sub_button[index - 1].position, subButton.position];

//         console.log('Updated sub-button positions:', this._config.sub_button.map(subButton => subButton.position)); // Debugging line

//         // Force the component to update to display the buttons in the new order
//         this.requestUpdate();
//       }
//     };

//     // Function to move this sub-button down
//     const moveSubButtonDown = (event) => {
//       event.stopPropagation(); // Stop event propagation

//       if (index < this._config.sub_button.length - 1) {
//         console.log('Moving sub-button at position', subButton.position, 'down'); // Debugging line

//         // Swap the position property of this sub-button and the one below it
//         [subButton.position, this._config.sub_button[index + 1].position] = [this._config.sub_button[index + 1].position, subButton.position];

//         console.log('Updated sub-button positions:', this._config.sub_button.map(subButton => subButton.position)); // Debugging line

//         // Force the component to update to display the buttons in the new order
//         this.requestUpdate();
//       }
//     };

//     return html`
//         <ha-expansion-panel outlined>
//             <h4 slot="header">
//                 <ha-icon icon="mdi:border-radius"></ha-icon>
//                 ${subButton.position ? "Button " + subButton.position : "New button"}
//                 <button class="icon-button delete" @click="${removeSubButton}">
//                   <ha-icon icon="mdi:delete"></ha-icon>
//                 </button>
//                 <button class="icon-button move-up" @click="${moveSubButtonUp}">
//                   <ha-icon icon="mdi:arrow-up"></ha-icon>
//                 </button>
//                 <button class="icon-button move-down" @click="${moveSubButtonDown}">
//                   <ha-icon icon="mdi:arrow-down"></ha-icon>
//                 </button>
//             </h4>
//             <!-- The rest of your code... -->
//         </ha-expansion-panel>
//     `;
//   });

//   const addSubButton = () => {
//     const newSubButton = {
//       position: this._config.sub_button.length + 1,
//       entity: this._config.entity,
//       name: '',
//       icon: ''
//     };

//     this._config.sub_button.push(newSubButton);

//     console.log('Added new sub-button at position', newSubButton.position); // Debugging line

//     this.requestUpdate();
//   };

//   // Return full panel for all sub-buttons
//   return html`
//     <ha-expansion-panel outlined>
//       <h4 slot="header">
//         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
//         Sub buttons editor
//       </h4>
//       <div class="content">
//         ${subButtonElements}
//         <button class="icon-button" @click="${addSubButton}">
//           <ha-icon icon="mdi:plus"></ha-icon>
//           New sub button
//         </button>
//       </div>
//     </ha-expansion-panel>
//   `;
// }




    // makeSubButtonPanel() {
    //   // Sort the sub_buttons array by the 'position' property
    //   const sortedSubButtons = this._config?.sub_button?.sort((a, b) => a.position - b.position);

    //   const subButtonElements = sortedSubButtons?.map((subButton, index) => {
    //     if (!subButton) {
    //       return;
    //     }

    //     const subButtonIndex = 'sub_button.' + index + '.';

    //     // Function to remove this sub-button
    //     const removeSubButton = () => {
    //       // Remove the subButton from the specific index of the array
    //       this._config.sub_button.splice(index, 1);

    //       // Update the position property of the remaining sub-buttons
    //       this._config.sub_button.forEach((subButton, i) => {
    //         subButton.position = i + 1;
    //       });

    //       // Force the component to update to display the remaining buttons
    //       this.requestUpdate();
    //     };

    //     // Fonction pour déplacer ce sous-bouton vers le haut
    //     const moveSubButtonUp = (event) => {
    //       event.stopPropagation(); // Stop event propagation

    //       if (index > 0) {
    //         // Échangez la propriété de position de ce sous-bouton et celle du dessus
    //         [this._config.sub_button[index].position, this._config.sub_button[index - 1].position] = [this._config.sub_button[index - 1].position, this._config.sub_button[index].position];

    //         // Triez le tableau sub_buttons
    //         this._config.sub_button.sort((a, b) => a.position - b.position);

    //         // Déclenchez la fonction valueChanged pour les deux sous-boutons
    //         this._valueChanged({ target: { configValue: subButtonIndex, value: this._config.sub_button[index].position } });
    //         this._valueChanged({ target: { configValue: subButtonIndex, value: this._config.sub_button[index - 1].position } });

    //         console.log('Updated sub-button positions after moving up:', this._config.sub_button.map(button => button.position));
    //       }
    //     };

    //     // Fonction pour déplacer ce sous-bouton vers le bas
    //     const moveSubButtonDown = (event) => {
    //       event.stopPropagation(); // Stop event propagation

    //       if (index < this._config.sub_button.length - 1) {
    //         // Échangez la propriété de position de ce sous-bouton et celle du dessous
    //         [this._config.sub_button[index].position, this._config.sub_button[index + 1].position] = [this._config.sub_button[index + 1].position, this._config.sub_button[index].position];

    //         // Triez le tableau sub_buttons
    //         this._config.sub_button.sort((a, b) => a.position - b.position);

    //         // Déclenchez la fonction valueChanged pour les deux sous-boutons
    //         this._valueChanged({ target: { configValue: subButtonIndex, value: this._config.sub_button[index].position } });
    //         this._valueChanged({ target: { configValue: subButtonIndex, value: this._config.sub_button[index + 1].position } });

    //         console.log('Updated sub-button positions after moving down:', this._config.sub_button.map(button => button.position));
    //       }
    //     };

    //     return html`
    //         <ha-expansion-panel outlined>
    //             <h4 slot="header">
    //                 <ha-icon icon="mdi:border-radius"></ha-icon>
    //                 ${subButton.position ? "Button " + subButton.position : "New button"}
    //                 <button class="icon-button header" @click="${removeSubButton}">
    //                   <ha-icon icon="mdi:delete"></ha-icon>
    //                 </button>
    //                 <button class="icon-button header" @click="${moveSubButtonUp}">
    //                   <ha-icon icon="mdi:arrow-up"></ha-icon>
    //                 </button>
    //                 <button class="icon-button header" @click="${moveSubButtonDown}">
    //                   <ha-icon icon="mdi:arrow-down"></ha-icon>
    //                 </button>
    //             </h4>
    //             <div class="content">
    //                 <ha-textfield
    //                     label="Button position"
    //                     type="number"
    //                     inputMode="numeric"
    //                     min="1"
    //                     .value="${subButton.position}"
    //                     .configValue="sub_button.${index}.position"
    //                     @input="${this._valueChanged}"
    //                 ></ha-textfield>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                         <ha-icon icon="mdi:cog"></ha-icon>
    //                         Button settings
    //                     </h4>
    //                     <div class="content"> 
    //                         <div class="ha-combo-box">
    //                             <ha-combo-box
    //                                 label="${"Optional - Entity (default to card entity)"}"
    //                                 .value="${subButton.entity ?? this._config.entity}"
    //                                 .configValue="sub_button.${index}.entity"
    //                                 .items="${this.allEntitiesList}"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-combo-box>
    //                         </div>
    //                         <div class="ha-textfield">
    //                             <ha-textfield
    //                                 label="Optional - Name"
    //                                 .value="${subButton.name ?? ''}"
    //                                 .configValue="sub_button.${index}.name"
    //                                 .items="${""}"
    //                                 @input="${this._valueChanged}"
    //                             ></ha-textfield>
    //                         </div>
    //                         <div class="ha-icon-picker">
    //                             <ha-icon-picker
    //                                 label="Optional - Icon"
    //                                 .value="${subButton.icon}"
    //                                 .configValue="sub_button.${index}.icon"
    //                                 item-label-path="label"
    //                                 item-value-path="value"
    //                                 .disabled="${!subButton.position}"
    //                                 @value-changed="${this._valueChanged}"
    //                             ></ha-icon-picker>
    //                         </div>
    //                         ${this.makeShowState(subButton, subButtonIndex, true, true)}
    //                     </div>
    //                 </ha-expansion-panel>
    //                 <ha-expansion-panel outlined>
    //                     <h4 slot="header">
    //                       <ha-icon icon="mdi:gesture-tap"></ha-icon>
    //                       Tap action on button
    //                     </h4>
    //                     <div class="content">
    //                         ${this.makeTapActionPanel("Tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Double tap action", "tap_action", subButton, subButtonIndex)}
    //                         ${this.makeTapActionPanel("Hold action", "tap_action", subButton, subButtonIndex)}
    //                     </div>
    //                 </ha-expansion-panel>
    //             </div>
    //         </ha-expansion-panel>
    //     `;
    //   });

    //   const addSubButton = () => {
    //     const newSubButton = {
    //       position: this._config.sub_button.length + 1,
    //       entity: this._config.entity,
    //       name: '',
    //       icon: ''
    //     };

    //     this._config.sub_button.push(newSubButton);

    //     this.requestUpdate();
    //   };

    //   // Return full panel for all sub-buttons
    //   return html`
    //     <ha-expansion-panel outlined>
    //       <h4 slot="header">
    //         <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
    //         Sub buttons editor
    //       </h4>
    //       <div class="content">
    //         ${subButtonElements}
    //         <button class="icon-button" @click="${addSubButton}">
    //           <ha-icon icon="mdi:plus"></ha-icon>
    //           New sub button
    //         </button>
    //       </div>
    //     </ha-expansion-panel>
    //   `;
    // }

    makeSubButtonPanel() {
      // Triez le tableau sub_buttons par la propriété 'position'
      const sortedSubButtons = this._config?.sub_button?.sort((a, b) => a.position - b.position);

      const subButtonElements = sortedSubButtons?.map((subButton, index) => {
        if (!subButton) {
          return;
        }

        const subButtonIndex = 'sub_button.' + index + '.';

        // // Fonction pour supprimer ce sous-bouton
        // const removeSubButton = () => {
        //   // Supprimez le subButton de l'index spécifique du tableau
        //   this._config.sub_button.splice(index, 1);

        //   // Mettez à jour la propriété de position des sous-boutons restants
        //   this._config.sub_button.forEach((subButton, i) => {
        //     subButton.position = i + 1;
        //   });

        //   // Forcez le composant à se mettre à jour pour afficher les boutons restants
        //   this.requestUpdate();
        // };

        // // Fonction pour supprimer ce sous-bouton
        // const removeSubButton = () => {
        //   // Supprimez le subButton de l'index spécifique du tableau
        //   this._config.sub_button.splice(index, 1);

        //   // Mettez à jour la propriété de position des sous-boutons restants
        //   this._config.sub_button.forEach((subButton, i) => {
        //     subButton.position = i + 1;
        //     // Déclenchez la fonction valueChanged pour chaque sous-bouton restant
        //     this._valueChanged({ target: { configValue: subButtonIndex, value: subButton.position } });
        //   });

        //   // Forcez le composant à se mettre à jour pour afficher les boutons restants
        //   this.requestUpdate();
        // };

        // Fonction pour supprimer ce sous-bouton
        const removeSubButton = () => {
          // Supprimez le subButton de l'index spécifique du tableau
          this._config.sub_button.splice(index, 1);

          this._valueChanged({ target: { configValue: 'sub_button.' + index } });

          // Forcez le composant à se mettre à jour pour afficher les boutons restants
          this.requestUpdate();
        };

        // Fonction pour déplacer ce sous-bouton vers la gauche
        const moveSubButtonLeft = (event) => {
          event.stopPropagation(); // Arrêtez la propagation de l'événement

          if (index > 0) {
            // Échangez la propriété de position de ce sous-bouton et celle de gauche
            [this._config.sub_button[index].position, this._config.sub_button[index - 1].position] = [this._config.sub_button[index - 1].position, this._config.sub_button[index].position];

            // Triez le tableau sub_buttons
            this._config.sub_button.sort((a, b) => a.position - b.position);

            // Déclenchez la fonction valueChanged pour les deux sous-boutons
            this._valueChanged({ target: { configValue: subButtonIndex, value: this._config.sub_button[index].position } });
            this._valueChanged({ target: { configValue: subButtonIndex, value: this._config.sub_button[index - 1].position } });

            console.log('Updated sub-button positions after moving left:', this._config.sub_button.map(button => button.position));
          }
        };

        // Fonction pour déplacer ce sous-bouton vers la droite
        const moveSubButtonRight = (event) => {
          event.stopPropagation(); // Arrêtez la propagation de l'événement

          if (index < this._config.sub_button.length - 1) {
            // Échangez la propriété de position de ce sous-bouton et celle de droite
            [this._config.sub_button[index].position, this._config.sub_button[index + 1].position] = [this._config.sub_button[index + 1].position, this._config.sub_button[index].position];

            // Triez le tableau sub_buttons
            this._config.sub_button.sort((a, b) => a.position - b.position);

            // Déclenchez la fonction valueChanged pour les deux sous-boutons
            this._valueChanged({ target: { configValue: subButtonIndex, value: this._config.sub_button[index].position } });
            this._valueChanged({ target: { configValue: subButtonIndex, value: this._config.sub_button[index + 1].position } });

            console.log('Updated sub-button positions after moving right:', this._config.sub_button.map(button => button.position));
          }
        };

        return html`
            <ha-expansion-panel outlined>
                <h4 slot="header">
                    <ha-icon icon="mdi:border-radius"></ha-icon>
                    ${subButton.position ? "Button " + subButton.position : "New button"}
                    <button class="icon-button header" @click="${removeSubButton}">
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </button>
                    ${index > 0 ? html`<button class="icon-button header" @click="${moveSubButtonLeft}">
                      <ha-icon icon="mdi:arrow-left"></ha-icon>
                    </button>` : ''}
                    ${index < this._config.sub_button.length - 1 ? html`<button class="icon-button header" @click="${moveSubButtonRight}">
                      <ha-icon icon="mdi:arrow-right"></ha-icon>
                    </button>` : ''}
                </h4>
                <div class="content">
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                            <ha-icon icon="mdi:cog"></ha-icon>
                            Button settings
                        </h4>
                        <div class="content"> 
                            <div class="ha-combo-box">
                                <ha-combo-box
                                    label="${"Optional - Entity (default to card entity)"}"
                                    .value="${subButton.entity ?? this._config.entity}"
                                    .configValue="sub_button.${index}.entity"
                                    .items="${this.allEntitiesList}"
                                    .disabled="${!subButton.position}"
                                    @value-changed="${this._valueChanged}"
                                ></ha-combo-box>
                            </div>
                            <div class="ha-textfield">
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${subButton.name ?? ''}"
                                    .configValue="sub_button.${index}.name"
                                    .items="${""}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                            </div>
                            <div class="ha-icon-picker">
                                <ha-icon-picker
                                    label="Optional - Icon"
                                    .value="${subButton.icon}"
                                    .configValue="sub_button.${index}.icon"
                                    item-label-path="label"
                                    item-value-path="value"
                                    .disabled="${!subButton.position}"
                                    @value-changed="${this._valueChanged}"
                                ></ha-icon-picker>
                            </div>
                            ${this.makeShowState(subButton, subButtonIndex, true, true)}
                        </div>
                    </ha-expansion-panel>
                    <ha-expansion-panel outlined>
                        <h4 slot="header">
                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                          Tap action on button
                        </h4>
                        <div class="content">
                            ${this.makeTapActionPanel("Tap action", "tap_action", subButton, subButtonIndex)}
                            ${this.makeTapActionPanel("Double tap action", "tap_action", subButton, subButtonIndex)}
                            ${this.makeTapActionPanel("Hold action", "tap_action", subButton, subButtonIndex)}
                        </div>
                    </ha-expansion-panel>
                </div>
            </ha-expansion-panel>
        `;
      });

      const addSubButton = () => {
        const newSubButton = {
          position: this._config.sub_button.length + 1,
          entity: this._config.entity,
          name: '',
          icon: ''
        };

        this._config.sub_button.push(newSubButton);

        this.requestUpdate();
      };

      // Return full panel for all sub-buttons
      return html`
        <ha-expansion-panel outlined>
          <h4 slot="header">
            <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
            Sub buttons editor
          </h4>
          <div class="content">
            ${subButtonElements}
            <button class="icon-button" @click="${addSubButton}">
              <ha-icon icon="mdi:plus"></ha-icon>
              New sub button
            </button>
            <ha-alert alert-type="info">Add new customized buttons fixed to the right.</ha-alert>
          </div>
        </ha-expansion-panel>
      `;
    }


    makeButton() {
        let buttons = [];

        for (let i = 1; i <= this.buttonIndex; i++) {
            buttons.push(html`
                <div class="${i}_button">
                    <ha-expansion-panel outlined>
                        <div slot="header" class="button-header">
                            <ha-icon class="remove-button" icon="mdi:delete-circle" @click=${() => this.removeButton(i)}></ha-icon>
                            <span class="button-number">Button ${i} ${this._config[i + '_name'] ? ("- " + this._config[i + '_name']) : ""}</span>
                        </div>
                        <div class="content">  
                            <ha-textfield
                                label="Link / Hash to pop-up (e.g. #kitchen)"
                                .value="${this._config[i + '_link'] || ''}"
                                .configValue="${i}_link"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-textfield
                                label="Optional - Name"
                                .value="${this._config[i + '_name'] || ''}"
                                .configValue="${i}_name"
                                @input="${this._valueChanged}"
                            ></ha-textfield>
                            <ha-icon-picker
                                label="Optional - Icon"
                                .value="${this._config[i + '_icon'] || ''}"
                                .configValue="${i}_icon"
                                item-label-path="label"
                                item-value-path="value"
                                @value-changed="${this._valueChanged}"
                            ></ha-icon-picker>
                            <ha-combo-box
                                label="Optional - Light / Light group (For background color)"
                                .value="${this._config[i + '_entity'] || ''}"
                                .configValue="${i}_entity"
                                .items="${this.allEntitiesList}"
                                @value-changed="${this._valueChanged}"
                            ></ha-combo-box>
                            <ha-combo-box
                                label="Optional - Presence / Occupancy sensor (For button auto order)"
                                .value="${this._config[i + '_pir_sensor'] || ''}"
                                .configValue="${i}_pir_sensor"
                                .disabled=${!this._config.auto_order}
                                .items="${this.binarySensorList}"
                                @value-changed="${this._valueChanged}"
                            ></ha-combo-box>
                        </div>
                    </ha-expansion-panel>
                </div>
            `);
        }
        return buttons;
    }
    
    makeVersion() {
        return html`
            <h4 style="
                font-size: 12px !important;
                color: #fff;
                background: rgba(0,0,0,0.1);
                padding: 8px 16px;
                border-radius: 32px;
            ">
                Bubble Card 
                <span style="
                    font-size: 10px;
                    background: rgba(0,120,180,1);
                    padding: 0px 8px;
                    border-radius: 12px;
                    margin-right: -6px;
                    float: right;
                ">
                    ${version}
                </span>
            </h4>
        `;
    }

    removeButton(index) {
        // Removing button fields
        delete this._config[index + '_name'];
        delete this._config[index + '_icon'];
        delete this._config[index + '_link'];
        delete this._config[index + '_entity'];
        delete this._config[index + '_pir_sensor'];
    
        // Updating indexes of following buttons
        for (let i = index; i < this.buttonIndex; i++) {
            this._config[i + '_name'] = this._config[(i + 1) + '_name'];
            this._config[i + '_icon'] = this._config[(i + 1) + '_icon'];
            this._config[i + '_link'] = this._config[(i + 1) + '_link'];
            this._config[i + '_entity'] = this._config[(i + 1) + '_entity'];
            this._config[i + '_pir_sensor'] = this._config[(i + 1) + '_pir_sensor'];
        }
    
        // Removing fields of the last button
        delete this._config[this.buttonIndex + '_name'];
        delete this._config[this.buttonIndex + '_icon'];
        delete this._config[this.buttonIndex + '_link'];
        delete this._config[this.buttonIndex + '_entity'];
        delete this._config[this.buttonIndex + '_pir_sensor'];
    
        // Updating index of the last button
        this.buttonIndex--;
    
        fireEvent(this, "config-changed", {
            config: this._config
        });
    }

    // _valueChanged(ev) {
    //     if (!this._config || !this.hass) {
    //         return;
    //     }
    //     const target = ev.target;
    //     const detail = ev.detail;
    //     let rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
    //     let value;

    //     if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
    //         return;
    //     }

    //     if (target.configValue) {
    //         if (target.type === 'ha-switch') {
    //             value = target.checked;
    //         } else {
    //             if (rawValue !== "") {
    //                 if (!isNaN(parseFloat(rawValue)) && isFinite(rawValue)) {
    //                     value = parseFloat(rawValue);
    //                     if (isNaN(value)) {
    //                         value = undefined;
    //                     }
    //                 } else {
    //                     value = rawValue;
    //                 }
    //             }
    //             value = value !== undefined ? value : (target.checked !== undefined || !detail.value ? target.value || target.checked : target.checked || detail.value);
    //         }

    //         // Check if the value has changed
    //         if (this._config[target.configValue] !== value) {
    //             this._config = {
    //                 ...this._config,
    //                 [target.configValue]: value,
    //             };

    //             fireEvent(this, "config-changed", {
    //                 config: this._config
    //             });
    //         }
    //     }

    //     // Handle ha-combo-box value changes
    //     if (target.tagName === 'HA-COMBO-BOX' && detail.value) {
    //         this._config = {
    //             ...this._config,
    //             [target.configValue]: detail.value,
    //         };

    //         fireEvent(this, "config-changed", {
    //             config: this._config
    //         });
    //     }
    // }

    // _valueChanged(ev) {
    //     if (!this._config || !this.hass) {
    //         return;
    //     }
    //     const target = ev.target;
    //     const detail = ev.detail;
    //     let rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
    //     let value;

    //     if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
    //         return;
    //     }

    //     if (target.configValue) {
    //         if (target.type === 'ha-switch') {
    //             value = target.checked;
    //         } else {
    //             if (rawValue !== "") {
    //                 if (!isNaN(parseFloat(rawValue)) && isFinite(rawValue)) {
    //                     value = parseFloat(rawValue);
    //                     if (isNaN(value)) {
    //                         value = undefined;
    //                     }
    //                 } else {
    //                     value = rawValue;
    //                 }
    //             }
    //             value = value !== undefined ? value : (target.checked !== undefined || !detail.value ? target.value || target.checked : target.checked || detail.value);
    //         }

    //         // Check if the value has changed
    //         const configValueArray = target.configValue.split('.');
    //         let obj = this._config;
    //         for (let i = 0; i < configValueArray.length - 1; i++) {
    //             if (!obj[configValueArray[i]]) {
    //                 obj[configValueArray[i]] = {};
    //             }
    //             obj = obj[configValueArray[i]];
    //         }
    //         if (obj[configValueArray[configValueArray.length - 1]] !== value) {
    //             obj[configValueArray[configValueArray.length - 1]] = value;

    //             fireEvent(this, "config-changed", {
    //                 config: this._config
    //             });
    //         }
    //     }

    //     // Handle ha-combo-box value changes
    //     if (target.tagName === 'HA-COMBO-BOX' && detail.value) {
    //         if (target.configValue.includes('.')) {
    //             const configValueArray = target.configValue.split('.');
    //             let obj = this._config;

    //             for (let i = 0; i < configValueArray.length - 1; i++) {
    //                 if (!obj[configValueArray[i]]) {
    //                     obj[configValueArray[i]] = {};
    //                 }
    //                 obj = obj[configValueArray[i]];
    //             }

    //             obj[configValueArray[configValueArray.length - 1]] = detail.value;
    //         } else {
    //             this._config = {
    //                 ...this._config,
    //                 [target.configValue]: detail.value,
    //             };
    //         }

    //         fireEvent(this, "config-changed", {
    //             config: this._config
    //         });
    //     }
    // }

    // _valueChanged(ev) {
    //     if (!this._config || !this.hass) {
    //         return;
    //     }
    //     const target = ev.target;
    //     const detail = ev.detail;
    //     let rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
    //     let value;

    //     if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
    //         return;
    //     }

    //     if (target.configValue) {
    //         if (target.type === 'ha-switch') {
    //             value = target.checked;
    //         } else {
    //             if (rawValue !== "") {
    //                 if (!isNaN(parseFloat(rawValue)) && isFinite(rawValue)) {
    //                     value = parseFloat(rawValue);
    //                     if (isNaN(value)) {
    //                         value = undefined;
    //                     }
    //                 } else {
    //                     value = rawValue;
    //                 }
    //             }
    //             value = value !== undefined ? value : (target.checked !== undefined || !detail.value ? target.value || target.checked : target.checked || detail.value);
    //         }

    //         // Check if the value has changed
    //         const configValueArray = target.configValue.split('.');
    //         let obj = this._config;
    //         for (let i = 0; i < configValueArray.length - 1; i++) {
    //             if (!obj[configValueArray[i]]) {
    //                 obj[configValueArray[i]] = {};
    //             }
    //             obj = obj[configValueArray[i]];
    //         }
    //         if (obj[configValueArray[configValueArray.length - 1]] !== value) {
    //             obj[configValueArray[configValueArray.length - 1]] = value;

    //             fireEvent(this, "config-changed", {
    //                 config: this._config
    //             });
    //         }
    //     }

    //     // Handle ha-combo-box value changes
    //     if (target.tagName === 'HA-COMBO-BOX' && detail.value) {
    //         if (target.configValue && target.configValue.includes('.')) {
    //             const configValueArray = target.configValue.split('.');
    //             let obj = this._config;

    //             for (let i = 0; i < configValueArray.length - 1; i++) {
    //                 if (!obj[configValueArray[i]]) {
    //                     obj[configValueArray[i]] = {};
    //                 }
    //                 obj = obj[configValueArray[i]];
    //             }

    //             // Si le dernier élément de configValueArray est un index de sub_button
    //             if (configValueArray[configValueArray.length - 2] === 'sub_button') {
    //                 // Assurez-vous que sub_button est un tableau
    //                 if (!Array.isArray(obj.sub_button)) {
    //                     obj.sub_button = [];
    //                 }

    //                 // Créez un nouvel objet de sous-bouton si nécessaire
    //                 const subButtonIndex = parseInt(configValueArray[configValueArray.length - 1]);
    //                 if (!obj.sub_button[subButtonIndex]) {
    //                     obj.sub_button.push({});
    //                 }

    //                 // Mettez à jour la propriété du sous-bouton
    //                 obj.sub_button[subButtonIndex][configValueArray[configValueArray.length - 1]] = detail.value;
    //             } else {
    //                 // Mettez à jour la propriété comme d'habitude
    //                 obj[configValueArray[configValueArray.length - 1]] = detail.value;
    //             }
    //         } else {
    //             this._config = {
    //                 ...this._config,
    //                 [target.configValue]: detail.value,
    //             };
    //         }

    //         fireEvent(this, "config-changed", {
    //             config: this._config
    //         });
    //     }
    // }

    // _valueChanged(ev) {
    //     if (!this._config || !this.hass) {
    //         return;
    //     }
    //     const target = ev.target;
    //     const detail = ev.detail;
    //     let rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
    //     let value;

    //     if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
    //         return;
    //     }

    //     if (target.configValue) {
    //         if (target.type === 'ha-switch') {
    //             value = target.checked;
    //         } else {
    //             if (rawValue !== "") {
    //                 if (!isNaN(parseFloat(rawValue)) && isFinite(rawValue)) {
    //                     value = parseFloat(rawValue);
    //                     if (isNaN(value)) {
    //                         value = undefined;
    //                     }
    //                 } else {
    //                     value = rawValue;
    //                 }
    //             }
    //             value = value !== undefined ? value : (target.checked !== undefined || !detail.value ? target.value || target.checked : target.checked || detail.value);
    //         }

    //         // Check if the value has changed
    //         const configValueArray = target.configValue.split('.');
    //         let obj = this._config;
    //         for (let i = 0; i < configValueArray.length - 1; i++) {
    //             if (!obj[configValueArray[i]]) {
    //                 obj[configValueArray[i]] = {};
    //             }
    //             obj = obj[configValueArray[i]];
    //         }
    //         if (obj[configValueArray[configValueArray.length - 1]] !== value) {
    //             // If the position of a sub-button is changed
    //             if (configValueArray[0] === 'sub_button' && configValueArray[2] === 'position') {
    //                 // Store the old position of the current sub-button
    //                 const oldPosition = obj[configValueArray[configValueArray.length - 1]];

    //                 // Find the sub-button that currently has this position
    //                 const otherSubButton = this._config.sub_button.find((subButton, i) => i !== parseInt(configValueArray[1]) && subButton.position === value);

    //                 // If found, change its position to the old position of the current sub-button
    //                 if (otherSubButton) {
    //                     otherSubButton.position = oldPosition;
    //                 }
    //             }

    //             obj[configValueArray[configValueArray.length - 1]] = value;

    //             fireEvent(this, "config-changed", {
    //                 config: this._config
    //             });
    //         }
    //     }

    //     // Handle ha-combo-box value changes
    //     if (target.tagName === 'HA-COMBO-BOX' && detail.value) {
    //         if (target.configValue && target.configValue.includes('.')) {
    //             const configValueArray = target.configValue.split('.');
    //             let obj = this._config;

    //             for (let i = 0; i < configValueArray.length - 1; i++) {
    //                 if (!obj[configValueArray[i]]) {
    //                     obj[configValueArray[i]] = {};
    //                 }
    //                 obj = obj[configValueArray[i]];
    //             }

    //             // Si le dernier élément de configValueArray est un index de sub_button
    //             if (configValueArray[configValueArray.length - 2] === 'sub_button') {
    //                 // Assurez-vous que sub_button est un tableau
    //                 if (!Array.isArray(obj.sub_button)) {
    //                     obj.sub_button = [];
    //                 }

    //                 // Créez un nouvel objet de sous-bouton si nécessaire
    //                 const subButtonIndex = parseInt(configValueArray[configValueArray.length - 1]);
    //                 if (!obj.sub_button[subButtonIndex]) {
    //                     obj.sub_button.push({});
    //                 }

    //                 // Mettez à jour la propriété du sous-bouton
    //                 obj.sub_button[subButtonIndex][configValueArray[configValueArray.length - 1]] = detail.value;
    //             } else {
    //                 // Mettez à jour la propriété comme d'habitude
    //                 obj[configValueArray[configValueArray.length - 1]] = detail.value;
    //             }
    //         } else {
    //             this._config = {
    //                 ...this._config,
    //                 [target.configValue]: detail.value,
    //             };
    //         }

    //         fireEvent(this, "config-changed", {
    //             config: this._config
    //         });
    //     }
    // }

    // _valueChanged(ev) {
    //     if (!this._config || !this.hass) {
    //         return;
    //     }
    //     const target = ev.target;
    //     const detail = ev.detail;
    //     let rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
    //     let value;

    //     if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
    //         return;
    //     }

    //     if (target.configValue) {
    //         if (target.type === 'ha-switch') {
    //             value = target.checked;
    //         } else {
    //             if (rawValue !== "") {
    //                 if (!isNaN(parseFloat(rawValue)) && isFinite(rawValue)) {
    //                     value = parseFloat(rawValue);
    //                     if (isNaN(value)) {
    //                         value = undefined;
    //                     }
    //                 } else {
    //                     value = rawValue;
    //                 }
    //             }
    //             value = value !== undefined ? value : (target.checked !== undefined || !detail.value ? target.value || target.checked : target.checked || detail.value);
    //         }

    //         // Check if the value has changed
    //         const configValueArray = target.configValue.split('.');
    //         let obj = this._config;
    //         for (let i = 0; i < configValueArray.length - 1; i++) {
    //             if (!obj[configValueArray[i]]) {
    //                 obj[configValueArray[i]] = {};
    //             }
    //             obj = obj[configValueArray[i]];
    //         }
    //         if (obj[configValueArray[configValueArray.length - 1]] !== value) {
    //             // If the position of a sub-button is changed
    //             if (configValueArray[0] === 'sub_button' && configValueArray[2] === 'position') {
    //                 // Store the old position of the current sub-button
    //                 const oldPosition = obj[configValueArray[configValueArray.length - 1]];

    //                 // Find the sub-button that currently has this position
    //                 const otherSubButton = this._config.sub_button.find((subButton, i) => i !== parseInt(configValueArray[1]) && subButton.position === value);

    //                 // If found, change its position to the old position of the current sub-button
    //                 if (otherSubButton) {
    //                     otherSubButton.position = oldPosition;
    //                 }
    //             }

    //             obj[configValueArray[configValueArray.length - 1]] = value;

    //             // Sort the sub_buttons array by the 'position' property
    //             this._config.sub_button.sort((a, b) => a.position - b.position);

    //             fireEvent(this, "config-changed", {
    //                 config: this._config
    //             });
    //         }
    //     }

    //     // Handle ha-combo-box value changes
    //     if (target.tagName === 'HA-COMBO-BOX' && detail.value) {
    //         if (target.configValue && target.configValue.includes('.')) {
    //             const configValueArray = target.configValue.split('.');
    //             let obj = this._config;

    //             for (let i = 0; i < configValueArray.length - 1; i++) {
    //                 if (!obj[configValueArray[i]]) {
    //                     obj[configValueArray[i]] = {};
    //                 }
    //                 obj = obj[configValueArray[i]];
    //             }

    //             // Si le dernier élément de configValueArray est un index de sub_button
    //             if (configValueArray[configValueArray.length - 2] === 'sub_button') {
    //                 // Assurez-vous que sub_button est un tableau
    //                 if (!Array.isArray(obj.sub_button)) {
    //                     obj.sub_button = [];
    //                 }

    //                 // Créez un nouvel objet de sous-bouton si nécessaire
    //                 const subButtonIndex = parseInt(configValueArray[configValueArray.length - 1]);
    //                 if (!obj.sub_button[subButtonIndex]) {
    //                     obj.sub_button.push({});
    //                 }

    //                 // Mettez à jour la propriété du sous-bouton
    //                 obj.sub_button[subButtonIndex][configValueArray[configValueArray.length - 1]] = detail.value;
    //             } else {
    //                 // Mettez à jour la propriété comme d'habitude
    //                 obj[configValueArray[configValueArray.length - 1]] = detail.value;
    //             }
    //         } else {
    //             this._config = {
    //                 ...this._config,
    //                 [target.configValue]: detail.value,
    //             };
    //         }

    //         fireEvent(this, "config-changed", {
    //             config: this._config
    //         });
    //     }

    //     this.requestUpdate();
    // }

// _valueChanged(ev) {
//     console.log('_valueChanged called with event:', ev);

//     if (!this._config || !this.hass) {
//         console.log('Early return because _config or hass is not defined');
//         return;
//     }

//     const target = ev.target;
//     const detail = ev.detail;
//     let rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
//     let value;

//     if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
//         return;
//     }

//     if (target.configValue) {
//         if (target.type === 'ha-switch') {
//             value = target.checked;
//         } else {
//             if (rawValue !== "") {
//                 if (!isNaN(parseFloat(rawValue)) && isFinite(rawValue)) {
//                     value = parseFloat(rawValue);
//                     if (isNaN(value)) {
//                         value = undefined;
//                     }
//                 } else {
//                     value = rawValue;
//                 }
//             }
//             value = value !== undefined ? value : (target.checked !== undefined || !detail.value ? target.value || target.checked : target.checked || detail.value);
//         }

//         const configValueArray = target.configValue.split('.');
//         let obj = this._config;
//         for (let i = 0; i < configValueArray.length - 1; i++) {
//             if (!obj[configValueArray[i]]) {
//                 obj[configValueArray[i]] = {};
//             }
//             obj = obj[configValueArray[i]];
//         }
//         if (obj[configValueArray[configValueArray.length - 1]] !== value) {
//             console.log('Value has changed for config value:', target.configValue);

//             if (configValueArray[0] === 'sub_button' && configValueArray[2] === 'position') {
//                 console.log('Position of a sub-button has changed');

//                 const oldPosition = obj[configValueArray[configValueArray.length - 1]];

//                 const otherSubButton = this._config.sub_button.find((subButton, i) => i !== parseInt(configValueArray[1]) && subButton.position === value);

//                 if (otherSubButton) {
//                     otherSubButton.position = oldPosition;
//                 }
//             }

//             obj[configValueArray[configValueArray.length - 1]] = value;

//             this._config.sub_button.sort((a, b) => a.position - b.position);

//             console.log('Updated _config:', this._config);

//             fireEvent(this, "config-changed", {
//                 config: this._config
//             });
//         }
//     }

//     if (target.tagName === 'HA-COMBO-BOX' && detail.value) {
//         if (target.configValue && target.configValue.includes('.')) {
//             const configValueArray = target.configValue.split('.');
//             let obj = this._config;

//             for (let i = 0; i < configValueArray.length - 1; i++) {
//                 if (!obj[configValueArray[i]]) {
//                     obj[configValueArray[i]] = {};
//                 }
//                 obj = obj[configValueArray[i]];
//             }

//             if (configValueArray[configValueArray.length - 2] === 'sub_button') {
//                 if (!Array.isArray(obj.sub_button)) {
//                     obj.sub_button = [];
//                 }

//                 const subButtonIndex = parseInt(configValueArray[configValueArray.length - 1]);
//                 if (!obj.sub_button[subButtonIndex]) {
//                     obj.sub_button.push({});
//                 }

//                 obj.sub_button[subButtonIndex][configValueArray[configValueArray.length - 1]] = detail.value;
//             } else {
//                 obj[configValueArray[configValueArray.length - 1]] = detail.value;
//             }
//         } else {
//             this._config = {
//                 ...this._config,
//                 [target.configValue]: detail.value,
//             };
//         }

//         console.log('About to fire config-changed event with new config:', this._config);
//         fireEvent(this, "config-changed", {
//             config: this._config
//         });
//         console.log('Fired config-changed event');
//     }

//     this.requestUpdate();
// }

// _valueChanged(ev) {
//     console.log('_valueChanged called with event:', ev);

//     if (!this._config || !this.hass) {
//         console.log('Early return because _config or hass is not defined');
//         return;
//     }

//     const target = ev.target;
//     const detail = ev.detail;
//     let rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
//     let value;

//     if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
//         return;
//     }

//     if (target.configValue) {
//         if (target.type === 'ha-switch') {
//             value = target.checked;
//         } else {
//             value = rawValue;
//             value = value !== '' ? 
//                 value : 
//                 (target.checked !== undefined || 
//                     !detail.value ?
//                         target.value || target.checked : 
//                         target.checked || detail.value);

//             fireEvent(this, "config-changed", {
//                 config: this._config
//             });
//         }

//         const configValueArray = target.configValue.split('.');
//         let obj = this._config;
//         for (let i = 0; i < configValueArray.length - 1; i++) {
//             if (!obj[configValueArray[i]]) {
//                 obj[configValueArray[i]] = {};
//             }
//             obj = obj[configValueArray[i]];
//         }

//         if (obj[configValueArray[configValueArray.length - 1]] !== value) {
//             console.log('Value has changed for config value:', target.configValue);

//             if (configValueArray[0] === 'sub_button' && configValueArray[2] === 'position') {
//                 console.log('Position of a sub-button has changed');

//                 const oldPosition = obj[configValueArray[configValueArray.length - 1]];

//                 const otherSubButton = this._config.sub_button.find((subButton, i) => i !== parseInt(configValueArray[1]) && subButton.position === value);

//                 if (otherSubButton) {
//                     otherSubButton.position = oldPosition;
//                 }
//             }

//             obj[configValueArray[configValueArray.length - 1]] = value;

//             this._config.sub_button.sort((a, b) => a.position - b.position);

//             console.log('Updated _config:', this._config);

//             fireEvent(this, "config-changed", {
//                 config: this._config
//             });
//         }
//     }

//     if (target.tagName === 'HA-COMBO-BOX' && detail.value) {
//         if (target.configValue && target.configValue.includes('.')) {
//             const configValueArray = target.configValue.split('.');
//             let obj = this._config;

//             for (let i = 0; i < configValueArray.length - 1; i++) {
//                 if (!obj[configValueArray[i]]) {
//                     obj[configValueArray[i]] = {};
//                 }
//                 obj = obj[configValueArray[i]];
//             }

//             if (configValueArray[configValueArray.length - 2] === 'sub_button') {
//                 if (!Array.isArray(obj.sub_button)) {
//                     obj.sub_button = [];
//                 }

//                 const subButtonIndex = parseInt(configValueArray[configValueArray.length - 1]);
//                 if (!obj.sub_button[subButtonIndex]) {
//                     obj.sub_button.push({});
//                 }

//                 obj.sub_button[subButtonIndex][configValueArray[configValueArray.length - 1]] = detail.value;
//             } else {
//                 obj[configValueArray[configValueArray.length - 1]] = detail.value;
//             }
//         } else {
//             this._config = {
//                 ...this._config,
//                 [target.configValue]: detail.value,
//             };
//         }

//         console.log('About to fire config-changed event with new config:', this._config);
//         fireEvent(this, "config-changed", {
//             config: this._config
//         });
//         console.log('Fired config-changed event');
//     }

//     this.requestUpdate();
// }

_valueChanged(ev) {
    console.log('_valueChanged called with event:', ev);

    if (!this._config || !this.hass) {
        console.log('Early return because _config or hass is not defined');
        return;
    }

    const target = ev.target;
    const detail = ev.detail;
    let rawValue = typeof target.value === 'string' ? target.value.replace(",", ".") : target.value;
    let value;

    if (typeof rawValue === 'string' && (rawValue.endsWith(".") || rawValue === "-")) {
        return;
    }

    if (target.configValue) {
        if (target.checked !== undefined) {
            value = target.checked;
        } else {
            value = rawValue;
            // if (value !== '') {
            //     value = !isNaN(parseFloat(rawValue)) && isFinite(rawValue) ? parseFloat(rawValue) : rawValue;
            // } else {
            //     value = target.checked || detail.value;
            // }

            fireEvent(this, "config-changed", {
                config: this._config
            });
        }

        const configValueArray = target.configValue.split('.');
        let obj = this._config;
        for (let i = 0; i < configValueArray.length - 1; i++) {
            if (!obj[configValueArray[i]]) {
                obj[configValueArray[i]] = {};
            }
            obj = obj[configValueArray[i]];
        }

        if (obj[configValueArray[configValueArray.length - 1]] !== value) {
            console.log('Value has changed for config value:', target.configValue);

            if (configValueArray[0] === 'sub_button' && configValueArray[2] === 'position') {
                console.log('Position of a sub-button has changed');

                const oldPosition = obj[configValueArray[configValueArray.length - 1]];

                const otherSubButton = this._config.sub_button.find((subButton, i) => i !== parseInt(configValueArray[1]) && subButton.position === value);

                if (otherSubButton) {
                    otherSubButton.position = oldPosition;
                }
            }

            obj[configValueArray[configValueArray.length - 1]] = value;

            this._config.sub_button.sort((a, b) => a.position - b.position);

            console.log('Updated _config:', this._config);

            fireEvent(this, "config-changed", {
                config: this._config
            });
        }
    }

    if (target.tagName === 'HA-COMBO-BOX' && detail.value) {
        if (target.configValue && target.configValue.includes('.')) {
            const configValueArray = target.configValue.split('.');
            let obj = this._config;

            for (let i = 0; i < configValueArray.length - 1; i++) {
                if (!obj[configValueArray[i]]) {
                    obj[configValueArray[i]] = {};
                }
                obj = obj[configValueArray[i]];
            }

            if (configValueArray[configValueArray.length - 2] === 'sub_button') {
                if (!Array.isArray(obj.sub_button)) {
                    obj.sub_button = [];
                }

                const subButtonIndex = parseInt(configValueArray[configValueArray.length - 1]);
                if (!obj.sub_button[subButtonIndex]) {
                    obj.sub_button.push({});
                }

                obj.sub_button[subButtonIndex][configValueArray[configValueArray.length - 1]] = detail.value;
            } else {
                obj[configValueArray[configValueArray.length - 1]] = detail.value;
            }
        } else {
            this._config = {
                ...this._config,
                [target.configValue]: detail.value,
            };
        }

        console.log('About to fire config-changed event with new config:', this._config);
        fireEvent(this, "config-changed", {
            config: this._config
        });
        console.log('Fired config-changed event');
    }

    this.requestUpdate();
}



    static get styles() {
        return css`
            div {
              display: grid;
              grid-gap: 12px;
            }

            ha-combo-box[label="Card type"]::after {
              content: "";
              position: relative;
              background-color: var(--background-color, var(--secondary-background-color));
              display: block;
              width: 100%;
              height: 1px;
              top: 12px;
              margin-bottom: 12px !important;
              opacity: 0.6;
            }

            #add-button {
              margin: 0 0 14px 0;
              color: var(--text-primary-color);
              width: 100%;
              height: 32px;
              border-radius: 16px;
              border: none;
              background-color: var(--accent-color);
              cursor: pointer;
            }

            a {
              color: var(--primary-text-color);
            }

            p {
              margin-bottom: 4px;
            }

            hr {
              display: inline-block;
              width: 100%;
              background-color: var(--text-primary-color);
              opacity: .15;
              margin: 8px 0 0 0;
            }

            code {
              background: var(--accent-color);
              background-blend-mode: darken;
              padding: 2px 4px;
              border-radius: 6px;
            }

            .button-header {
              height: auto;
              width: 100%;
              display: inline-flex;
              align-items: center;
              margin: 0 8px;
            }

            .button-number {
              display: inline-flex;
              width: auto;
            }

            .remove-button {
              display: inline-flex;
              border-radius: 50%;
              width: 24px;
              height: 24px;
              text-align: center;
              line-height: 24px;
              vertical-align: middle;
              cursor: pointer;
            }

            .content {
              margin: 12px 4px 14px 4px;
            }

            h4 > ha-icon {
              margin: 8px;
            }

            ha-textfield {
              width: 100%;
            }

            h3 {
              margin: 4px 0;
            }

            .icon-button {
              background: var(--accent-color);
              border: none;
              cursor: pointer;
              padding: 8px;
              margin: 0;
              border-radius: 32px;
              font-weight: bold;
            }

            .icon-button.header {
              background: none;
              float: right;
              padding: 0;
              margin: 0 8px;
            }
        `;
    }
}

customElements.define('bubble-card-editor', BubbleCardEditor);