﻿/// <reference path='../NewScripts/controls/formbase.ts'/>
/// <reference path='../NewScripts/authoring.ts'/>

/// <reference path='../NewScripts/typings/jquery/jquery.d.ts'/>

module CZ {
    export module UI {

        export interface FormEditProfileInfo extends CZ.UI.FormBaseInfo {
            saveButton: string;
            logoutButton: string;
            usernameInput: string;
            emailInput: string;
            agreeInput: string;
            loginPanel: string;
            profilePanel: string;
            loginPanelLogin: string;
            context: Object;
        }

        export class FormEditProfile extends CZ.UI.FormBase {
            private saveButton: JQuery;
            private logoutButton: JQuery;
            private titleInput: JQuery;

            private isCancel: bool;
            private usernameInput: JQuery;
            private emailInput: JQuery;
            private agreeInput: JQuery;
            private loginPanel: JQuery;
            private profilePanel: JQuery;
            private loginPanelLogin: JQuery;
            // We only need to add additional initialization in constructor.
            constructor(container: JQuery, formInfo: FormEditProfileInfo) {
                super(container, formInfo);

                this.saveButton = container.find(formInfo.saveButton);
                this.logoutButton = container.find(formInfo.logoutButton);
                this.usernameInput = container.find(formInfo.usernameInput);
                this.emailInput = container.find(formInfo.emailInput);
                this.agreeInput = container.find(formInfo.agreeInput);
                this.loginPanel = $(document.body).find(formInfo.loginPanel);
                this.profilePanel = $(document.body).find(formInfo.profilePanel);
                this.loginPanelLogin = $(document.body).find(formInfo.loginPanelLogin);
                this.initialize();
            }

            private validEmail(e) {
                var filter = /^\w+@[a-zA-Z_\.]+?\.[a-zA-Z]{2,4}$/;
                return String(e).search(filter) != -1;
            }

            private validUsername(e) {
                var filter = /^[a-z0-9\-_]{4,20}$/i;
                return String(e).search(filter) != -1;
            }

            private initialize(): void {
                var profile = CZ.Service.getProfile();
                profile.done(data => {
                    if (data.DisplayName != null) {
                        this.usernameInput.val(data.DisplayName);
                        if (data.DisplayName != "") {
                            this.usernameInput.prop('disabled', true);
                            this.agreeInput.attr('checked', true);
                            this.agreeInput.prop('disabled', true);
                        }
                        this.emailInput.val(data.Email);

                    }
                });


                this.saveButton.click(event => {
                    var isValid = this.validUsername(this.usernameInput.val());
                    if (!isValid) {
                        alert("Provided incorrect username, \n'a-z', '0-9', '-', '_' - characters allowed only. ");
                        return;
                    }

                    var isValid = this.validEmail(this.emailInput.val());
                    if (!isValid) {
                        alert("Provided incorrect email address");
                        return;
                    }
                    var isValid = this.agreeInput.prop("checked");
                    if (!isValid) {
                        alert("Please agree with provided terms");
                        return;
                    }

                    CZ.Service.putProfile(this.usernameInput.val(), this.emailInput.val()).then(
                        success => {
                            this.usernameInput.prop('disabled', true);
                            CZ.Service.getProfile().done(data => {
                                this.loginPanelLogin.html(data.DisplayName);
                            });

                            super.close();
                        },
                        function (error) {
                            alert("Unable to save changes. Please try again later.");
                            console.log(error);
                        }
                    );

                });
                this.logoutButton.click(event =>
                {
                    return $.ajax({ url: "/account/logout" }).done(data =>
                    {
                        this.profilePanel.hide();
                        this.loginPanel.show();
                        super.close();
                    });
                });

            }

            public show(): void {
                super.show();

                // Ideally, it would be better to not place UI selectors in form code,
                // but pass them through parameters.
                this.activationSource.addClass("active");
            }

            public close() {
                this.container.hide("slow", event => { });

                CZ.Authoring.isActive = false;

                this.activationSource.removeClass("active");
            }
        }
    }
}