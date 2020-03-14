var x, y, z;
x = 5;
y = 6;
z = x + y;
document.getElementById("demo").innerHTML = "Nilai z adalah " + z + ".";

function add() {
  var x1 = document.getElementById("nilai1").value;
  var x2 = document.getElementById("nilai2").value;
  var sum = parseInt(x1) + parseInt(x2);
  alert("hasil Penjumlahan :" + sum);
  document.getElementById("hasil").innerHTML = sum;
}
