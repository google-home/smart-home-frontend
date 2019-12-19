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

const type = 'action.devices.types.SOUSVIDE'

class SousVide extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['My sous vide'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new SousVide()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Cook',
        'action.devices.traits.StartStop',
        'action.devices.traits.Timer',
      ],
      defaultNames: [`Smart Sous Vide`],
      name: `Smart Sous Vide`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportedCookingModes: [
          'SOUS_VIDE',
        ],
        foodPresets: [{
          food_preset_name: 'chicken',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['chicken', 'whole chicken'],
            lang: 'en',
          }],
        }, {
          food_preset_name: 'salmon',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['salmon', 'king salmon'],
            lang: 'en',
          }],
        }],
        maxTimerLimitSec: 30,
        pausable: true,
      },
      willReportState: true,
      states: {
        online: true,
        timerRemainingSec: -1,
        timerPaused: false,
        isRunning: false,
        isPaused: false,
        currentCookingMode: 'NONE',
        currentFoodPreset: 'NONE',
        currentFoodQuantity: 0,
        currentFoodUnit: 'NONE',
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
  identifier: '_addSousVide',
  icon: 'device:battery-full',
  label: 'Sous Vide',
  function: (app) => {
    app._createDevice(SousVide.createDevice());
  },
})
