
import { GameScene } from './GameScene';

export class Note extends Phaser.GameObjects.Sprite{
    notes: Note[];
    scene: GameScene;
    timer: Phaser.Time.TimerEvent;
    constructor(scene: GameScene,x,x2,height,notes){
        super(scene,x,200,'note');
        //this.setScale(0.20,0.20);
        this.setScale(0.20,0.20);
        this.setAlpha(0);
        this.notes = notes;
        var tween = scene.tweens.add({
            targets: this,
            scaleX : 0.75,
            scaleY : 0.75,  
            x: x2,
            ease: 'Cubic.easeIn',
            y: height+80,                
            duration: 1800,    
        });
        this.timer = scene.time.addEvent({
            delay: 1800,
            callback: this.miss,
            callbackScope: this
            });
        var tween = scene.tweens.add({
            targets: this,
                alpha: 1, 
                ease: 'Cubic.easeIn',
                duration: 1000,
        }) 
       this.scene = scene;
       scene.add.existing(this);
      
    }
    miss():void{
        this.scene.game.events.emit('miss');
        this.notes.shift();
        this.destroy();
       
    }
}