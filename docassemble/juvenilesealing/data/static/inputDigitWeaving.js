// How do we add tests?

// This might be easier to read as a class
const keepInputFormatted = function ( inputNode, rawPatternData, customizeFormattedStringParts ) {
  /* Given an input node and pattern made up of digits and non-digits,
   *     changes the node's `.value` (in-place) into a digit-only
   *     version of the value, formatted to look like the pattern
   *     handed in. It lets the developer customize the string
   *     after it has been formatted and it puts the cursor in the right place.
   *     Returns an event listener remover for the event listener it adds.
   *
   * @examples
   * // Note: The pipe character shows the caret position
   * // `myInputNode`'s field looks like this: 320-0|
   * // The user places the cursor after the '2' and enters '5678'
   * // They lift their finger off any key
   * // `myInputNode` now looks like this: 325-67-8|00
   *
   * @param {object} inputNode - DOM input node that contains the value and
   *     is being edited by the user.
   * @param {string|object} rawPatternData - If a string, an example of what a correctly
   *     formatted string should look like using digits and characters. Un-normailzed.
   * @property {string} rawPatternData.pattern - An example of what a correctly
   *     formatted string should look like using digits and characters.
   * @property {integer} rawPatternData.minCharsTillPatternUsed - A positive integer
   *     telling us how many characters have to be typed before the input value
   *     will be changed by the pattern.
   * @param {function|undefined} customizeFormattedStringParts - Is given an
   *     object with two properties - `start` and `end`. That's the foramtted
   *     version of the original string split into two parts - the part before
   *     the new caret position and the part after the new caret position. It
   *     has to return an object with the properties `start` and `end`.
   * 
   * @returns {function} Removes the event listener from the node.
   */
  // First check for any errors. Might as well do it up front
  let patternData = normalizePatternData( rawPatternData );
  let beforeMovingCaret = normalizeFunction( customizeFormattedStringParts );

  // We only care about when text is changed. This will keep track.
  let prevValue = '';

  // Meat of the action. Putting it in here keeps `prevValue` in scope
  let keyupHandler = function ( event ) {
    const node = event.currentTarget;

    // If multiple keys are down (567), the first `keyup` will show
    // us a change (32567...). We'll incorporate those changes
    // (325-67...). The subsequent `keyup`s won't trigger anything.
    const currValue = node.value;
    if ( currValue !== prevValue ) {
    
      // TODO: Should we check _here_ if there are enough characters to bother
      // with the pattern?

      // Adjust the caret position around the characters
      let adjustedCaretPosition = getAdjustedCaretPosition( node, patternData );
      // Change whole input value to formatted value (325-67-800)
      let formattedVal = addCharactersAroundDigits( currValue, patternData );
      // Setting the value puts the caret at the end of the string.
      
      // Let the dev change the string in their own way
      let startAndEnd = {
        start: formattedVal.substring( 0, adjustedCaretPosition ),
        end: formattedVal.substring( adjustedCaretPosition ),
      };
      
      // New calculations with the new values
      let devVal = beforeMovingCaret( startAndEnd );
      throwIfInvalid( devVal );
      let devCaretPosition = devVal.start.length;
      let newVal = devVal.start + '' + devVal.end;

      node.value = newVal;  // Will  put caret at end of text
      prevValue = newVal;  // Prep for next time

      // Put caret in the place we figured out
      setInputSelection( node, devCaretPosition, devCaretPosition );
    }
  };  // Ends sync keyupHandler();

  // 'keyup' will show the keys the user presses before the
  // value then gets fixed. Haven't found a way around this, but I
  // think it gives good feedback to the user about what they're
  // doing wrong. Note: The 'input' event doesn't have the event values we need.
  inputNode.addEventListener( "keyup", keyupHandler );

  // Always good to be able to remove listeners
  let removeListener = getRemoveListener( inputNode, "keyup", keyupHandler );
  return removeListener;
};  // Ends sync keepInputFormatted()


const getAdjustedCaretPosition = function ( node, patternData, beforeMovingCaret ) {
  /** Uses current caret position to get an adjusted position for
   *     the caret based on the new formatting so the user will feel
   *     like the caret is where they expect it to be.
   *
   * @examples
   * // Note: The pipe character shows the caret position
   * // `myInputNode`'s field looks like this: 325678|0-0 (caret at 6th character)
   * let position = getAdjustedCaretPosition( myInputNode, "xxx-xx-xxxx" );
   * // position is 8
   *
   * @param {object} node - DOM node with a `.value` attribute
   * @param {string|object} patternData - As described in `keepInputFormatted`.
   *     We'll figure out how to do jsdoc properly soon...
   *
   * @returns {integer} - A positive integer.
   */
  const value = node.value;

  // We're going to add or subtract characters when we create the
  // formatted string (see below example). The caret doesn't
  // understand what's going on and holds on to its old position.
  // We need to fix it ourselves.
  const currentPositions = getInputSelection( node );
  // Note: Selections might act weird about their start and end. We
  // need whatever's closest to the start of the `input.value`.
  let lowestPosition = Math.min( currentPositions.start, currentPositions.end );
  // Use just the string before the current caret to match up the new position.
  let startToCaret = value.substr( 0, lowestPosition );
  let formattedString = addCharactersAroundDigits( startToCaret, patternData );
  let result = formattedString.length;

  return result;
};  // Ends sync getAdjustedCaretPosition()


