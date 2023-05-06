/**
 * The function takes in a type and an object, and either parses the object if the type is "parse" or
 * converts the object to a string if the type is "string".
 * This function returns either a stringified data or a parse data
 * @param {string} type
 * - The type of conversion to perform. It can be either "parse" to convert a string to an
 * object or "string" to convert an object to a string.
 * @param {string | Array<object>} object
 * @returns {Array | string}
 * either a parsed object or a stringified object based on the type parameter passed to the
 */
export function formatObject(type, object) {
  if (!type) alert("Type is required");

  if (!object) alert("please pass the data to convert!");

  switch (type) {
    case "parse":
      //check if the data passed can be stringified or converted to a string
      if (typeof object !== "string")
        alert("Object passed is of invalid dataType! Expected a string");
      if (!Array.isArray(JSON.parse(object, null, 2)))
        alert("Your data is of invalid format!");
      return JSON.parse(object, null, 2);
      break;
    case "string":
      if (!Array.isArray(object))
        alert("Object passed is of invalid dataType! Expected a Array");
      return JSON.stringify(object, null, 2);
      break;
  }
}
