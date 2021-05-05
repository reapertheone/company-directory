let res=await getEditWindowData(id,type)
    let data=res.data
    console.log(data)
    let personnel=data.personnel[0]
    
   //console.log(personnel)
    
    let personnelDepartment=data.department.map((department)=>{


        department.selected=department.id===personnel.departmentID


        return department
    })
    
    res=await getCreatorData()
    let location=res.data.location
    console.log(location)

    let keys={
        personnel:[
            { id: 'firstNameField', text: 'Name:', fieldType: 'input', type: 'text', class: 'form-control', required: true, PH: 'John',value:personnel.firstName },
            { id: 'lastNameField', text: 'Name:', fieldType: 'input', type: 'text', class: 'form-control', required: true, PH: 'Sample',value:personnel.lastName },
            { id: 'emailField', text: 'E-mail:', fieldType: 'input', type: 'email', class: 'form-control', required: true, PH: 'youremailadress@domain.com',value:personnel.email },
            { id: 'jobTitleField', text: 'Job Title: ', fieldType: 'input', type: 'text', class: 'form-control', required: false, PH: 'Job Title i.e:Customer Assistant',value:personnel.jobTitle },
            { id: 'departmentSelector', text: 'Department', class: 'form-control', fieldType: 'select', default: 'Choose a department...', required: true, dataIndentifier: 'department',options:personnelDepartment }
        ],
        department:[
            { id: 'nameField', text: 'Name:', fieldType: 'input', type: 'text', class: 'form-control', required: true, PH: 'Department name' },
            { id: 'locationSelector', text: 'Location: ', class: 'form-control', fieldType: 'select', default: 'Choose a location...', required: true, dataIndentifier: 'location',options:location }
        ],
        location:[
            { id: 'nameField', text: 'Name:', fieldType: 'input', type: 'text', class: 'form-control', required: true, PH: 'Office location name' }
        ]
    }

    let helperWindow = document.querySelector('#helper')
    let helperTable = document.querySelector('#helpertable>tbody')
    document.querySelector('#helper>h2').innerHTML = `Edit ${type}`
    helperTable.innerHTML = "";
    keys[type].forEach((input)=>{
        let row=document.createElement('tr')
        let cell1=document.createElement('td')
        let cell2=document.createElement('td')
            row.appendChild(cell1)
            row.appendChild(cell2)
            helperTable.appendChild(row)

        let inputField=document.createElement(input.fieldType)
            inputField.id=input.id
            if(input.fieldType!=="select") inputField.type=input.type
            if(input.fieldType!=="select") inputField.placeholder=input.PH
            if(input.fieldType!=="select") inputField.required=input.required
            if(input.fieldType!=="select") inputField.value=input.value
            inputField.className=input.class
            if(input.fieldType==="select"){
                let option=document.createElement('option')
                option.value=null
                option.innerText='Choose one...'
                inputField.appendChild(option)
                input.options.forEach((record)=>{
                        option=document.createElement('option')
                        option.value=record.id
                        option.innerText=record.name
                        option.selected=record.selected
                        inputField.appendChild(option)
                })
            }
            cell1.innerText=input.text
            cell2.appendChild(inputField)    
            
    })
    $('#helper').show()
  