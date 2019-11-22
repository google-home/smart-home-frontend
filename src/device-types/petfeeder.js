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

const type = 'action.devices.types.PETFEEDER'

class PetFeeder extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Cat feeder'],
      roomHint: 'Kitchen'
    }, {
      nicknames: ['Dog feeder'],
      roomHint: 'Living Room'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new PetFeeder()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Dispense'
      ],
      defaultNames: [`Smart Pet Feeder`],
      name: `Smart Pet Feeder`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportedDispenseItems: [{
          item_name: 'catFood',
          item_name_synonyms: [{
            lang: 'en',
            synonyms: ['cat food', 'kibble']
          }],
          supported_units: [
            'OUNCES',
            'CUPS',
          ],
          default_portion: {
            amount: 1.0,
            unit: 'CUPS'
          }
        }],
        supportedDispensePresets: [{
          preset_name: 'catMeal',
          preset_name_synonyms: [{
            lang: 'en',
            synonyms: [
              'normal meal',
              'dinner'
            ]
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        dispenseItems: [{
          itemName: 'catFood',
          amountLastDispensed: {
            amount: 0,
            unit: 'CUPS'
          },
          isCurrentlyDispensing: false
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addPetFeeder',
  icon: 'icons:pets',
  label: 'Pet Feeder',
  function: (app) => { app._createDevice(PetFeeder.createDevice()); }
})
