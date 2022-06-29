//Female and Male users
var ctx = document.getElementById('chartBar');

var numFemale = ctx.dataset.female;
var numMale = ctx.dataset.male;

var chartBar = new Chart(ctx, {
   type: 'bar',
   data: {
     labels: ['Female', 'Male'],
     datasets: [{ 
         data: [numFemale, numMale],
         backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
         ],},]
   }
});

// Messages read / unread
var doughnutDiv = document.getElementById('doughnut');

var messagesRead = doughnutDiv.dataset.read;
var messagesUnread = doughnutDiv.dataset.unread;

var doughnutDiv = new Chart(doughnutDiv, {
   type: 'doughnut',
   data: {
      labels: [
         'Messages read',
         'Messages unread',
       ],
       datasets: [{
         label: 'My First Dataset',
         data: [messagesRead, messagesUnread],
         backgroundColor: [
           'rgb(54, 162, 235)',
           'rgb(255, 99, 132)',
         ],
         hoverOffset: 4
       }]
     }
});


//Orders sent
var pieDiv = document.getElementById('chartpie');

var ordersSent = pieDiv.dataset.sent;
var ordersNotSent = pieDiv.dataset.notsent;

var pieDiv = new Chart(pieDiv, {
   type: 'pie',
   data: {
      labels: [
         'Orders sent',
         'Orders not sent',
       ],
       datasets: [{
         label: 'My First Dataset',
         data: [ordersSent, ordersNotSent],
         backgroundColor: [
           'rgb(75, 192, 192)',
           'rgb(255, 205, 86)',
         ],
         hoverOffset: 8
       }]
     }
});


//Sales figures
var lineDiv = document.getElementById('linechart');

   //on parse (transforme une string en objet) la data envoyé, car c'était un objet dans index.js, qu'il a fallu faire passer dans charts.ejs en string, grâce à JSON.stringify(). Donc là on re-transforme cette string de charts.ejs en objet.
var data = JSON.parse(lineDiv.dataset.sales)
   // console.log(data)

let monthLabels = []
let salesResults = []

for(var i=0; i<data.length; i++) {

   //Extraction des mois pour l'axe vertical
   //new Date() pour formater la date en format lisible
   var date = new Date((data[i]._id.year), (data[i]._id.month)-1)
   //On peut changer (data[i]._id.year) avec un Number, c'est ok. 
   //new Date() est une fonction qui peut accepter des paramètres.
   
   var month = date.toLocaleString('en-GB', { month : 'long' })
   //Doc: toLocaleString() renvoie une chaine de caractères, représentant la date selon les settings locale de l'endroit où on est.
   //{month : 'long'} = écriture longue ('short' = écriture courte)
   monthLabels.push(month)

   //Somme total de chaque mois. (obtenu grâce à l'aggregation dans index.js)
   salesResults.push(data[i].totalSales)
}

var lineDiv = new Chart(lineDiv, {
   type: 'line',
   data: {
      labels: monthLabels,
      datasets: [{
        label: 'Sales figures',
        data: salesResults,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
   }
});

//Depuis la doc : 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
// Request a weekday along with a long date :
// let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };