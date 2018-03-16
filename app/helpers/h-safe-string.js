export function templatedString(value, options) {

  if(!value) return null;

  var finalString = value[0];
  if (!finalString) {
    return Ember.String.htmlSafe('');
  }

  if (typeof finalString.replace === 'function') {
    for ( var property in options ) {
      if ( options[property] ) {
        finalString = finalString.replace( "{" + property + "}", options[property] );
      }
    }
  }

  return Ember.String.htmlSafe(finalString);
}

export default Ember.Helper.helper( templatedString );