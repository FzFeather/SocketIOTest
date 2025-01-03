const canvas = document.getElementById('myCanvas');
const form = $('#form');
const input = document.getElementById('roomNum');

var name = '';
var room = null;

function draw(){
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText(room[0], 20, 50);
  ctx.fillText(room[0], 21, 50);
}

$(function(){
  window.addEventListener('resize', function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  });
});


const socket = io();

form.on('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    name = $('#name').val();
    socket.emit('JOIN', {'id':input.value, 'name':name});
  }
});

socket.on('JOIN', (msg) => {
  document.getElementById('message').innerText = "Joined "+msg;
});
socket.on('ERROR', (msg) => {
  document.getElementById('message').innerText = msg;
});
socket.on('START', (msg) => {
  $('#form').hide();
  $('#myCanvas').show();
  room = msg;
  draw();
});
socket.on('INIT', (msg) => {
  console.log(msg);
});