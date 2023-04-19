const debug = require("debug")("app:sanitizeBody");
const xss = require("xss");

const stripTags = (payload) => {
  const attributes = { ...payload };
  for (let key in attributes) {
    attributes[key] = sanitizeValue(attributes[key]);
  }
  return attributes;
};

const sanitizeValue = (value) => {
  if (value instanceof Array) {
    return value.map(sanitizeValue);
  }
  if (value instanceof Object) {
    return stripTags(value);
  }
  if (typeof value === "string") {
    return xss(value, {
      whiteList: {}, // empty, means filter out all tags
      stripIgnoreTag: true, // filter out all HTML not in the whitelist
      stripIgnoreTagBody: ["script"],
      // the script tag is a special case, we need
      // to filter out its content
    });
  }
  return value;
};

const sanitizedBody = (req, res, next) => {
  debug("sanitize body", req.body)
  const { id, _id, ...attributes } = req.body;
  const sanitizedBody = stripTags(attributes);
  debug({ sanitizeBody: attributes });
  req.sanitizedBody = sanitizedBody;
  next();
};

module.exports = sanitizedBody;
