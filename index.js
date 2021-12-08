function createEmployeeRecord(employee) {
    let testEmployee = {
        firstName: employee[0], 
        familyName: employee[1],  
        title: employee[2], 
        payPerHour: employee[3], 
        timeInEvents: [], 
        timeOutEvents: [], 
    }
    return testEmployee
}


function createEmployeeRecords(twoRows) {
    let newRecords = []
    for (const element of twoRows) {
        newRecords.push(createEmployeeRecord(element))
    }
    return newRecords
}

function createTimeInEvent(obj, date) {
    let splitDate = date.split(" ")
    let timeIn = {
        type: 'TimeIn',
        hour: parseInt(splitDate[1], 10),
        date: splitDate[0]
    }
    obj.timeInEvents.push(timeIn)
    return obj
}

function createTimeOutEvent(obj, date) {
    let splitDate = date.split(" ")
    let timeOut = {
        type: 'TimeOut',
        hour: parseInt(splitDate[1], 10),
        date: splitDate[0]
    }
    obj.timeOutEvents.push(timeOut)
    return obj
}

function hoursWorkedOnDate(obj, date) {
    let hourIn = obj.timeInEvents.find(element => element.date === date)
    let hourOut = obj.timeOutEvents.find(element => element.date === date)
    return (hourOut.hour - hourIn.hour) / 100
}

function wagesEarnedOnDate(obj, date) {
    let hours = hoursWorkedOnDate(obj, date)
    let payRate = obj.payPerHour
    return hours * payRate
}

function allWagesFor(obj) {
    let extractedDates = []
    let pay = 0 
    for (const element of obj.timeInEvents) {
        extractedDates.push(element.date)
    }
    for (const element of extractedDates) {
       pay += wagesEarnedOnDate(obj, element)
    }
    return pay
}

function calculatePayroll(array) {
    let total = 0
    for (const element of array) {
       total += allWagesFor(element)
    }
    return total
}

