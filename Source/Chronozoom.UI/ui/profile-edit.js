var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CZ;
(function (CZ) {
    (function (UI) {
        var FormEditProfile = (function (_super) {
            __extends(FormEditProfile, _super);
            function FormEditProfile(container, formInfo) {
                        _super.call(this, container, formInfo);
                this.saveButton = container.find(formInfo.saveButton);
                this.usernameInput = container.find(formInfo.usernameInput);
                this.emailInput = container.find(formInfo.emailInput);
                this.agreeInput = container.find(formInfo.agreeInput);
                this.initialize();
            }
            FormEditProfile.prototype.validEmail = function (e) {
                var filter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
                return String(e).search(filter) != -1;
            };
            FormEditProfile.prototype.validUsername = function (e) {
                var filter = /^[a-z0-9\-_]{4,20}$/i;
                return String(e).search(filter) != -1;
            };
            FormEditProfile.prototype.initialize = function () {
                var _this = this;
                var profile = CZ.Service.getProfile();
                profile.done(function (data) {
                    if(data != null) {
                        _this.usernameInput.val(data.DisplayName);
                        _this.usernameInput.prop('disabled', true);
                        _this.emailInput.val(data.Email);
                        _this.agreeInput.attr('checked', true);
                        _this.agreeInput.prop('disabled', true);
                    }
                });
                this.saveButton.click(function (event) {
                    var isValid = _this.validUsername(_this.usernameInput.val());
                    if(!isValid) {
                        alert("Provided incorrect username, \n'a-z', '0-9', '-', '_' - characters allowed only. ");
                        return;
                    }
                    var isValid = _this.validEmail(_this.emailInput.val());
                    if(!isValid) {
                        alert("Provided incorrect email address");
                        return;
                    }
                    var isValid = _this.agreeInput.prop("checked");
                    if(!isValid) {
                        alert("Please agree with provided terms");
                        return;
                    }
                    CZ.Service.putProfile(_this.usernameInput.val(), _this.emailInput.val()).then(function (success) {
                        self.close();
                    }, function (error) {
                        alert("Unable to save changes. Please try again later.");
                        console.log(error);
                    });
                });
            };
            FormEditProfile.prototype.show = function () {
                _super.prototype.show.call(this);
                this.activationSource.addClass("activeButton");
            };
            FormEditProfile.prototype.close = function () {
                if(this.isCancel && CZ.Authoring.mode === "profile") {
                }
                this.container.hide("slow", function (event) {
                });
                CZ.Authoring.isActive = false;
                this.activationSource.removeClass("activeButton");
            };
            return FormEditProfile;
        })(CZ.UI.FormBase);
        UI.FormEditProfile = FormEditProfile;        
    })(CZ.UI || (CZ.UI = {}));
    var UI = CZ.UI;
})(CZ || (CZ = {}));
