let keys = {
    personnel: [
        { id: 'firstNameField', field: 'input', type: 'text', placeholder: 'First Name', text: 'First Name: ', required: true, valueKey: 'firstName', value: null },
        { id: 'lastNameField', field: 'input', type: 'text', placeholder: 'Last Name', text: 'Last Name: ', required: true, valueKey: 'lastName', value: null },
        { id: 'emailField', field: 'input', type: 'text', placeholder: 'E-mail', text: 'Email: ', required: true, valueKey: 'email', value: null },
        { id: 'jobTitleField', field: 'input', type: 'text', placeholder: 'Job Title', text: 'Job Title: ', required: false, valueKey: 'jobTitle', value: null },
        { id: 'departmentSelector', field: 'select', text: 'Department: ', required: true, valueKey: 'department', options: [] }
    ],
    department: [
        { id: 'nameField', field: 'input', type: 'text', placeholder: 'Department name', text: 'Department name: ', required: true, valueKey: 'name', value: null },
        { id: 'locationSelector', field: 'select', text: 'Location: ', required: true, valueKey: 'location', options: [] }
    ],
    location: [
        { id: 'nameField', field: 'input', type: 'text', placeholder: 'Location name', text: 'Location name: ', required: true, valueKey: 'name', value: null },
    ]
}




$('#helper').hide()

const init = (tableName) => {
    $.ajax({
        url: '/libs/php/getAll.php',
        method: 'GET',
        success: (res) => {
            if (res.status.code = "200") {
                let resultsDiv = document.querySelector('#results')
                resultsDiv.innerHTML = ""
                res.data.forEach(record => {

                    let div = document.createElement('div')
                    div.id = record.id
                    div.className = "result-card mt-3 container-fluid"
                    let generalDiv = document.createElement('div')
                    div.appendChild(generalDiv)
                    generalDiv.className = "result-general";
                    let h4 = document.createElement('h4')
                    h4.className = 'text-center';
                    h4.innerHTML = `${record.firstName} ${record.lastName} <br><span class="postition">${record.jobTitle == "" ? '' : `(${record.jobTitle})`}</span>`
                    generalDiv.appendChild(h4)

                    let dataTable = document.createElement('table')
                    dataTable.className = "container-fluid"
                    dataTable.innerHTML +=
                        `<tr>
                            <td><strong>E-mail </strong></td>
                            <td>${record.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Department </strong></td>
                            <td>${record.department}</td>
                        </tr>

                        <tr>
                            <td><strong>Location </strong></td>
                            <td>${record.location}</td>
                        </tr>
                        `


                    generalDiv.appendChild(dataTable)


                    let btnDiv = document.createElement('div')
                    resultsDiv.appendChild(div)

                    btnDiv.className = "m-2 btn-group container text-center"
                    let editBtn = document.createElement('button')
                    editBtn.innerHTML = '<i class="m-3 fas fa-user-edit"></i>'
                    editBtn.className = "btn btn-warning edit"
                    let deleteBtn = document.createElement('button')
                    deleteBtn.innerHTML = '<i class="m-3 fas fa-user-times"></i>'
                    deleteBtn.className = "btn btn-danger delete"
                    btnDiv.appendChild(editBtn)

                    editBtn.addEventListener('click', (e) => {
                        console.log(`Edit ${record.id}`)
                        console.log(tableName)
                        setEditWindow(keys[tableName], record, tableName)
                    })
                    deleteBtn.addEventListener('click', (e) => {
                        //remove(record.id,tableName)
                        console.log(`Delete ${record.id}`)
                        init(tableName)

                    })
                    btnDiv.appendChild(deleteBtn)


                    div.appendChild(btnDiv)

                });
            }
        },
        error: (err) => { console.log(err) }
    })
}



let remove = (id, table) => {
    $.ajax({
        url: '/libs/php/deleteByID.php',
        method: 'POST',
        data: {id,table},
        success: (res) => {
            console.log(res.data.message)
        }
    })
}

