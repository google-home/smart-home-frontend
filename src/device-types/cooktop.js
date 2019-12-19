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

const type = 'action.devices.types.COOKTOP'

class Cooktop extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Kitchen cooktop'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Cooktop()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Cook',
        'action.devices.traits.OnOff',
        'action.devices.traits.Modes',
      ],
      defaultNames: [`Smart Cooktop`],
      name: `Smart Cooktop`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportedCookingModes: [
          'COOK',
          'BOIL',
          'SAUTE',
        ],
        foodPresets: [{
          food_preset_name: 'chicken',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['chicken', 'chicken breat', 'chicken thigh'],
            lang: 'en',
          }],
        }, {
          food_preset_name: 'bacon',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['bacon', 'bacon strips'],
            lang: 'en',
          }],
        }],
        maxTimerLimitSec: 1200,
        pausable: true,
        availableModes: [{
          name: 'heat',
          nameValues: [{
            nameSynonym: ['heat', 'flame', 'heat level'],
            lang: 'en',
          }],
          settings: [{
            settingName: 'low',
            settingValues: [{
              settingSynonym: ['low', 'lowest'],
              lang: 'en',
            }],
          }, {
            settingName: 'high',
            settingValues: {
              settingSynonym: ['high', 'full', 'highest'],
              lang: 'en',
            },
          }],
          ordered: true,
        }],
      },
      willReportState: true,
      states: {
        online: true,
        on: false,
        currentCookingMode: 'NONE',
        currentFoodPreset: 'NONE',
        currentFoodQuantity: 0,
        currentFoodUnit: 'NONE',
        currentModeSettings: {
          heat: 'low',
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
  identifier: '_addCooktop',
  icon: 'hardware:power-input',
  label: 'Cooktop',
  function: (app) => {
    app._createDevice(Cooktop.createDevice());
  },
})
