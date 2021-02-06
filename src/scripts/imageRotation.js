// Pixel Manipulation for a given ImageData

/*
pixel manipulation reference from MDN
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
https://github.com/mdn/dom-examples/blob/master/canvas/pixel-manipulation/color-manipulation.js

ImageData creation
give rotated image's width and height as second and third parameter, respectively.
https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData
 array: Uint8ClampedArray
 width
 height

Reference: Well Explained Point Rotation in 2D Coordinate System
https://www.khanacademy.org/computing/pixar/sets/rotation/v/sets-8

positive angle means counter-clockwise rotation
negative angle means clockwise rotation

  r:      hypotenuse
  theta:  given rotation angle

  (x, y) -->  (x', y'): 
      x' = x*cos(theta) - y*sin(theta)
      y' = x*sin(theta) + y*cos(theta)
*/

// Rotates given ImageData regarding given angle
function rotate(image, angle) {
  // SAFETY CHECKS

  // if given angle is 0 then do not rotate
  if (Math.abs(angle) % (Math.PI * 2) === 0) {
    return image;
  }

  // if given image pixel counts != image.width*image.height then source data is corrupted, return null
  if (image.data.length / 4 !== image.width * image.height) {
    return null;
  }

  let inverted = inverse(image.data, image.data.length);
  return new ImageData(inverted, image.width, image.height);
}

// convert given degree to radian
function convertToRadian(degree) {
  return (degree * Math.PI) / 180;
}

// only for test purposes to make sure everything works as expected
// inverse given pixel array
function inverse(pixelArr, length) {
  const invertedArr = new Uint8ClampedArray(length);
  // Iterate through every pixel
  for (let i = 0; i < length; i += 4) {
    invertedArr[i + 0] = 255 - pixelArr[i + 0]; // R value
    invertedArr[i + 1] += 255 - pixelArr[i + 1]; // G value
    invertedArr[i + 2] += 255 - pixelArr[i + 2]; // B value
    invertedArr[i + 3] = 255; // fully opaque:255 -- complete transparent:0
  }
  return invertedArr;
}

export { rotate };
