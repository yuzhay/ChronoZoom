﻿/// <reference path='authoring.ts'/>
/// <reference path='settings.ts'/>
/// <reference path='layout.ts'/>
/// <reference path='../ui/controls/datepicker.ts'/>

/// <reference path='typings/jqueryui/jqueryui.d.ts'/>
/// <reference path='typings/jquery/jquery.d.ts'/>

module CZ {
    export module Authoring {
        export module UI {
            // Mouseup handlers.

            // Opens a window for creating new tour.
            export function createTour() {
                // skip authoring during ongoing dynamic layout animation
                if (CZ.Layout.animatingElements.length != 0) {
                    return;
                }

                CZ.Authoring.isActive = false; // for now we do not watch for mouse moves
                CZ.Authoring.mode = "editTour";

                showEditTourForm(null);
            }

            export function createTimeline () {
                // skip authoring during ongoing dynamic layout animation
                if (CZ.Layout.animatingElements.length != 0) {
                    return;
                }

                CZ.Authoring.showMessageWindow(
                    "Please click and drag with mouse or finger in the canvas to create the TimeLine.",
                    "Create Timeline"
                );

                var prevIsActive = CZ.Authoring.isActive;
                var prevMode = CZ.Authoring.mode;
                var messageForm = CZ.HomePageViewModel.getFormById("#message-window");

                messageForm.closeButton.click(event => {
                    CZ.Authoring.isActive = prevIsActive;
                    CZ.Authoring.mode = prevMode;
                });

                CZ.Authoring.isActive = true;
                CZ.Authoring.mode = "createTimeline";
            }

            export function editTimeline () {
                // skip authoring during ongoing dynamic layout animation
                if (CZ.Layout.animatingElements.length != 0) {
                    return;
                }

                CZ.Authoring.isActive = (CZ.Authoring.mode !== "editTimeline") || !CZ.Authoring.isActive;
                CZ.Authoring.mode = "editTimeline";
            }

            export function createExhibit () {
                // skip authoring during ongoing dynamic layout animation
                if (CZ.Layout.animatingElements.length != 0) {
                    return;
                }

                CZ.Authoring.showMessageWindow(
                    "Please click inside a timeline to create the Exhibit.",
                    "Create Exhibit"
                );

                var prevIsActive = CZ.Authoring.isActive;
                var prevMode = CZ.Authoring.mode;
                var messageForm = CZ.HomePageViewModel.getFormById("#message-window");

                messageForm.closeButton.click(event => {
                    CZ.Authoring.isActive = prevIsActive;
                    CZ.Authoring.mode = prevMode;
                });

                CZ.Authoring.isActive = true;
                CZ.Authoring.mode = "createExhibit";
            }

            export function editExhibit () {
                // skip authoring during ongoing dynamic layout animation
                if (CZ.Layout.animatingElements.length != 0) {
                    return;
                }

                CZ.Authoring.isActive = (CZ.Authoring.mode !== "editExhibit") || !CZ.Authoring.isActive;
                CZ.Authoring.mode = "editExhibit";
            }
        }
    }
}
