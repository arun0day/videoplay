import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {

  @ViewChild('target', {static: true}) target: ElementRef;
  options: { autoplay: boolean; controls: boolean; sources: { src: string; type: string; }[]; };
  player: any;
  scoreboard: any;
  firestoreObserver: any;

  constructor(private firestore:  AngularFirestore) { }

  ngOnInit() {
    // instantiate Video.js
    this.options = {
      autoplay: true,
      controls: true,
      sources: [{ src: '/assets/testvid.mp4', type: 'video/mp4' }]
    }
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    this.firestoreObserver = this.firestore.collection('score').doc('9EancozztXP6FASOLdID').valueChanges().subscribe((res: any) => {
      if(res.scorecard) {
        this.scoreboard = res.scorecard;
      }
    });
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
    this.firestoreObserver.unsubscribe()
  }

}
