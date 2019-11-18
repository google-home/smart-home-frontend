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

class Bed extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Electric Bed'],
      roomHint: 'Bedroom'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Bed()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.BED',
      traits: [
        'action.devices.traits.Modes'
      ],
      defaultNames: [`Smart Bed`],
      name: `Smart Bed`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableModes: [{
          name: 'massage',
          name_values: [{
            name_synonym: ['massage'],
            lang: 'en'
          }],
          settings: [{
            setting_name: 'lumbar',
            setting_values: [{
              setting_synonym: ['back', 'middle'],
              lang: 'en'
            }]
          }, {
            setting_name: 'head',
            setting_values: [{
              setting_synonym: ['head', 'neck'],
              lang: 'en'
            }]
          }],
          ordered: true
        }]
      },
      willReportState: true,
      states: {
        online: true,
        currentModeSettings: {
          massage: 'lumbar'
        }
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addBed',
  icon: 'notification:airline-seat-individual-suite',
  label: 'Bed',
  function: (app) => { app._createDevice(Bed.createDevice()); }
})
