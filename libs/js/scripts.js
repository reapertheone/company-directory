let keyProps = {
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

let instanceSelectors=$('#instaceSelector>div')
instanceSelectors.on('click',(e)=>{
    let tableName=e.target.id
    init(tableName)

})

const init=async (tableName)=>{
 let personnelRes=await getPersonnels()
 let creatorRes=await getSupportData()
 let personnelsData=personnelRes.data
 let creatorData=creatorRes.data

 console.log(creatorData)

 let currentData=tableName==="personnel"?personnelsData:
                 creatorData[tableName]
    console.log(currentData)


 let divArray=currentData.map((data)=>{
     console.log(data)
     
    return createModal(data)
 })

//console.log(divArray)
let resultDiv=document.querySelector('#results')
    resultDiv.innerHTML=""
divArray.forEach((div)=>{
    resultDiv.appendChild(div)
})

setAddButtonAndSearch(tableName)

}


const getPersonnels=async ()=>{
    return $.ajax({
        url:'libs/php/getAll.php'
    })
}

const getSupportData=async ()=>{
    return $.ajax({
        url:'libs/php/getCreatorData.php'
    })
}


const createModal=(data)=>{
    let mainDiv=document.createElement('div')
    let h4=document.createElement('h4')
    let innerDiv=document.createElement('div')
    let table=document.createElement('table')
    let buttonDiv=document.createElement('div')
    let editButton=document.createElement('button')
    let deleteButton=document.createElement('button')


        editButton.className="btn btn-warning edit"
        
        deleteButton.className="btn btn-danger delete"
        editButton.innerHTML='<i class="m-3 fas fa-user-edit"></i>'
        deleteButton.innerHTML='<i class="m-3 fas fa-user-times">'
        
        buttonDiv.className="m-2 btn-group container text-center"
        table.className="container-fluid"
        innerDiv.className="result-general"
        h4.className="text-center"
        mainDiv.className="result-card mt-3 container-fluid"
        mainDiv.id=data.id

    let keys=Object.keys(data)
        keys=keys.filter((key)=>{
            return key!=='name'&&key!=='id'
        })
       // console.log(keys)
    //console.log(keys)

    let type=keys.includes("firstName")     ?   "personnel"  :
             keys.includes("location")    ?   "department" :
                                                "location"
                                                
        deleteButton.id=`delete-${type}-${data.id}`

    h4.innerText=type==="personnel"?`${data.firstName} ${data.lastName}`:data.name
    innerDiv.appendChild(h4)
    editButton.id=`edit-${type}-${data.id}`
    keys.forEach((key,index)=>{
        let row=document.createElement('tr')
        let td1=document.createElement('td')
        let td2=document.createElement('td')
        
        td1.innerText=key==="firstName"?"First Name: ":
                      key==="lastName"?"Last Name: ":
                      key==="email"?"Email: ":
                      key==="jobTitle"?"Job Title: ":
                      key==="department"?"Department: ":
                                        "Location: "
        td2.innerText=data[key]
                    
        row.appendChild(td1)
        row.appendChild(td2)
        table.appendChild(row)

    })
    innerDiv.appendChild(table)
    mainDiv.appendChild(innerDiv)
    mainDiv.appendChild(buttonDiv)
    deleteButton.addEventListener('click',removeOnClick)
    editButton.addEventListener('click',(e)=>{
        editOnClick(data)
    })

    buttonDiv.appendChild(editButton)
    buttonDiv.appendChild(deleteButton)

    return mainDiv

}

const editOnClick=(data)=>{
    let helper=$('#helper')
        if(helper.length!==0) helper.remove()
    let keys=Object.keys(data)
    let type=keys.includes("firstName")     ?   "personnel"  :
             keys.includes("location")    ?   "department" :
                                                "location"

    let dataSet=keyProps[type]
    let helperDiv=document.createElement('div')
        helperDiv.id="helper"
        helperDiv.className="container text-center"
    let h5=document.createElement('h5')
        h5.innerText=`Editing ${type}`
        helperDiv.appendChild(h5)
    let table=document.createElement('table')
        table.className="container-fluid"
        table.id="helpertable"
    let buttonDiv=document.createElement('div')
        buttonDiv.className="m-2 btn-group container text-center"
    let cancelButton=document.createElement('button')
        cancelButton.className="btn btn-warning cancel"
        cancelButton.innerHTML=`<strong>Cancel</strong>`
    let saveButton=document.createElement('button')
        saveButton.className="btn btn-danger save"
        saveButton.innerHTML=`<strong>Save</strong>`
        saveButton.id=`save-${type}-${data.id}`
        buttonDiv.appendChild(saveButton)
        buttonDiv.appendChild(cancelButton)
    
    dataSet.forEach(async (elem)=>{
        let row=document.createElement('tr')
        let td1=document.createElement('td')
        let td2=document.createElement('td')
        let field=document.createElement(elem.field)
            td1.innerText=elem.text
            row.appendChild(td1)
            td2.appendChild(field)
            row.appendChild(td2)
            field.id=elem.id
            field.className="form-control"
            if(elem.field==="input"){
                field.type=elem.type
                field.placeholder=elem.placeholder
                field.value=data[elem.valueKey]
            }else{
                let optionListRes=await getSupportData()
                let dataset=optionListRes.data[elem.valueKey]
                dataset.forEach((optionData)=>{
                    let option=document.createElement('option')
                    option.value=optionData.id
                    option.innerText=optionData.name
                    
                    option.selected=optionData.name===data[elem.valueKey]
                    field.appendChild(option)
                })
            }
            table.appendChild(row)
        })
    saveButton.addEventListener('click',(e)=>{
        let clicked=e.target.localName
        let targetID=clicked==="strong"?e.target.parentNode.id:e.target.id
        
        console.log(targetID)
        let type=targetID.split('-')[1]
        let id=targetID.split('-')[2]
        console.log(type,id)
        saveOnClick(type,id)
    })
    cancelButton.addEventListener('click',cancelOnClick)
    helperDiv.appendChild(table)
    helperDiv.appendChild(buttonDiv)
    let body=document.querySelector('body')
    body.appendChild(helperDiv)
    $('#helper').show('slow')
       
    

}

const saveOnClick=async (type,id)=>{
    console.log(type)
    let formdata={}
    if(typeof id!=="undefined") formdata.id=id
    console.log(formdata)
    
    keyProps[type].forEach((elem)=>{
        let field=document.querySelector(`#${elem.id}`)
        let value=field.value
        let key=elem.field==="select"?`${elem.valueKey}ID`:elem.valueKey
        if(key==="firstName"||key==="lastName"){
            let stringArr=value.split('')
            stringArr[0]=stringArr[0].toUpperCase()
            value=stringArr.join('')
            console.log(value)
        }
        formdata[key]=value
    })

    let res=await $.ajax({
        url:type==="personnel"?'libs/php/insertPersonnel.php':
            type==="department"?'libs/php/insertDepartment.php':
                                'libs/php/insertLocation.php',
        method:'POST',
        data:formdata
    })
        
        if(res.status.code==200){
            //alert(`Modification successfull the result set has been updated`)
            $('#saveSuccess').show()
            $('#helper').remove()
            init(type)
            
        }else{
            $('#saveFail').show()
            //alert(`Modification was not successfull please reload the page and try again`)
            $('#helper').remove()
        }
        
}

const cancelOnClick=(e)=>{
     $('#helper').remove()
     
     console.log('helper removed')
}

const removeOnClick=async (e)=>{
   let clicked=e.target.localName
   let targetID=clicked==="i"?e.target.parentNode.id:e.target.id
   let id=targetID.split('-')[2]
   let table=targetID.split('-')[1]
   if(table==="personnel"){
    let confirmation=await window.confirm(`Are you sure you want to delete the record?`)
    if(confirmation){
        let res=await remove(id,table)
        if(res.status.error) alert(res.status.message)
    
        init(table)
    }
   }else{
    let checkResponse=await $.ajax({url:table==="location"?'libs/php/getDepartmentByLocationID.php':'libs/php/getPersonByDepartmentID.php',data:{id}})
    let count=checkResponse.data[0].count

    if(count==="0"){
        let confirmation=await window.confirm(`Are you sure you want to delete this record?`)
    if(confirmation){
        let res=await remove(id,table)
        if(res.status.error) alert(res.status.message)
    
        init(table)
    }
    }else{
        /*
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        */
        $('#noDelete').show(200)




        //alert(`You can\'t delete the this record because it is in use.`)
    }
   }
  
   

   

   
}

const setAddButtonAndSearch=(tableName)=>{
    let addButton=document.querySelector('#new')
    addButtonClone=addButton.cloneNode(true)
    addButton.replaceWith(addButtonClone)
    addButtonClone.addEventListener('click',(e)=>{
        let helper=$('#helper')
        if(helper.length!==0) helper.remove()
    
    let type=tableName

    let dataSet=keyProps[type]
    let helperDiv=document.createElement('div')
        helperDiv.id="helper"
        helperDiv.className="container text-center"
    let h5=document.createElement('h5')
        h5.innerText=`Editing ${type}`
        helperDiv.appendChild(h5)
    let table=document.createElement('table')
        table.className="container-fluid"
        table.id="helpertable"
    let buttonDiv=document.createElement('div')
        buttonDiv.className="m-2 btn-group container text-center"
    let cancelButton=document.createElement('button')
        cancelButton.className="btn btn-warning cancel"
        cancelButton.innerHTML=`<strong>Cancel</strong>`
    let saveButton=document.createElement('button')
        saveButton.className="btn btn-danger save"
        saveButton.innerHTML=`<strong>Save</strong>`
        saveButton.id=`save`
        buttonDiv.appendChild(saveButton)
        buttonDiv.appendChild(cancelButton)
    
    dataSet.forEach(async (elem)=>{
        let row=document.createElement('tr')
        let td1=document.createElement('td')
        let td2=document.createElement('td')
        let field=document.createElement(elem.field)
            td1.innerText=elem.text
            row.appendChild(td1)
            td2.appendChild(field)
            row.appendChild(td2)
            field.id=elem.id
            field.className="form-control"
            if(elem.field==="input"){
                field.type=elem.type
                field.placeholder=elem.placeholder
                
            }else{
                let optionListRes=await getSupportData()
                let dataset=optionListRes.data[elem.valueKey]
                dataset.forEach((optionData)=>{
                    let option=document.createElement('option')
                    option.value=optionData.id
                    option.innerText=optionData.name
                    
                    
                    field.appendChild(option)
                })
            }
            table.appendChild(row)
        })
    saveButton.addEventListener('click',(e)=>{
        
        saveOnClick(type)
    })
    cancelButton.addEventListener('click',cancelOnClick)
    helperDiv.appendChild(table)
    helperDiv.appendChild(buttonDiv)
    let body=document.querySelector('body')
    body.appendChild(helperDiv)
    $('#helper').show('slow')

    })
}

const remove=async (id,table)=>{
    return $.ajax({
        url:'libs/php/deleteByID.php',
        data:{id,table},
        method:'POST'
    })
}


const search=async (name)=>{
    let strArr=name.split(' ')
    const [firstName,lastName]=strArr
    console.log('fn',firstName,lastName)
        
    let res=await $.ajax({
                url:'libs/php/searchPersonnel.php',
                data:typeof lastName!=="undefined"?{firstName,lastName}:{firstName},                
                method:'GET'
            })
        return res.status.code==="200"?res.data:"Error happened"
         
}




init('personnel')

search('b b')

let searchField=document.querySelector('#search')
searchField.addEventListener('keyup',async (e)=>{
        let value=e.target.value
        let response=await search(value)
        if(response==="Error happened"){
            alert('Error happened!!!Please reload the page')
        }else{
            let resultDiv=document.querySelector('#results')
            resultDiv.innerHTML=""
           let modalArray=response.map((data)=>{
               return createModal(data)
           })
           modalArray.forEach((elem)=>{
               resultDiv.appendChild(elem)
           })
        }
})

$('.close').on('click',()=>{$('.alert').hide()})

//editOnClick({"id":"95","lastName":"Baudi","firstName":"Dulcie","jobTitle":"","email":"dbaudi2m@last.fm","department":"Marketing","location":"New York"})

//createModal({"id":"95","lastName":"Baudi","firstName":"Dulcie","jobTitle":"","email":"dbaudi2m@last.fm","department":"Marketing","location":"New York"})