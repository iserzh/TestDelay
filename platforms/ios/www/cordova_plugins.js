cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "io.jxcore.node.jxcore",
        "file": "plugins/io.jxcore.node/www/jxcore.js",
        "pluginId": "io.jxcore.node",
        "clobbers": [
            "jxcore"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "io.jxcore.node": "0.1.7",
    "cordova-plugin-whitelist": "1.3.0"
};
// BOTTOM OF METADATA
});