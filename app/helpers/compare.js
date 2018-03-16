export default Ember.Helper.helper(function (values, options) {

  var lvalue = values[0];
  var rvalue = values[1];

  var operator = options.operator || "==";

  var operators = {
    '==': (l, r) => {
      return l == r;
    },
    '===': (l, r) => {
      return l === r;
    },
    '!=': (l, r) => {
      return l != r;
    },
    '<': (l, r) => {
      return l < r;
    },
    '>': (l, r) => {
      return l > r;
    },
    '<=': (l, r) => {
      return l <= r;
    },
    '>=': (l, r) => {
      return l >= r;
    },
    'typeof': (l, r) => {
      return typeof l == r;
    },
    '&&': (l, r) => {
      return l && r;
    },
    '&&!': (l, r) => {
      return l && !r;
    },
    '||': (l, r) => {
      return l || r;
    },
    '||!': (l, r) => {
      return l || !r;
    },
    '+': (l, r) => {
      return l + r;
    }
  };

  const result = operators[operator](lvalue, rvalue);

  if (result) {
  	return true;
  } else {
  	return false;
  }

});
