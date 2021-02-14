(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.validator.setDefaults({
        //忽略某些元素不驗證
        ignore: '.ignore',
        // 用什麼標籤標記錯誤，預設是 label，可以改成 em。
        errorElement: 'div',
        //指定錯誤提示的 css 類名，可以自定義錯誤提示的樣式。 
        errorClass: 'invalid-feedback',
        // 可以給未通過驗證的元素加效果、閃爍等。
        highlight: function (element) {
            $(element).closest('input, select, textarea').addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('input, select, textarea').removeClass('is-invalid');
        },
        //focusInvalid: false,
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids())
                return;

            var $errorObjet = $(validator.errorList[0].element);

            $('html, body').animate({
                scrollTop: $errorObjet.offset().top
            }, 50, function () {
                $errorObjet.focus();
            });
        },

        // 更改錯誤資訊顯示的位置
        // 指明錯誤放置的位置，預設情況是：error.appendTo(element.parent());即把錯誤資訊放在驗證的元素後面
        errorPlacement: function (error, element) {
            $(element).closest('.form-group').append(error);
        },
        //// 顯示或者隱藏驗證資訊，可以自動實現有錯誤資訊出現時把容器屬性變為顯示，無錯誤時隱藏，用處不大。
        //errorContainer: '#messageBox1, #messageBox2'
        ////把錯誤資訊統一放在一個容器裡面。
        // errorLabelContainer: $(''#signupForm div.error'),
    });

    $.validator.addMethod("alphanumeric", function (value, element) {
        return this.optional(element) || /^\w+$/i.test(value);
    }, "Letters, numbers, and underscores only please");

    $.validator.addMethod("dateAfterTo", function (value, element) {
        var _check = false;
        if ($(element).attr("placeholder") !== value) {
            _check = true;
        }
        if ($(element).prevAll('input').attr("placeholder") !== $(element).prevAll('input').val()) {
            _check = true;
        }

        if (value == '' || $(element).prevAll('input').val() == '') {
            return true;
        }
        if (_check) {
            var target = $(element).prevAll('input').val().replace("-", "/").replace("-", "/");
            var _value = value.replace("-", "/").replace("-", "/");
            return (Date.parse(_value).valueOf() >= Date.parse(target).valueOf());
        } else {
            return _check;
        }
    }, "結束日期不可小於開始日期");

    $.validator.addMethod("dateFull", function (value, element) {
        return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-]([1-9]|[12][0-9]|3[01])$/.test(value);
    }, "請輸入完整日期");

    $.validator.addMethod("checkEmail", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
    }, "請輸入有效的電子郵件");

    $.validator.addMethod("checkSelect", function (value, element) {
        var check = false;
        if (value) { check = true; }
        return check;
    }, $.validator.format("請選擇"));

    $.validator.addMethod("checkDateFromat", function (value, element) {
        var re = new RegExp("^([0-9]{4})[./]{1}([0-9]{1,2})[./]{1}([0-9]{1,2})$");
        return this.optional(element) || re.test(value);
    }, $.validator.format("請輸入正確格式 (YYYY/MM/DD)"));

    $.validator.addMethod("decimalMaximum-4", function (value, element) {
        var regexp = new RegExp('^[0-9]+(\\.[0-9]{1,4})?$');
        return this.optional(element) || regexp.test(value);
    }, "最多輸入至小數點4位");

    $.validator.addMethod("checkMaxThen", function (value, element) {
        return this.optional(element) || parseFloat(value) <= parseFloat($(element).data('max-then'));
    }, function (params, element) {
        return '不可大於' + parseFloat($(element).data('max-then'));
    });

    $.validator.addMethod("positiveFloat", function (value, element) {
        return this.optional(element) || parseFloat(value) > 0;
    }, "請輸入大於 0 的數字");

    $.extend($.validator.messages, {
        required: "必須填寫",
        remote: "請修正此欄位",
        email: "請輸入有效的電子郵件",
        url: "請輸入有效的網址",
        date: "請輸入有效的日期",
        dateISO: "請輸入有效的日期 (YYYY-MM-DD)",
        number: "請輸入正確的數值",
        digits: "只可輸入數字",
        creditcard: "請輸入有效的信用卡號碼",
        equalTo: "請重複輸入一次",
        extension: "請輸入有效的後綴",
        maxlength: $.validator.format("最多 {0} 個字"),
        minlength: $.validator.format("最少 {0} 個字"),
        rangelength: $.validator.format("請輸入長度為 {0} 至 {1} 之間的字串"),
        range: $.validator.format("請輸入 {0} 至 {1} 之間的數值"),
        max: $.validator.format("請輸入不大於 {0} 的數值"),
        min: $.validator.format("請輸入不小於 {0} 的數值")
    });
}));