let resultType = 'personnel';
const getData = (e) => {
    let tableName = e.target.id
    let event = e
    console.log(tableName)
    resultType = tableName
    if (tableName === "personnel") {
        init(tableName)
    } else {
        $.ajax({
            url: '/libs/php/getAllSelected.php',
            method: 'GET',
            data: { tableName },
            success: (res) => {
                if (res.status.code = "200") {
                    let resultsDiv = document.querySelector('#results')
                    resultsDiv.innerHTML = ""
                    console.log(res.data)

                    res.data.forEach(record => {

                        let div = document.createElement('div')
                        div.id = record.id
                        div.className = "result-card mt-3 container-fluid"
                        let generalDiv = document.createElement('div')
                        div.appendChild(generalDiv)
                        generalDiv.className = "result-general";
                        let h4 = document.createElement('h4')
                        h4.className = 'text-center';
                        h4.innerHTML = `${record.name} <br><span class="postition">${record.location ? record.location : " "}</span>`
                        generalDiv.appendChild(h4)




                        let btnDiv = document.createElement('div')
                        resultsDiv.appendChild(div)

                        btnDiv.className = "m-2 btn-group container text-center"
                        let editBtn = document.createElement('button')
                        editBtn.innerHTML = '<i class="m-3 fas fa-user-edit"></i>'
                        editBtn.className = "btn btn-warning edit"
                        let deleteBtn = document.createElement('button')
                        deleteBtn.innerHTML = '<i class="m-3 fas fa-user-times"></i>'
                        deleteBtn.className = "btn btn-danger delete"
                        btnDiv.appendChild(editBtn)

                        editBtn.addEventListener('click', (e) => {
                            console.log(e.target.parentNode.parentNode.id)
                            console.log(tableName)

                            setEditWindow(keys[tableName], record, tableName)
                        })
                        deleteBtn.addEventListener('click', (e) => {
                            //removeDepartment(record.id)
                            console.log(`Delete ${record.id}`)
                            tableName === "personnel" ? init(tableName) : getData(event)

                        })
                        btnDiv.appendChild(deleteBtn)


                        div.appendChild(btnDiv)

                    });
                }
            },
            error: (err) => { console.log(err) }
        })
    }
    $('#new').on('click', (e) => {
       
        let save=document.querySelector('#helper .save')
        save.replaceWith(save.cloneNode(true))
        setAddButton(tableName,keys[tableName])
    })
}

let instanceSelectors = document.querySelectorAll('#instaceSelector>div')
console.log(instanceSelectors)
instanceSelectors.forEach((btn) => {
    btn.addEventListener('click', getData)
})


init('personnel')



function getCreatorData() {
    return $.ajax({
        url: '/libs/php/getCreatorData.php',
        method: 'GET',
        success: (res) => {

        }
    })
}



let keyLists = {
    department: [
        { id: 'nameField', text: 'Name:', fieldType: 'input', type: 'text', class: 'form-control', required: true, PH: 'Department name' },
        { id: 'locationSelector', text: 'Location: ', class: 'form-control', fieldType: 'select', default: 'Choose a location...', required: true, dataIndentifier: 'location' }
    ],
    location: [
        { id: 'nameField', text: 'Name:', fieldType: 'input', type: 'text', class: 'form-control', required: true, PH: 'Office location name' }
    ],
    personnel: [
        { id: 'firstNameField', text: 'Name:', fieldType: 'input', type: 'text', class: 'form-control', required: true, PH: 'John' },
        { id: 'lastNameField', text: 'Name:', fieldType: 'input', type: 'text', class: 'form-control', required: true, PH: 'Sample' },
        { id: 'emailField', text: 'E-mail:', fieldType: 'input', type: 'email', class: 'form-control', required: true, PH: 'youremailadress@domain.com' },
        { id: 'jobTitleField', text: 'Job Title: ', fieldType: 'input', type: 'text', class: 'form-control', required: false, PH: 'Job Title i.e:Customer Assistant' },
        /*{ id: 'locationSelector', text: 'Location: ', class: 'form-control', fieldType: 'select', default: 'Choose a location...', required: true, dataIndentifier: 'location' },*/
        { id: 'departmentSelector', text: 'Department', class: 'form-control', fieldType: 'select', default: 'Choose a department...', required: true, dataIndentifier: 'department' }
    ]
}

