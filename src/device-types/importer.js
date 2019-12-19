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

window.deviceTypes.push({
  identifier: '_addJson',
  icon: 'icons:settings-ethernet',
  label: 'Import JSON',
  function: (app) => {
    // Open new dialog
    app.$['insert-json'].open()
    app.$['insert-json-message'].innerText = ''
    app.$['insert-json-import'].onclick = () => {
      // Get pasted JSON
      const text = app.$['insert-json-textarea'].value
      app.$['insert-json-message'].innerText = ''

      // Make a few data adjustments before DB insertion
      try {
        const json = JSON.parse(text)
        const device = {
          id: json.id,
          type: json.type,
          traits: json.traits,
          attributes: json.attributes,
          defaultNames: json.name.defaultNames,
          name: json.name.name,
          nicknames: json.name.nicknames,
          roomHint: json.roomHint,
          willReportState: json.willReportState || false,
          states: {
            online: true,
          },
          hwVersion: json.deviceInfo.hwVersion,
          swVersion: json.deviceInfo.swVersion,
          model: json.deviceInfo.model,
          manufacturer: json.deviceInfo.manufacturer,
          customData: json.customData,
        }
        app._createDevice(device);
        app.$['insert-json'].close()
      } catch (e) {
        app.$['insert-json-message'].innerText = 'Error creating device: ' + e
      }
    }
  },
})
