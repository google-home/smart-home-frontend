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

class Refrigerator extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
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

  static createDevice() {
    if (!instance) {
      instance = new Refrigerator()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.REFRIGERATOR',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Fridge`],
      name: `Smart Fridge`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
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
  }
}

window.deviceTypes.push({
  identifier: '_addRefrigerator',
  icon: 'places:kitchen',
  label: 'Refrigerator',
  function: (app) => { app._createDevice(Refrigerator.createDevice()); }
})
