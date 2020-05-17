/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
import BaconHandler from "./Bacon/BaconHandler";
import ValidatorHandler from "./Form/ValidatorHandler";
import {
  emptyValidator,
  emailValidator,
  phoneNumberValidator,
  creditCardValidator,
  expirationDateValidator,
  exactLengthValidator,
} from "./Form/validators";

(function () {
  "use strict";

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  if (
    "serviceWorker" in navigator &&
    (window.location.protocol === "https:" || isLocalhost)
  ) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function (registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function () {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case "installed":
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case "redundant":
                  throw new Error(
                    "The installing " + "service worker became redundant."
                  );

                default:
                // Ignore
              }
            };
          }
        };
      })
      .catch(function (e) {
        console.error("Error during service worker registration:", e);
      });
  }

  // Task 1
  const baconButton = document.getElementById("baconButton");
  const baconImage = document.getElementById("baconImage");
  const baconContainer = document.getElementById("bacon-container");

  new BaconHandler(baconButton, baconImage, baconContainer);

  // Task 3
  const validatorHandler = new ValidatorHandler();

  const inputsToValidate = document.getElementsByClassName("checkout-input");
  const emailToValidate = document.getElementsByClassName("checkout-email");
  const phoneToValidate = document.getElementsByClassName("checkout-phone");
  const creditCardToValidate = document.getElementsByClassName(
    "checkout-credit-card"
  );
  const expirationDateToValidate = document.getElementsByClassName(
    "checkout-expiration-date"
  );
  const securityNumberToValidate = document.getElementsByClassName(
    "checkout-security"
  );

  const successModal = document.getElementsByClassName(
    "checkout__success-message"
  )[0];

  Array.prototype.forEach.call(inputsToValidate, (field) => {
    validatorHandler.addFieldToValidate(field, [emptyValidator]);
  });

  validatorHandler.addFieldToValidate(emailToValidate[0], [
    emptyValidator,
    emailValidator,
  ]);
  validatorHandler.addFieldToValidate(phoneToValidate[0], [
    emptyValidator,
    phoneNumberValidator,
  ]);
  validatorHandler.addFieldToValidate(creditCardToValidate[0], [
    emptyValidator,
    creditCardValidator,
  ]);
  validatorHandler.addFieldToValidate(expirationDateToValidate[0], [
    emptyValidator,
    expirationDateValidator,
  ]);
  validatorHandler.addFieldToValidate(securityNumberToValidate[0], [
    emptyValidator,
    { validator: exactLengthValidator, param: 3 },
  ]);

  const form = document.getElementById("checkout-form");
  
  Array.prototype.forEach.call(
    [...successModal.getElementsByClassName("close"), successModal],
    (el) => {
      el.addEventListener("click", () => {
        successModal.classList.remove("visible");
      });
    }
  );
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = validatorHandler.validateAllFields();

    if (valid) {
      form.reset();
      if (!successModal.classList.contains("visible")) {
        successModal.classList.add("visible");
      }
    }
  });
})();
