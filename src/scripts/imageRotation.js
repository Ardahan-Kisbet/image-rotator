// Pixel Manipulation for a given ImageData

/*
 * # Pixel manipulation reference from MDN
 *   https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
 *
 * # ImageData creation
 *   give rotated image's width and height as second and third parameter, respectively.
 *   https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData
 *     array: Uint8ClampedArray
 *     width
 *     height
 *
 * # ImageData Pixel Indexing
 *   reaching to a point (pixel) in ImageData.data array:
 *     (x,y) = (col, row) --> index = (x + y * width) * 4 --> ImageData.data[index] (successive 4 index are belong to (x, y) in RGBA order)
 *
 * # Reference for Point Rotation
 *   Well Explained Point Rotation in 2D Coordinate System in regards to Origin (0,0) or (a,b)
 *   https://en.wikipedia.org/wiki/Rotation_(mathematics)
 *   https://en.wikipedia.org/wiki/Rotation_matrix
 *   https://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
 *   https://developer.apple.com/ [Translation, Rotation, and Scaling: Rotation Around the Center]
 *
 *     theta:  given rotation angle
 *     (x, y) -->  (x', y'):
 *       x' = x*cos(theta) - y*sin(theta)
 *       y' = x*sin(theta) + y*cos(theta)
 *
 *     Rotating around an Origin (a,b) other than default Origin (0,0)
 *     (x, y) -->  (x', y'):
 *       x' = ((x-a)*cos(theta) - (y-b)*sin(theta)) + a
 *       y' = ((x-a)*sin(theta) + (y-b)*cos(theta)) + b
 *
 *   x means column
 *   y means row
 */

/*
 * Rotates given ImageData regarding given angle and image center
 * ImageData is built-in javascript object type with pixel array in it
 * Angle is in degree format
 * Approach: Point Rotation on 2D Coordinate System
 */
function rotate(image, angle) {
  // JS Math works with radian
  let radian = convertToRadian(angle);

  // SAFETY CHECKS
  // if given angle is 0 | 360 then do not rotate
  if (Math.abs(radian) === 0) {
    return image;
  }
  // if given image pixel count is not equal to image.width*image.height then source data is corrupted
  if (image.data.length / 4 !== image.width * image.height) {
    throw new Error(
      "Provided image is corrupted. Length of pixel array is not consistent with image size!"
    );
  }

  // find new size of image to be created
  const sizeDiff = Math.abs(Math.sin(Math.PI / 2 - radian));
  const sinValue = Math.abs(Math.sin(radian));
  const newWidth = Math.round(image.width * sizeDiff + image.height * sinValue);
  const newHeight = Math.round(
    image.height * sizeDiff + image.width * sinValue
  );

  const newPixelArray = new Uint8ClampedArray(newWidth * newHeight * 4);

  // translate position after rotation: using image center
  const offsetX = Math.round((newWidth - image.width) / 2);
  const offsetY = Math.round((newHeight - image.height) / 2);

  // We need to rotate our image around center origin
  // see comment section for details about rotation around a specific origin (a, b)
  const originX = Math.round(image.width / 2);
  const originY = Math.round(image.height / 2);

  // O(M x N) time complexity where M, N are width and height of source image, respectively
  for (let y = 0; y < image.height; ++y) {
    for (let x = 0; x < image.width; ++x) {
      // index calculation (refer to comment section: 'ImageData Pixel Indexing')
      let currIdx = (x + y * image.width) * 4;

      // X-Prime and Y-Prime calculation (refer to comment section for details)
      let newPoint = rotatePoint(
        x,
        y,
        originX,
        originY,
        radian,
        offsetX,
        offsetY
      );

      // check if destination is in valid range
      let inRange =
        newPoint.X >= 0 &&
        newPoint.X < newWidth &&
        newPoint.Y >= 0 &&
        newPoint.Y < newHeight;

      if (inRange) {
        let destIdx = (newPoint.X + newPoint.Y * newWidth) * 4;
        newPixelArray[destIdx + 0] = image.data[currIdx + 0];
        newPixelArray[destIdx + 1] = image.data[currIdx + 1];
        newPixelArray[destIdx + 2] = image.data[currIdx + 2];
        newPixelArray[destIdx + 3] = image.data[currIdx + 3];
      }
      // Else: newPoint is out of range, ignore it
    }
  }

  return new ImageData(newPixelArray, newWidth, newHeight);
}

/*
 * Rotate given point (x, y) according to given origin and radian degree
 * Rotating over an Origin (a,b)
 *     (x, y) -->  (x', y'):
 *       x' = ((x-a)*cos(theta) - (y-b)*sin(theta)) + a
 *       y' = ((x-a)*sin(theta) + (y-b)*cos(theta)) + b
 * offset (X,Y) are optional to translate position after rotation (like canvas.context.translate())
 */
function rotatePoint(x, y, originX, originY, radian, offsetX = 0, offsetY = 0) {
  let xPrime =
    (x - originX) * Math.cos(radian) - (y - originY) * Math.sin(radian);
  xPrime += originX;
  let yPrime =
    (x - originX) * Math.sin(radian) + (y - originY) * Math.cos(radian);
  yPrime += originY;

  // normalize position if offsets are given
  xPrime += offsetX;
  yPrime += offsetY;

  // round before set since we are working on 2D coordinate system and
  // point positions are needed as integer to build array by indexing correct elements
  return { X: Math.round(xPrime), Y: Math.round(yPrime) };
}

// Converts given degree to radian
function convertToRadian(degree) {
  return degree * (Math.PI / 180);
}

// Inverse given pixel array (added for test purposes)
function inverse(pixelArr, length) {
  const invertedArr = new Uint8ClampedArray(length);
  // Iterate through every pixel
  for (let i = 0; i < length; i += 4) {
    invertedArr[i + 0] = 255 - pixelArr[i + 0]; // R value
    invertedArr[i + 1] = 255 - pixelArr[i + 1]; // G value
    invertedArr[i + 2] = 255 - pixelArr[i + 2]; // B value
    invertedArr[i + 3] = 255; // fully opaque:255 -- complete transparent:0
  }
  return invertedArr;
}

export { rotate };
