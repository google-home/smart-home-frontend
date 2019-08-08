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
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';

import './smart-device.js';
import './device-types/ac-unit.js';
import './device-types/air-freshener.js';
import './device-types/air-purifier.js';
import './device-types/awning.js';
import './device-types/blinds.js';
import './device-types/boiler.js';
import './device-types/camera.js';
import './device-types/coffee-maker.js';
import './device-types/curtain.js';
import './device-types/dishwasher.js';
import './device-types/door.js';
import './device-types/dryer.js';
import './device-types/fan.js';
import './device-types/fireplace.js';
import './device-types/garage.js';
import './device-types/gate.js';
import './device-types/heater.js';
import './device-types/hood.js';
import './device-types/kettle.js';
import './device-types/lock.js';
import './device-types/microwave.js';
import './device-types/light.js';
import './device-types/outlet.js';
import './device-types/oven.js';
import './device-types/pergola.js';
import './device-types/refrigerator.js';
import './device-types/scene.js';
import './device-types/security-system.js';
import './device-types/shower.js';
import './device-types/shutter.js';
import './device-types/sprinkler.js';
import './device-types/switch.js';
import './device-types/thermostat.js';
import './device-types/vacuum.js';
import './device-types/valve.js';
import './device-types/washer.js';
import './device-types/water-heater.js';
import './device-types/window.js';
import './device-types/importer.js';

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

      #insert-json-textarea {
        width: 40em;
        height: 20em;
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

      .close {
        height: 30px;
        width: 80px;
        margin-top: 0px;
        float: right;
      }

      .close > iron-icon {
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

      #no-devices-msg > p {
        text-align: center;
      }

      #check {
        display: none;
      }

      .item {
        display: inline-block;
        vertical-align: top;
      }

      paper-dialog paper-button {
        background-color: red;
        color: white;
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
      <div class="close">
        <iron-icon icon="icons:close" dialog-confirm autofocus></iron-icon>
      </div>
      <div class="layout horizontal center-justified">
        <h1>Add a new device</h1>
        <template is="dom-repeat" items="{{deviceTypes}}">
          <button dialog-confirm autofocus class="square" id$="{{item.identifier}}">
            <iron-icon icon="{{item.icon}}"></iron-icon>
            <p>{{item.label}}</p>
          </button>
        </template>
      </div>
    </paper-dialog>

    <paper-dialog id="insert-json" modal>
      <div class="close">
        <iron-icon icon="icons:close" dialog-confirm autofocus></iron-icon>
      </div>
      <div>
        <p>Paste the JSON SYNC response for a single device to recreate it</p>
        <textarea id="insert-json-textarea"></textarea><br>
        <div id="insert-json-message"></div>
        <paper-button raised id="insert-json-import">Import</paper-button>
      </div>
    </paper-dialog>

    <paper-dialog id="error-code" modal>
      <paper-toggle-button id="error-code-offline" checked="{{errorCodeOffline}}">Offline</paper-toggle-button>
      <paper-input id="error-code-input" label="Error Code" value$="{{errorCode}}" disabled="[[errorCodeOffline]]"></paper-input>
      <a href="https://developers.google.com/actions/smarthome/reference/errors-exceptions#error_list" target="_blank">
        Full list of error codes
      </a>
      <br>
      <paper-button raised id="error-code-submit">Okay</paper-button>
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
            id="d-[[item.deviceId]]"
            localexecution=[[item.localDeviceExecution]]
            localdeviceid=[[item.localDeviceId]]>
          </smart-device>
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
      },
      deviceTypes: {
        type: Array,
        value: window.deviceTypes
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

    window.requestAnimationFrame(async () => {
      this.$.add.addEventListener('click', () => this.$.modal.open());

      // Read from database to get current devices
      const querySnapshot = await this.db.collection('users').doc('1234').collection('devices').get()
      querySnapshot.forEach(doc => {
        const data = doc.data();
        data.deviceId = doc.id;
        this._addDevice(data);
        this.addDbListener(doc.id);
      })

      this.deviceTypes.forEach(type => {
        const element = this.$.modal.querySelector(`#${type.identifier}`)
        element.addEventListener('click', () => {
          type.function(this)
        });
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

  async _createDevice(device) {
    this._addDevice(device);
    // Push new device to database
    try {
      await fetch(`${API_ENDPOINT}/smarthome/create`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          userId: '1234',
          data: device
        })
      })
      this.addDbListener(device.id);
    } catch (e) {
      console.error(e);
    }
  }

  _addDevice(device) {
    device.deviceId = device.id;
    device.localDeviceExecution = (device.otherDeviceIds !== undefined &&
                                   device.otherDeviceIds.length > 0);
    if (device.localDeviceExecution) {
      device.localDeviceId = device.otherDeviceIds[0].deviceId;
    }
    this.push('devices', device);
    this.hide = true;
  }
}

window.customElements.define('my-app', MyApp);
