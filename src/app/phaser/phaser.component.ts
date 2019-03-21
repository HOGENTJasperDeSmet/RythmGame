import { Component,Input, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameScene } from "./GameScene";
import { trigger, transition, animate, style, state } from '@angular/animations';
@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
  styleUrls: ['./phaser.component.css']
})
export class PhaserComponent implements OnInit{

  phaserGame: Phaser.Game;
  
  preloadStatus: string = "Preloading";
  config: any;
  combo: number;
  comboCounter: HTMLElement; 
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      scene: new GameScene(),
      parent: 'phaserContainer',
      width: '100%',
      height: '100%',
      "transparent": true
    };
    this.combo = 0;
    this.phaserGame = new Phaser.Game(this.config);
     this.phaserGame.events.addListener('hit', k=>{
      this.combo++
      this.comboCounter.classList.remove("comboBig");
      void this.comboCounter.offsetWidth;
      this.comboCounter.classList.add("comboBig");
      
    })
     this.phaserGame.events.addListener('miss', k=>{
      this.combo=0
      this.comboCounter.classList.remove("comboBig");

     })
  }
  ngOnInit(): void {
    this.comboCounter = document.getElementById("combo");    
  }
}