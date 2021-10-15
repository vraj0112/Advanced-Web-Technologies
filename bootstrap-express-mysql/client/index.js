document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

document.querySelector('#courseDetails tbody').addEventListener('click', function (event) {
    if (event.target.className === "deleteCourse btn btn-danger") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "editCourse btn btn-primary") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#updateCourse');

const addBtn = document.querySelector('#addCourse');

addBtn.onclick = function () {
    courseIdInput = document.querySelector('#courseId').value;
    console.log(courseIdInput);
    courseNameInput = document.querySelector('#courseName').value;
    console.log(courseNameInput);
    departmentNameInput = "";
    if (document.getElementById('CSE').checked == true) {
        departmentNameInput = "CSE";
    } else if (document.getElementById('CE').checked == true) {
        departmentNameInput = "CE";
    } else if (document.getElementById('IT').checked == true) {
        departmentNameInput = "IT";
    }
    console.log(departmentNameInput);

    instituteNameInput = "";
    if (document.getElementById('CSPIT').checked == true && document.getElementById('DEPSTAR').checked == true) {
        instituteNameInput = "CSPIT, DEPSTAR";
    } else if (document.getElementById('DEPSTAR').checked == true) {
        instituteNameInput = "DEPSTAR";
    } else if (document.getElementById('CSPIT').checked == true) {
        instituteNameInput = "CSPIT";
    }
    console.log(instituteNameInput);
    universityNameInput = document.getElementById('universityName');
    universityNameInput = universityNameInput.options[universityNameInput.selectedIndex].text;

    console.log(universityNameInput);

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            courseId: courseIdInput,
            courseName: courseNameInput,
            departmentName: departmentNameInput,
            instituteName: instituteNameInput,
            universityName: universityNameInput
        })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']))
        .then(() => {
            document.getElementById('courseId').value = "";
            document.getElementById('courseName').value = "";
            var ele = document.getElementsByName("departmentName");
            for (var i = 0; i < ele.length; i++)
                ele[i].checked = false;

            document.getElementById('CSPIT').checked = false;
            document.getElementById('DEPSTAR').checked = false;

            document.getElementById('universityName').value = '-1';
        });
}

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#updateRow');
    updateSection.hidden = false;
    document.querySelector('#editCourseId').dataset.id = id;
}

updateBtn.onclick = function() {
    updateCourseId = document.querySelector('#editCourseId');
    updateCourseName = document.querySelector('#editCourseName').value;

    updateDepartmentName = "";
    if (document.getElementById('editCSE').checked == true) {
        updateDepartmentName = "CSE";
    } else if (document.getElementById('editCE').checked == true) {
        updateDepartmentName = "CE";
    } else if (document.getElementById('editIT').checked == true) {
        updateDepartmentName = "IT";
    }

    updateInstituteName = "";
    if (document.getElementById('editCSPIT').checked == true && document.getElementById('editDEPSTAR').checked == true) {
        updateInstituteName = "CSPIT, DEPSTAR";
    } else if (document.getElementById('editDEPSTAR').checked == true) {
        updateInstituteName = "DEPSTAR";
    } else if (document.getElementById('editCSPIT').checked == true) {
        updateInstituteName = "CSPIT";
    }

    updateUniversityName = document.getElementById('editUniversityName');
    updateUniversityName = updateUniversityName.options[updateUniversityName.selectedIndex].text;

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateCourseId.dataset.id,
            courseId: updateCourseId.value,
            courseName: updateCourseName,
            departmentName: updateDepartmentName,
            instituteName: updateInstituteName,
            universityName: updateUniversityName
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString('en-US', { timeZone: 'UTC' }); // ko-KR toLocaleString('en-GB', { timeZone: 'UTC' })
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="editCourse btn btn-primary" data-id=${data.id}>Edit</td>`;
    tableHtml += `<td><button class="deleteCourse btn btn-danger" data-id=${data.id}>Delete</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ id, courseId, courseName, departmentName, instituteName, universityName, dateAdded }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${courseId}</td>`;
        tableHtml += `<td>${courseName}</td>`;
        tableHtml += `<td>${departmentName}</td>`;
        tableHtml += `<td>${instituteName}</td>`;
        tableHtml += `<td>${universityName}</td>`;
        tableHtml += `<td>${new Date(dateAdded).toLocaleString()}</td>`;
        tableHtml += `<td><button class="editCourse btn btn-primary" data-id=${id}>Edit</td>`;
        tableHtml += `<td><button class="deleteCourse btn btn-danger" data-id=${id}>Delete</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

