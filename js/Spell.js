var Spell = function Spell(settings){
    this.id = 0;//guid
    this.name = settings.name || "default name";
    this.requirements = {green:0,red:0,yellow:0,blue:0};
    this.coolDown = 0;
    this.endTurnAfterCast = true;
    this.active = false;
    };
    Spell.prototype.canCast = function(player){
        
    };
    Spell.prototype.cast = function(){};
    