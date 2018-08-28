var app = new Vue({
    el: '#app',
    data: {
        message: ''
    }
  });

// var nowDate = new Date();
// var today = nowDate.getDate();
// var currentMonth = nowDate.getMonth();
// var currentYear = nowDate.getFullYear();
// var temp = new Date(currentYear, currentMonth + 1, 0);
// var lastDay = temp.getDate();

// function createTable() {
//   var d = new Date(currentYear, currentMonth, 1);
//   var t = d.getDay() - 1;
//   if (t < 0) {
//     t = 6;
//   }

//   var a = 0;
//   while (d.getMonth() == currentMonth) {

//     var tr = document.createElement('tr');
//     var i = 0;

//     while (i < 7) {
//       var td = document.createElement('td');
//       if (a == 0) {
//         if (i < t) {
//           // td.innerHTML = " ";
//         }else {
//           td.innerHTML = d.getDate();
//           d.setDate(d.getDate() + 1);
//         }
//       }else {
//         td.innerHTML = d.getDate();
//         d.setDate(d.getDate() + 1);
//       }
//       tr.appendChild(td);
//       i++;          
//     }
//     if (d.getDate() == lastDay) {
//       break;
//     }
//     document.getElementById('table').appendChild(tr);
//     a++;
//   }
// }

function Calendar(id, year, month) {
  var Dlast = new Date(year, month + 1, 0).getDate(),
      D = new Date(year, month, Dlast),
      DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
      DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
      calendar = '<tr>',
      month=["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  if (DNfirst != 0) {
    for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
  }else{
    for(var  i = 0; i < 6; i++) calendar += '<td>';
  }
  for(var  i = 1; i <= Dlast; i++) {
    if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
      calendar += '<td id="today">' + i;
    }else{
      calendar += '<td>' + i;
    }
    if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
      calendar += '<tr>';
    }
  }
  for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
  document.querySelector('#' + id + ' tbody').innerHTML = calendar;
  document.querySelector('#nowDate').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
  document.querySelector('#nowDate').dataset.month = D.getMonth();
  document.querySelector('#nowDate').dataset.year = D.getFullYear();

  if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
    document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
  }
}
  Calendar("calendar", new Date().getFullYear(), new Date().getMonth());
  // переключатель минус месяц
  document.querySelector('.btnLeft').onclick = function() {
    Calendar("calendar", document.querySelector('#nowDate').dataset.year, parseFloat(document.querySelector('#nowDate').dataset.month) - 1);
  }
  // переключатель плюс месяц
  document.querySelector('.btnRight').onclick = function() {
    Calendar("calendar", document.querySelector('#nowDate').dataset.year, parseFloat(document.querySelector('#nowDate').dataset.month) + 1);
  }
  // переключатель сегодня
  document.querySelector('.btnToday').onclick = function() {
    var nowDate = new Date();
    Calendar("calendar", document.querySelector('#nowDate').dataset.year = nowDate.getFullYear(), document.querySelector('#nowDate').dataset.month = nowDate.getMonth());
  }
