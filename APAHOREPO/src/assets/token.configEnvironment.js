(function (global, factory) {
    'use strict';

    /* Use AMD */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return new (factory(global, global.document))();
        });
    }
    /* Use CommonJS */
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = new (factory(global, global.document))();
    }
    /* Use Browser */
    else {
        global.configEnvironment = new (factory(global, global.document))();
    }
})
    (typeof window !== 'undefined' ? window : this, function (w, d) {
        var configEnvironment = function () {
            return {
                //VCFOHO_Environment: '#{HOMEOFFICE.Environment}',
                MULE_SERVICES : '#{DataPower.Internal.DPEndpoint}:8061',
                CLIENT_ID: '#{VCFO.MuleServices.ClientId}',
                CLIENT_SECRET: '#{VCFO.MuleServices.ClientSecret}',
                AuthConstants: {
                    ADMIN_USER: '#{VCFO.ADGroup.vcfoManager}',                    
                    ANALYST_USER: '#{VCFO.ADGroup.vcfoAnalyst}',
                    DEALSPECIALIST_USER: '#{APA.ADGroup.DS}',
                    AuthUrl: '#{AppSettings.Alias.IntraWebNew}/HomeOfficeCoreRest/api/core/user',
                    Cw_Img_Url: '#{AppSettings.Alias.IntraWebNew}/HomeOfficeCoreRest/api/core/images/signinpixel'
                }
            };
        };
        return configEnvironment;
    });
