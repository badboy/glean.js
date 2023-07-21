/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

import Glean from "@mozilla/glean/web";
import { submission, accountsEvents } from "./generated/pings.js";
import * as metrics from "./generated/sample.js";
import * as ev from "./generated/event.js";

Glean.setLogPings(true);
Glean.setDebugViewTag("jer-js");
Glean.initialize("glean-sample-website", true);

const createEventFn = (eventName) => () => {
  ev.name.set(eventName);
  accountsEvents.submit();
};


const view = createEventFn('login_view');
const submit = createEventFn('login_submit');
const success = createEventFn('login_submit_success');

document.getElementById("glean_view").addEventListener("click", () => {
  view();
});
document.getElementById("glean_submit").addEventListener("click", () => {
  submit();
});
document.getElementById("glean_success").addEventListener("click", () => {
  success();
});

const recordButton = document.getElementById("record");
recordButton.addEventListener("click", () => {
  metrics.buttonClicked.add();
  console.info("Adding to the `buttonClicked` metric.");
});

