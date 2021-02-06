// Pixel Manipulation for a given ImageData

// pixel manipulation reference from MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
// https://github.com/mdn/dom-examples/blob/master/canvas/pixel-manipulation/color-manipulation.js

// ImageData creation
// give rotated image's width and height as second and third parameter, respectively.
// https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData
//  array: Uint8ClampedArray
//  width
//  height

// Rotates given ImageData regarding given angle
function rotate(image, angle) {
  const data = new Uint8ClampedArray(40000);

  return new ImageData(data, 100, 100);
}

export { rotate };
