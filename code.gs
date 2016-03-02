/* The script is deployed as a web app and renders the form */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('form.html')
            .setSandboxMode(HtmlService.SandboxMode.NATIVE);
  // This is important as file upload fail in IFRAME Sandbox mode.
}
 
/* This function will process the submitted form */
function uploadFiles(form) {
  
  try {
    
    /* Name of the Drive folder where the files should be saved */
    var parentname='Living Lab Applications';
    var parent, parents = DriveApp.getFoldersByName(parentname);
    
    /* Find the folder, create if the folder does not exist */
    if (parents.hasNext()) {
      parent = parents.next();
    } else {
      parent = DriveApp.createFolder(parentname);
    }
    
    var dropbox = form.firstName + " " + form.lastName;
    var folder, folders = parent.getFoldersByName(dropbox);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = parent.createFolder(dropbox);
    }
    
    /* Get the file uploaded though the form as a blob */
    var fileIRBapp = folder.createFile(form.IRBapp);
    fileIRBapp.setName('IRB Application - ' + form.lastName);
    var fileIRBemail = folder.createFile(form.IRBemail);
    fileIRBemail.setName('IRB Approval Email - ' + form.lastName);
    var fileConsent = folder.createFile(form.Consent);
    fileConsent.setName('Consent - ' + form.lastName);
    var fileDebrief = folder.createFile(form.Debrief);
    fileDebrief.setName('Debrief - ' + form.lastName);
    var fileSummary = folder.createFile(form.Summary);
    fileSummary.setName('Study Summary - ' + form.lastName);
    var fileFlyer = folder.createFile(form.Flyer);
    fileFlyer.setName('Recruitment Flyer - ' + form.lastName);
    
    /* Set the file description as the name of the uploader*/
    fileIRBapp.setDescription("Uploaded by " + form.firstName); 
        
    /* Return the download URL of the file once its on Google Drive */
    return "File uploaded successfully " + fileIRBapp.getUrl();
    
  } catch (error) {
    
    /* If there's an error, show the error message */
    return error.toString();
  }
  
}
