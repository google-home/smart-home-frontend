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

const type = 'action.devices.types.FRYER'

class Fryer extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Countertop fryer'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Fryer()
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
      defaultNames: [`Smart Fryer`],
      name: `Smart Fryer`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportedCookingModes: [
          'FRY',
        ],
        foodPresets: [{
          food_preset_name: 'french fries',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['french fries', 'fries'],
            lang: 'en',
          }],
        }, {
          food_preset_name: 'hash browns',
          supported_units: ['CUPS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['hash browns', 'hash potatoes'],
            lang: 'en',
          }],
        }],
        maxTimerLimitSec: 1200,
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
  identifier: '_addFryer',
  icon: 'icons:unarchive',
  label: 'Fryer',
  function: (app) => {
    app._createDevice(Fryer.createDevice());
  },
})
