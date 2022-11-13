function toggle_input(event,id) {
    btn = document.getElementById(id);
    event.preventDefault();
    if(btn.disabled == false) btn.disabled = true
    else btn.disabled = false;
}