const addCharactersAroundDigits = function ( toFormat, patternData ) {
  /** Uses the pattern to add non-digit characters around and between
   *     digit characters.
   *
   * @examples
   * let formatted = addCharactersAroundDigits( "12345", "(999) 999-9999" );
   * // (123) 45
   * let patternData = { pattern: "(999) 999-9999", minCharsTillPatternUsed: 3 };
   * let formatted = addCharactersAroundDigits( "123", patternData );
   * // 123
   * let formatted = addCharactersAroundDigits( "1234", patternData );
   * // (123) 4
   *
   * @param {string} toFormat - Raw string from the input field.
   * @param {string|object} patternData - As described in `keepInputFormatted`.
   *     We'll figure out how to do jsdoc properly soon...
   *
   * @returns {string}
   */
  
  // Already normalized values
  let characterPattern        = patternData.pattern;
  let minCharsTillPatternUsed = patternData.minCharsTillPatternUsed;
  
  // There must be a better word tha 'actual', but 'user' may not always be true
  let actualDigits = toFormat.replace( /\D/g, '' );
  // Don't insert the pattern if it's not time yet.
  if ( actualDigits.length <= minCharsTillPatternUsed ) {
    return actualDigits;
  }

  // Strings don't have a `.splice()`, but arrays do.
  // js `.splice()` will remove items from `actualDigitsArray` and
  // return them. It means we don't have to keep track of as many things.
  let actualDigitsArray = actualDigits.split( '' );
  // Split up digits and non-digits into their own groups in an array.
  let charsAndDigitsSeparated = characterPattern.match(/\d+|\D+/g);

  let result = '';
  for ( let charGroup of charsAndDigitsSeparated ) {
    // Don't put in any more characters after all the digits we
    // want have been used up. We don't want something like "23--"
    if ( actualDigitsArray.length > 0 ) {

      // Add non-digit strings in just as they are
      if ( /\D/g.test( charGroup )) {
        result += charGroup

      } else  {
        // Put in the right number of the digits we actually want
        let numDigitsInGroup = charGroup.length;
        
        // `splice()` is nice when coder go past the ends of array
        // contents, so no worries
        let nextDigitsArray = actualDigitsArray.splice( 0, numDigitsInGroup );
        let nextDigits = nextDigitsArray.join( '' );

        result += nextDigits;
      }  // ends if it's non-digits or digits
    }  // ends if we want more digits
  }  // ends for character groups

  return result;
};  // Ends sync addCharactersAroundDigits()


