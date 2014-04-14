(function (blocks) {

    blocks.log = console.log.bind(console);
    // blocks.log = function () {};

    blocks.utils = {
        toScreenX: function (x) {
            return x * blocks.s + blocks.offset.x;
        },

        toScreenY: function (y) {
            return (blocks.h - 1 - y) * blocks.s + blocks.offset.y;
        },

        getRatio: function (type, width, height) {
            var scaleX = window.innerWidth / width,
                scaleY = window.innerHeight / height,
                result = {
                    x: 1,
                    y: 1
                };

            switch (type) {
            case 'all':
                result.x = scaleX > scaleY ? scaleY : scaleX;
                result.y = scaleX > scaleY ? scaleY : scaleX;
                break;
            case 'fit':
                result.x = scaleX > scaleY ? scaleX : scaleY;
                result.y = scaleX > scaleY ? scaleX : scaleY;
                break;
            case 'fill':
                result.x = scaleX;
                result.y = scaleY;
                break;
            }

            return result;
        },

        getLang: function (sid) {
            var args = Array.prototype.slice.call(arguments, 1);
            return blocks.lang[sid].replace(/({)(\d+)(})/g, function () {
                return args[parseInt(arguments[2], 10)];
            });
        },

        fixDOMParser: function () {
            window.DOMParser = DOMishParser;
        }
    };

    function DOMishParser() {}
            DOMishParser.prototype.parseFromString = function (data) {
                return new DOMishObject(JSON.parse(data));
            };

            function DOMishAttributes() {}
            DOMishAttributes.prototype.getNamedItem = function (name) {
                return {
                    nodeValue: this[name] || null
                };
            };

            function makeDOMishObject(data) {
                return new DOMishObject(data);
            }

            function DOMishObject(data) {
                this.attributes = this.convertContent(data);
                this.length = Object.keys(this.attributes).length;
            }
            DOMishObject.prototype.documentElement = document;
            DOMishObject.prototype.convertContent = function (obj) {
                var attributes = new DOMishAttributes(),
                    prop;

                for (prop in obj) {
                    if (obj[prop] !== null && typeof obj[prop] === 'object') {
                        attributes[prop] = Array.isArray(obj[prop]) ?
                            obj[prop].map(makeDOMishObject) : new DOMishObject(obj[prop]);
                    } else {
                        attributes[prop] = obj[prop];
                    }
                }

                return attributes;
            };
            DOMishObject.prototype.getElementsByTagName = function(name) {
                return this.attributes[name] ?
                    Array.isArray(this.attributes[name]) ?
                    this.attributes[name] : [this.attributes[name]] : [];
            };

}(window.blocks = window.blocks || {}));