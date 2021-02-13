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
 
 *     Rotating P(x,y) around Origin (0,0):
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
  // SAFETY CHECKS
  // if given angle is 0 or 360 degree then do not rotate
  if (angle % 360 === 0) {
    return image;
  }
  // if given image pixel count is not equal to image.width*image.height then source data is corrupted
  if (image.data.length / 4 !== image.width * image.height) {
    throw new Error(
      "Provided image is corrupted. Length of pixel array is not consistent with image size!"
    );
  }

  // JS Math Library works with radian
  let radian = convertToRadian(angle);

  // find new size of image to be created
  // see my drawing via sketchometry.org under ../public/Rotated Image Size Calculation.png
  const cosValue = Math.abs(Math.cos(radian));
  const sinValue = Math.abs(Math.sin(radian));
  const newWidth = Math.round(image.width * cosValue + image.height * sinValue);
  const newHeight = Math.round(image.height * cosValue + image.width * sinValue);
  const newPixelArray = new Uint8ClampedArray(newWidth * newHeight * 4);

  // offset should be calculated to translate newly created image to correct central position
  // offset is simply half of the differences of both images sizes in both axis
  const offsetX = Math.round((image.width - newWidth) / 2);
  const offsetY = Math.round((image.height - newHeight) / 2);

  // We need to rotate our image around center origin
  // see comment section for details about rotation around a specific origin (a, b)
  const originX = Math.round(newWidth / 2);
  const originY = Math.round(newHeight / 2);

  // O(M x N) time complexity where M, N are width and height of newly created image, respectively
  for (let y = 0; y < newHeight; ++y) {
    for (let x = 0; x < newWidth; ++x) {
      // index calculation (refer to comment section: 'ImageData Pixel Indexing')
      let destIdx = (x + y * newWidth) * 4;

      // X-Prime and Y-Prime calculation (refer to comment section for details)
      // Be careful about sign of radian. It is passed as negative since we are rotating from destination to source
      let newPoint = rotatePoint(
        x,
        y,
        originX,
        originY,
        -radian,
        offsetX,
        offsetY
      );

      // check if calculated new point is corresponds to any pixel on source image
      let inRange =
        newPoint.X >= 0 &&
        newPoint.X < image.width &&
        newPoint.Y >= 0 &&
        newPoint.Y < image.height;

      if (inRange) {
        // copy from source to new image
        let currIdx = (newPoint.X + newPoint.Y * image.width) * 4;
        newPixelArray[destIdx + 0] = image.data[currIdx + 0];
        newPixelArray[destIdx + 1] = image.data[currIdx + 1];
        newPixelArray[destIdx + 2] = image.data[currIdx + 2];
        newPixelArray[destIdx + 3] = image.data[currIdx + 3];
      }
      // Else: newPoint is out of range, ignore it
      // unassigned indexes will be remain as 0 since the contents of Uint8ClampedArray is initialized to 0
      // 0 means that pixel is transparent (alpha value 0)
    }
  }

  return new ImageData(newPixelArray, newWidth, newHeight);
}

/*
 * Rotate given point (x, y) according to given origin and radian degree
 * Rotating around an Origin (a,b)
 *     (x, y) -->  (x', y'):
 *       x' = ((x-a)*cos(theta) - (y-b)*sin(theta)) + a
 *       y' = ((x-a)*sin(theta) + (y-b)*cos(theta)) + b
 * offset (X,Y) are optional to translate position after rotation (like canvas.context.translate())
 */
function rotatePoint(x, y, originX, originY, radian, offsetX = 0, offsetY = 0) {
  let xPrime = (x - originX) * Math.cos(radian) - (y - originY) * Math.sin(radian) + originX;
  let yPrime = (x - originX) * Math.sin(radian) + (y - originY) * Math.cos(radian) + originY;

  // translate position if offsets are given
  xPrime += offsetX;
  yPrime += offsetY;

  // round before set since we are working on 2D coordinate system and
  // point positions are needed as integers to build array by indexing correct elements
  // but as a side effect this is where we might use same source pixel in more than one place in our new image
  // Interpolation would be a solution for this: nearest neighbor, bilinear, bicubic
  return { X: Math.round(xPrime), Y: Math.round(yPrime) };
}

// Converts given degree to radian
function convertToRadian(degree) {
  return degree * (Math.PI / 180);
}

export { rotate };
