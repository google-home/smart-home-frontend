/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-header/app-header.js'
import '@polymer/app-layout/app-layout.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/iron-icons/image-icons.js';
import '@polymer/iron-icons/hardware-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/notification-icons.js';
import '@polymer/iron-icons/places-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toast/paper-toast.js';

import './smart-device.js';

export class MyApp extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        --app-primary-color: #4285f4;
        --app-secondary-color: black;
        display: block;
      }

      app-header {
        color: #fff;
        background-color: var(--app-primary-color);
      }

      app-header paper-icon-button {
        --paper-icon-button-ink-color: white;
      }

      #modal {
        width: 70%;
        display: -webkit-flex;
        /* Safari */
        -webkit-justify-content: space-around;
        /* Safari 6.1+ */
        display: flex;
        justify-content: space-around;
        overflow-y: scroll;
        padding: 24px 0px;
      }

      .square {
        height: 180px;
        width: 180px;
        margin: auto;
        background: none;
        border: none;
        outline: none;
      }

      .square:hover {
        background-color: rgb(238, 238, 238);
      }

      iron-icon {
        height: 55%;
        width: 55%;
        color: #757575;
      }

      #close {
        height: 30px;
        width: 80px;
        margin-top: 0px;
        float: right;
      }

      #close>iron-icon {
        height: 100%;
        width: 100%;
        cursor: pointer;
        cursor: hand;
      }

      p {
        color: #757575;
        font-family: 'Roboto', 'Noto', sans-serif;
        font-size: 15px;
      }

      #no-devices-msg {
        width: 60%;
        margin: 20% auto;
      }

      #no-devices-msg>p {
        text-align: center;
      }

      #check {
        display: none;
      }

      .item {
        display: inline-block;
        vertical-align: top;
      }
    </style>

    <!-- Main content -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar>
        <paper-icon-button id="account" icon="account-box" on-tap="_showAccount"></paper-icon-button>
        <div main-title>Smart Home Provider</div>
        <paper-icon-button id="add" icon="add"></paper-icon-button>
      </app-toolbar>
    </app-header>

    <paper-dialog id="modal" modal>
      <div id="close">
        <iron-icon icon="icons:close" dialog-confirm autofocus></iron-icon>
      </div>
      <div class="layout horizontal center-justified">
        <h1>Add a new device</h1>
        <button dialog-confirm autofocus class="square" on-tap="_addAcUnit">
          <iron-icon icon="places:ac-unit"></iron-icon>
          <p>AC Unit</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addAirFreshener">
          <iron-icon icon="icons:hourglass-full"></iron-icon>
          <p>Air Freshener</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addAirPurifier">
          <iron-icon icon="hardware:sim-card"></iron-icon>
          <p>Air Purifier</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addAwning">
          <iron-icon icon="maps:store-mall-directory"></iron-icon>
          <p>Awning</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addBlinds">
          <iron-icon icon="icons:view-week"></iron-icon>
          <p>Blinds</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addBoiler">
          <iron-icon icon="icons:invert-colors"></iron-icon>
          <p>Boiler</p>
        </button>
        <button dialog-confirm autofocus class="square" id="cameraSelector"
          on-tap="_addCamera">
          <iron-icon icon="image:camera-alt"></iron-icon>
          <p>Camera</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addCoffeeMaker">
          <iron-icon icon="maps:local-cafe"></iron-icon>
          <p>Coffee Maker</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addCurtain">
          <iron-icon icon="icons:flag"></iron-icon>
          <p>Curtain</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addDishwasher">
          <iron-icon icon="maps:restaurant"></iron-icon>
          <p>Dishwasher</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addDoor">
          <iron-icon icon="icons:open-in-new"></iron-icon>
          <p>Door</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addDryer">
          <iron-icon icon="places:casino"></iron-icon>
          <p>Dryer</p>
        </button>
        <button dialog-confirm autofocus class="square" id="fanSelector"
          on-tap="_addFan">
          <iron-icon icon="hardware:toys"></iron-icon>
          <p>Fan</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addFireplace">
          <iron-icon icon="social:whatshot"></iron-icon>
          <p>Fireplace</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addGarage">
          <iron-icon icon="notification:drive-eta"></iron-icon>
          <p>Garage Door</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addGate">
          <iron-icon icon="device:storage"></iron-icon>
          <p>Gate</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addHeater">
          <iron-icon icon="icons:account-balance-wallet"></iron-icon>
          <p>Heater</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addHood">
          <iron-icon icon="icons:view-day"></iron-icon>
          <p>Hood</p>
        </button>
        <button dialog-confirm autofocus class="square" id="kettleSelector"
          on-tap="_addKettle">
          <iron-icon icon="image:filter-frames"></iron-icon>
          <p>Kettle</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addLock">
          <iron-icon icon="icons:lock"></iron-icon>
          <p>Lock</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addMicrowave">
          <iron-icon icon="device:nfc"></iron-icon>
          <p>Microwave</p>
        </button>
        <button dialog-confirm autofocus class="square" id="lightSelector"
          on-tap="_addMonochromeLight">
          <iron-icon icon="image:wb-iridescent"></iron-icon>
          <p>Monochrome Light</p>
        </button>
        <button dialog-confirm autofocus class="square" id="outletSelector"
          on-tap="_addOutlet">
          <iron-icon icon="notification:power"></iron-icon>
          <p>Outlet</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addOven">
          <iron-icon icon="av:web"></iron-icon>
          <p>Oven</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addPergola">
          <iron-icon icon="maps:layers"></iron-icon>
          <p>Pergola</p>
        </button>
        <button dialog-confirm autofocus class="square" id="lightSelector"
          on-tap="_addLight">
          <iron-icon icon="image:wb-incandescent"></iron-icon>
          <p>RGB Light</p>
        </button>
        <button dialog-confirm autofocus class="square" id="refrigeratorSelector"
          on-tap="_addRefrigerator">
          <iron-icon icon="places:kitchen"></iron-icon>
          <p>Refrigerator</p>
        </button>
        <button dialog-confirm autofocus class="square" id="sceneSelector"
          on-tap="_addScene">
          <iron-icon icon="image:slideshow"></iron-icon>
          <p>Scene</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addSecuritySystem">
          <iron-icon icon="icons:verified-user"></iron-icon>
          <p>Security System</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addShower">
          <iron-icon icon="maps:local-car-wash"></iron-icon>
          <p>Shower</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addShutter">
          <iron-icon icon="maps:map"></iron-icon>
          <p>Shutter</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addSprinkler">
          <iron-icon icon="image:filter-vintage"></iron-icon>
          <p>Sprinkler</p>
        </button>
        <button dialog-confirm autofocus class="square" id="switchSelector"
          on-tap="_addSwitch">
          <iron-icon icon="communication:call-merge"></iron-icon>
          <p>Switch</p>
        </button>
        <button dialog-confirm autofocus class="square" id="thermostatSelector"
          on-tap="_addThermostat">
          <iron-icon icon="image:brightness-7"></iron-icon>
          <p>Thermostat</p>
        </button>
        <button dialog-confirm autofocus class="square" id="vacuumSelector"
          on-tap="_addVacuum">
          <iron-icon icon="hardware:router"></iron-icon>
          <p>Vacuum</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addValve">
          <iron-icon icon="icons:settings-input-component"></iron-icon>
          <p>Valve</p>
        </button>
        <button dialog-confirm autofocus class="square" id="washerSelector"
          on-tap="_addWasher">
          <iron-icon icon="maps:local-laundry-service"></iron-icon>
          <p>Washer</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addWaterHeater">
          <iron-icon icon="maps:local-drink"></iron-icon>
          <p>Water Heater</p>
        </button>
        <button dialog-confirm autofocus class="square" on-tap="_addWindow">
          <iron-icon icon="device:wallpaper"></iron-icon>
          <p>Window</p>
        </button>
      </div>
    </paper-dialog>

    <div id="no-devices-msg" hidden="[[hide]]">
      <p class="layout horizontal center-justified">
        You currently don't have any devices set up. To set up a device,
        click the "+" button and take it online.
      </p>
    </div>

    <div id="devices">
      <template is="dom-repeat" items="[[devices]]">
        <div class="item">
          <smart-device device=[[item]]
            index=[[index]]
            deviceid=[[item.deviceId]]
            id="d-[[item.deviceId]]"></smart-device>
        </div>
      </template>
    </div>

    <paper-toast id="toast" text="Not signed in"></paper-toast>
    `
  }

  static get properties() {
    return {
      devices: {
        type: Array,
        value: []
      }
    }
  }

  ready() {
    super.ready()
    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();
    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
  }

  /**
   * Callback that runs when the HTML element is created.
   */
  connectedCallback() {
    super.connectedCallback();
    window.requestAnimationFrame(() => {
      this.$.add.addEventListener('click', (e) => this.$.modal.open());

      // Read from database to get current devices
      this.db.collection('users').doc('1234').collection('devices').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            data.deviceId = doc.id;
            this._addDevice(data);
            this.addDbListener(doc.id);
          })
        })
    });
  }

  addDbListener(id) {
    // Add a listener to each device
    this.db.collection('users').doc('1234').collection('devices').doc(id).onSnapshot(doc => {
      if (!doc.exists) {
        console.warn(`Document ${id} does not exist`)
        return;
      }
      const data = doc.data();
      this.$.devices.querySelector(`#d-${id}`).receiveState(data);
    })
  }

  /**
   * Shows a message that there are no devices.
   */
  showNoDeviceMessage() {
    this.hide = false;
  }

  /**
   * Hides a message that there are no devices.
   */
  hideNoDeviceMessage() {
    this.hide = true;
  }

  /**
   * Removes a device.
   * @param {number} deviceId The id of the device.
   */
  removeDevice(deviceId) {
    this.devices.forEach((device, index) => {
      if (device.deviceId === deviceId) {
        // Mark the HTML element as hidden.
        // This will prevent users from seeing it and they won't interact with it.
        // The server-side representation for the device will be deleted.
        // The next time the page is refreshed the device will not be rendered.
        this.$.devices.querySelectorAll('.item')[index].style.display = 'none'
        this.hide = this.devices.length > 0;
      }
    })

    // Remove this device
    return fetch(`${API_ENDPOINT}/smarthome/delete`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        userId: '1234',
        deviceId
      })
    })
  }

  updateLocalExecution(deviceId, localExecution, localDeviceId) {
    const deviceRef  = this.db.collection('users').doc('1234').collection('devices').doc(deviceId);
    let otherDeviceIds;
    if (localExecution && localDeviceId) {
      otherDeviceIds = [{deviceId: localDeviceId}];
    } else {
      otherDeviceIds = firebase.firestore.FieldValue.delete();
    }
    deviceRef.update({
      otherDeviceIds
    }).catch(e => {
      console.error('failed to update device entity', e);
    })
  }

  /**
   * Displays a toast message.
   * @param {string} toastmsg The message to be displayed.
   */
  showToast(toastmsg) {
    this.$.toast.text = toastmsg;
    this.$.toast.open();
  }

  /**
   * Displays a toast message with the user's name.
   */
  _showAccount() {
    this.$.toast.text = `Welcome ${window.USERNAME}`;
    this.$.toast.open();
  }

  _genUuid() {
    return Math.floor((Math.random()) * 100000).toString(36)
  }

  _createDevice(device) {
    this._addDevice(device);
    // Push new device to database
    return fetch(`${API_ENDPOINT}/smarthome/create`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        userId: '1234',
        data: device
      })
    }).then(() => {
      this.addDbListener(device.id);
    }).catch(e => {
      console.error(e);
    })
  }

  _addDevice(device) {
    device.deviceId = device.id;
    this.push('devices', device);
    this.hide = true;
  }

  _getNicknames(element, type) {
    return element ? element.nicknames : [`Smart ${type} ${this.devices.length}`];
  }

  _getRoomHint(element) {
    return element ? element.roomHint : '';
  }

  _addAcUnit() {
    if (!this.acUnitValuesArray) {
      this.acUnitValuesArray = [{
        nicknames: ['ac unit'],
        roomHint: 'Living Room'
      }, {
        nicknames: ['temperature control system'],
        roomHint: 'Master Bedroom'
      }, {
        nicknames: ['hvac'],
        roomHint: 'Basement'
      }];
    }
    const element = this.acUnitValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.AC_UNIT',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Modes',
        'action.devices.traits.TemperatureSetting',
      ],
      defaultNames: [`Smart AC Unit ${this.devices.length}`],
      name: `Smart AC Unit ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableThermostatModes: 'off,cool',
        temperatureTemperatureUnit: 'C',
        availableModes: [{
          name: 'mode',
          name_values: [{
            name_synonym: ['mode'],
            lang: 'en'
          }],
          settings: [{
            setting_name: 'auto',
            setting_values: [{
              setting_synonym: ['auto'],
              lang: 'en'
            }]
          }, {
            setting_name: 'manual',
            setting_values: [{
              setting_synonym: ['manual'],
              lang: 'en'
            }]
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        thermostatTemperatureSetpoint: 20,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addAirFreshener() {
    if (!this.airFreshenerValuesArray) {
      this.airFreshenerValuesArray = [{
        nicknames: ['Mr. Fresh'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.airFreshenerValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.AIRFRESHENER',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Air Freshener ${this.devices.length}`],
      name: `Smart Air Freshener ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableToggles: [{
          name: 'intermittent spray',
          name_values: [{
            name_synonym: ['intermittent spray'],
            lang: 'en'
          }, {
            name_synonym: ['intermittierender Spray'],
            lang: 'de'
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addAirPurifier() {
    if (!this.airPurifierValuesArray) {
      this.airPurifierValuesArray = [{
        nicknames: ['air filter'],
        roomHint: 'Living Room'
      }, {
        nicknames: ['violet air purifier'],
        roomHint: 'Dining Room'
      }];
    }
    const element = this.airPurifierValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.AIRPURIFIER',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
        'action.devices.traits.FanSpeed',
      ],
      defaultNames: [`Smart Air Purifier ${this.devices.length}`],
      name: `Smart Air Purifier ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableFanSpeeds: {
          speeds: [{
            speed_name: '0',
            speed_values: [{
              speed_synonym: ['off'],
              lang: 'en'
            }]
          }, {
            speed_name: '1',
            speed_values: [{
              speed_synonym: ['low'],
              lang: 'en'
            }]
          }, {
            speed_name: '2',
            speed_values: [{
              speed_synonym: ['medium'],
              lang: 'en'
            }]
          }, {
            speed_name: '3',
            speed_values: [{
              speed_synonym: ['high'],
              lang: 'en'
            }]
          }],
          ordered: true,
        },
        reversible: true,
        availableToggles: [{
          name: 'uv',
          name_values: [{
            name_synonym: ['uv'],
            lang: 'en'
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        currentFanSpeedSetting: '0',
        currentToggleSettings: {
          uv: false,
        }
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addAwning() {
    if (!this.awningValuesArray) {
      this.awningValuesArray = [{
        nicknames: ['back window awning'],
        roomHint: 'Patio'
      }];
    }
    const element = this.awningValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.AWNING',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Awning ${this.devices.length}`],
      name: `Smart Awning ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        openDirection: ['UP', 'DOWN']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openPercent: 0,
          openDirection: 'UP'
        }, {
          openPercent: 0,
          openDirection: 'DOWN'
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addBlinds() {
    if (!this.blindsValuesArray) {
      this.blindsValuesArray = [{
        nicknames: ['sink window'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.blindsValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.BLINDS',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Blinds ${this.devices.length}`],
      name: `Smart Blinds ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        openDirection: ['LEFT', 'RIGHT']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openPercent: 0,
          openDirection: 'LEFT'
        }, {
          openPercent: 0,
          openDirection: 'RIGHT'
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addBoiler() {
    if (!this.boilerValuesArray) {
      this.boilerValuesArray = [{
        nicknames: ['my boiler'],
        roomHint: 'Laundry Room'
      }];
    }
    const element = this.boilerValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.BOILER',
      traits: [
        'action.devices.traits.TemperatureControl',
        'action.devices.traits.OnOff'
      ],
      defaultNames: [`Smart Boiler ${this.devices.length}`],
      name: `Smart Boiler ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 50,
          maxThresholdCelsius: 125
        },
        temperatureUnitForUX: 'C'
      },
      willReportState: true,
      states: {
        online: true,
        on: false,
        temperatureSetpointCelsius: 105,
        temperatureAmbientCelsius: 110
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addCamera() {
    if (!this.cameraValuesArray) {
      this.cameraValuesArray = [{
        nicknames: ['backyard camera'],
        roomHint: 'Backyard'
      }, {
        nicknames: ['security camera'],
        roomHint: 'Entryway'
      }];
    }
    const element = this.cameraValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.CAMERA',
      traits: [
        'action.devices.traits.CameraStream',
      ],
      defaultNames: [`Smart Camera ${this.devices.length}`],
      name: `Smart Camera ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        cameraStreamSupportedProtocols: [
          'hls',
          'dash'
        ],
        cameraStreamNeedAuthToken: false,
        cameraStreamNeedDrmEncryption: false,
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addCoffeeMaker() {
    if (!this.coffeeMakerValuesArray) {
      this.coffeeMakerValuesArray = [{
        nicknames: ['little coffee pot'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['coffee maker'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['my coffee cup'],
        roomHint: 'Office'
      }, {
        nicknames: ['desktop espresso machine'],
        roomHint: 'Office'
      }];
    }
    const element = this.coffeeMakerValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.COFFEE_MAKER',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureControl',
      ],
      defaultNames: [`Smart Coffee Maker ${this.devices.length}`],
      name: `Smart Coffee Maker ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 0.0,
          maxThresholdCelsius: 100.0
        },
        temperatureUnitForUX: 'C'
      },
      willReportState: true,
      states: {
        online: true,
        temperatureSetpointCelsius: 30,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addCurtain() {
    if (!this.curtainValuesArray) {
      this.curtainValuesArray = [{
        nicknames: ['living room curtain'],
        roomHint: 'Living Room'
      }];
    }
    const element = this.curtainValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.CURTAIN',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Curtain ${this.devices.length}`],
      name: `Smart Curtain ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        openDirection: ['LEFT', 'RIGHT']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openPercent: 0,
          openDirection: 'LEFT'
        }, {
          openPercent: 0,
          openDirection: 'RIGHT'
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addDishwasher() {
    if (!this.dishwasherValuesArray) {
      this.dishwasherValuesArray = [{
        nicknames: ['dish cleaner'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.dishwasherValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.DISHWASHER',
      traits: [
        'action.devices.traits.RunCycle',
        'action.devices.traits.StartStop',
      ],
      defaultNames: [`Smart Dishwasher ${this.devices.length}`],
      name: `Smart Dishwasher ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        pausable: true,
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addDoor() {
    if (!this.doorValuesArray) {
      this.doorValuesArray = [{
        nicknames: ['Back door'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.doorValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.DOOR',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Door ${this.devices.length}`],
      name: `Smart Door ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        openDirection: ['IN', 'OUT']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openDirection: 'IN',
          openPercent: 0
        }, {
          openDirection: 'OUT',
          openPercent: 0
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addDryer() {
    if (!this.dryerValuesArray) {
      this.dryerValuesArray = [{
        nicknames: ['clothes dryer'],
        roomHint: 'Laundry Room'
      }];
    }
    const element = this.dryerValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.DRYER',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.StartStop',
        'action.devices.traits.Modes',
        'action.devices.traits.Toggles',
        'action.devices.traits.RunCycle'
      ],
      defaultNames: [`Smart Dryer ${this.devices.length}`],
      name: `Smart Dryer ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        pausable: true,
        availableModes: [{
          name: 'load',
          name_values: [{
            name_synonym: ['load', 'size', 'load size'],
            lang: 'en'
          }],
          settings: [{
              setting_name: 'small',
              setting_values: [{
                setting_synonym: ['small', 'half'],
                lang: 'en'
              }]
            },
            {
              setting_name: 'large',
              setting_values: [{
                setting_synonym: ['large', 'full'],
                lang: 'en'
              }]
            }
          ],
          ordered: true
        }],
        availableToggles: [{
            name: 'Sterilization',
            name_values: [{
              name_synonym: ['Bio-clean', 'UltraSound'],
              lang: 'en'
            }]
          },
          {
            name: 'Energy Saving',
            name_values: [{
              name_synonym: ['normal', 'medium', 'high'],
              lang: 'en'
            }]
          }
        ]
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addFan() {
    if (!this.fanValuesArray) {
      this.fanValuesArray = [{
        nicknames: ['workshop fan'],
        roomHint: 'Shed'
      }, {
        nicknames: ['kitchen ceiling fan'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['patio fan'],
        roomHint: 'Patio'
      }, {
        nicknames: ['air conditioner'],
        roomHint: 'Den'
      }];
    }
    const element = this.fanValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.FAN',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.FanSpeed',
      ],
      defaultNames: [`Smart Fan ${this.devices.length}`],
      name: `Smart Fan ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableFanSpeeds: {
          speeds: [{
            speed_name: '0',
            speed_values: [{
              speed_synonym: ['off'],
              lang: 'en'
            }]
          }, {
            speed_name: '1',
            speed_values: [{
              speed_synonym: ['low'],
              lang: 'en'
            }]
          }, {
            speed_name: '2',
            speed_values: [{
              speed_synonym: ['medium'],
              lang: 'en'
            }]
          }, {
            speed_name: '3',
            speed_values: [{
              speed_synonym: ['high'],
              lang: 'en'
            }]
          }],
          ordered: true,
        },
        reversible: true
      },
      willReportState: true,
      states: {
        online: true,
        currentFanSpeedSetting: '0',
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addFireplace() {
    if (!this.fireplaceValuesArray) {
      this.fireplaceValuesArray = [{
        nicknames: ['Downstairs Fireplace'],
        roomHint: 'Living Room'
      }, {
        nicknames: ['firepit'],
        roomHint: 'Garden'
      }];
    }
    const element = this.fireplaceValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.FIREPLACE',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Fireplace ${this.devices.length}`],
      name: `Smart Fireplace ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableToggles: [{
          name: 'backlight',
          name_values: [{
            name_synonym: ['backlight', 'mood light'],
            lang: 'en',
          }, {
            name_synonym: ['Hintergrundbeleuchtung', 'Stimmungslicht'],
            lang: 'de'
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addGarage() {
    if (!this.garageValuesArray) {
      this.garageValuesArray = [{
        nicknames: ['left entrance'],
        roomHint: 'Garage'
      }];
    }
    const element = this.garageValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.GARAGE',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Garage ${this.devices.length}`],
      name: `Smart Garage ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      willReportState: true,
      states: {
        online: true,
        openPercent: 0
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addGate() {
    if (!this.gateValuesArray) {
      this.gateValuesArray = [{
        nicknames: ['driveway gate'],
        roomHint: 'Patio'
      }];
    }
    const element = this.gateValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.GATE',
      traits: [
        'action.devices.traits.OpenClose',
      ],
      defaultNames: [`Smart Garage ${this.devices.length}`],
      name: `Smart Garage ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        openDirection: ['IN', 'OUT']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openPercent: 0,
          openDirection: 'IN'
        }, {
          openPercent: 0,
          openDirection: 'OUT'
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addHeater() {
    if (!this.heaterValuesArray) {
      this.heaterValuesArray = [{
        nicknames: ['upstairs heater'],
        roomHint: 'Bedroom'
      }];
    }
    const element = this.heaterValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.HEATER',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.FanSpeed'
      ],
      defaultNames: [`Smart Heater ${this.devices.length}`],
      name: `Smart Heater ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableFanSpeeds: {
          speeds: [{
            speed_name: 'Low',
            speed_values: [{
              speed_synonym: ['low', 'slow'],
              lang: 'en'
            }]
          }, {
            speed_name: 'High',
            speed_values: [{
              speed_synonym: ['high'],
              lang: 'en'
            }]
          }],
          ordered: true
        },
        reversible: true
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addHood() {
    if (!this.hoodValuesArray) {
      this.hoodValuesArray = [{
        nicknames: ['Range hood'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.hoodValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.HOOD',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
        'action.devices.traits.FanSpeed'
      ],
      defaultNames: [`Smart Hood ${this.devices.length}`],
      name: `Smart Hood ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableToggles: [{
          name: 'Light',
          name_values: [{
            name_synonym: [
            'light'
            ],
            lang: 'en'
          }]
        }],
        availableFanSpeeds: {
          speeds: [{
            speed_name: 'Low',
            speed_values: [{
              speed_synonym: [
                'low',
                'slow'
              ],
              lang: 'en'
              }]
            },
            {
            speed_name: 'High',
            speed_values: [{
              speed_synonym: [
                'high'
                ],
                lang: 'en'
              }]
            }
          ],
          ordered: true
        },
        reversible: true
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addKettle() {
    if (!this.kettleValuesArray) {
      this.kettleValuesArray = [{
        nicknames: ['little teapot'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['ramen cooker'],
        roomHint: 'Bedroom'
      }, {
        nicknames: ['solder station'],
        roomHint: 'Shed'
      }];
    }
    const element = this.kettleValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.KETTLE',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureControl',
      ],
      defaultNames: [`Smart Kettle ${this.devices.length}`],
      name: `Smart Kettle ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 0.0,
          maxThresholdCelsius: 100.0
        },
        temperatureUnitForUX: 'C'
      },
      willReportState: true,
      states: {
        online: true,
        temperatureSetpointCelsius: 20,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addLight() {
    if (!this.lightValuesArray) {
      this.lightValuesArray = [{
        nicknames: ['table lamp'],
        roomHint: 'Living Room'
      }, {
        nicknames: ['reading lamp'],
        roomHint: 'Bedroom'
      }, {
        nicknames: ['doorway'],
        roomHint: 'Hallway'
      }, {
        nicknames: ['stairway'],
        roomHint: 'Hallway'
      }];
    }
    const element = this.lightValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.LIGHT',
      traits: [
        'action.devices.traits.Brightness',
        'action.devices.traits.OnOff',
        'action.devices.traits.ColorSetting',
      ],
      defaultNames: [`Smart Light ${this.devices.length}`],
      name: `Smart Light ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        colorModel: 'rgb'
      },
      willReportState: true,
      states: {
        on: false,
        online: true,
        brightness: 90,
        color: {
          spectrumRgb: 0
        }
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addLock() {
    if (!this.lockValuesArray) {
      this.lockValuesArray = [{
        nicknames: ['front door'],
        roomHint: 'Living Room'
      }, {
        nicknames: ['back door'],
        roomHint: 'Garage'
      }];
    }
    const element = this.lockValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.LOCK',
      traits: [
        'action.devices.traits.LockUnlock'
      ],
      defaultNames: [`Smart Lock ${this.devices.length}`],
      name: `Smart Lock ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      willReportState: true,
      states: {
        online: true,
        isLocked: false,
        isJammed: false
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addMicrowave() {
    if (!this.microwaveValuesArray) {
      this.microwaveValuesArray = [{
        nicknames: ['microwave'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.microwaveValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.MICROWAVE',
      traits: [
        'action.devices.traits.StartStop',
        'action.devices.traits.Timer'
      ],
      defaultNames: [`Smart Microwave ${this.devices.length}`],
      name: `Smart Microwave ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        maxTimerLimitSec: 60,
        pausable: true
      },
      willReportState: true,
      states: {
        online: true,
        timerRemainingSec: -1,
        timerPaused: false,
        isRunning: false,
        isPaused: false,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addMonochromeLight() {
    if (!this.monochromeLightValuesArray) {
      this.monochromeLightValuesArray = [{
        nicknames: ['ceiling lights'],
        roomHint: 'Family Room'
      }, {
        nicknames: ['garden lights'],
        roomHint: 'Front Yard'
      }, {
        nicknames: ['workshop light'],
        roomHint: 'Shed'
      }, {
        nicknames: ['porch light'],
        roomHint: 'Front Yard'
      }];
    }
    const element = this.monochromeLightValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.LIGHT',
      traits: [
        'action.devices.traits.Brightness',
        'action.devices.traits.OnOff',
        'action.devices.traits.ColorSetting',
      ],
      defaultNames: [`Smart Lamp ${this.devices.length}`],
      name: `Smart Lamp ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        colorModel: 'rgb',
        colorTemperatureRange: {
          temperatureMinK: 2000,
          temperatureMaxK: 9000
        }
      },
      willReportState: true,
      states: {
        on: false,
        online: true,
        brightness: 90,
        color: {
          temperatureK: 2000
        }
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addOutlet() {
    if (!this.outletValuesArray) {
      this.outletValuesArray = [{
        nicknames: ['smart plug'],
        roomHint: 'Basement'
      }, {
        nicknames: ['wall outlet'],
        roomHint: 'Family Room'
      }];
    }
    const element = this.outletValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.OUTLET',
      traits: [
        'action.devices.traits.OnOff',
      ],
      defaultNames: [`Smart Outlet ${this.devices.length}`],
      name: `Smart Outlet ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      willReportState: true,
      states: {
        online: true,
        on: false
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addOven() {
    if (!this.ovenValuesArray) {
      this.ovenValuesArray = [{
        nicknames: ['oven'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['stove'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['broiler'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['microwave'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.ovenValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.OVEN',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureControl',
      ],
      defaultNames: [`Smart Oven ${this.devices.length}`],
      name: `Smart Oven ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 100.0,
          maxThresholdCelsius: 300.0
        },
        temperatureUnitForUX: 'C'
      },
      willReportState: true,
      states: {
        online: true,
        temperatureSetpointCelsius: 200,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addPergola() {
    if (!this.pergolaValuesArray) {
      this.pergolaValuesArray = [{
        nicknames: ['patio pergola'],
        roomHint: 'Patio'
      }];
    }
    const element = this.pergolaValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.PERGOLA',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Pergola ${this.devices.length}`],
      name: `Smart Pergola ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        openDirection: ['LEFT', 'RIGHT']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openPercent: 0,
          openDirection: 'LEFT'
        }, {
          openPercent: 0,
          openDirection: 'RIGHT'
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addRefrigerator() {
    if (!this.refrigeratorValuesArray) {
      this.refrigeratorValuesArray = [{
        nicknames: ['kitchen refrigerator'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['mini fridge'],
        roomHint: 'Office'
      }, {
        nicknames: ['garage freezer'],
        roomHint: 'Garage'
      }];
    }
    const element = this.refrigeratorValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.REFRIGERATOR',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Fridge ${this.devices.length}`],
      name: `Smart Fridge ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        pausable: true,
        availableToggles: [{
          name: 'quiet',
          name_values: [{
            name_synonym: ['quiet', 'silent'],
            lang: 'en'
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        on: false,
        currentToggleSettings: {
          quiet: false,
        }
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addScene() {
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.SCENE',
      traits: [
        'action.devices.traits.Scene',
      ],
      defaultNames: [`Smart Scene ${this.devices.length}`],
      name: `Smart Scene ${this.devices.length}`,
      nicknames: [`Party Mode`],
      roomHint: '',
      attributes: {
        sceneReversible: true
      },
      willReportState: false,
      states: {
        online: true,
        deactivate: true,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addSecuritySystem() {
    if (!this.securitySystemValuesArray) {
      this.securitySystemValuesArray = [{
        nicknames: ['security panel'],
        roomHint: 'Hallway'
      }];
    }
    const element = this.securitySystemValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.SECURITYSYSTEM',
      traits: [
        'action.devices.traits.ArmDisarm'
      ],
      defaultNames: [`Smart Lock ${this.devices.length}`],
      name: `Smart Lock ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableArmLevels: {
          levels: [{
            level_name: 'L1',
            level_values: [{
              level_synonym: ['home and guarding', 'SL1'],
              lang: 'en'
            }, {
              level_synonym: ['zuhause und bewachen', 'SL1'],
              lang: 'de'
            }]
          }, {
            level_name: 'L2',
            level_values: [{
              level_synonym: ['away and guarding', 'SL2'],
              lang: 'en'
            }, {
              level_synonym: ['weg und bewachen', 'SL2'],
              lang: 'de'
            }]
          }],
          ordered: true
        }
      },
      willReportState: true,
      states: {
        online: true,
        currentArmLevel: 'L1',
        isArmed: false
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addShower() {
    if (!this.showerValuesArray) {
      this.showerValuesArray = [{
        nicknames: ['guest shower'],
        roomHint: 'Bathroom'
      }];
    }
    const element = this.showerValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.SHOWER',
      traits: [
        'action.devices.traits.StartStop',
        'action.devices.traits.OnOff',
        'action.devices.traits.Modes'
      ],
      defaultNames: [`Smart Shower ${this.devices.length}`],
      name: `Smart Shower ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableModes: [{
          name: 'monsoon',
          name_values: [{
            name_synonym: [
              'monsoon',
              'heavy rain',
              'waterfall'
            ],
            lang: 'en'
          }],
          settings: [{
            setting_name: 'trickle',
            setting_values: [{
              setting_synonym: [
                "trickle",
                "gentle"
              ],
              lang: 'en'
            }]
          }]
        }],
        ordered: true
      },
      willReportState: true,
      states: {
        online: true,
        on: false,
        isRunning: false,
        isPaused: false,
        currentModeSettings: {
          monsoon: 'trickle'
        }
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addShutter() {
    if (!this.shutterValuesArray) {
      this.shutterValuesArray = [{
        nicknames: ['back window shutter'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.shutterValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.SHUTTER',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Shutter ${this.devices.length}`],
      name: `Smart Shutter ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        openDirection: ['LEFT', 'RIGHT']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openPercent: 0,
          openDirection: 'LEFT'
        }, {
          openPercent: 0,
          openDirection: 'RIGHT'
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addSprinkler() {
    if (!this.sprinklerValuesArray) {
      this.sprinklerValuesArray = [{
        nicknames: ['front yard sprinklers'],
        roomHint: 'Front Yard'
      }, {
        nicknames: ['garage faucet'],
        roomHint: 'Garage'
      }];
    }
    const element = this.sprinklerValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.SPRINKLER',
      traits: [
        'action.devices.traits.StartStop',
      ],
      defaultNames: [`Smart Sprinkler ${this.devices.length}`],
      name: `Smart Sprinkler ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        pausable: false
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addSwitch() {
    if (!this.switchValuesArray) {
      this.switchValuesArray = [{
        nicknames: ['smart switch'],
        roomHint: 'Living Room'
      }];
    }
    const element = this.switchValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.SWITCH',
      traits: [
        'action.devices.traits.OnOff',
      ],
      defaultNames: [`Smart Switch ${this.devices.length}`],
      name: `Smart Switch ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      willReportState: true,
      states: {
        online: true,
        on: false
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addThermostat() {
    if (!this.thermostatValuesArray) {
      this.thermostatValuesArray = [{
        nicknames: ['wall thermostat'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['upstairs thermostat'],
        roomHint: 'hallway'
      }];
    }
    const element = this.thermostatValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.THERMOSTAT',
      traits: [
        'action.devices.traits.TemperatureSetting',
      ],
      defaultNames: [`Smart Thermostat ${this.devices.length}`],
      name: `Smart Thermostat ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        availableThermostatModes: 'off,heat,cool,on,heatcool',
        temperatureTemperatureUnit: 'C'
      },
      willReportState: true,
      states: {
        online: true,
        thermostatMode: 'off',
        thermostatTemperatureSetpoint: 23,
        thermostatTemperatureAmbient: 25.1,
        thermostatHumidityAmbient: 45.3
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addVacuum() {
    if (!this.vacuumValuesArray) {
      this.vacuumValuesArray = [{
        nicknames: ['kitchen vacuum'],
        roomHint: 'Kitchen'
      }, {
        nicknames: ['robo vacuum'],
        roomHint: 'Master Bedroom'
      }];
    }
    const element = this.vacuumValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.VACUUM',
      traits: [
        'action.devices.traits.StartStop',
        'action.devices.traits.Toggles',
        'action.devices.traits.Dock'
      ],
      defaultNames: [`Smart Vacuum ${this.devices.length}`],
      name: `Smart Vacuum ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        pausable: true,
        availableToggles: [{
          name: 'quiet',
          name_values: [{
            name_synonym: ['quiet', 'silent'],
            lang: 'en'
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        isRunning: false,
        isPaused: false,
        isDocked: false,
        currentToggleSettings: {
          quiet: false
        }
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addValve() {
    if (!this.valveValuesArray) {
      this.valveValuesArray = [{
        nicknames: ['water valve'],
        roomHint: 'Laundry Room'
      }];
    }
    const element = this.valveValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.VALVE',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Valve ${this.devices.length}`],
      name: `Smart Valve ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      willReportState: true,
      states: {
        online: true,
        openPercent: 0
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addWasher() {
    if (!this.washerValuesArray) {
      this.washerValuesArray = [{
        nicknames: ['washing machine'],
        roomHint: 'Laundry Room'
      }, {
        nicknames: ['acme washer'],
        roomHint: 'Laundry Room'
      }];
    }
    const element = this.washerValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.WASHER',
      traits: [
        'action.devices.traits.RunCycle',
        'action.devices.traits.Modes',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Washer ${this.devices.length}`],
      name: `Smart Washer ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        pausable: true,
        availableModes: [{
          name: 'load',
          name_values: [{
            name_synonym: ['load', 'size'],
            lang: 'en'
          }],
          settings: [{
            setting_name: 'small',
            setting_values: [{
              setting_synonym: ['small'],
              lang: 'en'
            }]
          }, {
            setting_name: 'large',
            setting_values: [{
              setting_synonym: ['large'],
              lang: 'en'
            }]
          }]
        }],
        availableToggles: [{
          name: 'quiet',
          name_values: [{
            name_synonym: ['quiet', 'silent'],
            lang: 'en'
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        currentModeSettings: {
          load: 'small',
        },
        currentToggleSettings: {
          quiet: false,
        },
        currentRunCycle: [{
          currentCycle: "rinse",
          nextCycle: "spin",
          lang: "en"
        }],
        currentTotalRemainingTime: 1212,
        currentCycleRemainingTime: 301,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
    this._createDevice(device);
  }

  _addWaterHeater() {
    if (!this.waterHeaterValuesArray) {
      this.waterHeaterValuesArray = [{
        nicknames: ['basement water heater'],
        roomHint: 'Basement'
      }];
    }
    const element = this.waterHeaterValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.WATERHEATER',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureControl'
      ],
      defaultNames: [`Smart Water Heater ${this.devices.length}`],
      name: `Smart Water Heater ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 10,
          maxThresholdCelsius: 50
        },
        temperatureUnitForUX: 'F'
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
  }

  _addWindow() {
    if (!this.windowValuesArray) {
      this.windowValuesArray = [{
        nicknames: ['sink window'],
        roomHint: 'Kitchen'
      }];
    }
    const element = this.windowValuesArray.shift();
    const device = {
      id: this._genUuid(),
      type: 'action.devices.types.WINDOW',
      traits: [
        'action.devices.traits.LockUnlock',
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Window ${this.devices.length}`],
      name: `Smart Window ${this.devices.length}`,
      nicknames: this._getNicknames(element),
      roomHint: this._getRoomHint(element),
      willReportState: true,
      states: {
        online: true,
        openPercent: 0
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
    this._createDevice(device);
}
}

window.customElements.define('my-app', MyApp);
