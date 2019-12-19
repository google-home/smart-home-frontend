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

const type = 'action.devices.types.GRILL'

class Grill extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Countertop grill'],
      roomHint: 'Kitchen',
    }, {
      nicknames: ['Outdoor grill'],
      roomHint: 'Garden',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Grill()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Cook',
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Grill`],
      name: `Smart Grill`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        supportedCookingModes: ['COOK'],
        foodPresets: [{
          food_preset_name: 'chicken',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['chicken', 'chicken breat', 'chicken thigh'],
            lang: 'en',
          }],
        }, {
          food_preset_name: 'hamburger',
          supported_units: ['POUNDS', 'OUNCES'],
          food_synonyms: [{
            synonym: ['hamburger', 'burger', 'burger patty'],
            lang: 'en',
          }],
        }],
        maxTimerLimitSec: 1200,
        pausable: true,
        availableToggles: [{
          name: 'ventilate',
          values: [{
            nameSynonym: ['ventilate', 'ventilation', 'air vent'],
            lang: 'en',
          }],
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
        currentToggleSettings: {
          ventilate: false,
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
  identifier: '_addGrill',
  icon: 'editor:highlight',
  label: 'Grill',
  function: (app) => {
    app._createDevice(Grill.createDevice());
  },
})
