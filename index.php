<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Company Directory</title>
    <script src="./libs/js/jquery-2.2.3.min.js"></script>
    <script src="./libs/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./libs/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="./libs/css/own.css"/>
    <script src="https://kit.fontawesome.com/dff9baba8a.js" crossorigin="anonymous"></script>
</head>
<body>

    <div id="instaceSelector" class="container text-center mt-3 mb-3">
        <div id="personnel" class="btn btn-primary">Employees</div>
        <div id="department" class="btn btn-primary">Departments</div>
        <div id="location" class="btn btn-primary">Locations</div>
    </div>
    <div id="searchContainer" class="container mt-3">
        <input type="text" class="form-control" id="search" placeholder="Search personnel">
        <div id="new" class="btn btn-primary form-control mt-3"><i class="far fa-plus-square"></i></div>
    </div>
    


    <div id="results" class="container mt-3">
       




        <div class="result-card mt-3 container-fluid">
            <div class="result-general">
                <h4 class="text-center">Placeholder Long Name <br><span class="postition">(Assistant Manager)</span></h4>
                <table class="container-fluid">
                    <tr>
                        <td><strong>Phone: </strong></td>
                        <td>+447378351667</td>
                    </tr>
                    <tr>
                        <td><strong>E-mail: </strong></td>
                        <td>tutrai.gergo01@gmail.com</td>
                    </tr>
                    <tr>
                        <td><strong>Department:</strong></td>
                        <td>Sales</td>
                    </tr>
                    <tr>
                        <td><strong>Location: </strong></td>
                        <td>Aberdeen</td>
                    </tr>
                </table>
            </div>
            <div class="m-2 btn-group container text-center">
                <div class="btn btn-warning edit"><i class="m-3 fas fa-user-edit"></i></div>
                <div class="btn btn-danger delete "><i class="m-3 fas fa-user-times"></i></div>
                
            </div>
        </div>

        
    </div>
    <div id="helper" class="container text-center">
        <h2>Add new contact</h2>

        <table id="helpertable">
            <tbody>
                <tr>
                    <td>Name</td><td><input class="form-control" type="text" id="name" placeholder="myadress@asdasd.co.uk"></td>   
                </tr>
                <tr>
                    <td>E-mail</td><td><input class="form-control" type="email" id="email" placeholder="myadress@asdasd.co.uk"></td>   
                </tr>
                <tr>
                    <td>Department</td><td>
                        <select class="form-control"  id="departmentSelector">
                            <option value="1">A</option>
                            <option value="2">B</option>
                            <option value="3">C</option>
                            <option value="4">D</option>
                        </select>
                    </td>   
                </tr>
                <tr>
                    <td>Location</td><td>
                        <select class="form-control"  id="LocationSelector">
                            <option value="1">A</option>
                            <option value="2">B</option>
                            <option value="3">C</option>
                            <option value="4">D</option>
                        </select>
                    </td>   
                </tr>
            </tbody>
        </table>
            <div class="m-2 btn-group container text-center">
                <div class="btn btn-warning cancel">Cancel</div>
                <div class="btn btn-danger save">Save</div>
                
            </div>
    </div>

</div>

<script src="./libs/js/newScript.js"></script>
</body>
</html>