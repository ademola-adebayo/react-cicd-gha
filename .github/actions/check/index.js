const core = require('@actions/core');
const github = require('@actions/github');

(async function run () {    
  try {        
    core.notice('Check File Action called!!!');    
  } catch (error) {        
    core.setFailed(error.message);    
  }})();