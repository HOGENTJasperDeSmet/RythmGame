import { GameScene } from './GameScene';
import { Note } from './Note';

export class noteRow extends Phaser.GameObjects.Sprite{
    notes: Note[];
    scene: GameScene;
    noteX: number;
    noteX2: number;
    particles: any;
    particleOffset: number;
    //particleOffset = 30, 10, -10, -40
    constructor(scene: GameScene,x:number,height: number,kolom:string,noteX:number,noteX2:number,particle:string,particleOffset:number){
        super(scene,x,height,kolom);
        this.scene = scene;
        this.setOrigin(0,1);
        this.setAlpha(0);
        //over de helft
        this.noteX= noteX;
        this.noteX2= noteX2;
        this.particles = this.scene.add.particles(particle);
        this.particleOffset = particleOffset;
        if(x > scene.width/2){
            this.flipX = true;
            this.particles.flipX=true;
        }
        this.particles.setDepth(1);
        scene.add.existing(this);
        this.notes = [];
    }
    checkForCollision():void{
        if(this.notes.length != 0){
            if(this.notes[0].y > this.scene.height-150){
                var noteToCheck = this.notes.shift();
                var emitter = this.particles.createEmitter({
                    speed: 1,
                    maxParticles: 4,
                    qauntity: 0,
                    scale: 1.1,
                    blendMode: 'SCREEN',
                    lifespan: 300,
                });
                
                this.scene.time.delayedCall(200, function(p:Phaser.GameObjects.Particles.ParticleEmitter) {
                    p.stop();
                },[emitter],this);
                emitter.setPosition(this.noteX2+this.particleOffset, this.height-25);
                noteToCheck.timer.remove();
                noteToCheck.destroy();
                this.scene.game.events.emit('hit'); 
            }
        }
    }
    addNote():void{
        this.notes.push(new Note(this.scene,this.noteX,this.noteX2,this.height,this.notes));
    }
}