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
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js'
import '@polymer/paper-input/paper-input.js'
import '@polymer/paper-slider/paper-slider.js'
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

const ENTERKEY = 13;

export class SmartDevice extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-alignment">
        paper-input {
          padding-right: 4px;
        }

        paper-button {
          height: 40px;
          float: right;
          margin-right: 0px;
        }

        paper-icon-button {
          color: #555;
        }

        iron-icon {
          height: 96px;
          width: 96px;
          margin-top: 8px;
          margin-bottom: 8px;
          transition-duration: 300ms;
        }

        ::slotted(iron-icon) {
          padding-top: 24px;
          padding-bottom: 24px;
          width: 128px;
          height: 128px;
        }

        .card {
          min-height: 340px;
          width: 300px;
          background-color: white;
          margin-left: 8px;
          margin-top: 4px;
          border: solid 1px #999;
          border-radius: 16px;
          padding: 4px;
          margin-bottom: 16px;
        }

        .on {
          color: black;
        }

        .off {
          color: #eee;
        }

        .circle {
          background-color: #efefef;
          border-radius: 24px;
          padding-top: 8px;
          font-size: 10pt;
          padding-left: 8px;
          padding-right: 9px;
        }

        .center {
          text-align: center;
        }

        #button-bar {
          margin-bottom: 8px;
          text-align: right;
        }

        paper-slider {
          display: none;
        }

        .disabled {
          text-decoration: line-through;
        }

        .statusReport {
          color: #BDBDBD;
        }

        .statusReportActive {
          color: #FF9800;
        }
      </style>

      <div class="card">
        <div id="button-bar" class="layout horizontal justified">
          <div id="device-id" class="circle">{{deviceid}}</div>
          <div class="flex"></div>

          <paper-icon-button id="reportState" icon="arrow-downward"
              on-tap="_handleReportState">
          </paper-icon-button>
          <paper-tooltip for="reportState" animation-delay="0">
            Enable or disable state reporting
          </paper-tooltip>
          <paper-icon-button id="tfa" icon="lock" on-tap="_handleTfa">
          </paper-icon-button>
          <paper-tooltip for="tfa" animation-delay="0">
            Configure two-factor authentication
          </paper-tooltip>
          <paper-icon-button id="cloud" icon="cloud-off" on-tap="_handleCloud">
          </paper-icon-button>
          <paper-tooltip for="cloud" animation-delay="0">
            Mark device as online or offline
          </paper-tooltip>
          <paper-icon-button id="delete" icon="delete" on-tap="_handleDelete">
          </paper-icon-button>
          <paper-tooltip for="delete" animation-delay="0">
            Delete this device
          </paper-tooltip>
        </div>

        <!-- icon -->
        <div class="center">
          <paper-slider id="brightness" title="Brightness" pin
              disabled="[[!device.states.on]]"
              value="{{device.states.brightness}}">
          </paper-slider>
          <paper-slider id="temperatureSetpointCelsius" title="Setpoint" pin
              min="0"
              max="500"
              step="10"
              value="{{device.states.temperatureSetpointCelsius}}">
          </paper-slider>
          <paper-slider id="thermostatTemperatureSetpoint" title="Setpoint" pin
              min="18"
              max="35"
              value="{{device.states.thermostatTemperatureSetpoint}}">
          </paper-slider>
          <paper-slider id="humiditySetpointPercent" title="Setpoint" pin
              min="0"
              max="100"
              value="{{device.states.humiditySetpointPercent}}">
          </paper-slider>
          <iron-icon id="icon"></iron-icon>
          <div id="states"></div>
        </div>

        <!-- controls -->
        <paper-input id="nickname" label="Nickname"
            value$="{{device.nicknames.0}}">
        </paper-input>
        <paper-input id="name" label="Name" value$="{{device.name}}">
        </paper-input>
        <div>Default Name:
          <span id='defaultName'>{{device.defaultNames.0}}</span>
        </div>

        <!-- local execution -->
        <div>
          <paper-toggle-button id="localExecution" checked="{{localexecution}}">
            Local Execution
          </paper-toggle-button>
          <paper-input id="localDeviceId" label="Local Device ID"
              value="{{localdeviceid}}"
              disabled="[[!localexecution]]">
          </paper-input>
        </div>
      </div>
    `
  }

  static get properties() {
    return {
      device: {
        type: Object,
      },
      index: {
        type: Number,
      },
      deviceid: {
        type: String,
      },
      localexecution: {
        type: Boolean,
      },
      localdeviceid: {
        type: String,
      },
    }
  }

  static get observers() {
    return [
      '_localExecutionChanged(localexecution, localdeviceid)',
    ]
  }

  ready() {
    super.ready()
  }

  connectedCallback() {
    super.connectedCallback();
    window.requestAnimationFrame(() => {
      this._setIcon();
      this._registerTraits();
      this._deviceChanged();

      this.$.nickname.addEventListener('keydown',
          this._handleNameOrNicknameChange.bind(this));
      this.$.nickname.addEventListener('blur',
          this._execNameOrNicknameChange.bind(this));

      this.$.name.addEventListener('keydown',
          this._handleNameOrNicknameChange.bind(this));
      this.$.name.addEventListener('blur',
          this._execNameOrNicknameChange.bind(this));
    });
  }

  /**
   * Event that occurs after enter/tab key pressed or on tapout from
   * input field
   * @param {event} event DOM event.
   * @return {Promise<void>}
   */
  _execNameOrNicknameChange(event) {
    if (event.target.id == 'nickname') {
      this.device.nicknames[0] = event.target.value;

      // eslint-disable-next-line
      return fetch(`${API_ENDPOINT}/smarthome/update`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          userId: '1234',
          deviceId: this.deviceid,
          nickname: this.device.nicknames[0],
        }),
      })
    } else if (event.target.id == 'name') {
      this.device.name = event.target.value;

      // eslint-disable-next-line
      return fetch(`${API_ENDPOINT}/smarthome/update`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          userId: '1234',
          deviceId: this.deviceid,
          name: this.device.name,
        }),
      })
    }
  }

  /**
   * Event that occurs when the user presses the enter key in the
   * input field
   * @param {event} event DOM event.
   */
  _handleNameOrNicknameChange(event) {
    if (event.which == ENTERKEY) this.blur();
  }

  _setIcon() {
    const icon = window.iconMap[this.device.type]
    if (typeof icon === 'string') {
      this.$.icon.icon = icon;
    } else {
      this.$.icon.icon = icon(this.device.attributes);
    }
  }

  _handleReportState() {
    this.device.willReportState = !this.device.willReportState;
    this._deviceChanged();
  }

  _handleCloud() {
    const app = document.querySelector('my-app');
    app.$['error-code'].open();
    app.errorCodeOffline = !this.device.states.online;
    app.errorCode = this.device.states.errorCode;
    app.$['error-code-submit'].onclick = () => {
      this.device.states.online = !app.$['error-code-offline'].checked;
      this.device.errorCode = app.$['error-code-input'].value;
      app.$['error-code'].close();
      this._updateState();
    }
  }

  _handleTfa() {
    const app = document.querySelector('my-app');
    app.$['two-factor'].open();
    app.twoFactorAck = this.device.tfa === 'ack';
    app.twoFactorPin = this.device.tfa === 'ack' ? '' : this.device.tfa;
    app.$['two-factor-submit'].onclick = () => {
      if (app.$['two-factor-ack'].checked) {
        this.device.tfa = 'ack';
      } else {
        this.device.tfa = app.$['two-factor-input'].value;
      }
      app.$['two-factor'].close();
      this._updateState();
    }
  }

  _handleDelete() {
    const app = document.querySelector('my-app');
    // Disable button to prevent multiple delete operations
    this.$.delete.disabled = true;
    app.removeDevice(this.deviceid);
  }

  _localExecutionChanged(localexecution, localdeviceid) {
    // eslint-disable-next-line
    return fetch(`${API_ENDPOINT}/smarthome/update`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        userId: '1234',
        deviceId: this.deviceid,
        localDeviceId: localexecution ? localdeviceid : null,
      }),
    }).catch((e) => {
      console.error('failed to update device', e);
    });
  }

  _deviceChanged() {
    this.$.reportState.style.color =
        this.device.willReportState ? '#4CAF50' : '#757575';
    this.$.reportState.icon =
        this.device.willReportState ? 'arrow-upward' : 'arrow-downward';
    this.$.cloud.icon = this.device.states.online ? 'cloud' : 'cloud-off';
    if (this.device.errorCode) {
      this.$.cloud.style.color = '#E64A19';
      this.$.cloud.title = this.device.errorCode;
    } else {
      this.$.cloud.style.color = 'inherit';
      this.$.cloud.title = '';
    }
    this.$.tfa.icon = this.device.tfa ? 'lock' : 'lock-open';
    this.$.tfa.title = this.device.tfa;
    window.requestAnimationFrame(() => {
      this.traitHandlers.forEach((fun) => {
        fun(this.device.states);
      });
    });
  }

  _updateState() {
    this._deviceChanged();
    if (!this.device.willReportState) return;

    // Push state
    // eslint-disable-next-line
    return fetch(`${API_ENDPOINT}/smarthome/update`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        userId: '1234',
        deviceId: this.deviceid,
        errorCode: this.device.errorCode,
        states: this.device.states,
        tfa: this.device.tfa,
      }),
    })
  }

  _registerTraits() {
    this.traitHandlers = [];
    const {traits} = this.device;
    traits.forEach((trait) => {
      switch (trait) {
        case 'action.devices.traits.AppSelector':
          const appElement = document.createElement('div');
          appElement.appendChild(document.createTextNode(`App: `))
          appElement.id = `states-appselector`;
          const appValue = document.createElement('span');
          appElement.appendChild(appValue);
          this.$.states.appendChild(appElement);
          this.traitHandlers.push((states) => {
            appValue.innerText = states.currentApplication
          })
          break;

        case 'action.devices.traits.ArmDisarm':
          this.traitHandlers.push((states) => {
            switch (states.currentArmLevel) {
              case 'L1':
                this.$.icon.style.color = '#555555';
                break;
              case 'L2':
                this.$.icon.style.color = '#FF9800';
                break;
            }
          });
          break;

        case 'action.devices.traits.Brightness':
          this.$.brightness.style.display = 'block';
          this.$.brightness.addEventListener('value-change', (event) => {
            this.device.states.brightness = this.$.brightness.value;
            this._updateState();
          });
          this.traitHandlers.push((states) => {
            this.$.icon.style.opacity = states.brightness / 100;
          });
          break;

        case 'action.devices.traits.ColorSetting':
          this.traitHandlers.push((states) => {
            if (!states.on) return;
            if (states.color.spectrumRgb) {
              let rgb = states.color.spectrumRgb;
              rgb = rgb.toString(16);
              while (rgb.length < 6) {
                rgb = '0' + rgb;
              }
              rgb = '#' + rgb;
              this.$.icon.style.color = rgb;
            } else if (states.color.spectrumHsv) {
              this.$.icon.style.color = 'blue'
            } else if (states.color.temperatureK) {
              this.$.icon.style.color = '#fffacd';
            }
          })
          break;

        case 'action.devices.traits.Cook':
          const cookElement = document.createElement('div');
          cookElement.appendChild(document.createTextNode(`Cooking: `))
          cookElement.id = `states-cook`;
          const cookValue = document.createElement('span');
          cookElement.appendChild(cookValue);
          this.$.states.appendChild(cookElement);

          this.traitHandlers.push((states) => {
            const elementValue =
              this.$.states.querySelector(`#states-cook span`);
            if (!elementValue) return;
            if (states.currentCookingMode === 'NONE') {
              elementValue.innerText = 'Nothing is being cooked'
            } else {
              elementValue.innerText = `${states.currentCookingMode} ` +
                `${states.currentFoodPreset} ` +
                `(${states.currentFoodQuantity} ${states.currentFoodUnit})`
            }
          })
          break;

        case 'action.devices.traits.Dispense':
          const dispenseElement = document.createElement('div');
          dispenseElement.appendChild(document.createTextNode(`Dispensed: `))
          dispenseElement.id = `states-dispense`;
          const dispenseValue = document.createElement('span');
          dispenseElement.appendChild(dispenseValue);
          this.$.states.appendChild(dispenseElement);

          this.traitHandlers.push((states) => {
            if (states.isCurrentlyDispensing) {
              this.$.icon.style.color = '#2196F3';
            } else {
              this.$.icon.style.color = '#333333';
            }
            const elementValue =
              this.$.states.querySelector(`#states-dispense span`);
            if (!elementValue) return;
            elementValue.innerText =
              `${states.dispenseItems[0].amountLastDispensed.amount} ` +
              states.dispenseItems[0].amountLastDispensed.unit;
          })
          break;

        case 'action.devices.traits.Dock':
          // Create a 'Dock' element
          const dockElement = document.createElement('span');
          dockElement.id = 'states-isdocked';
          const dockLabel = document.createTextNode('Docked');
          dockElement.appendChild(dockLabel);
          this.$.states.appendChild(dockElement);
          this.traitHandlers.push((states) => {
            const dockedElement =
              this.$.states.querySelector('#states-isdocked');
            if (states.isDocked) {
              dockedElement.classList.remove('disabled');
            } else {
              dockedElement.classList.add('disabled');
            }
          });
          break;

        case 'action.devices.traits.EnergyStorage':
          this.traitHandlers.push((states) => {
            if (states.isCharging) {
              this.$.icon.style.color = '#9bea00';
            } else {
              this.$.icon.style.color = '#333333';
            }
          })
          break

        case 'action.devices.traits.FanSpeed':
          this.traitHandlers.push((states) => {
            switch (states.currentFanSpeedSetting) {
              case '0':
                this.$.icon.style.color = '#eee';
                break;
              case '1':
                this.$.icon.style.color = '#d4e8ae';
                break;
              case '2':
                this.$.icon.style.color = '#b1e253';
                break;
              case '3':
                this.$.icon.style.color = '#9bea00';
                break;
            }
          });
          break;

        case 'action.devices.traits.Fill':
          const fillElement = document.createElement('div');
          fillElement.appendChild(document.createTextNode(`Fill: `))
          fillElement.id = `states-fill`;
          const fillValue = document.createElement('span');
          fillElement.appendChild(fillValue);
          this.$.states.appendChild(fillElement);
          this.traitHandlers.push((states) => {
            if (states.isFilled) {
              this.$.icon.style.color = '#2196F3';
            } else {
              this.$.icon.style.color = '#333333';
            }
            const elementValue =
              this.$.states.querySelector(`#states-fill span`);
            if (!elementValue) return;
            elementValue.innerText = states.currentFillLevel;
          })
          break;

        case 'action.devices.traits.HumiditySetting':
          this.$.humiditySetpointPercent.style.display = 'block';
          this.$.humiditySetpointPercent.addEventListener('input', (_) => {
            this.device.states.humiditySetpointPercent =
              this.$.humiditySetpointPercent.value;
            this._updateState();
          });

          this.traitHandlers.push((states) => {
            this.$.humiditySetpointPercent.value =
              states.humiditySetpointPercent
          })
          break;

        case 'action.devices.traits.InputSelector':
          const inputElement = document.createElement('div');
          inputElement.appendChild(document.createTextNode(`Input: `))
          inputElement.id = `states-inputselector`;
          const inputValue = document.createElement('span');
          inputElement.appendChild(inputValue);
          this.$.states.appendChild(inputElement);
          this.traitHandlers.push((states) => {
            inputValue.innerText = states.currentInput
          })
          break;

        case 'action.devices.traits.Locator':
          this.traitHandlers.push((states) => {
            if (states.generatedAlert) {
              if (states.silent) {
                this.$.icon.style.color = '#555';
              } else {
                this.$.icon.style.color = '#009688';
              }
              this.states.generatedAlert = false;
              this._updateState();
            }
          });
          break;

        case 'action.devices.traits.LockUnlock':
          this.traitHandlers.push((states) => {
            if (states.isJammed) {
              this.$.icon.style.color = '#F44336';
            } else if (states.isLocked) {
              this.$.icon.style.color = '#FF9800';
            } else {
              this.$.icon.style.color = '#555555';
            }

            if (this.device.type === 'action.devices.types.LOCK') {
              if (states.isLocked) {
                this.$.icon.icon = 'icons:lock';
              } else {
                this.$.icon.icon = 'icons:lock-open';
              }
            }
          });
          break;

        case 'action.devices.traits.MediaState':
          const mediaElement = document.createElement('div');
          mediaElement.id = `states-mediastate`;
          this.$.states.appendChild(mediaElement);
          this.traitHandlers.push((states) => {
            if (states.activityState === 'INACTIVE') {
              mediaElement.innerText = 'Currently inactive'
            } else if (states.activityState === 'STANDBY') {
              mediaElement.innerText = 'Ready to play'
            } else if (states.activityState === 'ACTIVE') {
              const {playbackState} = states
              mediaElement.innerText = playbackState
            }
          })
          break;

        case 'action.devices.traits.Modes':
          this.device.attributes.availableModes.forEach((mode) => {
            // Add a block for each mode
            const modeElement = document.createElement('div');
            modeElement.appendChild(document.createTextNode(`${mode.name}: `))
            modeElement.id = `states-${mode.name}`;
            const modeValue = document.createElement('span');
            modeElement.appendChild(modeValue);
            this.$.states.appendChild(modeElement);
          })
          this.traitHandlers.push((states) => {
            const entries = Object.entries(states.currentModeSettings)
            for (const [mode, setting] of entries) {
              const elementId = `states-${mode}`
              const elementValue =
                this.$.states.querySelector(`#${elementId} span`);
              if (!elementValue) return;
              elementValue.innerText = setting;
            }
          });
          break;

        case 'action.devices.traits.OnOff':
          this.$.icon.style.cursor = 'pointer';
          this.$.icon.addEventListener('tap', (event) => {
            this.device.states.on = !this.device.states.on;
            this._updateState();
          });
          this.traitHandlers.push((states) => {
            if (states.on) {
              this.$.icon.style.color = '#4CAF50';
            } else {
              this.$.icon.style.color = '#333333';
            }
          })
          break;

        case 'action.devices.traits.OpenClose':
          this.$.icon.style.cursor = 'pointer';
          this.$.icon.addEventListener('tap', (event) => {
            if (this.device.attributes &&
                this.device.attributes.openDirection) {
              // Tap will open/close in the primary direction
              const percent = this.device.states.openState[0].openPercent;
              if (percent > 0) {
                this.device.states.openState[0].openPercent = 0;
              } else {
                this.device.states.openState[0].openPercent = 100;
              }
            } else {
              // There is only one direction
              const percent = this.device.states.openPercent;
              if (percent > 0) {
                this.device.states.openPercent = 0;
              } else {
                this.device.states.openPercent = 100;
              }
            }
            this._updateState();
          });
          this.traitHandlers.push((states) => {
            let percent = 0
            if (this.device.attributes &&
                this.device.attributes.openDirection) {
              // Only show percentage for primary direction
              percent = states.openState[0].openPercent;
            } else {
              percent = states.openPercent;
            }
            if (percent > 0) {
              // Change opacity based on how open it is
              this.$.icon.style.color = '#673AB7';
              this.$.icon.style.opacity = percent / 100;
            } else {
              // Not open at all
              this.$.icon.style.color = '#333333';
            }
          })
          break;

          // 'action.devices.traits.Reboot'
          // As this trait does not have its own state,
          // the online state will be turned off.
          // The field will need to be manually turned back on.

        case 'action.devices.traits.Rotation':
          this.traitHandlers.push((states) => {
            this.$.icon.style.transform =
              `rotate(${states.rotationDegrees}deg)`;
          })
          break;

        case 'action.devices.traits.RunCycle':
          // Add a block for the current run cycle
          const runCycleElement = document.createElement('div');
          runCycleElement.appendChild(document.createTextNode('cycle: '))
          runCycleElement.id = 'states-runcycle';

          const runCycleValue = document.createElement('span');
          runCycleValue.id = 'states-runcycle-current';
          runCycleElement.appendChild(runCycleValue);

          const runCycleTimes = document.createElement('span');
          runCycleTimes.id = 'states-runcycle-time';
          runCycleElement.appendChild(runCycleTimes);

          this.$.states.appendChild(runCycleElement);
          this.traitHandlers.push((states) => {
            const currentCycleElement =
              this.$.states.querySelector(`#states-runcycle-current`);
            currentCycleElement.innerText =
              states.currentRunCycle[0].currentCycle;

            const currentTimeElement =
              this.$.states.querySelector(`#states-runcycle-time`);
            currentTimeElement.innerText =
              ` ${states.currentCycleRemainingTime}/` +
              `${states.currentTotalRemainingTime} seconds`;
          });
          break;

        case 'action.devices.traits.Scene':
          this.traitHandlers.push((states) => {
            if (!states.deactivate) {
              this.$.icon.style.color = '#4CAF50';
            } else {
              this.$.icon.style.color = '#555555';
            }
          });
          break;

          // 'action.devices.traits.SoftwareUpdate'
          // The online state will be turned off.
          // The field will need to be manually turned back on.

        case 'action.devices.traits.StartStop':
          this.traitHandlers.push((states) => {
            if (states.isRunning) {
              if (states.isPaused) {
                this.$.icon.style.color = '#FF9800';
              } else {
                this.$.icon.style.color = '#4CAF50';
              }
            } else {
              this.$.icon.style.color = '#555555';
            }
          });
          break;

        case 'action.devices.traits.StatusReport':
          const report = this.device.states.currentStatusReport;
          const toggleStatus = (report, statusCode, status) => {
            const index = report.findIndex((status) =>
              status.statusCode === statusCode);
            if (index > -1) {
              this.device.states.currentStatusReport.splice(index, 1);
              this._updateState();
            } else {
              this.device.states.currentStatusReport.push(status);
              this._updateState();
            }
          }
          const deviceTarget = this.$['device-id'].innerText;
          // Add three possible status reports which can be toggled
          const lowBattery = {
            blocking: false,
            priority: 0,
            statusCode: 'lowBattery',
            deviceTarget,
          };
          const lowBatteryIcon = document.createElement('paper-icon-button');
          lowBatteryIcon.icon = 'device:battery-alert';
          lowBatteryIcon.classList.add('statusReport');
          lowBatteryIcon.addEventListener('click', () => {
            toggleStatus(report, 'lowBattery', lowBattery);
          });

          const hardwareFailure = {
            blocking: true,
            priority: 0,
            statusCode: 'hardwareFailure',
            deviceTarget,
          };
          const hardwareFailureIcon =
            document.createElement('paper-icon-button');
          hardwareFailureIcon.icon = 'communication:no-sim';
          hardwareFailureIcon.classList.add('statusReport');
          hardwareFailureIcon.addEventListener('click', () => {
            toggleStatus(report, 'hardwareFailure', hardwareFailure);
          })

          const smokeDetected = {
            blocking: false,
            priority: 1,
            statusCode: 'smokeDetected',
            deviceTarget,
          };
          const smokeDetectedIcon = document.createElement('paper-icon-button');
          smokeDetectedIcon.icon = 'social:whatshot';
          smokeDetectedIcon.classList.add('statusReport');
          smokeDetectedIcon.addEventListener('click', () => {
            toggleStatus(report, 'smokeDetected', smokeDetected);
          })

          // Add each element to the device card
          this.$.states.appendChild(lowBatteryIcon);
          this.$.states.appendChild(hardwareFailureIcon);
          this.$.states.appendChild(smokeDetectedIcon);

          this.traitHandlers.push((states) => {
            if (states.currentStatusReport) {
              lowBatteryIcon.classList.remove('statusReportActive');
              hardwareFailureIcon.classList.remove('statusReportActive');
              smokeDetectedIcon.classList.remove('statusReportActive');
              for (const status of states.currentStatusReport) {
                if (status.statusCode === 'lowBattery') {
                  lowBatteryIcon.classList.add('statusReportActive');
                }
                if (status.statusCode === 'hardwareFailure') {
                  hardwareFailureIcon.classList.add('statusReportActive');
                }
                if (status.statusCode === 'smokeDetected') {
                  smokeDetectedIcon.classList.add('statusReportActive');
                }
              }
            }
          })

          break;

        case 'action.devices.traits.TemperatureControl':
          this.$.temperatureSetpointCelsius.style.display = 'block';
          this.$.temperatureSetpointCelsius.addEventListener('value-change',
              (event) => {
                this.device.states.temperatureSetpointCelsius =
                  this.$.temperatureSetpointCelsius.value;
                this._updateState();
              });
          break;

        case 'action.devices.traits.TemperatureSetting':
          this.$.thermostatTemperatureSetpoint.style.display = 'block';
          this.$.thermostatTemperatureSetpoint.addEventListener('value-change',
              (event) => {
                this.device.states.thermostatTemperatureSetpoint =
                  this.$.thermostatTemperatureSetpoint.value;
                this._updateState();
              });

          const thermostatElement = document.createElement('span');
          thermostatElement.id = 'states-thermostatmode';
          const thermostatLabel = document.createTextNode('Mode: n/a');
          thermostatElement.appendChild(thermostatLabel);
          this.$.states.appendChild(thermostatElement);
          this.traitHandlers.push((states) => {
            const thermostatElement =
              this.$.states.querySelector(`#states-thermostatmode`);
            thermostatElement.innerText = states.thermostatMode;
          });
          break;

        case 'action.devices.traits.Timer':
          // Add a block for the timer
          const timerElement = document.createElement('div');
          timerElement.appendChild(document.createTextNode(`Timer: `))
          timerElement.id = `states-timer`;
          const modeValue = document.createElement('span');
          timerElement.appendChild(modeValue);
          this.$.states.appendChild(timerElement);

          this.$.icon.addEventListener('tap', (event) => {
            // Finish the Timer task
            this.device.states.timerRemainingSec = -1;
            this._updateState();
          });

          this.traitHandlers.push((states) => {
            const elementId = `states-timer`
            const elementValue =
              this.$.states.querySelector(`#${elementId} span`);
            if (!elementValue) return;
            if (states.timerRemainingSec === -1) {
              // -1 means no timer set
              elementValue.innerText = 'No timer set'
            } else {
              elementValue.innerText = `${states.timerRemainingSec}s remaining`;
              if (states.timerPaused) {
                elementValue.innerText += ' (Paused)';
              }
            }
          });
          break;

        case 'action.devices.traits.Toggles':
          this.device.attributes.availableToggles.forEach((toggle) => {
            // Add a block for each toggle
            const toggleElement = document.createElement('div');
            toggleElement.appendChild(document.createTextNode(toggle.name))
            toggleElement.id = `states-${toggle.name}`;
            this.$.states.appendChild(toggleElement);
          })
          this.traitHandlers.push((states) => {
            const entries = Object.entries(states.currentToggleSettings)
            for (const [toggle, setting] of entries) {
              const elementId = `states-${toggle}`
              const elementValue = this.$.states.querySelector(`#${elementId}`);
              if (!elementValue) return;

              if (setting) {
                elementValue.classList.remove('disabled');
              } else {
                elementValue.classList.add('disabled');
              }
            }
          });
          break;

        case 'action.devices.traits.Volume':
          const volumeElement = document.createElement('div');
          volumeElement.appendChild(document.createTextNode(`Volume: `))
          volumeElement.id = `states-volume`;
          const volumeValue = document.createElement('span');
          volumeElement.appendChild(volumeValue);
          this.$.states.appendChild(volumeElement);
          this.traitHandlers.push((states) => {
            volumeValue.innerText = states.currentVolume
          })
          break;

        case 'action.devices.traits.CameraStream':
        default:
          // No state changes will be shown
          break;
      }
    })
  }

  receiveState(device) {
    this.device = device;
    this._deviceChanged();
  }
}

window.customElements.define('smart-device', SmartDevice);
