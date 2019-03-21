import { noteRow } from './noteRow';
import { Key } from 'protractor';
import { Note } from './note';

export class GameScene extends Phaser.Scene {

    height: number;
    width: number;
    backdrop: Phaser.GameObjects.Sprite;
    hitbar: Phaser.GameObjects.Sprite;

    key1: Phaser.Input.Keyboard.Key;
    key2: Phaser.Input.Keyboard.Key;
    key3: Phaser.Input.Keyboard.Key;
    key4: Phaser.Input.Keyboard.Key;
    noteRows: noteRow[];

    test: any;

    constructor() {
        super({
            key: "WAJOO"
        });
    }
    preload(): void {
        this.load.setPath('assets/');
        this.load.multiatlas('sprites', 'sprites.json');
        


        this.load.image('note', 'note.png');
        this.load.image('kolom1', 'kolom11.png');
        this.load.image('kolom2', 'kolom22.png');
        this.load.image('backdrop', 'background5.png');
        this.load.image('bar3', 'hitbar3.png');

        this.load.image('hit1', 'particleHit1.png');
        this.load.image('hit1Flip', 'particleHit1Flip.png');
        this.load.image('hit2', 'particleHit2.png');
        this.load.image('hit2Flip', 'particleHit2Flip.png');
    }
    create(): void {
        this.height = this.game.canvas.height;
        this.width = this.game.canvas.width;

        this.backdrop = this.add.sprite(this.width / 2, this.height, 'backdrop');
        this.backdrop.setOrigin(0.5, 1);
        this.backdrop.setScale(0.995, 1);

        
    
        //Col 1 = 323 100, col2 = 375 300 col3 = 430 495, col 4 475 710
        this.noteRows = [];
        this.noteRows.push(new noteRow(this, 41, this.height, 'kolom1', 323, 100,'hit1',30));
        this.noteRows.push(new noteRow(this, 221, this.height, 'kolom2', 375, 300,'hit2',5));
        this.noteRows.push(new noteRow(this, 401, this.height, 'kolom2', 430, 495,'hit2Flip',-5));
        this.noteRows.push(new noteRow(this, 451, this.height, 'kolom1', 475, 710,'hit1Flip',-40));


        this.hitbar = this.add.sprite(this.width / 2, this.height, 'bar3');
        this.hitbar.setOrigin(0.5, 1);
        this.hitbar.setDepth(2);



        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

        var timer = this.time.addEvent({
            delay: 250,
            callback: this.setRandomNote,
            callbackScope: this,
            loop: true
        });

    }

    setRandomNote(): void {
        // this.noteRows.forEach(element => {
        //     element.addNote();
        // });
        this.noteRows[Math.floor(Math.random()*4)].addNote();
    }
    update(): void {
        if (Phaser.Input.Keyboard.JustDown(this.key1)) {
        }
        if (this.key1.isDown) {
            this.noteRows[0].checkForCollision();

            this.noteRows[0].setAlpha(1);
        } else {
            this.noteRows[0].setAlpha(0);
        }
        if (Phaser.Input.Keyboard.JustDown(this.key2)) {
            this.noteRows[1].checkForCollision();
        }
        if (this.key2.isDown) {
            this.noteRows[1].setAlpha(1);
        } else {
            this.noteRows[1].setAlpha(0);
        }
        if (Phaser.Input.Keyboard.JustDown(this.key3)) {
            this.noteRows[2].checkForCollision();
        }
        if (this.key3.isDown) {
            this.noteRows[2].setAlpha(1);
        } else {
            this.noteRows[2].setAlpha(0);
        }
        if (Phaser.Input.Keyboard.JustDown(this.key4)) {
            this.noteRows[3].checkForCollision();
        }
        if (this.key4.isDown) {
            this.noteRows[3].setAlpha(1);
        } else {
            this.noteRows[3].setAlpha(0);
        }

    }
}