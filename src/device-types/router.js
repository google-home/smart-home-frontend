/**
 * Copyright 2019, Google, Inc.
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
import { DeviceType } from './device-type';

let instance;
const LAST_WEEK = new Date();
LAST_WEEK.setDate(LAST_WEEK.getDate() - 7);
const LAST_WEEK_SEC = Math.floor(LAST_WEEK.getTime() / 1000)

const type = 'action.devices.types.ROUTER'

class Router extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['upstairs router'],
      roomHint: 'Family Room',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Router()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Reboot',
        'action.devices.traits.SoftwareUpdate',
        'action.devices.traits.NetworkControl',
        'action.devices.traits.Modes',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Router`],
      name: `Smart Router`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportsEnablingGuestNetwork: true,
        supportsDisablingGuestNetwork: true,
        supportsNetworkDownloadSpeedTest: true,
        supportsNetworkUploadSpeedTest: true,
        supportsGettingGuestNetworkPassword: true,
        supportsEnablingNetworkProfile: true,
        supportsDisablingNetworkProfile: true,
        networkProfiles: ['kids'],
        availableToggles: [{
          name: 'PowerSaverMode',
          name_values: [{
            name_synonym: ['power saver', 'low power mode'],
            lang: 'en',
          }],
        }],
        availableModes: [{
          name: 'ParentalControl',
          name_values: [{
            name_synonym: ['parental restriction', 'restriction'],
            lang: 'en',
          }],
          ordered: true,
          settings: [{
            setting_name: 'off',
            setting_values: [{
              setting_synonym: ['paused'],
              lang: 'en',
            }],
          }, {
            setting_name: 'moderate',
            setting_values: [{
              setting_synonym: ['medium'],
              lang: 'en',
            }],
          }, {
            setting_name: 'high',
            setting_values: [{
              setting_synonym: ['restricted'],
              lang: 'en',
            }],
          }],
        }],
      },
      willReportState: true,
      states: {
        online: true,
        networkEnabled: true,
        networkSettings: {
          ssid: 'network-name',
        },
        guestNetworkEnabled: true,
        guestNetworkSettings: {
          ssid: 'guest-network-name',
        },
        lastNetworkDownloadSpeedTest: {
          downloadSpeedMbps: 35.1,
          unixTimestampSec: LAST_WEEK_SEC,
          status: 'SUCCESS',
        },
        lastNetworkUploadSpeedTest: {
          uploadSpeedMbps: 35.1,
          unixTimestampSec: LAST_WEEK_SEC,
          status: 'SUCCESS',
        },
        numConnectedDevices: 5,
        networkUsageMB: 10.5,
        networkUsageUnlimited: true,
        // Timestamp state should be in seconds
        lastSoftwareUpdateUnixTimestampSec: LAST_WEEK_SEC,
        currentToggleSettings: {
          PowerSaverMode: false,
        },
        currentModeSettings: {
          ParentalControl: 'off',
        },
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addRouter',
  icon: 'hardware:router',
  label: 'Router',
  function: (app) => {
    app._createDevice(Router.createDevice());
  },
})
