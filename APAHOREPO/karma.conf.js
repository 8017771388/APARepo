// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "@angular-devkit/build-angular"],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage-istanbul-reporter"),
            require("karma-webpack"),
            require("istanbul-instrumenter-loader"),
            require("@angular-devkit/build-angular/plugins/karma"),
            require("karma-junit-reporter"),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: require("path").join(__dirname, "./coverage/apahoweb"),
            reports: ["html", "lcovonly", "text-summary", "json"],
            fixWebpackSourcePaths: true,
        },
        //reporters: ["progress", "kjhtml", "spec", "junit"],
        reporters: ["progress", "kjhtml", "junit"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["ChromeHeadlessNoSandbox"],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: "ChromeHeadless",
                flags: ["--no-sandbox"],
            },
        },
        browserDisconnectTimeout: 210000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 210000,
        flags: ["--disable-web-security", "--disable-gpu", "--no-sandbox"],
        singleRun: false,
        restartOnFileChange: true,

        junitReporter: {
            outputDir: "test", // results will be saved as $outputDir/$browserName.xml
            outputFile: "junit.xml", // if included, results will be saved as $outputDir/$browserName/$outputFile
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null, // use '1' if reporting to be per SonarQube 6.2 XML format
        },
    });
};
