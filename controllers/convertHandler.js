/*
*
*
*       Complete the handler logic below
*       
*       
*/
// Data returned will be in input parameter from the api route
// It contains a number and a measurement
// If no number is provided, assume 1

// A better alternative to eval() function
function evaluate(str) {
  return new Function('return ' + str)();
}

const allowedUnits = ['km', 'mi', 'gal', 'l', 'lbs', 'kg'];

function ConvertHandler() {
  
  this.getNum = function(input) {
    const result = input.match(/\d*(.+|\/)?\d+?/i);
    
    if (result === null) {
      return 1;
    }
    
    try {
      return parseFloat(evaluate(result[0]).toFixed(5));
    } catch(err) {
      return "invalid number";
    }  
  };
  
  this.getUnit = function(input) {
    const inpt = input.toLowerCase();
    const result = inpt.match(/[a-z]+/gi);
    if (allowedUnits.indexOf(result[0]) !== -1) {
      return result[0];
    }
    return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    switch(initUnit){
      case 'km':
        result = 'mi';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'gal':
        result = 'l';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    switch(unit){
      case 'km':
        result = 'kilometers';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = "invalid unit";
    }    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    } else if (initNum === 'invalid number' && initUnit !== 'invalid unit') {
      return 'invalid number';
    } else if (initNum !== 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid unit'
    }
    var result;
    switch(initUnit) {
      case 'km':
        result = initNum * (1/miToKm);
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum * (1/lbsToKg);
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum * (1/galToL);
        break;
      default:
        result = "Error";
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
