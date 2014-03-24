(function (blocks) {

    function Button(parent, x, y, sid, callback, scope) {
        this.parent = parent;
        this.button = parent.add.button(x, y, 'button', callback, scope);
        this.button.anchor.x = 0.5;
        this.button.anchor.y = 0.5;

        this.text = parent.add.bitmapText(x, y, blocks.utils.getLang(sid), {font: '24px Komika', align: 'center'});
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.6;
    }

    Button.prototype.show = function () {
        this.button.visible = true;
        this.button.bringToTop();
        this.text.visible = true;

        // fix for missing bringToTop
        this.parent.world.remove(this.text);
        this.parent.world.add(this.text);
    };

    Button.prototype.hide = function () {
        this.button.visible = false;
        this.text.visible = false;
    };

    blocks.Button = Button;

}(window.blocks = window.blocks || {}));