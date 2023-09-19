/** Retourne l'objet client trouvé dans le local storage (localStorage)
  * à l'aide de son nom (clientName)
  **/
function findClientInLS(localStorage, clientName){
  let client;
  for(let i=0; localStorage.getItem("client"+i); i++){
    client = JSON.parse(localStorage.getItem("client"+i));
    if(client!=null && client.name == clientName){
      return client;
    }
  }
  return null;
}

/** Edition et téléchargement du pdf d'une facture
  * à l'aide de son numéro de facture (numFact)
  **/
function downloadPDF(numFact){
  //Récupération de l'objet facture dans le LS avec le numéro
  //de facture en paramètre
  let myStorage = window.localStorage;
  let myFacture = JSON.parse(myStorage.getItem("facture"+numFact));

  //Retrouve les informations du client lié à la facture dans le LS
  let myClient = findClientInLS(localStorage, myFacture.client);
  if(myClient==null){
    console.log("pas de client du nom de " + myFacture.client);
    return;
  }

  //Formattage de la date du jour. ex : 2 avril 2021
  let dateFacturation = myFacture.dateFacturation;

  //Prix TTC
  //let coutTTC = (myFacture.coutHT * 1.2).toString();
  //let coutTTC =  (myFacture.coutHT*1.2).toFixed(2);

  //Création du PDF et mise en page
  var doc = new jsPDF();
  doc.setFont("Corbel");
  doc.setFontType("normal");

  //PRESTATAIRE
  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text("Prestataire", 12, 24);

  doc.setFontSize(12);
  doc.text("Nom :", 20, 32);
  doc.setFontType("normal");
  doc.text("Rémy Leroy", 50, 32);
  doc.setFontType("bold");
  doc.text("N°SIREN :", 20, 39);
  doc.setFontType("normal");
  doc.text("123 456", 50, 39);
  doc.setFontType("bold");
  doc.text("Adresse :", 20, 46);
  doc.setFontType("normal");
  doc.text("3 rue de soleil", 50, 46);
  doc.text("97300 Cayenne", 50, 52);
  doc.setFontType("bold");
  doc.text("Téléphone :", 20, 59);
  doc.setFontType("normal");
  doc.text("0607080901", 50, 59);

  //TODO compléter

  //CLIENT
  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text("Client", 122, 24);

  doc.setFontSize(12);
  doc.text("Nom :", 130, 32);
  doc.setFontType("normal");
  doc.text(myFacture.client, 160, 32);
  doc.setFontType("bold");
  doc.text("N°SIREN :", 130, 39);
  doc.setFontType("normal");
  doc.text(myClient.siren, 160, 39);
  doc.setFontType("bold");
  doc.text("Adresse :", 130, 46);
  doc.setFontType("normal");
  doc.text(myClient.address1, 160, 46);
  doc.text(myClient.address2, 160, 52);


  //Facture
  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text("Facture n°" + numFact, 40, 95);


  //Objet
  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text("Objet :", 20, 120);
  doc.setFontSize(12);
  doc.setFontType("normal");
  doc.text("Facture du " + dateFacturation + " pour prestations informatiques.", 40, 120);


  //Intutulé
  doc.setFontType("bold");
  doc.text("Intitulé", 30, 150);
  doc.text("Tarif HT (EUR)", 100, 150);
  doc.text("Tarif TTC (EUR)", 150 ,150);
  doc.line(20, 152, 190, 152);
  doc.setFontType("normal");
  doc.text(myFacture.prestation, 30, 160);
  doc.text(myFacture.coutHT, 100, 160);
  //doc.text(coutTTC, 155, 160);
  //doc.text((myFacture.coutHT*1.2).toString(), 150, 160);
  doc.text((myFacture.coutHT*1.2).toFixed(2), 150, 160);
  doc.setFontType("bold");
  doc.line(20, 162, 190, 162);


  doc.save("facture"+numFact+".pdf");
  console.log("Téléchargement de la facture N°"+numFact + " du client "+ myFacture.client);
}
