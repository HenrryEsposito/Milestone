function show_loading_skeleton(){
    show_results()
    document.getElementById("results-pannel").style.display = 'none'
    document.getElementById("results-pannel-loading").style.display = ''
}

function show_results(){
    document.getElementById("show-tec").style.color = "#f0f1f670"
    document.getElementById("show-results").style.color = "#f0f1f6"
    document.getElementById("results-pannel").style.display = ''
    document.getElementById("tec-pannel").style.display = 'none'

}

function show_tec(){
  document.getElementById("show-results").style.color = "#f0f1f670"
  document.getElementById("show-tec").style.color = "#f0f1f6"
  document.getElementById("results-pannel").style.display = 'none'
  document.getElementById("tec-pannel").style.display = 'grid'
}

function begin_add_tec(){
  const empty_tec_icon = document.getElementById("empty-tec-icon")
  
  empty_tec_icon.style.display = ''

  document.getElementById("empty-tec-icon-name").focus();

  document.getElementById("tec-icon-add").style.display = 'none'
}

function finish_add_tec(event){
  if (event.keyCode === 13) {
    const clone_tec_icon = document.querySelector(".tec-icon").cloneNode()
    const empty_tec_icon_name = document.getElementById("empty-tec-icon-name")
    const empty_tec_icon = document.getElementById("empty-tec-icon")
    const tec_icon_add = document.getElementById("tec-icon-add")
    const tec_pannel = document.getElementById("tec-pannel")


    clone_tec_icon.textContent = empty_tec_icon_name.value

    empty_tec_icon_name.value = ''

    empty_tec_icon_name.textContent = ''

    empty_tec_icon.style.display = 'none'

    tec_icon_add.style.display = ''


    tec_pannel.appendChild(clone_tec_icon)
  
    tec_pannel.appendChild(empty_tec_icon)

    tec_pannel.appendChild(tec_icon_add)

    store_tec()
  }

  else if (event.keyCode === 27 || event.type == "blur") {

    document.getElementById("tec-icon-add").style.display = ''

    document.getElementById("empty-tec-icon-name").value = ''

    document.getElementById("empty-tec-icon").style.display = 'none'
  }
}

function store_tec(){
  tec_icon_arr = document.getElementsByClassName("tec-icon");
  storage_form = document.getElementById("hidden-form");
  new_stored_value = document.querySelector("#stored-value").cloneNode();


  new_stored_value.name = tec_icon_arr[tec_icon_arr.length - 1].textContent

  storage_form.appendChild(new_stored_value)
}