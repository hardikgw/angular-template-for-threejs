import { Component, HostListener, ViewChild } from '@angular/core';
import { PerspectiveCameraDirective, SceneDirective, WebGLRendererComponent } from 'atft';

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

  // @ViewChild(WebGLRendererComponent)
  // private renderer: WebGLRendererComponent;

  @HostListener('contextmenu', ['$event'])
  private shoutClickedObject(event: MouseEvent) {

    // Compute Three.js coordinates, i.e. (0, 0) is in the center
    // of the rendering object.
    const targetRect = (event.target as Element).getBoundingClientRect();
    const relativeX = event.clientX - targetRect.left; // x position within the element.
    const relativeY = event.clientY - targetRect.top;  // y position within the element.

    const mousePosition = new THREE.Vector2(
      ( relativeX / targetRect.width ) * 2 - 1,
      -( relativeY / targetRect.height ) * 2 + 1
    );

    console.log(`Clicked on ${event.target} with THREE coordinates (${mousePosition.x}), ${mousePosition.y})`);

    this.raycaster.setFromCamera(mousePosition, this.cameraDirective.camera);

    console.log(((this.sceneDirective as any).object as THREE.Scene)
    .children.map(x => x.type));
    const relevantObjects = ((this.sceneDirective as any).object as THREE.Scene)
      .children
      .filter(child => child.type === 'Object3D');
    console.log(relevantObjects);
    const intersectedObjects = this.raycaster.intersectObjects(relevantObjects, true);

    intersectedObjects.forEach(intersectedObject => {
      intersectedObject.object.rotateX(Math.PI / 2);
    });

    // this.renderer.render();
  }
}
