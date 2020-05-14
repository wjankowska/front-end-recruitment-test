import BaconImage from './BaconImage';
import {fromEvent, interval} from 'rxjs';
import {debounce} from 'rxjs/operators';

/**
 * Class responsible for handling the button click.
 * After clicking a button new BeaconImage is created.
*/
export default class BaconHandler {
  /**
   * Create a BaconHandler.
   * Assign debounced event onClick to a button.
   * @param  {HTMLElement} button - Button generating bacon images after click.
   * @param  {HTMLImageElement} image - Image copied after clicking the button.
   * @param  {HTMLElement} container - Container that holds
   *                                   the new beacon images.
   */
  constructor(button, image, container) {
    this.classes = {
      baconContent: 'bacon-content',
    };

    this.button = button;
    this.image = image;
    this.container = container;
    this.baconParticleImage =
      'https://pngimg.com/uploads/bacon/bacon_PNG10920.png';

    fromEvent(this.button, 'click')
      .pipe(debounce(() => interval(150)))
      .subscribe((_) => {
        this.clickHandler();
      });
  }

  /**
   * Function called when the button is clicked.
   * After clicking a button a new BaconImage object is created.
   */
  clickHandler() {
    const bacon = new BaconImage(
      this.image.src,
      this.baconParticleImage,
      this.classes,
      this.container
    );

    bacon.createImage();
  }
}

