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

const type = 'action.devices.types.FAUCET'

class Faucet extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Kitchen sink'],
      roomHint: 'Kitchen'
    }, {
      nicknames: ['Bathroom sink', 'Fancy sink'],
      roomHint: 'Bathroom'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Faucet()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Dispense'
      ],
      defaultNames: [`Smart Faucet`],
      name: `Smart Faucet`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportedDispenseItems: [{
          item_name: 'water',
          item_name_synonyms: [{
            lang: 'en',
            synonyms: ['water']
          }, {
            lang: 'es',
            synonyms: ['agua']
          }, {
            lang: 'fr',
            synonyms: ['eau']
          }],
          supported_units: [
            'CUPS',
            'QUARTS',
            'GALLONS',
            'MILLILITERS',
            'LITERS',
            'DECILITERS'
          ],
          default_portion: {
            amount: 1,
            unit: 'CUPS'
          }
        }],
        supportedDispensePresets: [{
          preset_name: 'cat water bowl',
          preset_name_synonyms: [{
            lang: 'en',
            synonyms: [
              "cat water bowl",
              "cat water dish",
              "cat water cup"
            ]
          }, {
            lang: 'es',
            synonyms: [
              "plato de agua para gato",
              "bebedero para gato"
            ]
          }, {
            lang: 'fr',
            synonyms: [
              "bol d'eau de chat",
              "bac à eau pour chat",
              "tasse d'eau de chat"
            ]
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        dispenseItems: [{
          itemName: 'water',
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
  identifier: '_addFaucet',
  icon: 'communication:voicemail',
  label: 'Faucet',
  function: (app) => { app._createDevice(Faucet.createDevice()); }
})
