'use strict';
const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });


/** Set your phone numbers here. They must be 11-digit numbers that start with
  * the country code.  "1" for the US.
  * 
  * Use commas after each number except for the last number.
  */
const PHONE_NUMBER_ARRAY = [
  "11111111111", // <--- YOU MUST SET THIS TO YOUR FIRST NUMBER!
  "11111111112", // <--- Add as many more numbers as you want.
  "11111111113"// <--- The last number should not have a comma.
]; 
/** Set your 3 messages here. */
const SINGLE_CLICK_MESSAGE = "This is a Safety Alert, Single Click.";
const DOUBLE_CLICK_MESSAGE = "This is a Safety Alert, Double Click.";
const LONG_CLICK_MESSAGE = "This is a Safety Alert, Long Click.";

exports.handler = (event, context, callback) => {
  let clickMessage = SINGLE_CLICK_MESSAGE;
  if (event.clickType === "LONG") {
    clickMessage = LONG_CLICK_MESSAGE;
  }
  if (event.clickType === "DOUBLE") {
    clickMessage = DOUBLE_CLICK_MESSAGE;
  }
  for (var i = 0; i < PHONE_NUMBER_ARRAY.length; i++) {
    const params = {
      PhoneNumber: PHONE_NUMBER_ARRAY[i],
      Message: clickMessage,
    };
    SNS.publish(params, callback);
  }
};