//testar git
/* Script för scroll av navigation */
$(document).ready(function() {
  // Transitions effekt header 
  $(window).scroll(function() {
    // kollar när fönster scrollas efter 50 px, lägger till och tar bort solid class.
    if($(this).scrollTop() > 20) { 
        $('.header').addClass('solid');
        $('nav ul li a').addClass('color');
    } else {
        $('.header').removeClass('solid');
        $('nav ul li a').removeClass('color');
    }
  });
});
/* Script för hide and show div */



var specifiedElement = document.getElementById('welcomeDiv');
var specifiedElement2 = document.getElementById('loginButton')
document.addEventListener('click', function(event) {
  var isClickInside = specifiedElement.contains(event.target) || specifiedElement2.contains(event.target);
  if(specifiedElement.style.display === "block")
  {
    if(!isClickInside)
    {
      specifiedElement.style.display = "none";
    }
  }
});

function showDiv() {
  var theDiv = document.getElementById("welcomeDiv");
  if(theDiv.style.display === 'none')
  {
    theDiv.style.display = "block";
  }
  else
  {
    theDiv.style.display = "none";
  }
}




// function showDiv() {
//   document.getElementById("welcomeDiv").style.display = "block";
// }



function registreraFunc()
{
  //window.alert("Hej");
  var firebaseRef = firebase.database().ref();
  firebaseRef.set(
  {
    hej3:
        {
            bla1: "ett",
            bla2: "tva"   
        }
  })
  /// retrivar fran databas // 
  var retrive = firebase.database().ref().child("hej3/bla1/");
  var retrive2 = firebase.database().ref().child("hej3/bla2/");
  var text = '';
  retrive.on('value', function(databasesnapshot)
  {
    text += databasesnapshot.val();
    
  });

  retrive2.on('value', function(databasesnapshot)
  {
    text += ' '+ databasesnapshot.val();
  })
  window.alert(text);
}
/////////////////////////////////////////////////////////////////




/* END */
/* Script för animation av progress steg */
// (function() {  
//   var $point_arr, $points, $progress, $trigger, active, max, tracker, val;

//   $trigger   = $('.trigger').first();
//   $points    = $('.progress-points').first();
//   $point_arr = $('.progress-point');
//   $progress  = $('.progress').first();

//   val     = +$points.data('current') - 1;
//   max     = $point_arr.length - 1;
//   tracker = active = 0;

//   function activate(index) {
//     if (index !== active) {
//       active       = index;
//       var $_active = $point_arr.eq(active)
      
//       $point_arr
//         .removeClass('completed active')
//         .slice(0, active).addClass('completed')
      
//       $_active.addClass('active');
      
//       return $progress.css('width', (index / max * 100) + "%");
//     }
//   };

//   $points.on('click', 'li', function(event) {
//     var _index;
//     _index  = $point_arr.index(this);
//     tracker = _index === 0 ? 1 : _index === val ? 0 : tracker;
    
//     return activate(_index);
//   });

//   $trigger.on('click', function() {
//     return activate(tracker++ % 2 === 0 ? 0 : val);
//   });

//   setTimeout((function() {
//     return activate(val);
//   }), 1000);

// }).call(this);