async function setAddButton(type) {
    let res = await getCreatorData()
    let data = res.data
    let helperWindow = document.querySelector('#helper')
    let helperTable = document.querySelector('#helpertable>tbody')
    document.querySelector('#helper>h2').innerHTML = `Add new ${type}`
    helperTable.innerHTML = "";

    console.log(data)

    keyLists[type].forEach((input) => {
        let row = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        row.appendChild(td1)
        row.appendChild(td2)

        let field = document.createElement(input.fieldType)
        field.id = input.id
        field.className = input.class
        if (input.fieldType !== "select") field.type = input.type
        if (input.fieldType !== "select") field.placeholder = input.PH
        td1.innerHTML = input.text
        td2.appendChild(field)
        if (input.fieldType === "select") {
            let option = document.createElement('option')
            option.value = null
            option.innerText = input.default
            field.appendChild(option)


            data[input.dataIndentifier].forEach((elem) => {
                option = document.createElement('option')
                option.value = elem.id
                option.innerText = elem.name
                field.appendChild(option)
            })
        }
        helperTable.appendChild(row)
    })
    $('#helper').show()

    $('#helper .cancel').on('click', (e) => {
        $(`#${e.target.parentNode.parentNode.id}`).hide()
        let save = document.querySelector('#helper .save')
        save.replaceWith(save.cloneNode(true))
    })
    $('#helper .save').on('click',(e)=>{
        setSaveButton(type, keys[type])
        e.target.replaceWith(e.target.cloneNode(true))
    })
    
}


$('#new').on('click', (e) => {
    
    setAddButton('personnel',keys['personnel'])
    
})

//setAddButton('personnel')

async function getEditWindowData(id, type) {
    return $.ajax({
        url: type === "personnel" ? 'libs/php/getPersonnel.php' :
            type === "department" ? 'libs/php/getDepartmentByID.php' :
                'libs/php/getLocationByID.php',
        method: 'POST',
        data: { id },
        success: (res) => { console.log(res.data) },
        error: (err) => { console.error('Error happened!!') }
    })

}

async function getDepartmentData() {
    return $.ajax({
        url: 'libs/php/getAllDepartments.php',
        method: 'GET',
    })
}





async function setEditWindow(fields, recordData, type) {
    let res = await getCreatorData()
    let data = res.data
    console.log(data)
    let helperWindow = $('#helper')
    let helperTable = document.querySelector('#helpertable>tbody')
    helperWindow.hide()
    document.querySelector('#helper>h2').innerHTML = `Edit ${type}`
    helperTable.innerHTML = "";

    fields.forEach((field) => {
        let row = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let createdField = document.createElement(field.field)
        row.appendChild(td1)
        row.appendChild(td2)
        td1.innerText = field.text

        createdField.id = field.id
        createdField.className = "form-control"
        if (field.field !== "select") createdField.type = field.type
        if (field.field !== "select") createdField.placeholder = field.placeholder
        if (field.field !== "select") createdField.required = field.required
        if (field.field !== "select") createdField.value = recordData[field.valueKey]

        if (field.field === "select") {
            data[field.valueKey].forEach((elem) => {
                let option = document.createElement('option')
                option.value = elem.id
                option.innerText = elem.name
                option.selected = elem[`${field.valueKey}ID`] === elem.id
                createdField.appendChild(option)
            })

        }
        td2.appendChild(createdField)
        helperTable.appendChild(row)


    })


    $('#helper .cancel').on('click', (e) => {
        //console.log(`#${e.target.parentNode.parentNode.id}`)
        $(`#${e.target.parentNode.parentNode.id}`).hide()
        let save = document.querySelector('#helper .save')
        save.replaceWith(save.cloneNode(true))
    })
    $('#helper .save').on('click', (e) => {
        console.log(`Saving ${recordData.firstName}`)
        e.target.replaceWith(e.target.cloneNode(true))
        setSaveButton(type, fields)
        
    })

    helperWindow.show()


}


async function setSaveButton(type, fields) {
    let data = {}
        //console.log(fields)
    fields.forEach((field) => {
        console.log(field.id)
        data[field.valueKey === "location" || field.valueKey === "department" ? `${field.valueKey}ID` : field.valueKey] = document.querySelector(`#${field.id}`).value
        })

        console.log(data)
       let res=await $.ajax({
            url: type==="personnel"?'libs/php/insertPersonnel.php':
                 type==="department"?'libs/php/insertDepartment.php':
                                     'libs/php/insertLocation.php',
            
            method:'POST',
            data
            })
        console.log(res)
}
//setEditWindow(keys['personnel'],{"id":"97","firstName":"Stefanie","lastName":"Anker","jobTitle":"","email":"sanker2o@hud.gov","departmentID":"5"},'personnel')