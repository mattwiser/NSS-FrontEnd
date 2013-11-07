$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#priority').on('submit', submitPriority);
  $('form#todo').on('submit', submitToDo);

}

function submitAjaxForm(event, form, successFn){
  var url = $(form).attr('action');
  var data = $(form).serialize();
  var options = {};
  options.url = url;
  options.type = 'post';
  options.data = data;
  options.error = function(jqXHR, status, error){console.log(error);};
  options.success = successFn;

  $.ajax(options);
  event.preventDefault();
}


function submitToDo(e){
  submitAjaxForm(e, this, function(data, status, jqXHR){
    htmlAddToDo(data);
  });
}



function submitPriority(e){
  submitAjaxForm(e, this, function(data, status, jqXHR){
    htmlAddPriorityToSelect(data)
  });
}

function htmlAddToDo(todo){
  var $row = $('<tr>');

  var $title = $('<td>');
  $title.text(todo.title);
  $row.append($title);

  var $dueDate = $('<td>');
  $dueDate.text(todo.dueDate);
  $row.append($dueDate);

  var $priority = $('<td>');
  $priority.text(todo.priority.name);
  $row.append($priority);

  var $del = $('<td>');
  var $delbtn = $('<a class = "delete button expand alert">');
  $delbtn.text('Delete');
  $del.append($delbtn);
  $row.append($del);


  $row.css('background-color', todo.priority.color);


  $('table#todos tbody').append($row);
}

function htmlAddPriorityToSelect(priority){
  var $option = $('<option>');

  $option.text(priority.name);
  $option.val(priority._id);

  $('#priority-select').append($option);
  $('form#priority input').val('');
}