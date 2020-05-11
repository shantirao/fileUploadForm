var targetFolder = "0B_a1pN8eotkefmNmQVozRS1qenVENktGaVdEWUtaREZpaWNOdjV1cFd5YkFyeG0wWUFJVlU";

function doGet(e) {
  var template = HtmlService.createTemplateFromFile('form.html');
 // template.setTitle("Training Certificate Upload");
  template.aysoid = e.parameter.aysoid || '';
  template.name = e.parameter.name || '';
  template.email = e.parameter.email || '';
  template.training = e.parameter.training || '';

 // Logger.log(template.evaluate().getContent());

  return template.evaluate();
  
  return HtmlService
    .createHtmlOutputFromFile('form.html')
    .setTitle("Training Certificate Upload");
}

function submitFormWithFile(data, aysoid, name, email, training) {
Logger.log(name+' '+email+' '+training);
  try {
    var folder = DriveApp.getFolderById(targetFolder)

    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7));
        blob = Utilities.newBlob(bytes, contentType, training + ' ' + name );

    var file = folder.createFile(blob);

    SpreadsheetApp.getActiveSheet().appendRow([new Date, aysoid, name, email, training, file.getUrl()]);
                                
    return "Certificate received";

  } catch (f) {
    return f.toString();
    Logger.log(f);
  }

}