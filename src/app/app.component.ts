import { Component, HostListener, ViewChild } from '@angular/core';
import { PerspectiveCameraDirective, SceneDirective } from 'atft';

import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  public rotationX = 0.0;
  public rotationY = 0.0;
  public rotationZ = 0.0;

  public translationY = 0.0;

  private raycaster = new THREE.Raycaster();

  @ViewChild(PerspectiveCameraDirective)
  private cameraDirective: PerspectiveCameraDirective;

  @ViewChild(SceneDirective)
  private sceneDirective: SceneDirective;

  private mousePosition = new THREE.Vector2();

  @HostListener('mousemove', ['$event'])
  private captureMousePosition(event: MouseEvent) {
    event.preventDefault();
    this.mousePosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mousePosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  @HostListener('click')
  private shoutClickedObject() {
    this.raycaster.setFromCamera(this.mousePosition, this.cameraDirective.camera);

    console.log(((this.sceneDirective as any).object as THREE.Scene)
    .children.map(x => x.type));
    const relevantObjects = ((this.sceneDirective as any).object as THREE.Scene)
      .children
      .filter(child => child.type === 'Object3D');
    console.log(relevantObjects);
    const intersectedObjects = this.raycaster.intersectObjects(relevantObjects);
    intersectedObjects.map(x => x.object.type).forEach(console.log.bind(console));
  }
}