const normalizePatternData = function ( rawPatternData ) {
  /** Given a proper object or string, returns an object
   *     formatted correctly for creating the desired pattern.
   *     Handles a lot of specific error checking and warnings if
   *     needed.
   *
   * Note: Does not check for `Boolean()` `Number()` or `String()`
   *     Don't use those.
   *
   * @param {object|string} rawPatternData - Possibly a string
   *     made up of digits and characters to be put in between
   *     the digits. Otherwise, an object with the properties below.
   * @property {string} rawPatternData.pattern - A string
   *     made up of digits and characters.
   * @property {integer} rawPatternData.minCharsTillPatternUsed - A
   *     positive integer. 0 counts.
   *     See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
   */
  
  let pattern = null;
  let minChars = null;
  let errors = [];
  let warnings = [];
  
  // Handles `rawPatternData` level errors
  let patternDataType = typeof rawPatternData;
  let jsonPatternStr = ' with a value of ' + JSON.stringify( rawPatternData, null, 2 ) + '.';
  if (
      ( patternDataType !== 'string' && patternDataType !== 'object') ||
        Array.isArray( patternDataType ) || typeof patternDataType === null ) {
    let message = '`keepInputFormatted()` expects `patternData` ' +
        'to be a string or an object. Instead, it got a(n) ' +
        patternDataType + jsonPatternStr;
    throw new TypeError( message );
  }
  
  // Handles property errors and warnings
  if ( patternDataType === 'object' ) {
    pattern = rawPatternData.pattern;
    if ( typeof pattern !== 'string' ) {
      // If the pattern is not a string
      let warningStr = '`keepInputFormatted()` expects ' +
          '`patternData.pattern` to be a string. ' +
          'Instead, it got a(n) ' + typeof pattern + jsonPatternStr;
      errors.push( new TypeError( warningStr ));

    } else {
      
      // The pattern is valid, but is it useful?
      if ( !/\d/.test( pattern )) {
        // If there are no digits in the pattern string    
        let warningDigits = '`keepInputFormatted()` is supposed to help a user type '+
            'in numbers. The numbers in `patternData.pattern` tell these ' +
            'functions where to put the numbers the user types in. The ' +
            '`patternData.pattern` you handed in has no ' +
            'numbers in it. Instead, it got ' + jsonPatternStr + ' ' +
            'The user will not be able to type in any digits.'; 
        warnings.push( warningDigits ); 
      } else if ( !/\D/.test( pattern )) {
        // If there are no non-digits in the pattern
        let warningNotDigits = '`keepInputFormatted()` is supposed to help you '+
            'put non-number characters between numbers the user types, but you ' +
            'have no non-number characters in your `patternData.pattern`. ' +
            'Instead, it was ' + jsonPatternStr + ' ' +
            'Are you sure you need this function?'; 
        warnings.push( warningNotDigits ); 
      }  // ends checking if pattern has useful info
    }  // ends if pattern is invalid


    minChars = rawPatternData.minCharsTillPatternUsed;
    let jsonMinCharsStr = ' with a value of ' + JSON.stringify( minChars, null, 2 ) + '.';
    let charsMessageStart = '`keepInputFormatted()` expects ' +
        '`patternData.minCharsTillPatternUsed` to be a positive integer. ' +
        'Instead, it got a(n) ';
    if ( typeof minChars !== 'number' ) {
      let messageNumber = charsMessageStart + typeof minChars + jsonMinCharsStr;
      errors.push( new TypeError( messageNumber ));
    } else if ( isNaN( minChars )) {
      // The typeof NaN === 'number' :P
      let messageNaN = charsMessageStart + jsonMinCharsStr;
      errors.push( new TypeError( messageNaN ));
    } else if ( minChars < 0 ) {
      // If negative number (throw an error or give a warning and use 0?)
      let messageNeg = charsMessageStart + 'negative number' + jsonMinCharsStr;
      errors.push( new RangeError( messageNeg ));
    } else {
      // Valid number, but is it an integer? If not, they should be told.
      if ( !Number.isInteger( minChars )) {
        let messageNotInt = charsMessageStart + 'non-integer ' +
            jsonMinCharsStr + ' Are you sure this is what you wanted?';
        errors.push( new RangeError( messageNotInt ));
      }

      data.minCharsTillPatternUsed = minChars;
    }  // ends if minChars is invalid

  } else {  // if pattern data is not an object

    // Allow people to use the function in a more straightforward way
    pattern = rawPatternData;
    minChars = 0;

  }  // ends if patternData is an object
  
  // Needs thorough testing
  if ( warnings.length > 0 ) { console.trace( warnings ); }
  if ( errors.length > 0 ) { throw errors; }

  let data = {
    pattern: pattern,
    minCharsTillPatternUsed: minChars,
  };

  return data;
};  // Ends sync normalizePatternData()


const normalizeFunction = function ( maybeAFunction ) {
  /** Takes any value and returns a function or throws an error
   *     if the value is not a function or `undefined`.
   *
   * @param {function|undefined} maybeAFunction - Value to be checked.
   * @returns {function}
   */
  
  let result = maybeAFunction;
  let argType = typeof maybeAFunction;
  
  if ( maybeAFunction === undefined ) {
    // Default function
    result = function ( data ) { return data; };
  
  } else if ( argType !== 'function' ) {
    // If they're sending in an actual non-function value, they're
    // misunderstanding the use of this function or they did something
    // they didn't mean to do.
    let message = '`keepInputFormatted()` expected `undefined` or ' +
      'a function as a final argument. Instead, it got a(n) ' +
      argType + ' with a value of ' +
      JSON.stringify( maybeAFunction, null, 2 ) + '.';
    throw new TypeError( message );
  }  // ends typeof maybeAFunction

  return result;
};  // Ends sync normalizeFunction()


// This is a bad name
const throwIfInvalid = function ( obj ) {
  /** Throws an error if the value given is not an object with at least two
   *     properties, `start` and `end`, both of which have to be strings.
   *
   * @param {{ start: string, end: string, ... }} obj
   * @returns {undefined}
   */
  let argType = typeof obj;
  let message = '`keepInputFormatted()` needs to get an object ' +
      'of the format `{ start: "str", end: "otherStr" }`. Instead it ' +
      'got a(n) ' + argType + ' with a value of ' +
      JSON.stringify( obj, null, 2 ) + '.';

  if ( argType !== 'object' || Array.isArray( obj ) || argType === null ) {
    throw new TypeError( message );
  } else if ( typeof obj.start !== 'string' || typeof obj.end !== 'string' ) {
    throw new Error( message );
  }
};  // Ends sync throwIfInvalid()


const getRemoveListener = function ( node, event, handler ) {
  /** A higher order function (hof). Returns an event listener
  *     remover for the given node, event, and handler.
  *
  * @param {object} node - DOM node.
  * @param {string} event - Name of the event.
  * @param {function} handler - Function to be run when event is triggered.
  *
  * @returns {function}
  */
  return function removeListener () {
    node.removeListener( event, handler );
  }
};  // Ends sync getRemoveListener()
