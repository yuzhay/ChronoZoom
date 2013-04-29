/// <reference path='../NewScripts/controls/formbase.ts'/>
/// <reference path='../NewScripts/authoring.ts'/>

/// <reference path='../NewScripts/typings/jquery/jquery.d.ts'/>

module CZ {
    export module UI {

        export interface FormEditProfileInfo extends CZ.UI.FormBaseInfo {
            startDate: string;
            endDate: string;
            saveButton: string;
            usernameInput: string;
            emailInput: string;
            agreeInput: string;
            context: Object;
        }

        export class FormEditProfile extends CZ.UI.FormBase {
            private saveButton: JQuery;
            private startDate: CZ.UI.DatePicker;
            private endDate: CZ.UI.DatePicker;
            private titleInput: JQuery;

            private isCancel: bool;
            private usernameInput: JQuery;
            private emailInput: JQuery;
            private agreeInput: JQuery;
            // We only need to add additional initialization in constructor.
            constructor(container: JQuery, formInfo: FormEditProfileInfo) {
                super(container, formInfo);

                this.saveButton = container.find(formInfo.saveButton);
                this.usernameInput = container.find(formInfo.usernameInput);
                this.emailInput = container.find(formInfo.emailInput);
                this.agreeInput = container.find(formInfo.agreeInput);
                this.initialize();
            }

            private validEmail(e) {
                var filter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
                return String(e).search(filter) != -1;
            }

            private validUsername(e) {
                return true;
            }

            private initialize(): void {

                var profile = JSON.parse(CZ.Service.getProfile());

                this.usernameInput.val(profile.username);
                this.emailInput.val(profile.email);

                //if (CZ.Authoring.mode === "profile") {

                //}
                //else {
                //    console.log("Unexpected authoring mode in timeline form.");
                //    this.close();
                //}

                //this.isCancel = true;
                //this.endDate.addEditMode_Infinite();



                this.saveButton.click(event => {
                    var isValid = this.validUsername(this.usernameInput.val());
                    if (!isValid) {
                        alert("Provided incorrect username");
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
                        function (success) {
                            self.close();
                        },
                        function (error) {
                            alert("Unable to save changes. Please try again later.");
                            console.log(error);
                        }
                    );

                });

            }

            public show(): void {
                super.show();

                // Just an example how to highligh pressed "Show Form" button.
                // Ideally, it would be better to not place UI selectors in form code,
                // but pass them through parameters.
                this.activationSource.addClass("activeButton");
            }

            public close() {
                if (this.isCancel && CZ.Authoring.mode === "profile") {
                    //CZ.Authoring.removeTimeline(this.timeline);
                }

                this.container.hide("slow", event => {
                    //this.endDate.remove();
                    //this.startDate.remove();
                });

                CZ.Authoring.isActive = false;

                this.activationSource.removeClass("activeButton");
            }
        }
    }
}