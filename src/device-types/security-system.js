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

class SecuritySystem extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['security panel'],
      roomHint: 'Hallway'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new SecuritySystem()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.SECURITYSYSTEM',
      traits: [
        'action.devices.traits.ArmDisarm',
        'action.devices.traits.Reboot',
        'action.devices.traits.SoftwareUpdate',
        'action.devices.traits.StatusReport',
      ],
      defaultNames: [`Smart Security System`],
      name: `Smart Security System`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
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
        isArmed: false,
        // Timestamp state should be in seconds
        lastSoftwareUpdateUnixTimestampSec: Math.floor(LAST_WEEK.getTime() / 1000),
        currentStatusReport: []
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addSecuritySystem',
  icon: 'icons:verified-user',
  label: 'Security System',
  function: (app) => { app._createDevice(SecuritySystem.createDevice()); }
})
